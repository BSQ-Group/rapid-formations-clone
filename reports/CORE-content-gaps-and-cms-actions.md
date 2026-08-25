# Content gaps and CMS actions — measured 2026-08-25

Everything below was measured live-vs-clone in headless Chromium at DPR 1, both sides in the
same browser mode. None of it is code-fixable; each item needs a CMS edit or a Linear action.

---

## A. NEW — 9 live pages return 404 on the clone

Swept all 65 URLs in live's `sitemap-pages.xml` against the clone and compared HTTP status:

| Path | live | clone |
|---|---|---|
| `/about-us` | 200 | **404** |
| `/business-banking` | 200 | **404** |
| `/business-templates` | 200 | **404** |
| `/customer-reviews` | 200 | **404** |
| `/entrepreneur-scholarship-programme` | 200 | **404** |
| `/hassle-free-compliance` | 200 | **404** |
| `/videos` | 200 | **404** |
| `/faqs/limited-by-guarantee` | 200 | **404** |
| `/faqs/limited-by-shares` | 200 | **404** |

All 9 are **absent from the clone's own sitemap** (100 pages), so the page records do not exist —
this is not a routing bug. `/faqs/limited-by-shares` alone carries **24** FAQ questions on live,
`/faqs/limited-by-guarantee` **27**.

**This has already generated false bug reports.** CORE-7030 ("FAQ phone number is not a tel link")
and CORE-7017 ("FAQ answers render raw shortcodes") both fail to reproduce on any page the clone
serves — the phone is a correct `tel:+442078719990` link and 0 of 100 pages render a raw shortcode.
Live uses `[[telephone]]` on 4 FAQ pages; the clone serves 2 of them correctly and **404s on the
other two**, which is what a tester would have seen.

**Action:** create the 9 page records. Re-point CORE-7030 here; close CORE-7017.

---

## B. NEW — `/terms-and-conditions` renders list items as paragraphs

Visible-element counts, excluding header/footer/nav and any consent widget:

| | live | clone | Δ |
|---|---|---|---|
| `<li>` | 526 | 191 | **−335** |
| `<p>` | 28 | 394 | **+366** |
| `<ol>` | 30 | 4 | −26 |
| `<ul>` | 72 | 32 | −40 |
| `<h2>` / `<h3>` | 3 / 40 | 3 / 40 | 0 |

Word count is nearly identical (~19.4k vs ~19.8k), so the **text is present but the markup is
flattened** — roughly 335 list items became paragraphs on import. Headings are unaffected.

**Scope is this page only.** `/privacy-policy` (Δli +13), `/cookies-policy` (Δli 0) and
`/id-requirements` (Δli 0) all match live.

> Measurement note: an earlier pass reported this defect across all 8 legal pages. That was wrong.
> Live serves no `<main>` element, so scoping to `main` measured live's `<body>` — including
> Cookiebot's ~125-row cookie table — against the clone's `main`. Excluding consent widgets and
> counting only visible elements confines the defect to `/terms-and-conditions`.

**Action:** re-import the `/terms-and-conditions` body with list structure preserved.

---

## C. CORE-7159 / CORE-6999 — content-to-footer gap on 8 legal pages

`G_struct` = last section's content-box bottom → `<footer>` top.

| viewport | live | clone | Δ |
|---|---|---|---|
| 1800 | 130 | 116 | **−14** (tighter) |
| 1440 | 95 | 100 | +5 (looser) |
| 1024 | 95 | 100 | +5 (looser) |
| 768 | 50 | 64 | +14 (looser) |
| 360 | 50 | 56 | +6 (looser) |

Reproduced independently. The ticket's "20px tighter" is real but specific: `/privacy-policy` @1800
measures **−22px** by `G_ink` (live 138 / clone 116). The other 7 pages are
−14 there. Below 1590 the clone is **looser**, not tighter, so the "SHARED / tighter" framing is
mis-scoped — it is 8 legal pages of 92, and CORE-7159 is the correctly scoped version.

### Cause and fix

The clone puts the spacing in `paddingBottom: 'l'` (`--section-spacing-l` → 56/64/80/96px); live
uses a section **margin** — measured on live at `110 / 75 / 75 / 50 / 50`, which is exactly the
repo's existing `gap: 'section'` token:

```
mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]
```

`TextContent` passes `{...sectionLayout}` through unchanged and the code default is
`paddingBottom: 'm'`, so `'l'` is set on the CMS record — out of code's reach.

**Action (CMS):** on the **final `textContent` block** of each page below, set
`paddingBottom` → `none` and `gap` → `section`.

Verified by simulating exactly those computed values and re-measuring — **5/5 match live**:

```
@1800  gStruct=130 (mb=110 pb=0)  live=130  MATCH
@1440  gStruct=95  (mb=75  pb=0)  live=95   MATCH
@1024  gStruct=95  (mb=75  pb=0)  live=95   MATCH
@768   gStruct=50  (mb=50  pb=0)  live=50   MATCH
@360   gStruct=50  (mb=50  pb=0)  live=50   MATCH
```

Pages: `/privacy-policy`, `/terms-and-conditions`, `/cookies-policy`, `/environmental-policy`,
`/refund-cancellation-policy`, `/whistleblowing-grievance-mechanism-policy`, `/id-requirements`,
`/complaints-procedure`.

### Residual −8px, deliberately not fixed

`/privacy-policy`'s trailing `<ol>` has `margin-bottom: 8px` on live and `0` in the clone
(`bulletListsBase` sets `[&_ol]:!mb-0`). **Do not blanket-change that constant:** live's list
margins differ per variant — 8px on policy/cookies, 16px on terms/id-requirements — and live is
inconsistent even within `/privacy-policy` (both `mt8/mb8` and `mt8/mb0`). Changing the shared
constant is the trap that nearly broke 3 policy pages on CORE-7110. Needs a variant-scoped fix.

---

## D. CORE-7112 — `/id-requirements` uses the wrong `TextContent` variant

Renders with `standard`; live is `pageSections`. Simulating the variant's computed values fixes
all seven measured differences:

| property | live | clone (`standard`) | `pageSections` |
|---|---|---|---|
| `h3` font-size | 21px | 20.8px | **21px** |
| `h3` line-height | 25.935px | 31.2px | **25.935px** |
| `h3` margin-top | 0 | 16 | **0** |
| `h3` margin-bottom | 8 | 12 | **8** |
| `ol > li` marker | decimal | **lower-latin** | **decimal** |
| `ul li` margin-bottom | 0 | 10 | **0** |
| `ul li` padding-left | 0 | 10 | **0** |

**Action (CMS):** page `/id-requirements` → block `textContent` → `variant` → `pageSections`.
This page needs **two** edits — this one and item C.

Two gaps survive the flip and are structural, not typographic: paragraph→`h3` rhythm is 30px on
live vs 16px, and the post-`<ol>` gap is 46px vs 8px. Live wraps each Q&A in its own `div` with
`margin-bottom: 30px`; the clone renders one flat rich-text field. Either author the page as 6
separate `textContent` blocks the way live does, or extend a variant — no existing variant yields
30px (`policy` is closest at 24px).

---

## E. CORE-6965 — image resolution is CMS media, not code

**0 of 86** under-resolution images were `next/image` under-requesting; every one was already
served at its full master width. 137 of 223 are already ≥1.9×, and 62 of the soft ones are
byte-for-byte identically soft on live.

**Action (CMS):** re-upload 9 assets — 8 bank logos (clone masters 64×64, live 116×116) and
`john-warbuton.webp` (clone 400×400, live 800×800). Re-scope the ticket off SITEWIDE.

---

## F. CORE-7041 — question column matches; a banner variant does not

The FAQ question text column is pixel-identical to live at 390/768/1440 on both a dedicated FAQ
page and a service-page FAQ section — button `1170/51.4`, title widths
`247.4 / 252.1 / 342.6 / 378.6 / 141.8`, icon `40 @1265`. **Close as not-a-defect.**

Separately, 3 of 23 FAQ pages start their first question **16px too high** —
`/faqs/after-company-formation`, `/faqs/basics`, `/faqs/company-secretary` (live 574, clone 558;
the other 20 are 573). Cause: `TitleBanner` only emits the `pb-[15px]` that live carries as a
15px section margin when its `variant` is `imageContained`; on those 3 records it is not. The
banner still *looks* right because the asset happens to be 1170px wide, so the only symptom is the
missing 15px.

**Action (CMS):** set the `TitleBanner` `variant` to `imageContained` on those 3 pages. Note a
code-side `mb-[15px]` would be a **no-op** here — it would collapse against the list's own 20px
margin and change nothing.

---

## G. Tickets to close

| Ticket | Reason |
|---|---|
| CORE-7017 | Not reproducible — 0 of 100 pages render a raw shortcode |
| CORE-7030 | Phone is a correct `tel:` link wherever the clone serves the page; re-point at item A |
| CORE-7041 | Question column matches live exactly; the real issue is item F |
| CORE-7108 | Clone renders **100%** of visible text in Myriad; live only 94.4%. Base `font-family` differs but every visible element overrides it |
| CORE-6999 | Superseded by CORE-7159, which carries the correct scope |
