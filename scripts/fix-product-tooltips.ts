#!/usr/bin/env bun
/**
 * fix-product-tooltips.ts — one-off data repair.
 *
 * Every `products` doc was populated with its `tooltip` (a richText / Lexical
 * field) holding a raw MARKDOWN STRING instead of a Lexical editor-state object.
 * Payload's Lexical field rejects a string — "The value passed to the Lexical
 * editor is not an object. This is not supported." — so every Product edit page
 * in admin throws and cannot be opened.
 *
 * This converts each string tooltip → a valid Lexical SerializedEditorState using
 * the SAME features the `tooltip` field is configured with (defaultLexical:
 * headings, lists, bold, links, …) via Payload's own convertMarkdownToLexical,
 * so `### heading`, `- lists` and `**bold**` render exactly as authored.
 *
 * Idempotent: a tooltip that is already an object is skipped, so a re-run is a
 * no-op. An empty / whitespace-only string is cleared to null (the field is
 * optional — no tooltip).
 *
 * MODES:
 *   bun scripts/fix-product-tooltips.ts          # DRY RUN (default). Reads via the
 *                                                #   Payload Local API, prints the
 *                                                #   per-doc plan, writes nothing.
 *   bun scripts/fix-product-tooltips.ts --live   # Converts + updates each doc via
 *                                                #   payload.update (keeps a version).
 *                                                #   Needs .env (MONGODB_URI, PAYLOAD_SECRET).
 */

import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'

import { defaultLexical } from '../src/fields/defaultLexical'

const LIVE = process.argv.includes('--live')

// One-line summary of a converted editor state for the dry-run plan.
function summarize(state: { root?: { children?: Array<{ type?: string; tag?: string }> } }): string {
  const children = state?.root?.children ?? []
  const counts: Record<string, number> = {}
  for (const node of children) {
    const key = node.type === 'heading' || node.type === 'list' ? `${node.type}(${node.tag})` : node.type ?? '?'
    counts[key] = (counts[key] ?? 0) + 1
  }
  return Object.entries(counts)
    .map(([k, n]) => `${n}×${k}`)
    .join(', ')
}

async function main() {
  console.log(`[fix-product-tooltips] mode: ${LIVE ? '🔴 LIVE (will write)' : '🟢 DRY RUN (no writes)'}`)

  const { getPayload } = await import('payload')
  const config = (await import('@payload-config')).default
  const payload = await getPayload({ config })

  // Build the converter config from the field's own editor, so the markdown is
  // parsed with exactly the features the tooltip field enables.
  const editorConfig = await editorConfigFactory.fromEditor({ editor: defaultLexical, config: await config })

  const { docs } = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 0, // all
    overrideAccess: true,
    pagination: false,
  })

  let converted = 0
  let cleared = 0
  let skipped = 0
  let errors = 0

  for (const doc of docs as Array<{ id: string; name?: string; tooltip?: unknown }>) {
    const label = (doc.name ?? '').replace(/\s+/g, ' ').trim().slice(0, 48)
    const tooltip = doc.tooltip

    // Already a valid Lexical object (or genuinely empty) — nothing to do.
    if (tooltip == null || typeof tooltip === 'object') {
      skipped++
      continue
    }
    if (typeof tooltip !== 'string') {
      console.log(`  [skip] "${label}" — unexpected tooltip type ${typeof tooltip}`)
      skipped++
      continue
    }

    // Empty / whitespace string → clear the field.
    if (tooltip.trim() === '') {
      console.log(`  [clear] "${label}" — empty string → null`)
      cleared++
      if (LIVE) {
        await payload.update({
          collection: 'products',
          id: doc.id,
          data: { tooltip: null } as never,
          overrideAccess: true,
        })
      }
      continue
    }

    let state
    try {
      state = convertMarkdownToLexical({ editorConfig, markdown: tooltip })
    } catch (err) {
      console.error(`  [error] "${label}": ${(err as Error).message}`)
      errors++
      continue
    }

    console.log(`  [${LIVE ? 'fix ' : 'plan'}] "${label}" → ${summarize(state)}`)

    if (LIVE) {
      try {
        await payload.update({
          collection: 'products',
          id: doc.id,
          data: { tooltip: state } as never,
          overrideAccess: true,
        })
        const confirm = (await payload.findByID({
          collection: 'products',
          id: doc.id,
          depth: 0,
          overrideAccess: true,
        })) as { tooltip?: unknown }
        if (typeof confirm.tooltip !== 'object' || confirm.tooltip == null) {
          throw new Error('post-update tooltip is not an object')
        }
        converted++
      } catch (err) {
        console.error(`  [error] "${label}": ${(err as Error).message}`)
        errors++
      }
    } else {
      converted++
    }
  }

  console.log('\n[fix-product-tooltips] ─────────────')
  console.log(`  total products:   ${docs.length}`)
  console.log(`  ${LIVE ? 'converted' : 'to convert'}:  ${converted}`)
  console.log(`  ${LIVE ? 'cleared' : 'to clear'}:    ${cleared}`)
  console.log(`  already ok/skip:  ${skipped}`)
  console.log(`  errors:           ${errors}`)
  if (!LIVE) console.log(`\n  Re-run with --live to write the ${converted + cleared} change(s).`)
  process.exit(errors > 0 ? 1 : 0)
}

main().catch((err) => {
  console.error('[fix-product-tooltips] Fatal:', err)
  process.exit(1)
})
