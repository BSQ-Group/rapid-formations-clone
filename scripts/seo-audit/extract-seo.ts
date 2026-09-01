/**
 * SEO parity extraction — rapid-formations-clone vs legacy rapidformations.co.uk.
 *
 * Fetches the raw server HTML of every clone content page and its live
 * www.rapidformations.co.uk counterpart at the SAME path, then extracts the
 * full SEO head surface (title / meta description / canonical / robots / OG /
 * Twitter) plus every JSON-LD block. Output is a single machine-readable JSON
 * file that the audit MD is generated from — deterministic and reproducible.
 *
 * The clone→legacy path MAPPING is generated at runtime by matching the last
 * path segment (slug) of each legacy sitemap URL to a clone sitemap slug — the
 * clone serves flat slugs (`/business-address`) while the legacy site nests
 * (`/additional-services/business-address/`). Unmatched pages on either side
 * are recorded (legacyOnly = content gap in the clone; cloneExtra = clone-only
 * page). `port-preview-*` clone pages are internal dev pages (no legacy source).
 *
 * Run:  bun scripts/seo-audit/extract-seo.ts
 * Out:  reports/seo-audit/seo-data.json
 *
 * NOTE: WebFetch/markdown converters strip the <head> of the legacy Gatsby +
 * react-helmet SSR HTML — a raw fetch() with a browser UA is required (the
 * legacy robots.txt allows ClaudeBot). That is what this script does.
 */

const CLONE = 'https://rapid-formations-clone.vercel.app'
const ORIG = 'https://www.rapidformations.co.uk'

const CLONE_SITEMAP = `${CLONE}/pages-sitemap.xml`
const ORIG_SITEMAP = `${ORIG}/sitemap-pages.xml`

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

// Clone-only routes that are not content pages (never have a legacy source).
const CLONE_NON_CONTENT = new Set(['/search', '/posts'])
const isPreview = (p: string) => p.startsWith('/port-preview-')

interface Ld {
  raw: string
  types: string[]
  parsed: unknown
  parseError?: string
}
interface Extract {
  url: string
  finalUrl: string
  status: number
  title: string | null
  description: string | null
  canonical: string | null
  robots: string | null
  lang: string | null
  h1: string | null
  og: Record<string, string>
  twitter: Record<string, string>
  jsonLd: Ld[]
  jsonLdTypes: string[]
  error?: string
}

function decode(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/g, "'")
    .trim()
}

function attr(tag: string, name: string): string | null {
  // Handles both double- and single-quoted attribute values.
  const m =
    tag.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, 'i')) ||
    tag.match(new RegExp(`${name}\\s*=\\s*'([^']*)'`, 'i'))
  return m ? decode(m[1]) : null
}

function ldTypes(parsed: unknown): string[] {
  const out: string[] = []
  const visit = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    if (Array.isArray(node)) return node.forEach(visit)
    const obj = node as Record<string, unknown>
    if (obj['@type']) {
      const t = obj['@type']
      if (Array.isArray(t)) out.push(...(t as string[]))
      else out.push(String(t))
    }
    if (Array.isArray(obj['@graph'])) (obj['@graph'] as unknown[]).forEach(visit)
  }
  visit(parsed)
  return out
}

function extract(html: string, url: string, finalUrl: string, status: number): Extract {
  const titleM = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  const title = titleM ? decode(titleM[1]) : null

  const htmlTagM = html.match(/<html\b[^>]*>/i)
  const lang = htmlTagM ? attr(htmlTagM[0], 'lang') : null

  const h1M = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)
  const h1 = h1M ? decode(h1M[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')) : null

  const metaTags = html.match(/<meta\b[^>]*>/gi) || []
  let description: string | null = null
  let robots: string | null = null
  const og: Record<string, string> = {}
  const twitter: Record<string, string> = {}
  for (const tag of metaTags) {
    const nameA = (attr(tag, 'name') || '').toLowerCase()
    const propA = (attr(tag, 'property') || '').toLowerCase()
    const content = attr(tag, 'content')
    if (content == null) continue
    if (nameA === 'description') description = content
    else if (nameA === 'robots') robots = content
    // Legacy rapidformations emits OG as name="og:*"; Payload emits property="og:*".
    else if (propA.startsWith('og:')) og[propA] = content
    else if (nameA.startsWith('og:')) og[nameA] = content
    else if (nameA.startsWith('twitter:')) twitter[nameA] = content
    else if (propA.startsWith('twitter:')) twitter[propA] = content
  }

  const linkTags = html.match(/<link\b[^>]*>/gi) || []
  let canonical: string | null = null
  for (const tag of linkTags) {
    if ((attr(tag, 'rel') || '').toLowerCase() === 'canonical') {
      canonical = attr(tag, 'href')
      break
    }
  }

  const jsonLd: Ld[] = []
  const ldRe = /<script[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m: RegExpExecArray | null
  while ((m = ldRe.exec(html)) !== null) {
    const raw = m[1].trim()
    let parsed: unknown = null
    let parseError: string | undefined
    let types: string[] = []
    try {
      parsed = JSON.parse(raw)
      types = ldTypes(parsed)
    } catch (e) {
      parseError = (e as Error).message
    }
    jsonLd.push({ raw, types, parsed, parseError })
  }
  const jsonLdTypes = jsonLd.flatMap((l) => l.types)

  return {
    url,
    finalUrl,
    status,
    title,
    description,
    canonical,
    robots,
    lang,
    h1,
    og,
    twitter,
    jsonLd,
    jsonLdTypes,
  }
}

async function fetchExtract(url: string): Promise<Extract> {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
    const html = await res.text()
    return extract(html, url, res.url, res.status)
  } catch (e) {
    return {
      url,
      finalUrl: url,
      status: 0,
      title: null,
      description: null,
      canonical: null,
      robots: null,
      lang: null,
      h1: null,
      og: {},
      twitter: {},
      jsonLd: [],
      jsonLdTypes: [],
      error: (e as Error).message,
    }
  }
}

async function fetchSitemapPaths(url: string): Promise<string[]> {
  const res = await fetch(url, { headers: { 'User-Agent': UA }, redirect: 'follow' })
  const xml = await res.text()
  const locs = xml.match(/<loc>([^<]+)<\/loc>/gi) || []
  return locs
    .map((l) => l.replace(/<\/?loc>/gi, '').trim())
    .map((full) => {
      try {
        return new URL(full).pathname
      } catch {
        return full
      }
    })
}

// Last non-empty path segment; '' for the home page. Used to join the clone's
// flat slugs to the legacy site's nested paths.
function slugKey(path: string): string {
  const parts = path.split('/').filter(Boolean)
  return parts.length ? parts[parts.length - 1] : ''
}

async function pool<T, R>(items: T[], n: number, fn: (t: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length)
  let i = 0
  const workers = Array.from({ length: n }, async () => {
    while (i < items.length) {
      const idx = i++
      out[idx] = await fn(items[idx])
    }
  })
  await Promise.all(workers)
  return out
}

// ---- build the mapping from the two live sitemaps ----
const [origPaths, clonePathsRaw] = await Promise.all([
  fetchSitemapPaths(ORIG_SITEMAP),
  fetchSitemapPaths(CLONE_SITEMAP),
])

const clonePaths = clonePathsRaw.filter((p) => !CLONE_NON_CONTENT.has(p))
const cloneBySlug = new Map<string, string>()
for (const p of clonePaths) {
  if (isPreview(p)) continue
  const key = slugKey(p)
  if (!cloneBySlug.has(key)) cloneBySlug.set(key, p)
}

const mapping: Array<{ clone: string; orig: string }> = []
const legacyOnly: string[] = [] // legacy page with no clone slug match -> content gap
const matchedCloneSlugs = new Set<string>()
for (const orig of origPaths) {
  const key = slugKey(orig)
  const clone = cloneBySlug.get(key)
  if (clone) {
    mapping.push({ clone, orig })
    matchedCloneSlugs.add(key)
  } else {
    legacyOnly.push(orig)
  }
}

const cloneExtra = clonePaths.filter(
  (p) => !isPreview(p) && !matchedCloneSlugs.has(slugKey(p)),
) // clone content page with no legacy sitemap counterpart
const preview = clonePathsRaw.filter(isPreview)

console.log(
  `mapping: ${mapping.length} pairs | legacyOnly: ${legacyOnly.length} | cloneExtra: ${cloneExtra.length} | preview: ${preview.length}`,
)

// ---- harvest ----
const results = await pool(mapping, 6, async (row) => {
  const [clone, orig] = await Promise.all([
    fetchExtract(CLONE + row.clone),
    fetchExtract(ORIG + row.orig),
  ])
  return { clonePath: row.clone, origPath: row.orig, clone, orig }
})

const legacyOnlyData = await pool(legacyOnly, 6, async (path) => ({
  path,
  orig: await fetchExtract(ORIG + path),
}))

const cloneExtraData = await pool(cloneExtra, 6, async (path) => ({
  path,
  clone: await fetchExtract(CLONE + path),
}))

const previewData = await pool(preview, 6, async (path) => ({
  path,
  clone: await fetchExtract(CLONE + path),
}))

const payload = {
  generatedAt: process.env.AUDIT_TS || 'unstamped',
  clone: CLONE,
  orig: ORIG,
  counts: {
    mapped: results.length,
    legacyOnly: legacyOnlyData.length,
    cloneExtra: cloneExtraData.length,
    preview: previewData.length,
  },
  results,
  legacyOnly: legacyOnlyData,
  cloneExtra: cloneExtraData,
  preview: previewData,
}
await Bun.write('reports/seo-audit/seo-data.json', JSON.stringify(payload, null, 2))
console.log(
  `wrote reports/seo-audit/seo-data.json — ${results.length} mapped pairs, ${legacyOnlyData.length} legacy-only, ${cloneExtraData.length} clone-extra, ${previewData.length} preview`,
)
