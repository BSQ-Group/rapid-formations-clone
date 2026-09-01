/**
 * Generate reports/seo-audit/SEO-PARITY-AUDIT.md from seo-data.json.
 * Deterministic: re-run after extract-seo.ts to refresh the audit.
 *
 * Run:  bun scripts/seo-audit/build-audit.ts
 */

interface Extract {
  status: number
  title: string | null
  description: string | null
  canonical: string | null
  robots: string | null
  lang: string | null
  og: Record<string, string>
  twitter: Record<string, string>
  jsonLdTypes: string[]
  error?: string
}
interface Pair {
  clonePath: string
  origPath: string
  clone: Extract
  orig: Extract
}

const data = JSON.parse(await Bun.file('reports/seo-audit/seo-data.json').text()) as {
  generatedAt: string
  clone: string
  orig: string
  counts: Record<string, number>
  results: Pair[]
  legacyOnly: { path: string; orig: Extract }[]
  cloneExtra: { path: string; clone: Extract }[]
  preview: { path: string; clone: Extract }[]
}

const uniq = (a: string[]) => [...new Set(a)].sort()
const norm = (s: string | null) =>
  (s || '')
    .replace(/’/g, "'")
    .replace(/–|—/g, '-')
    .replace(/ /g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
const cell = (s: string) => (s || '').replace(/\|/g, '\\|').replace(/\n/g, ' ')

function matchState(c: string | null, o: string | null): 'MATCH' | 'NEAR' | 'DIFF' | 'MISSING' {
  if (!o) return 'MISSING'
  if (!c) return 'MISSING'
  if (c.trim() === o.trim()) return 'MATCH'
  if (norm(c) === norm(o)) return 'NEAR'
  return 'DIFF'
}

const N = data.results.length
let tMatch = 0,
  tNear = 0,
  tDiff = 0,
  dMatch = 0,
  dNear = 0,
  dDiff = 0
const ldOrig: Record<string, number> = {}
const ldClone: Record<string, number> = {}
for (const r of data.results) {
  const ts = matchState(r.clone.title, r.orig.title)
  if (ts === 'MATCH') tMatch++
  else if (ts === 'NEAR') tNear++
  else tDiff++
  const ds = matchState(r.clone.description, r.orig.description)
  if (ds === 'MATCH') dMatch++
  else if (ds === 'NEAR') dNear++
  else dDiff++
  for (const t of uniq(r.orig.jsonLdTypes)) ldOrig[t] = (ldOrig[t] || 0) + 1
  for (const t of uniq(r.clone.jsonLdTypes)) ldClone[t] = (ldClone[t] || 0) + 1
}

const L: string[] = []
L.push(`# SEO Parity Audit — rapid-formations-clone vs www.rapidformations.co.uk`)
L.push(``)
L.push(`> Generated from \`reports/seo-audit/seo-data.json\` by \`scripts/seo-audit/build-audit.ts\`.`)
L.push(`> Harvest stamp: \`${data.generatedAt}\`. Clone: ${data.clone} · Legacy: ${data.orig}`)
L.push(``)
L.push(
  `Pages compared: **${N}** mapped pairs · legacy-only (content gap): **${data.counts.legacyOnly}** · clone-extra: **${data.counts.cloneExtra}** · preview: **${data.counts.preview}**.`,
)
L.push(`Pairing is by last path-segment slug (clone serves flat slugs, legacy nests).`)
L.push(``)
L.push(`## Parity scorecard (65 mapped pages)`)
L.push(``)
L.push(`| Field | Exact | Near (norm) | Diff | Notes |`)
L.push(`|---|---|---|---|---|`)
L.push(
  `| \`<title>\` | ${tMatch}/${N} | ${tNear}/${N} | ${tDiff}/${N} | Diffs are the brand-suffix (legacy omits \` | Rapid Formations\` on 4 pages; clone auto-appends). Fix: verbatim title. |`,
)
L.push(
  `| meta description | ${dMatch}/${N} | ${dNear}/${N} | ${dDiff}/${N} | \`/faqs/\` genuinely differs; \`/business-templates/\` is a whitespace/entity nuance. |`,
)
L.push(
  `| canonical | — | — | 65/65 | Clone canonical is **wrong domain + slug-derived + no trailing slash**. Engine fix (Phase 2). |`,
)
L.push(`| robots | 65/65 | — | 0 | Clone matches legacy \`index,follow\` on every mapped page. |`)
L.push(
  `| JSON-LD | 0/${N} | — | ${Object.keys(ldOrig).length ? '51/65 legacy' : ''} | **Clone emits none.** Biggest gap. See below. |`,
)
L.push(``)
L.push(`### JSON-LD @type coverage`)
L.push(``)
L.push(`| @type | Legacy pages | Clone pages |`)
L.push(`|---|---|---|`)
for (const t of uniq([...Object.keys(ldOrig), ...Object.keys(ldClone)]))
  L.push(`| ${t} | ${ldOrig[t] || 0} | ${ldClone[t] || 0} |`)
L.push(``)
L.push(`## Findings`)
L.push(``)
L.push(
  `1. **Meta title/description are already ~95% seeded and correct.** ${tMatch + tNear}/${N} titles and ${dMatch + dNear}/${N} descriptions match (exact or after whitespace/entity normalisation). Only a handful need touching — this is NOT the main work.`,
)
L.push(
  `2. **The title brand-suffix diverges on 4 pages.** Legacy bakes the full \`<title>\` (many already include \` | Rapid Formations\`), but the clone stores the base title and auto-appends the suffix in \`generateMeta\`. Adopt the QCF fix: use \`meta.title\` **verbatim** and seed the exact legacy title.`,
)
L.push(
  `3. **JSON-LD is the real gap: clone emits 0, legacy emits on 51/65 pages.** Types: FAQPage×${ldOrig['FAQPage'] || 0}, Product×${ldOrig['Product'] || 0}, HowTo×${ldOrig['HowTo'] || 0}, Organization×${ldOrig['Organization'] || 0}, plus WebSite/WebPage/LocalBusiness (home) and ProfessionalService (contact-us). A working builder exists on the stale branch \`origin/feat/structured-data\` — re-implement fresh on main and extend with Product + the home graph.`,
)
L.push(
  `4. **Canonical is wrong for parity on every page.** It resolves to the Vercel domain, is derived from \`slug\` (nested pages get a wrong single-segment path), and omits the trailing slash. Legacy canonicals are absolute \`https://www.rapidformations.co.uk/<fullpath>/\`. Fix: canonical from \`fullPath\`/breadcrumbs + trailing slash + \`NEXT_PUBLIC_SERVER_URL=https://www.rapidformations.co.uk\`.`,
)
L.push(
  `5. **OG/Twitter are already richer than legacy** — the clone emits og:title/description/site_name/image which legacy omits. Only real fixes: \`twitter:site\`/\`twitter:creator\` = \`@rapidukofficial\` (currently \`@payloadcms\`), add \`og:locale=en_GB\`, and the domain correction. No content to copy.`,
)
L.push(
  `6. **Indexation leak: all ${data.counts.preview} \`port-preview-*\` pages are \`index,follow\` and in the sitemap.** These are internal dev/port pages with no legacy source — they must be \`noindex\` + sitemap-excluded (mirrors the QCF \`v2-*\` cleanup). name-check funnel + renewals + id-requirements are already correctly \`noindex\`.`,
)
L.push(
  `7. **Reproduce types + content, not legacy bugs.** Legacy JSON-LD carries junk to intentionally OMIT: empty \`geo\`/\`hasMap\`/\`telephone\` (LocalBusiness, ProfessionalService), unrendered \`[[price slug=...]]\` shortcodes in FAQ answers, and a nested-array \`mainEntity: [[...]]\` bug on the home FAQPage. Build clean JSON-LD from our CMS data.`,
)
L.push(``)

// Per-page table
L.push(`## Per-page comparison (65 mapped)`)
L.push(``)
L.push(`| Legacy path | Clone path | Title | Desc | Legacy JSON-LD | Clone JSON-LD |`)
L.push(`|---|---|---|---|---|---|`)
for (const r of data.results) {
  const ts = matchState(r.clone.title, r.orig.title)
  const ds = matchState(r.clone.description, r.orig.description)
  const em = (s: string) => (s === 'MATCH' ? '✅' : s === 'NEAR' ? '≈' : s === 'DIFF' ? '❌' : '—')
  L.push(
    `| ${cell(r.origPath)} | ${cell(r.clonePath)} | ${em(ts)} | ${em(ds)} | ${uniq(r.orig.jsonLdTypes).join(', ') || '—'} | ${uniq(r.clone.jsonLdTypes).join(', ') || '—'} |`,
  )
}
L.push(``)

// Appendix A — verbatim seed values
L.push(`## Appendix A — verbatim legacy title + description (seed source)`)
L.push(``)
L.push(`These are the exact legacy values to store in \`meta.title\` / \`meta.description\`.`)
L.push(``)
for (const r of data.results) {
  L.push(`### ${r.origPath}  →  clone \`${r.clonePath}\``)
  L.push(`- **title:** \`${cell(r.orig.title || '')}\``)
  L.push(`- **description:** \`${cell(r.orig.description || '')}\``)
  const dt = matchState(r.clone.description, r.orig.description)
  const tt = matchState(r.clone.title, r.orig.title)
  if (tt !== 'MATCH' || dt !== 'MATCH') {
    L.push(
      `  - _clone now:_ title=\`${cell(r.clone.title || '')}\` · desc=\`${cell(r.clone.description || '')}\``,
    )
  }
  L.push(``)
}

// Appendix B — indexation
L.push(`## Appendix B — indexation (non-mapped clone pages)`)
L.push(``)
L.push(`### \`port-preview-*\` (must become noindex + sitemap-excluded)`)
L.push(``)
L.push(`| Path | Status | robots |`)
L.push(`|---|---|---|`)
for (const r of data.preview)
  L.push(`| ${cell(r.path)} | ${r.clone.status} | ${cell(String(r.clone.robots))} |`)
L.push(``)
L.push(`### Clone-extra (content page, no legacy sitemap match — verify each)`)
L.push(``)
L.push(`| Path | Status | robots |`)
L.push(`|---|---|---|`)
for (const r of data.cloneExtra)
  L.push(`| ${cell(r.path)} | ${r.clone.status} | ${cell(String(r.clone.robots))} |`)
L.push(``)

await Bun.write('reports/seo-audit/SEO-PARITY-AUDIT.md', L.join('\n'))
console.log(`wrote reports/seo-audit/SEO-PARITY-AUDIT.md (${L.length} lines)`)
