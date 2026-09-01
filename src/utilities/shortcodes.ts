export const TELEPHONE_NUMBER = '020 7871 9990'
export const TELEPHONE_HREF = 'tel:+442078719990'

export const LIVE_CHAT_HREF = '#live-chat'
export const ELIGIBLE_COUNTRIES_HREF = '#eligible-countries'
export const DOCUMENT_LIBRARY_HREF = '#document-library'

const NON_BREAKING_SPACE = '\u00a0'

const SHORTCODE = /\[\[\s*([a-z][a-z-]*)((?:\s+[a-z-]+="[^"]*")*)\s*\]\]/g
const ATTRIBUTE = /([a-z-]+)="([^"]*)"/g

type TextNode = {
  type: 'text'
  text: string
  detail: number
  format: number
  mode: string
  style: string
  version: number
}

const parseAttributes = (raw: string): Record<string, string> => {
  const attributes: Record<string, string> = {}
  for (const [, name, value] of raw.matchAll(ATTRIBUTE)) attributes[name] = value
  return attributes
}

const textLike = (source: TextNode, text: string): TextNode => ({
  ...source,
  text,
})

const customLink = (source: TextNode, url: string, text: string, payload?: unknown) => ({
  type: 'link',
  children: [textLike(source, text)],
  direction: 'ltr',
  fields: { linkType: 'custom', newTab: false, url, payload },
  format: '',
  indent: 0,
  version: 3,
})

const telephoneLink = (source: TextNode) => customLink(source, TELEPHONE_HREF, TELEPHONE_NUMBER)

type Attributes = Record<string, string>

export type EligibleCountries = { lastUpdated?: string | null; countries: string[] }

export type DocumentGroup = { title: string; documents: string[] }
export type DocumentSection = { title: string; groups: DocumentGroup[] }
export type DocumentList = { sections: DocumentSection[] }

export type ShortcodeData = {
  eligibleCountries: EligibleCountries
  documentLibrary: DocumentList
}

type NodeContext = { node: TextNode; attributes: Attributes; data: ShortcodeData }

type Shortcode = {
  node: (context: NodeContext) => unknown
  text?: (attributes: Attributes, data: ShortcodeData) => string | null
}

const shortcodes: Record<string, Shortcode> = {
  telephone: { node: ({ node }) => telephoneLink(node), text: () => TELEPHONE_NUMBER },
  space: { node: () => NON_BREAKING_SPACE, text: () => NON_BREAKING_SPACE },
  'live-chat': {
    node: ({ node, attributes }) =>
      customLink(node, LIVE_CHAT_HREF, attributes.text || 'live chat'),
  },
  eligiblecountries: {
    node: ({ node, attributes, data }) =>
      customLink(
        node,
        ELIGIBLE_COUNTRIES_HREF,
        attributes.text || 'Find out if your country is eligible',
        data.eligibleCountries,
      ),
  },
  'documents-list': {
    node: ({ node, attributes, data }) =>
      customLink(node, DOCUMENT_LIBRARY_HREF, attributes.text || 'here', data.documentLibrary),
  },
}

const expand = (node: TextNode, data: ShortcodeData): unknown[] => {
  const out: unknown[] = []
  let cursor = 0

  for (const match of node.text.matchAll(SHORTCODE)) {
    const [raw, identifier, rawAttributes] = match
    const attributes = parseAttributes(rawAttributes ?? '')

    const replacement = shortcodes[identifier]?.node({ node, attributes, data }) ?? null

    if (replacement === null) continue

    const before = node.text.slice(cursor, match.index)
    if (before) out.push(textLike(node, before))
    out.push(typeof replacement === 'string' ? textLike(node, replacement) : replacement)
    cursor = match.index + raw.length
  }

  if (!out.length) return [node]

  const after = node.text.slice(cursor)
  if (after) out.push(textLike(node, after))

  return merge(out)
}

const merge = (nodes: unknown[]): unknown[] =>
  nodes.reduce<unknown[]>((acc, node) => {
    const previous = acc[acc.length - 1] as TextNode | undefined
    const current = node as TextNode
    if (
      previous?.type === 'text' &&
      current?.type === 'text' &&
      previous.format === current.format
    ) {
      acc[acc.length - 1] = textLike(previous, previous.text + current.text)
      return acc
    }
    acc.push(node)
    return acc
  }, [])

const isShortcodeText = (value: unknown): value is TextNode =>
  typeof value === 'object' &&
  value !== null &&
  (value as TextNode).type === 'text' &&
  typeof (value as TextNode).text === 'string' &&
  (value as TextNode).text.includes('[[')

const expandString = (text: string, data: ShortcodeData): string =>
  text.replace(
    new RegExp(SHORTCODE.source, 'g'),
    (raw, identifier: string, rawAttributes: string) =>
      shortcodes[identifier]?.text?.(parseAttributes(rawAttributes ?? ''), data) ?? raw,
  )

/**
 * Replaces [[telephone]], [[space]], [[live-chat]], [[eligiblecountries]] and
 * [[documents-list]] anywhere in a Payload document with the nodes they stand
 * for, leaving every other shortcode untouched. The last three become links on
 * a sentinel href that RichText swaps for the interactive component. (Prices are
 * authored inline on the block that shows them, so there is no [[price]] token.)
 */
export const resolveShortcodes = <T>(value: T, data: ShortcodeData): T => {
  if (Array.isArray(value)) {
    return value.flatMap((item) =>
      isShortcodeText(item) ? expand(item, data) : [resolveShortcodes(item, data)],
    ) as T
  }

  if (value && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    const worthWalking = entries.some(
      ([, item]) =>
        (item && typeof item === 'object') || (typeof item === 'string' && item.includes('[[')),
    )
    if (!worthWalking) return value
    return Object.fromEntries(
      entries.map(([key, item]) => [key, resolveShortcodes(item, data)]),
    ) as T
  }

  if (typeof value === 'string' && value.includes('[[')) return expandString(value, data) as T

  return value
}
