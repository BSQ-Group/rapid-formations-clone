# SEO Parity — Implementation Status

Branch: `seo/parity-audit-rapidformations`. Target: byte-parity with the 65 main-site
pages of `www.rapidformations.co.uk`. Verified offline against real clone page data +
unit tests (no local build possible — dead FA-Pro token + no local DB; final check is the
Vercel preview).

## Done & verified

**Phase 0 — Harvest & audit** (`scripts/seo-audit/*`, `reports/seo-audit/*`)
- `extract-seo.ts` harvests both sites (runtime slug-mapping) → `seo-data.json`. 65/65 legacy
  pages matched a clone page — **0 content gaps**.
- `build-audit.ts` → `SEO-PARITY-AUDIT.md`. `gen-products.ts` → `src/lib/rapid-products.ts`.

**Phase 2 — Engine fixes** (code)
- `generateMeta.ts`: verbatim title (no suffix append); canonical + `og:url` from nested
  `fullPath` with trailing slash; per-page Twitter (`@rapidukofficial`); `port-preview-*` → noindex.
- `mergeOpenGraph.ts`: `og:locale=en_GB`. `layout.tsx`: Twitter handle (was `@payloadcms`).
- `next.config.ts`: `trailingSlash: true`. `brand.ts`: `twitterHandle` + `locale` fields.
- Sitemap route: emits nested `fullPath` + trailing slash; excludes `port-preview-*` + noindex.
- New shared helper `src/utilities/getPagePath.ts`.
- Offline-verified: canonical `/additional-services/business-address/`, title verbatim, `en_GB`, `@rapidukofficial`.

**Phase 3 — JSON-LD engine** (`src/components/StructuredData/*`, `src/lib/rapid-org.ts`, `src/lib/rapid-products.ts`)
- Builders: Organization (home + about-us with `founders: Graeme Donnelly`), LocalBusiness,
  WebSite, WebPage, ProfessionalService, HowTo, FAQPage, Product.
- Extractors read rendered blocks: FAQ (`faqs`, all blocks), HowTo (`fourSteps` / `stepsItems` /
  `onlineAdminPortal`), with Lexical→text flattening. Product from the harvested map.
- Emitted from `[...slug]/page.tsx` off the shortcode-resolved blocks.
- **Verified against real page data: 64/65 pages emit exactly the legacy @type set.**
  home = Organization, LocalBusiness, WebSite, WebPage, HowTo, FAQPage(17); package/service pages
  = FAQPage + Product; FAQ topic pages = FAQPage; help-centre = HowTo.

**Phase 1 — Meta seed** (`scripts/seed-rapid-meta.ts`, dry-run only)
- Dry-run: 61 pages need `meta.title` set to the verbatim legacy title (add ` | Rapid Formations`
  suffix), + the `/faqs/` description fix; 4 already correct. Live path uses Payload Local API + per-page lock.

**Tests** — `tests/int/seo-structured-data.int.spec.ts` (16 tests, all pass; full int suite 39/39).

## Known gaps / follow-ups (not engine bugs)
- **contact-us FAQPage** — the clone's contact-us page has no `faqs` block, so no FAQPage
  (legacy has one). Add the FAQ content in the CMS (a `faqs` block); the engine will then emit it.
  Fabricating FAQ JSON-LD for content not visible on the page would violate Google's guidelines.
- **4 indexable clone-extra pages** (`company-address-guide`, `go-digital`, `required-information`,
  `business-telephone`) have no legacy sitemap match — confirm they exist on legacy (different path)
  or should be `noindex`.
- **Product images** are legacy CloudFront URLs (copied verbatim). Consider rehosting on our media
  before the legacy CDN is decommissioned.

## Deployment sequence (IMPORTANT — shared prod/preview Mongo)
The `meta.title` seed and the verbatim-title engine change are coupled, and prod + preview share
one DB. Order:
1. Set Vercel env **`NEXT_PUBLIC_SERVER_URL=https://www.rapidformations.co.uk`** (canonical/OG/JSON-LD domain).
2. Merge + deploy this branch to prod (verbatim-title engine live).
3. THEN run `bun scripts/seed-rapid-meta.ts --live` and redeploy.
   Running the seed before step 2 would make `main`'s still-appending engine double-suffix titles.
