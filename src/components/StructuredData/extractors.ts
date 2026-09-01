import type { Page } from '@/payload-types'

import type { FaqItem, HowToStepInput } from './builders'

// Extract FAQ/HowTo content from a page's rendered `layout` blocks, so the
// JSON-LD can never drift from what the visitor actually sees.
const clean = (s?: string | null): string =>
  (s || '').replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ').trim()

const LEXICAL_BOUNDARIES = new Set(['paragraph', 'heading', 'listitem', 'quote', 'linebreak'])
type LexNode = { type?: unknown; text?: unknown; children?: unknown }
function flattenLexicalNodes(nodes: unknown): string {
  if (!Array.isArray(nodes)) return ''
  let out = ''
  for (const raw of nodes) {
    const n = raw as LexNode
    if (typeof n?.text === 'string') out += n.text
    out += flattenLexicalNodes(n?.children)
    if (typeof n?.type === 'string' && LEXICAL_BOUNDARIES.has(n.type)) out += '\n'
  }
  return out
}
export function richTextToText(data: unknown): string {
  try {
    const root = (data as { root?: { children?: unknown } } | null | undefined)?.root
    return clean(flattenLexicalNodes(root?.children))
  } catch {
    return ''
  }
}

function mediaUrl(m: unknown, origin: string): string | undefined {
  if (m && typeof m === 'object' && 'url' in m) {
    const u = (m as { url?: string | null }).url
    if (u) return u.startsWith('http') ? u : `${origin}${u}`
  }
  return undefined
}

// Iterate ALL `faqs` blocks — the homepage has two.
export function extractFaqs(layout?: Page['layout'] | null): FaqItem[] {
  if (!Array.isArray(layout)) return []
  const items: FaqItem[] = []
  for (const block of layout) {
    if ((block as { blockType?: string }).blockType !== 'faqs') continue
    const faqs =
      (block as { faqs?: { title?: string | null; description?: unknown }[] | null }).faqs || []
    for (const f of faqs) {
      const question = clean(f.title)
      const answer = richTextToText(f.description)
      if (question && answer) items.push({ question, answer })
    }
  }
  return items
}

// Three different step blocks back the 3 legacy HowTo pages.
export interface HowToExtract {
  name: string
  description?: string
  image?: string
  steps: HowToStepInput[]
}

export function extractHowTo(
  doc: Partial<Page> | null | undefined,
  origin: string,
): HowToExtract | null {
  const layout = doc?.layout
  if (!Array.isArray(layout)) return null
  const title = clean(doc?.title) || undefined

  // A. Homepage order flow — `fourSteps`
  const four = layout.find((b) => (b as { blockType?: string }).blockType === 'fourSteps') as
    | {
        heading?: string | null
        subheading?: string | null
        steps?: { title?: string | null; description?: string | null; image?: unknown }[] | null
      }
    | undefined
  if (four) {
    const steps = (four.steps || []).map((s) => ({
      name: clean(s.title),
      text: clean(s.description),
      image: mediaUrl(s.image, origin),
    }))
    return {
      name: clean(four.heading) || title || 'How to',
      description: clean(four.subheading) || undefined,
      steps,
    }
  }

  // B. /help-centre/steps-to-forming-a-company/ — `stepsItems`
  const stepsItems = layout.find(
    (b) => (b as { blockType?: string }).blockType === 'stepsItems',
  ) as { steps?: { heading?: string | null; content?: unknown }[] | null } | undefined
  if (stepsItems) {
    const steps = (stepsItems.steps || []).map((s) => ({
      // headings carry a "1. " numeric prefix — strip it for the step name
      name: clean(s.heading).replace(/^\d+\.\s*/, ''),
      text: richTextToText(s.content),
    }))
    return { name: title || 'Steps', steps }
  }

  // C. /help-centre/online-admin-portal/ — `onlineAdminPortal` (array is `items`)
  const oap = layout.find(
    (b) => (b as { blockType?: string }).blockType === 'onlineAdminPortal',
  ) as { items?: { title?: string | null; content?: unknown }[] | null } | undefined
  if (oap) {
    const steps = (oap.items || []).map((s) => ({
      name: clean(s.title),
      text: richTextToText(s.content),
    }))
    return { name: title || 'Guide', steps }
  }

  return null
}
