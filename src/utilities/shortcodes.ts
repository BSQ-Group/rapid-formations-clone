export const TELEPHONE_NUMBER = '020 7871 9990'
export const TELEPHONE_HREF = 'tel:+442078719990'

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

const telephoneLink = (source: TextNode) => ({
  type: 'link',
  children: [textLike(source, TELEPHONE_NUMBER)],
  direction: 'ltr',
  fields: { linkType: 'custom', newTab: false, url: TELEPHONE_HREF },
  format: '',
  indent: 0,
  version: 3,
})

const expand = (node: TextNode, prices: Map<string, string>): unknown[] => {
  const out: unknown[] = []
  let cursor = 0

  for (const match of node.text.matchAll(SHORTCODE)) {
    const [raw, identifier, rawAttributes] = match
    const attributes = parseAttributes(rawAttributes ?? '')

    let replacement: unknown = null
    if (identifier === 'telephone') {
      replacement = telephoneLink(node)
    } else if (identifier === 'price') {
      const value = prices.get(attributes.slug ?? '')
      if (value !== undefined) replacement = `£${value}`
    }

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

const expandString = (text: string, prices: Map<string, string>): string =>
  text.replace(
    new RegExp(SHORTCODE.source, 'g'),
    (raw, identifier: string, rawAttributes: string) => {
      if (identifier === 'telephone') return TELEPHONE_NUMBER
      if (identifier === 'price') {
        const value = prices.get(parseAttributes(rawAttributes ?? '').slug ?? '')
        if (value !== undefined) return `£${value}`
      }
      return raw
    },
  )

/**
 * Replaces [[telephone]] and [[price slug="..."]] anywhere in a Payload document
 * with the nodes they stand for, leaving every other shortcode untouched.
 */
export const resolveShortcodes = <T>(value: T, prices: Map<string, string>): T => {
  if (Array.isArray(value)) {
    return value.flatMap((item) =>
      isShortcodeText(item) ? expand(item, prices) : [resolveShortcodes(item, prices)],
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
      entries.map(([key, item]) => [key, resolveShortcodes(item, prices)]),
    ) as T
  }

  if (typeof value === 'string' && value.includes('[[')) return expandString(value, prices) as T

  return value
}

export const toPriceMap = (
  items: { slug?: string | null; value?: string | null }[] | null | undefined,
): Map<string, string> =>
  new Map(
    (items ?? [])
      .filter(
        (item): item is { slug: string; value: string } =>
          Boolean(item?.slug) && Boolean(item?.value),
      )
      .map((item) => [item.slug, item.value]),
  )
