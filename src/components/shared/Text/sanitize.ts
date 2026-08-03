const ALLOWED_TAGS = new Set([
  'em',
  'strong',
  'span',
  'br',
  'b',
  'italic',
  'i',
  'a',
  'blockquote',
  'hr',
  'ul',
  'ol',
  'li',
])
const ALLOWED_ATTRS = new Set(['href', 'target', 'rel', 'class'])
const VOID_TAGS = new Set(['br', 'hr'])

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: '\u00A0',
  copy: '©',
  reg: '®',
  trade: '™',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  ldquo: '“',
  rdquo: '”',
  lsquo: '‘',
  rsquo: '’',
}

const decodeCodePoint = (code: number, raw: string): string =>
  Number.isFinite(code) && code >= 0 && code <= 0x10ffff ? String.fromCodePoint(code) : raw

export const decodeEntities = (s: string): string =>
  s.replace(/&(#x[0-9a-fA-F]+|#\d+|[a-zA-Z]+);/g, (raw, body: string) => {
    if (body.startsWith('#x')) return decodeCodePoint(parseInt(body.slice(2), 16), raw)
    if (body.startsWith('#')) return decodeCodePoint(parseInt(body.slice(1), 10), raw)
    return NAMED_ENTITIES[body] ?? raw
  })

const BARE_AMP = /&(?!#x[0-9a-fA-F]+;|#\d+;|[a-zA-Z][a-zA-Z0-9]*;)/g

const escapeHtml = (s: string) =>
  decodeEntities(s)
    .replace(BARE_AMP, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const escapeAttr = (s: string) =>
  decodeEntities(s)
    .replace(BARE_AMP, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const isSafeHref = (raw: string): boolean => {
  const v = raw.trim().replace(/[\t\n\r]/g, '')
  if (v === '') return false
  const scheme = v.match(/^([a-zA-Z][a-zA-Z0-9+.\-]*):/)?.[1]?.toLowerCase()
  if (!scheme) return true
  return scheme === 'http' || scheme === 'https' || scheme === 'mailto' || scheme === 'tel'
}

const parseAttrs = (attrsStr: string): string => {
  let result = ''
  const attrRe = /([a-zA-Z][a-zA-Z0-9\-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g
  let m: RegExpExecArray | null
  while ((m = attrRe.exec(attrsStr)) !== null) {
    const name = m[1].toLowerCase()
    const value = m[2] ?? m[3] ?? m[4] ?? ''
    if (!ALLOWED_ATTRS.has(name)) continue
    if (name === 'href' && !isSafeHref(value)) continue
    result += ` ${name}="${escapeAttr(value)}"`
  }
  return result
}

export function sanitizeHtml(input: string): string {
  let out = ''
  let i = 0
  const tagRe = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*)>/g
  let m: RegExpExecArray | null
  while ((m = tagRe.exec(input)) !== null) {
    out += escapeHtml(input.slice(i, m.index))
    const tagName = m[2].toLowerCase()
    const isClose = m[1] === '/'
    if (ALLOWED_TAGS.has(tagName)) {
      if (isClose) {
        out += `</${tagName}>`
      } else if (VOID_TAGS.has(tagName)) {
        out += `<${tagName}/>`
      } else {
        out += `<${tagName}${parseAttrs(m[3] || '')}>`
      }
    } else {
      out += escapeHtml(m[0])
    }
    i = m.index + m[0].length
  }
  out += escapeHtml(input.slice(i))
  return out
}
