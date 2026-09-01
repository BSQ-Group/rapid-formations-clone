/**
 * withPageLock.ts — per-page advisory lock for Payload seed scripts (T349)
 *
 * WHY NOT Payload's native lockDocuments:
 *   Payload's `lockDocuments` feature is an admin-UI lock (session-based, UI-only).
 *   Seed scripts run outside the Payload process and hit the REST API directly —
 *   the admin UI lock has no API surface that scripts can acquire/release
 *   programmatically without spawning a full Payload instance. Rolling our own
 *   seed-specific lock is the right call here.
 *
 * MECHANISM:
 *   - A `seedLocks` collection in the shared MongoDB cluster.
 *   - One document per page key (e.g. "bcorp", "about-us").
 *   - Atomic acquire via a single `findOneAndUpdate` with compare-and-set:
 *       match: { _id: pageKey, $or: [ { lockedAt: null }, { lockedAt: { $lt: staleThreshold } } ] }
 *       update: { $set: { lockedAt: new Date(), lockedBy: ... } }
 *     This is a single MongoDB operation — no read-then-write race.
 *   - Stale TTL: 10 minutes. A crashed lane that never released its lock is
 *     treated as free after LOCK_TTL_MS has elapsed since lockedAt.
 *   - Retry: bounded exponential backoff (base 1s, max 30s, ceiling WAIT_TIMEOUT_MS).
 *   - Release: always in a `finally` block — even if the seeder throws.
 *
 * USAGE:
 *   import { withPageLock } from './scripts/lib/withPageLock'
 *
 *   await withPageLock('bcorp', async () => {
 *     // ... all Payload REST calls that read + write the page ...
 *   })
 *
 *   The `pageKey` should be the page slug (e.g. 'bcorp', 'about-us', 'pricing').
 *   Two lanes seeding different pageKeys are unblocked by design (document-atomic).
 *
 * ENV:
 *   MONGODB_URI    — required. The shared MongoDB cluster URI.
 *   PAYLOAD_SECRET — required in .env for `bun run build` / server startup;
 *                    the build silently exits with "missing secret key" without it.
 *
 * BASE_URL NOTE (T426):
 *   Seed scripts that call the Payload REST API must use https:// for BASE_URL —
 *   this project's server.js is HTTPS-only (no HTTP listener).
 *   Run with: NODE_TLS_REJECT_UNAUTHORIZED=0 bun run scripts/seed-*.ts
 *   (Node.js 18+ fetch rejects self-signed localhost certs without this flag.)
 */

import { MongoClient, type Db } from 'mongodb'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Lock TTL — a lock older than this is treated as stale (crashed lane). */
const LOCK_TTL_MS = 10 * 60 * 1000 // 10 minutes

/** Maximum total time we'll wait for a lock before giving up. */
const WAIT_TIMEOUT_MS = 5 * 60 * 1000 // 5 minutes

/** Initial retry backoff (doubles each attempt, capped at MAX_BACKOFF_MS). */
const INITIAL_BACKOFF_MS = 1_000 // 1 second

/** Cap on individual retry interval. */
const MAX_BACKOFF_MS = 30_000 // 30 seconds

const COLLECTION = 'seedLocks'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LockDoc {
  _id: string
  lockedAt: Date | null
  lockedBy: string
}

// ---------------------------------------------------------------------------
// Internal: describe this process for the lock record
// ---------------------------------------------------------------------------
function lockOwner(): string {
  const pid = process.pid
  const host = (() => {
    try {
      return require('os').hostname()
    } catch {
      return 'unknown'
    }
  })()
  // Include the running script name if discernible
  const script = process.argv[1] ? require('path').basename(process.argv[1]) : 'unknown-script'
  return `${host}:${pid}:${script}`
}

// ---------------------------------------------------------------------------
// Internal: try a single atomic acquire
// Returns true if we acquired, false if someone else holds a fresh lock.
// ---------------------------------------------------------------------------
async function tryAcquire(db: Db, pageKey: string): Promise<boolean> {
  const now = new Date()
  const staleThreshold = new Date(now.getTime() - LOCK_TTL_MS)

  const result = await db.collection<LockDoc>(COLLECTION).findOneAndUpdate(
    {
      _id: pageKey,
      $or: [
        { lockedAt: null },
        { lockedAt: { $exists: false } },
        { lockedAt: { $lt: staleThreshold } },
      ],
    } as any,
    {
      $set: { lockedAt: now, lockedBy: lockOwner() },
      $setOnInsert: { _id: pageKey },
    } as any,
    {
      upsert: true,
      returnDocument: 'after',
    },
  )

  // If result is null, the filter didn't match (another fresh lock is held).
  return result !== null
}

// ---------------------------------------------------------------------------
// Internal: release the lock (best-effort; failure is logged, not thrown)
// ---------------------------------------------------------------------------
async function release(db: Db, pageKey: string): Promise<void> {
  try {
    await db.collection<LockDoc>(COLLECTION).updateOne(
      { _id: pageKey } as any,
      { $set: { lockedAt: null, lockedBy: '' } } as any,
    )
  } catch (err) {
    // Non-fatal — stale TTL will clean this up anyway.
    console.warn(`[withPageLock] WARNING: could not release lock for "${pageKey}":`, err)
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Acquire an advisory lock for `pageKey`, run `fn`, then release.
 *
 * @param pageKey  Page slug / unique key (e.g. 'bcorp', 'about-us')
 * @param fn       Async seed work to run while the lock is held
 * @param opts     Optional overrides (mainly for testing)
 */
export async function withPageLock<T>(
  pageKey: string,
  fn: () => Promise<T>,
  opts: {
    mongoUri?: string
    lockTtlMs?: number
    waitTimeoutMs?: number
    initialBackoffMs?: number
  } = {},
): Promise<T> {
  const mongoUri = opts.mongoUri ?? process.env.MONGODB_URI
  if (!mongoUri) {
    throw new Error('[withPageLock] MONGODB_URI env var is required (or pass opts.mongoUri)')
  }

  // Resolve effective constants (allow test overrides)
  const effectiveTtl = opts.lockTtlMs ?? LOCK_TTL_MS
  const effectiveTimeout = opts.waitTimeoutMs ?? WAIT_TIMEOUT_MS
  const effectiveInitialBackoff = opts.initialBackoffMs ?? INITIAL_BACKOFF_MS

  const client = new MongoClient(mongoUri, { serverSelectionTimeoutMS: 10_000 })
  await client.connect()
  const db = client.db()

  // Ensure the collection exists with a TTL index for automatic cleanup
  // (belt-and-suspenders — the lockedAt null-out on release is the primary cleanup path)
  try {
    await db.createIndex(COLLECTION, { lockedAt: 1 }, { expireAfterSeconds: effectiveTtl / 1000 * 2, background: true })
  } catch {
    // Index may already exist with different options — ignore
  }

  const deadline = Date.now() + effectiveTimeout
  let backoff = effectiveInitialBackoff

  let acquired = false
  try {
    // Acquire loop
    while (true) {
      // For the acquire check we need to use the effective TTL, so we inline a
      // version of tryAcquire that uses opts:
      const now = new Date()
      const staleThreshold = new Date(now.getTime() - effectiveTtl)

      let result: LockDoc | null = null
      try {
        result = await db.collection<LockDoc>(COLLECTION).findOneAndUpdate(
          {
            _id: pageKey,
            $or: [
              { lockedAt: null },
              { lockedAt: { $exists: false } },
              { lockedAt: { $lt: staleThreshold } },
            ],
          } as any,
          {
            $set: { lockedAt: now, lockedBy: lockOwner() },
            $setOnInsert: { _id: pageKey },
          } as any,
          {
            upsert: true,
            returnDocument: 'after',
          },
        )
      } catch (err: any) {
        // E11000 duplicate key: two concurrent upserts raced on the initial insert.
        // The other process won — treat this as "lock not acquired" and retry.
        if (err?.code === 11000) {
          result = null
        } else {
          throw err
        }
      }

      if (result !== null) {
        acquired = true
        console.log(`[withPageLock] Acquired lock for "${pageKey}" (owner: ${lockOwner()})`)
        break
      }

      // Lock held by another writer — check deadline
      if (Date.now() + backoff > deadline) {
        throw new Error(
          `[withPageLock] Timed out waiting for lock on "${pageKey}" after ${effectiveTimeout}ms. ` +
            `Another process may be seeding this page. Retry manually.`,
        )
      }

      console.log(
        `[withPageLock] Lock on "${pageKey}" held by another process — retrying in ${backoff}ms…`,
      )
      await new Promise((r) => setTimeout(r, backoff))
      backoff = Math.min(backoff * 2, MAX_BACKOFF_MS)
    }

    // Run the seeder
    return await fn()
  } finally {
    if (acquired) {
      await release(db, pageKey)
      console.log(`[withPageLock] Released lock for "${pageKey}"`)
    }
    await client.close()
  }
}
