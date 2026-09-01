#!/usr/bin/env bun
/**
 * seed-rapid-meta.ts — Phase 1 of the SEO replication plan.
 *
 * Seeds each `pages` doc's `meta.title` + `meta.description` from the VERBATIM
 * values harvested off the live legacy site (www.rapidformations.co.uk), captured
 * in reports/seo-audit/seo-data.json by scripts/seo-audit/extract-seo.ts.
 *
 * WHY the title is seeded VERBATIM (incl. any " | Rapid Formations" suffix):
 *   generateMeta.ts now emits meta.title as-is (no auto brand-suffix append). The
 *   legacy <title> already carries the suffix where the original uses one and omits
 *   it where the original omits it (home + the 3 additional-services pages), so
 *   storing the exact legacy <title> makes all 65 pages match byte-for-byte.
 *   ⚠️ This seed MUST be applied to prod together with the generateMeta change, or
 *   the ~61 pages whose stored meta.title is the un-suffixed base will lose the
 *   suffix in their rendered <title>.
 *
 * MODES:
 *   bun scripts/seed-rapid-meta.ts          # DRY RUN (default). Reads CURRENT meta
 *                                           #   from the public clone REST API and
 *                                           #   prints the diff. Writes nothing, no
 *                                           #   DB connection, no secrets.
 *   bun scripts/seed-rapid-meta.ts --live   # Publishes via the Payload Local API
 *                                           #   under a per-page advisory lock.
 *                                           #   Needs .env (MONGODB_URI, PAYLOAD_SECRET)
 *                                           #   + node_modules. REDEPLOY after a live run
 *                                           #   (the site is statically generated).
 */

const LIVE = process.argv.includes('--live')
const DATA_PATH = 'reports/seo-audit/seo-data.json'
const CLONE = 'https://rapid-formations-clone.vercel.app'
const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

interface Row {
  clonePath: string
  origPath: string
  orig: { status: number; title: string | null; description: string | null }
}

// Page slug = last path segment (clonePath may be a nested fullPath like
// /additional-services/business-address/); home → 'home'.
function slugFor(clonePath: string): string {
  const parts = clonePath.split('/').filter(Boolean)
  return parts.length ? parts[parts.length - 1] : 'home'
}

// Collapse the legacy double brand-suffix typo (a few pages emit
// "X | Rapid Formations | Rapid Formations") down to a single suffix.
function normalizeTitle(t: string): string {
  return t.replace(/(\s*\|\s*Rapid Formations)(?:\s*\|\s*Rapid Formations)+\s*$/i, '$1').trim()
}

function isValidOriginal(o: Row['orig']): boolean {
  if (o.status !== 200 || !o.title) return false
  if (/^404\b/.test(o.title) || /page not available/i.test(o.title)) return false
  return true
}

// ---- DRY RUN: read current meta from the public REST API (no DB, no secrets) ----
async function currentMetaViaApi(slug: string): Promise<{ title: string; description: string }> {
  const res = await fetch(
    `${CLONE}/api/pages?where[slug][equals]=${encodeURIComponent(slug)}&depth=0&limit=1`,
    { headers: { 'User-Agent': UA } },
  )
  const doc = (await res.json())?.docs?.[0]
  return { title: doc?.meta?.title ?? '', description: doc?.meta?.description ?? '' }
}

async function dryRun(rows: Row[]) {
  let planned = 0
  let unchanged = 0
  let skipped = 0
  for (const row of rows) {
    const slug = slugFor(row.clonePath)
    if (!isValidOriginal(row.orig)) {
      console.log(`  [skip] ${row.clonePath} — no valid distinct legacy meta`)
      skipped++
      continue
    }
    const title = normalizeTitle(row.orig.title!.trim())
    const description = (row.orig.description || '').trim()
    const cur = await currentMetaViaApi(slug)
    const titleChanged = cur.title.trim() !== title
    const descChanged = description !== '' && cur.description.trim() !== description
    if (!titleChanged && !descChanged) {
      unchanged++
      continue
    }
    planned++
    console.log(`  [plan] slug="${slug}"`)
    if (titleChanged) console.log(`         title:       "${cur.title || '(empty)'}"  →  "${title}"`)
    if (descChanged)
      console.log(
        `         description: "${(cur.description || '(empty)').slice(0, 60)}"  →  "${description.slice(0, 60)}…"`,
      )
  }
  console.log('\n[seed-rapid-meta] ───────────── DRY RUN')
  console.log(`  total rows:      ${rows.length}`)
  console.log(`  skipped:         ${skipped}`)
  console.log(`  already correct: ${unchanged}`)
  console.log(`  planned changes: ${planned}`)
  console.log(`\n  Re-run with --live to publish the ${planned} change(s).`)
}

// ---- LIVE: write through the Payload Local API under a per-page lock ----
async function live(rows: Row[]) {
  const { getPayload } = await import('payload')
  const configPromise = (await import('@payload-config')).default
  const { withPageLock } = await import('./lib/withPageLock')
  const payload = await getPayload({ config: configPromise })

  let updated = 0
  let unchanged = 0
  let skipped = 0
  let noDoc = 0
  let errors = 0

  for (const row of rows) {
    const slug = slugFor(row.clonePath)
    if (!isValidOriginal(row.orig)) {
      skipped++
      continue
    }
    const title = normalizeTitle(row.orig.title!.trim())
    const description = (row.orig.description || '').trim()

    const found = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
      pagination: false,
    })
    const doc = found.docs?.[0] as { id: string; meta?: Record<string, unknown> } | undefined
    if (!doc) {
      console.log(`  [no-doc] slug="${slug}"`)
      noDoc++
      continue
    }
    const curTitle = (doc.meta?.title as string) ?? ''
    const curDesc = (doc.meta?.description as string) ?? ''
    const titleChanged = curTitle !== title
    const descChanged = description !== '' && curDesc !== description
    if (!titleChanged && !descChanged) {
      unchanged++
      continue
    }

    try {
      await withPageLock(slug, async () => {
        const newMeta = {
          ...(doc.meta ?? {}),
          title,
          ...(description !== '' ? { description } : {}),
        }
        await payload.update({
          collection: 'pages',
          id: doc.id,
          data: { meta: newMeta, _status: 'published' } as never,
          draft: false,
          overrideAccess: true,
          context: { disableRevalidate: true, disableLegalSidenavSync: true },
        })
        const confirm = (await payload.findByID({
          collection: 'pages',
          id: doc.id,
          depth: 0,
          overrideAccess: true,
        })) as { meta?: { title?: string } }
        if ((confirm.meta?.title ?? '') !== title) {
          throw new Error(`confirm mismatch for "${slug}"`)
        }
        console.log(`  [ok] slug="${slug}" published & confirmed`)
        updated++
      })
    } catch (err) {
      console.error(`  [error] slug="${slug}": ${(err as Error).message}`)
      errors++
    }
  }

  console.log('\n[seed-rapid-meta] ───────────── LIVE')
  console.log(`  updated: ${updated} · unchanged: ${unchanged} · skipped: ${skipped} · no-doc: ${noDoc} · errors: ${errors}`)
  console.log(`  ⚠️ REDEPLOY for the statically-generated pages to pick up the change.`)
  process.exit(errors > 0 ? 1 : 0)
}

async function main() {
  console.log(`[seed-rapid-meta] mode: ${LIVE ? '🔴 LIVE (will publish)' : '🟢 DRY RUN (no writes)'}`)
  const data = await Bun.file(DATA_PATH).json()
  const rows: Row[] = data.results
  if (LIVE) await live(rows)
  else await dryRun(rows)
}

main().catch((err) => {
  console.error('[seed-rapid-meta] Fatal:', err)
  process.exit(1)
})
