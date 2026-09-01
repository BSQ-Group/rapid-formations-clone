# SEO Replication Plan — rapid-formations-clone → www.rapidformations.co.uk

Derived from `SEO-PARITY-AUDIT.md` (harvest in `seo-data.json`). Goal: every clone page
emits the same SEO surface as the legacy page at the matching path, for the **65 main-site
pages**. Canonical/OG base = `https://www.rapidformations.co.uk` (locked decision). Seeding =
tooling + dry-run only; the user triggers live prod writes.

## Reality check from the harvest (re-prioritised)
- **Meta title/description ≈ done** (61/65 title exact, 64/65 desc exact/near). Small fixes only.
- **JSON-LD is the work**: clone 0/65, legacy 51/65. This is Phases 2–3 and the bulk of effort.
- **OG/Twitter already rich**: only the twitter handle, `og:locale`, and domain need fixing.
- **Indexation leak**: 45 `port-preview-*` pages are indexable + in the sitemap.

---

## Phase 1 — Meta fixes (content, dry-run seed)  ·  small
The engine already appends ` | Rapid Formations`; switch to **verbatim title** (Phase 2) and
seed the exact legacy `<title>` so all 65 match. Concretely:
- Re-seed `meta.title` = legacy `<title>` **verbatim** for all 65 (Appendix A of the audit).
  After the verbatim-title engine change, the 4 suffix diffs and everything else become exact.
- Fix `meta.description` on **`/faqs/`** (clone has a generic string; legacy = "Rapid Formations'
  comprehensive FAQ section provides answers to your company formation queries. Call 0800 107 7771
  for more help and advice.") and re-seed **`/business-templates/`** (whitespace/entity nuance).
- Mechanism: `scripts/seed-rapid-meta.ts` (port of QCF `seed-qcf-meta.ts`) reads `seo-data.json`,
  maps legacy path → clone page via slug, `payload.update({ collection:'pages', data:{ meta } })`
  under `scripts/lib/withPageLock.ts`. DRY-RUN default; `--live` writes. Local API needs `.env`
  (`MONGODB_URI`, `PAYLOAD_SECRET`) + node_modules in the worktree.

## Phase 2 — Engine fixes (code PR)  ·  small, high-leverage
`src/utilities/generateMeta.ts`:
- **Title verbatim** — `title = doc.meta.title || doc.title` (drop the ` | ${siteName}` append).
  Fallback to `siteName` only when both are empty. (QCF T416 precedent.)
- **Canonical from `fullPath`/breadcrumbs, not slug** — use `doc.fullPath` (already computed by
  `populateFullPath`, hidden field) or `breadcrumbs.at(-1).url`; force a single leading + trailing
  slash; `home` → `/`.
- **Trailing slash** on canonical + `og:url`.
- **Per-page Twitter** — emit `twitter:card/title/description/image`; **`twitter:site` +
  `twitter:creator` = `@rapidukofficial`** (remove `@payloadcms` from `layout.tsx`).
- **`og:locale=en_GB`** in `mergeOpenGraph`.
`next.config.ts`: **`trailingSlash: true`**.
Sitemap route (`(sitemaps)/pages-sitemap.xml/route.ts`): emit **`fullPath` with trailing slash**
consistently; drop `port-preview-*` and `meta.noindex` pages.
Env: **`NEXT_PUBLIC_SERVER_URL=https://www.rapidformations.co.uk`** so canonical/OG/JSON-LD `url`s
resolve to the destination domain.
Branded OG: keep `/api/media/file/rf-share.png` (already a real 880×440 share image ≈ legacy).

## Phase 3 — JSON-LD engine (code PR)  ·  THE main build
Re-implement fresh on `main` (the `origin/feat/structured-data` branch forks from the first commit
— salvage its `flattenLexical` / block-extraction logic, discard the branch). New
`src/components/StructuredData/` with a `JsonLd.tsx` emitter and per-type builders, wired into
`[...slug]/page.tsx`. Emit only from **rendered** blocks (dedup — QCF #450). Add a `RAPID_ORG`
constants module (`src/lib/rapid-org.ts`) holding the singletons below.

**Per-page emission (target counts in parens):**
- **Organization** (home + `/about-us/`) — from `RAPID_ORG`. On `/about-us/` add
  `founders:[{"@type":"Person","name":"Graeme Donnelly"}]` and `url` = the about-us URL.
  ⚠️ confirm founder attribution with the client before shipping.
- **WebSite** (home) — `{url, name}`.
- **LocalBusiness** (home) — name/url/image/description/address. **Omit** legacy's empty
  `geo`/`hasMap`/`telephone`.
- **WebPage** (home) — `headline` + `about:[{Thing "company formation", sameAs wikipedia}]`.
- **HowTo** (home + `/help-centre/online-admin-portal/` + `/help-centre/steps-to-forming-a-company/`,
  =3) — from the page's 4-steps block (`fourSteps`/order-steps). `name`, `description`, `image`,
  `step[]` with `name/text/image/url`.
- **ProfessionalService** (`/contact-us/`, =1) — LocalBusiness subtype; name/url/telephone/address.
  Omit empty `image`/`@id`/`geo`.
- **Product** (21 package + priced-service pages) — `brand:{Brand "Rapid Formations"}`, `name`,
  `description`, `image`, `offers[].priceSpecification` (`UnitPriceSpecification`, `price`,
  `priceCurrency:"GBP"`). Prices/images from CMS (`Packages`/`Products`/`BuyServices`), NOT the
  unrendered `[[price]]` shortcodes. New `productSchema` CMS field OR derive from the page's
  package/service block. (Basic package legacy price = 2.99; Business Address = 89.00.)
- **FAQPage** (48 pages) — `mainEntity[]` of `Question`/`acceptedAnswer(Answer.text)` built from
  the page's **rendered** FAQ block(s). Flatten Lexical → text/HTML. **Flat array** (fix legacy's
  nested-array bug). This is the highest-volume builder — the FAQ topic pages + service/package
  pages with an FAQ section + home + compare-packages all carry one.

### `RAPID_ORG` constants (from legacy homepage Organization)
```
name:        "Rapid Formations"
url:         "https://www.rapidformations.co.uk/"
logo:        <our hosted logo, e.g. getServerSideURL()+brand.logoPath>   // legacy uses a CloudFront URL; use our own asset
foundingDate:"2013"
address:     { streetAddress:"71-75 Shelton Street, Covent Garden", addressLocality:"London",
               postalCode:"WC2H 9JQ", addressRegion:"Greater London", addressCountry:"GB" }
contactPoint:{ telephone:"+442078719990", contactType:"Customer Support", areaServed:"GB",
               availableLanguage:["English"] }
sameAs:      [ facebook.com/rapidformations/, x.com/RapidUKOfficial,
               linkedin.com/company/rapid-formations/, instagram.com/rapidformationsofficial/,
               uk.trustpilot.com/review/www.rapidformations.co.uk ]
knowsAbout:  [ "Company Formation","Company Registration","Business Registration",
               "Companies House Filing","Corporate Compliance","Business Address Services",
               "Call Handling Services" ]
award:       "Certified B Corporation"
hasCredential: { @type:"EducationalOccupationalCredential", credentialCategory:"Certification",
                 name:"Certified B Corporation", description:"…B Lab…",
                 url:"https://www.bcorporation.net/en-us/find-a-b-corp/company/bsq-group/" }
```

## Phase 4 — Indexation hygiene + verify (code + QA)
- **`noindex` + sitemap-exclude all `port-preview-*` pages** (45). Prefer a route/collection rule
  (slug prefix `port-preview-`) over per-page flags so new port-previews are covered automatically.
- Verify the 4 indexable clone-extra pages (`company-address-guide`, `go-digital`,
  `required-information`, `business-telephone`) — confirm they exist on legacy (different path) or
  should be `noindex`.
- **Verify by re-harvest + diff**: re-run `extract-seo.ts` + `build-audit.ts` against the branch
  preview; target scorecard all-green and JSON-LD @type parity per page. Port `seo-parity-qa.ts`
  for the field-level match table (widen its OG parsing to `name="og:"`).
- Integration tests mirroring `tests/int/seo-*.int.spec.ts`: canonical-from-fullPath, verbatim
  title, per-type JSON-LD shape, noindex for `port-preview-*`.

## Reusable assets (from quality-company-formations-clone)
`scripts/seo-audit/extract-seo.ts` (ported ✅, runtime slug-mapping), `build-audit.ts` (new ✅),
`seo-parity-qa.ts` (to port), `seed-qcf-meta.ts` + `scripts/lib/withPageLock.ts` (to port).

## Deliverables order
Phase 2 (engine) → Phase 3 (JSON-LD) as one or two PRs (both pure code, verifiable on preview),
then Phase 1 meta dry-run + Phase 4 hygiene. Meta re-seed is trivial once the verbatim-title
engine change lands.
