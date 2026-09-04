#!/usr/bin/env node
/**
 * CORE-6965 — replace 9 under-resolution CMS media masters with the
 * full-resolution files live.rapidformations.co.uk actually serves at
 * their rendered box size × 2 DPR:
 *   - 8 bank logos: clone master 64×64 → live 116×116 (58px CSS box × 2)
 *   - john-warbuton.webp: clone master 400×400 → live 800×800 (400px CSS box × 2)
 *
 * Filenames/alt text/doc IDs are preserved (payload.update keeps the existing
 * doc, only the underlying file + width/height/filesize are replaced), so
 * every block reference across pages keeps resolving to the same media doc.
 *
 * Usage: node scripts/fix-core-6965-image-resolution.mjs [--live]
 * Default is a dry run that only reports current vs. expected dimensions.
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const LIVE = process.argv.includes('--live')

const ASSETS = [
  { filename: 'bank-logo-barclays.png', file: 'barclays.png', mimetype: 'image/png', expect: 116 },
  { filename: 'bank-logo-natwest.png', file: 'natwest.png', mimetype: 'image/png', expect: 116 },
  { filename: 'bank-logo-starling.png', file: 'starling.png', mimetype: 'image/png', expect: 116 },
  { filename: 'bank-logo-monzo.png', file: 'monzo.png', mimetype: 'image/png', expect: 116 },
  { filename: 'bank-logo-zempler.png', file: 'zempler.png', mimetype: 'image/png', expect: 116 },
  { filename: 'bank-logo-anna.jpg', file: 'anna.jpg', mimetype: 'image/jpeg', expect: 116 },
  { filename: 'bank-logo-wise.png', file: 'wise.png', mimetype: 'image/png', expect: 116 },
  { filename: 'bank-logo-lloyds.jpg', file: 'lloyds.jpg', mimetype: 'image/jpeg', expect: 116 },
  { filename: 'john-warbuton.webp', file: 'warbuton.webp', mimetype: 'image/webp', expect: 800 },
]

const SCRATCH_DIR = path.resolve(__dirname, '../scratch-media')

async function main() {
  const { getPayload } = await import('payload')
  const configPromise = (await import('@payload-config')).default
  const payload = await getPayload({ config: configPromise })

  let updated = 0
  let alreadyCorrect = 0
  let errors = 0

  for (const asset of ASSETS) {
    const found = await payload.find({
      collection: 'media',
      where: { filename: { equals: asset.filename } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const doc = found.docs?.[0]
    if (!doc) {
      console.log(`  [no-doc] ${asset.filename}`)
      errors++
      continue
    }

    if (doc.width === asset.expect && doc.height === asset.expect) {
      console.log(`  [already ${asset.expect}x${asset.expect}] ${asset.filename}`)
      alreadyCorrect++
      continue
    }

    console.log(
      `  ${asset.filename}: current ${doc.width}x${doc.height} -> expected ${asset.expect}x${asset.expect}`,
    )

    if (!LIVE) continue

    const filePath = path.join(SCRATCH_DIR, asset.file)
    const data = fs.readFileSync(filePath)

    try {
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {},
        file: {
          data,
          mimetype: asset.mimetype,
          name: asset.filename,
          size: data.length,
        },
        overrideAccess: true,
      })
      const confirm = await payload.findByID({
        collection: 'media',
        id: doc.id,
        depth: 0,
        overrideAccess: true,
      })
      console.log(`    -> updated: now ${confirm.width}x${confirm.height}`)
      updated++
    } catch (err) {
      console.error(`    -> ERROR updating ${asset.filename}:`, err)
      errors++
    }
  }

  console.log(`\nSummary: updated=${updated} alreadyCorrect=${alreadyCorrect} errors=${errors}`)
  if (!LIVE) console.log('DRY RUN — re-run with --live to publish changes.')

  process.exit(errors > 0 ? 1 : 0)
}

main()
