#!/usr/bin/env bun
/**
 * fix-privacy-policy-clause-lists.ts — CORE-7279.
 *
 * The /privacy-policy/ page's Lexical content has several numbered clause lists
 * that were imported as MULTIPLE sibling `list` nodes (each interrupted by a
 * `paragraph` or a nested `list` that live nests INSIDE the preceding clause's
 * `<li>`) instead of one continuous list. Because each sibling `<ol>` is its own
 * native counter scope, the browser restarts lettering ("a.") at every fragment —
 * live renders these as a single list where the intervening content sits nested
 * inside the clause `<li>` it belongs to.
 *
 * This walks body.root.children (recursively, in case the pattern recurs inside a
 * nested list) and merges any run of:
 *   list(number) [, paragraph | list(bullet)]* , list(number) [, ...]
 * into a single list(number), folding the paragraph/bullet-list nodes into the
 * children of the last listitem of the list they follow — matching live's nesting
 * exactly. A heading (or anything else) breaks a run.
 *
 * Two more artifacts of the same import produce PHANTOM `<li>` rows that the merge
 * above doesn't touch, because they don't restart lettering (the browser's
 * `list-style-type: none` + wrapper class already hides that) — they just add a
 * content-less row live never has:
 *   1. A "double-wrapped" list: `list > listitem(sole child: list) > list` — an
 *      outer list whose only item exists purely to hold a nested list. Unwrapped to
 *      the real inner list before it's used anywhere.
 *   2. A wrapper listitem sitting as a SIBLING inside an existing list's own
 *      children (not a root-level list) — a listitem whose children are entirely
 *      `list` nodes, no text of its own. Live nests that sub-list directly inside
 *      the PRECEDING clause's `<li>` instead of giving it a row of its own, so this
 *      folds it there too.
 *
 * MODES:
 *   bun scripts/fix-privacy-policy-clause-lists.ts          # DRY RUN (default).
 *                                                            #   Reads via the Payload
 *                                                            #   Local API, prints the
 *                                                            #   before/after list-node
 *                                                            #   and <li> counts. Writes
 *                                                            #   nothing.
 *   bun scripts/fix-privacy-policy-clause-lists.ts --live   # Applies the merge and
 *                                                            #   saves via the Payload
 *                                                            #   Local API. Needs .env
 *                                                            #   (MONGODB_URI).
 */

const LIVE = process.argv.includes('--live')
const SLUG = 'privacy-policy'

type LexicalNode = {
  type: string
  listType?: string
  children?: LexicalNode[]
  [key: string]: unknown
}

const isNumberList = (n: LexicalNode) => n.type === 'list' && n.listType === 'number'
const isBulletList = (n: LexicalNode) => n.type === 'list' && n.listType === 'bullet'
const isFoldable = (n: LexicalNode) => n.type === 'paragraph' || isBulletList(n)

const isWrapperListItem = (n: LexicalNode): boolean =>
  n.type === 'listitem' &&
  (n.children?.length ?? 0) > 0 &&
  (n.children as LexicalNode[]).every((c) => c.type === 'list')

/** `list > listitem(sole child: list) > list` is a redundant double-wrap — unwrap
 * to the real inner list (looping in case it's stacked more than once). */
const unwrapDoubleList = (node: LexicalNode): LexicalNode => {
  let n = node
  while (
    n.type === 'list' &&
    n.children?.length === 1 &&
    isWrapperListItem(n.children[0]) &&
    n.children[0].children?.length === 1
  ) {
    n = (n.children[0].children as LexicalNode[])[0]
  }
  return n
}

/** Within one list's own children, a wrapper listitem (no text, only a nested
 * list) folds into the PRECEDING sibling listitem instead of keeping its own row —
 * matching live, which nests the sub-list inside the clause `<li>` it belongs to. */
const foldWrapperSiblings = (items: LexicalNode[]): LexicalNode[] => {
  const out: LexicalNode[] = []
  for (const item of items) {
    if (isWrapperListItem(item) && out.length > 0) {
      const prev = out[out.length - 1]
      prev.children = [...(prev.children ?? []), ...(item.children ?? [])]
      continue
    }
    out.push(item)
  }
  return out
}

/** Merge a run of `list(number)` siblings (interrupted only by paragraphs/bullet
 * lists that belong nested inside the preceding clause) into one continuous list. */
const mergeListRuns = (nodes: LexicalNode[]): LexicalNode[] => {
  const out: LexicalNode[] = []
  let openList: LexicalNode | null = null

  for (const node of nodes) {
    let recursed: LexicalNode = node.children
      ? { ...node, children: mergeListRuns(node.children) }
      : node

    if (recursed.type === 'list') {
      recursed = unwrapDoubleList(recursed)
      if (recursed.children) {
        recursed = { ...recursed, children: foldWrapperSiblings(recursed.children) }
      }
    }

    if (isNumberList(recursed)) {
      if (openList) {
        openList.children = [...(openList.children ?? []), ...(recursed.children ?? [])]
      } else {
        openList = { ...recursed, children: [...(recursed.children ?? [])] }
        out.push(openList)
      }
      continue
    }

    if (openList && isFoldable(recursed)) {
      const items = openList.children ?? []
      const last = items[items.length - 1]
      if (last) {
        last.children = [...(last.children ?? []), recursed]
        continue
      }
    }

    openList = null
    out.push(recursed)
  }

  return out
}

const countListNodes = (nodes: LexicalNode[]): number =>
  nodes.reduce(
    (sum, n) =>
      sum + (n.type === 'list' ? 1 : 0) + countListNodes(n.children ?? []),
    0,
  )

const countListItems = (nodes: LexicalNode[]): number =>
  nodes.reduce(
    (sum, n) =>
      sum + (n.type === 'listitem' ? 1 : 0) + countListItems(n.children ?? []),
    0,
  )

async function main() {
  console.log('main() start')
  const { getPayload } = await import('payload')
  console.log('imported getPayload')
  const configPromise = (await import('@payload-config')).default
  console.log('imported config, awaiting it...')
  const config = await configPromise
  console.log('config resolved, db type:', (config as { db?: { defaultIDType?: string } }).db ? 'present' : 'MISSING')
  const payload = await getPayload({ config })
  console.log('payload ready, finding page...')

  const result = await payload.find({
    collection: 'pages',
    where: { slug: { equals: SLUG } },
    depth: 0,
    limit: 1,
  })
  const page = result.docs[0]
  if (!page) throw new Error(`No page found with slug "${SLUG}"`)

  const layout = (page.layout ?? []) as Array<Record<string, unknown>>
  const blockIndex = layout.findIndex((b) => b.blockType === 'textContent')
  if (blockIndex < 0) throw new Error('No textContent block found on privacy-policy')

  const block = layout[blockIndex] as { body: { root: LexicalNode } }
  const before = block.body.root.children ?? []
  const after = mergeListRuns(before)

  console.log(`slug: ${SLUG}`)
  console.log(`top-level list nodes: ${countListNodes(before)} -> ${countListNodes(after)}`)
  console.log(`total <li> (listitem nodes): ${countListItems(before)} -> ${countListItems(after)}`)

  if (!LIVE) {
    console.log('\nDRY RUN — no changes written. Re-run with --live to persist.')
    return
  }

  const newLayout = layout.map((b, i) =>
    i === blockIndex
      ? { ...b, body: { ...block.body, root: { ...block.body.root, children: after } } }
      : b,
  )

  await payload.update({
    collection: 'pages',
    id: page.id,
    depth: 0,
    data: { layout: newLayout },
    context: { disableRevalidate: true },
  })

  console.log('\nSaved.')
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
