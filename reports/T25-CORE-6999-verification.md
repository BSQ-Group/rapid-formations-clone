# CORE-6999 — "final content to footer gap is 20px tighter than live at …"

**Verdict: the ticket's premise is materially wrong.** The gap is not 20px tighter, it is not tighter at
most breakpoints, and it does not affect "SHARED" / all pages. It affects **8 legal/policy pages out of
92**, and on those the clone is **14px tighter at ≥1590px only** — at 1440, 1024, 768 and 360 the clone is
**looser** (+5, +5, +14, +6). The single "≈20px" number in the title is reproducible on exactly one page
(`/privacy-policy` @1800 = −22px), and 8 of those 22 pixels come from an unrelated rich-text defect.

A **second, larger, opposite-signed divergence** (+30 … +90px, clone looser) was found on 4 other pages and
is described in Finding 2. It is not what CORE-6999 describes.

---

## 1. Method

- Headed Chromium (`headless:false`) via `/Users/eugeniucozac/bsqgroup/rf-7007/node_modules/@playwright/test/index.mjs`.
- Cookiebot dismissed via `#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll` /
  `#CybotCookiebotDialogBodyButtonAccept` on both sites; then every `position:fixed|sticky` element with
  `z-index > 10` and non-zero area was force-hidden, re-run after **every** viewport change.
- Whole page scrolled top→bottom in ~0.7×viewport steps (90ms cadence), then `img.decode()` awaited on every
  image, then a 700ms settle, before measuring. Re-done at every viewport.
- Viewports 1800 / 1440 / 1024 / 768 / 360, all at DPR 1.

### Measurement definitions (both reported — they answer different questions)

| Name | Definition |
|---|---|
| **G_struct** | Bottom of the **last section's content box** (i.e. section border-box bottom − section `padding-bottom`) → `top` of `<footer>`. Equals `section padding-bottom + section margin-bottom + main/wrapper padding-bottom`. This is the structural spacing the CMS controls. |
| **G_ink** | Bottom of the **last element that actually paints text or is a replaced element** → `top` of `<footer>`. This is what a human eyeballs, but it is contaminated by the last paragraph/list's own trailing margin, which differs per page. |

`G_struct` is the primary number: it is identical across every page of a given template on live
(130/95/95/50/50), so it isolates the defect from rich-text noise. Both are given below.

**Why the raw border-box bottoms are not directly comparable:** live puts the spacing in the section's
`margin-bottom` (border-box ends 130px above the footer); the clone puts it in the section's
`padding-bottom` (border-box ends only 20px above the footer). The section is white on both sites and
everything behind it is white on both sites (verified: live section `rgb(255,255,255)`, its ancestor
`div.Layouts--app` `rgb(255,255,255)`; clone section `rgb(255,255,255)`, `body`/`html` `rgb(255,255,255)`),
so margin vs padding is **visually indistinguishable here** — only the total distance matters.

---

## 2. Results table

`G_struct` in px. Δ = clone − live (negative = clone tighter).

### 2a. Pages that MATCH (no defect)

| Clone URL | Live URL | 1800 | 1440 | 1024 | 768 | 360 | Δ | Verdict |
|---|---|---|---|---|---|---|---|---|
| `/` | `/` | 160 / 160 | 160 / 160 | 160 / 160 | 140 / 140 | 70 / 70 | 0 | **MATCH** |
| `/all-inclusive-package` | `/package/all-inclusive-package/` | 130 / 130 | 95 / 95 | 95 / 95 | 50 / 50 | 50 / 50 | 0 | **MATCH** |
| `/london-registered-office` | `/additional-services/london-registered-office/` | 130 / 130 | 95 / 95 | 95 / 95 | 50 / 50 | 50 / 50 | 0 | **MATCH** |
| `/faqs/vat` | `/faqs/vat/` | 130 / 130 | 95 / 95 | 95 / 95 | 50 / 50 | 50 / 50 | 0 | **MATCH** |
| `/contact-us` | `/contact-us/` | 130 / 130 | 95 / 95 | 95 / 95 | 50 / 50 | 50 / 50 | 0 | **MATCH** |
| `/a-z-glossary-of-terms` | `/help-centre/a-z-glossary-of-terms/` | 130 / 130 | 95 / 95 | 95 / 95 | 50 / 50 | 50 / 50 | 0 | **MATCH** |
| `/site-map` | `/site-map/` | 130 / 130 | 95 / 95 | 95 / 95 | 50 / 50 | 50 / 50 | 0 | **MATCH** |
| `/renewals` | `/renewals/` | 130 / 130 | 95 / 95 | 95 / 95 | 50 / 50 | 50 / 50 | 0 | **MATCH** |
| `/name-check-basic-package` | `/name-check-basic-package/` | G_ink 106 / 106 | 106 / 106 | 106 / 106 | 86 / 86 | 101 / 101 | 0 | **MATCH** ¹ |

¹ live's trailing section paints no box on this template, so only `G_ink` is comparable — it matches exactly.

### 2b. FINDING 1 — the 8 legal/policy pages (this is CORE-6999)

Live is **identical on all 8**: 130 / 95 / 95 / 50 / 50.
Clone is **identical on all 8**: 116 / 100 / 100 / 64 / 56.

| Viewport | live G_struct | clone G_struct | **Δ** | Verdict |
|---|---|---|---|---|
| 1800 | 130 | 116 | **−14** (clone tighter) | **DIVERGES** |
| 1440 | 95 | 100 | **+5** (clone looser) | **DIVERGES** |
| 1024 | 95 | 100 | **+5** (clone looser) | **DIVERGES** |
| 768 | 50 | 64 | **+14** (clone looser) | **DIVERGES** |
| 360 | 50 | 56 | **+6** (clone looser) | **DIVERGES** |

Affected pages (clone path → live path), all measured, all identical numbers:

| Clone URL | Live URL |
|---|---|
| `/privacy-policy` | `/privacy-policy/` |
| `/terms-and-conditions` | `/terms-and-conditions/` |
| `/cookies-policy` | `/cookies-policy/` |
| `/environmental-policy` | `/environmental-policy/` |
| `/refund-cancellation-policy` | `/refund-cancellation-policy/` |
| `/whistleblowing-grievance-mechanism-policy` | `/whistleblowing-grievance-mechanism-policy/` |
| `/id-requirements` | `/id-requirements/` |
| `/complaints-procedure` | `/terms-and-conditions/complaints-procedure/` |

`G_ink` on the same 8 pages (live / clone), showing the rich-text contamination that makes the
"eyeballed" number vary per page:

| Page | 1800 | 1440 | 1024 | 768 | 360 |
|---|---|---|---|---|---|
| privacy-policy | 138 / 116 = **−22** | 103 / 100 = −3 | 103 / 100 = −3 | 58 / 64 = +6 | 58 / 56 = −2 |
| terms-and-conditions | 146 / 132 = −14 | 111 / 116 = +5 | 111 / 116 = +5 | 66 / 80 = +14 | 66 / 72 = +6 |
| cookies-policy | 130 / 116 = −14 | 95 / 100 = +5 | 95 / 100 = +5 | 50 / 64 = +14 | 50 / 56 = +6 |
| environmental-policy | 130 / 116 = −14 | 95 / 100 = +5 | 95 / 100 = +5 | 50 / 64 = +14 | 50 / 56 = +6 |
| id-requirements | 130 / 116 = −14 | 95 / 100 = +5 | 95 / 100 = +5 | 50 / 64 = +14 | 50 / 56 = +6 |
| complaints-procedure | 130 / 116 = −14 | 95 / 100 = +5 | 95 / 100 = +5 | 50 / 64 = +14 | 50 / 56 = +6 |
| refund-cancellation-policy | 132.5 / 128.5 = −4 | 97.5 / 112.5 = +15 | 97.5 / 112.5 = +15 | 52.5 / 76.5 = +24 | 52.5 / 68.5 = +16 |
| whistleblowing-…-policy | 130 / 128 = −2 | 95 / 112 = +17 | 95 / 112 = +17 | 50 / 76 = +26 | 50 / 68 = +18 |

**The "20px" in the ticket title is `/privacy-policy` @1800 (−22px), and only there.** It is
−14 structural + −8 from a separate `<ol>` margin defect (Finding 3). Every other page in the set is
−14 at 1800.

---

## 3. Ancestor-chain breakdown (`/privacy-policy` @1800) — where the pixels come from

Absolute document Y values.

### LIVE — https://www.rapidformations.co.uk/privacy-policy/ · footer top **Y = 15388.4**

| # | Element | display | bottom Y | margin-top | margin-bottom | padding-top | padding-bottom |
|---|---|---|---|---|---|---|---|
| 1 | `li` (last text) | list-item | 15250.4 | 0 | 0 | 0 | 10px |
| 2 | `ol.Markdown--markdownList___ordered` | block | 15250.4 | 8px | **8px** | 0 | 0 |
| 3 | `div.PageSections--pageSections__section` | block | 15258.4 | 0 | 0 | 0 | 0 |
| 4 | `div.PageSections--pageSections` | **flex / column** | 15258.4 | 0 | 0 | 0 | 0 |
| 5 | `section.Section--section___white` | **flex / column** | 15258.4 | 0 | **110px** ← | 0 | **0** |
| 6 | `div.Wrapper--wrapper__content.index--terms` | flex / column | 15388.4 | 0 | 0 | 20px | **20px** ← |
| 7 | `div.Wrapper--wrapper__container` | block | 15388.4 | 0 | 0 | 0 | 0 |
| 8 | `div.Layouts--app` → `#gatsby-focus-wrapper` → `#___gatsby` → `body` | block | 16578.27 | 0 | 0 | 0 | 0 |

`15258.4 + 110 (§5 margin-bottom) + 20 (§6 padding-bottom) = 15388.4` = footer top. **G_struct = 130.**
`15250.4 → 15388.4` = **G_ink = 138** (the extra 8 is §2's `margin-bottom`).

### CLONE — https://rapid-formations-clone.vercel.app/privacy-policy · footer top **Y = 15631.05**

| # | Element | display | bottom Y | margin-top | margin-bottom | padding-top | padding-bottom |
|---|---|---|---|---|---|---|---|
| 1 | `li` (last text) | list-item | 15515.05 | 0 | 0 | 0 | 10px |
| 2 | `ol.list-number` | block | 15515.05 | 8px | **0px** ← *(live: 8px)* | 0 | 0 |
| 3 | `div.payload-richtext…` | block | 15515.05 | 0 | 0 | 0 | 0 |
| 4 | `div.mx-auto.w-full.max-w-[1230px]…` (Container) | block | 15515.05 | 0 | 0 | 0 | 0 |
| 5 | `section.pt-0.pb-[var(--section-spacing-l)]…` | block | 15611.05 | 0 | **0px** ← | 0 | **96px** ← |
| 6 | `main.min-[1023px]:pb-5` | block | 15631.05 | 0 | 0 | 0 | **20px** |
| 7 | `body` | **flex / column** | 16820.59 | 0 | 0 | 0 | 0 |

`15515.05 + 96 (§5 padding-bottom) + 20 (§6 padding-bottom) = 15631.05` = footer top. **G_struct = 116.**
`15515.05 → 15631.05` = **G_ink = 116** (§2 contributes 0 instead of live's 8).

### The responsible box

**Row 5 — the last `<section>`'s own bottom spacing.** Everything else is identical between the two sites
(`main`'s `pb-5` = 20px correctly reproduces live's wrapper `padding-bottom: 20px`; row 6/7 contribute the
same on both).

- **Live** supplies it as `margin-bottom`, responsive **110 / 75 / 75 / 50 / 50** px.
- **Clone** supplies it as `padding-bottom: var(--section-spacing-l)`, responsive **96 / 80 / 80 / 64 / 56** px
  (`src/app/(frontend)/globals.css:63,79,89,100` → 56px base, 64px @768, 80px @1024, 96px @1590).

`--section-spacing-l` is a **design-system token scale** that was never meant to reproduce the source's
section rhythm. The clone already owns the correct source-matching scale — `SectionWrapper`'s
`gap: 'section'` → `mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]`, i.e. exactly
110/75/75/50/50 — and **84 of the 92 clone pages already use it and match live to 0px.**

---

## 4. Exact source location and the class at fault

**File:** `/Users/eugeniucozac/bsqgroup/rf-ctl/src/blocks/TextContent/config.ts` **lines 44–47**

```ts
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'l' },
    }),
```

- **Property at fault:** `paddingBottom: 'l'` (and the absent `gap`, which therefore defaults to `'inherit'`).
- **Tailwind class it renders:** `pb-[var(--section-spacing-l)]` — from
  `/Users/eugeniucozac/bsqgroup/rf-ctl/src/components/shared/SectionWrapper/SectionWrapper.styles.ts:43`.
- **Class it should render:** `pb-0` + `mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]` —
  `SectionWrapper.styles.ts:18` (`responsiveGap.section`), reached via `gap: 'section'`.

### This is CMS **data**, seeded by that default — the code change alone fixes nothing

Queried live from the clone's Payload REST API. All 8 pages' **last** block is `textContent` with byte-identical
stored layout:

```json
{"background": "light", "paddingTop": "none", "paddingBottom": "l", "gap": "inherit"}
```

That is the `config.ts` default verbatim — nobody ever set these. Contrast with the **9 mid-page**
`textContent` instances, every one of which was deliberately set to the house pattern:

| Page | position | paddingBottom | gap |
|---|---|---|---|
| all-inclusive-package ×2, basic-package ×2, privacy-package ×2 | mid | `none` | `xl`, `xs` |
| contact-us | mid | `none` | `sm` |
| renewals ×2 | mid | `none` | `inherit`, `sm` |
| **the 8 legal pages** | **LAST** | **`l`** | **`inherit`** |

Payload applies `defaultValue` only at document **creation**, so editing `config.ts` will not move a single
pixel on the 8 existing pages. **The fix is two parts.**

---

## 5. Proposed patch — NOT APPLIED

### Part 1 — stop seeding the wrong value (code)

```diff
--- a/src/blocks/TextContent/config.ts
+++ b/src/blocks/TextContent/config.ts
@@ -43,7 +43,11 @@ export const TextContent: Block = {
     },
     sectionLayoutField({
       gap: true,
-      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'l' },
+      // Source spacing below a Text Content section is the Gatsby `Section`
+      // margin (110/75/75/50/50), not a design-token padding scale. `gap:
+      // 'section'` reproduces it exactly; `--section-spacing-l` (96/80/80/64/56)
+      // does not. Matches the 84 other clone pages. See CORE-6999.
+      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
     }),
   ],
 }
```

`src/blocks/LegalContent/config.ts:87` carries the same latent `paddingBottom: 'l'`. **It has zero instances
in the CMS today** (verified across all 102 pages), so it is not a live defect — but it should get the same
treatment to stop the bug re-entering.

### Part 2 — correct the 8 existing documents (data; required for any visible change)

For each of the 8 pages, set the **last** `textContent` block's `sectionLayout` to:

```diff
- { "background": "light", "paddingTop": "none", "paddingBottom": "l",    "gap": "inherit" }
+ { "background": "light", "paddingTop": "none", "paddingBottom": "none", "gap": "section" }
```

Pages: `privacy-policy`, `terms-and-conditions`, `cookies-policy`, `environmental-policy`,
`refund-cancellation-policy`, `whistleblowing-grievance-mechanism-policy`, `id-requirements`,
`complaints-procedure`.

Only the **last** block on each page. The 9 mid-page `textContent` instances must be left untouched — they
are already correct and their gaps are per-page CMS values (`xl`, `xs`, `sm`, `inherit`).

### Margin vs padding — explicit reasoning (CORE-7010 trap)

The fix puts the spacing in **`margin-bottom`**, against the usual "prefer padding" default. Justification:

1. **A padding fix cannot express the target value.** No `--section-spacing-*` token equals 50/50/75/75/110
   (the scale runs 12/16/24, 24/32/48, 40/48/64, 56/64/80/96, 64/80/96/112, 96/112/128/144). Padding would
   require hardcoding `pb-[50px] min-[1023px]:pb-[75px] min-[1590px]:pb-[110px]`, duplicating a scale
   `responsiveGap.section` already defines.
2. **The margin demonstrably does not get lost here.** Two independent reasons:
   - At **1800 / 1440 / 1024**: `main` has `min-[1023px]:pb-5` → `padding-bottom: 20px`. A parent's bottom
     padding blocks child-margin collapse-through, so the section's 110/75px margin stays inside `main`'s
     content box. Gap = 110+20 = 130, 75+20 = 95. ✓
   - At **768 / 360**: `main`'s padding-bottom is 0 and it has no bottom border, so the section's 50px
     `margin-bottom` **does** collapse out through `main`'s bottom edge and becomes `main`'s own margin.
     But `body` is `display:flex; flex-direction:column` (measured), so `main` is a **flex item** — flex-item
     margins never collapse with siblings or the container. The 50px is preserved verbatim between `main`
     and `<footer>`. Gap = 50. ✓
3. **Empirically proven, not just reasoned.** 84 clone pages already ship exactly this construction
   (`pb-0` + `mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]`) and measure 130/95/95/50/50 —
   0px delta vs live at all five viewports.
4. **Visually equivalent to padding anyway.** The whole gap region is `rgb(255,255,255)` on both sites
   (measured via `elementFromPoint` sampling at −5/−20/−40/−60/−90/−120px above the footer), so nothing is
   painted differently by moving the spacing from padding to margin.

### Verification of the proposed patch (already run, in-browser, not committed)

The exact class swap was applied at runtime via `classList` on all 8 pages × 5 viewports on the deployed
clone (`remove('pb-[var(--section-spacing-l)]')`, `add('pb-0','mb-[50px]','min-[1023px]:mb-[75px]','min-[1590px]:mb-[110px]')`
— all four classes already exist in the shipped CSS bundle, so this is a true end-to-end test including
collapse behaviour):

**40 / 40 MATCH.** Every page, every viewport, exact live value:

| Viewport | before | after | live | computed `section mb / section pb / main pb` |
|---|---|---|---|---|
| 1800 | 20 | **130** | 130 | 110px / 0px / 20px |
| 1440 | 20 | **95** | 95 | 75px / 0px / 20px |
| 1024 | 20 | **95** | 95 | 75px / 0px / 20px |
| 768 | 0 | **50** | 50 | 50px / 0px / 0px |
| 360 | 0 | **50** | 50 | 50px / 0px / 0px |

(`before` is measured to the section's *border-box* bottom, which is why it reads 20/0 — the 96/64/56px
lives inside as padding. The content-box comparison is the 116/100/100/64/56 in §2b.)

---

## 6. Is one constant enough?

**For the 8 pages of Finding 1: yes.** Live is 130/95/95/50/50 on every one of the 8, and the stored clone
data is byte-identical on every one of the 8. One value — `paddingBottom: 'none'`, `gap: 'section'` — fixes
all 8 and is the value 84 other pages already use.

**Site-wide: no, and a hardcoded constant would be wrong.** Live's last-section spacing is genuinely per-page
CMS data, confirmed by measurement:

| Live page | last-section spacing (1800/1440/1024/768/360) |
|---|---|
| `/` (home) | **140 / 140 / 140 / 140 / 70** + 20/20/20/0/0 wrapper = 160/160/160/140/70 |
| the other 91 measured pages | **110 / 75 / 75 / 50 / 50** + 20/20/20/0/0 wrapper = 130/95/95/50/50 |

The home page legitimately uses the larger `sectionLarge` rhythm and the clone reproduces it exactly (0px
delta at all five viewports). So the fix must stay a **per-block CMS field**, never a hardcoded constant in
`SectionWrapper` or the `Footer`. The proposed patch only changes a *default* and 8 documents' data; it
leaves the field editable.

---

## 7. Finding 2 (separate defect, opposite sign) — FAQs block as the trailing section

Not what CORE-6999 describes (clone is **looser**, not tighter), but it is a final-content-to-footer
divergence and it is 2–6× larger, so it should get its own ticket.

Pages: `/compare-packages`, `/guarantee`, `/llp`, `/non-residents` (live: `/compare-packages/`,
`/compare-packages/guarantee/`, `/compare-packages/llp/`, `/compare-packages/non-residents/`).

| Viewport | live G_struct | clone G_struct | Δ |
|---|---|---|---|
| 1800 | 130 | 160 | **+30** |
| 1440 | 95 | 160 | **+65** |
| 1024 | 95 | 160 | **+65** |
| 768 | 50 | 140 | **+90** |
| 360 | 50 | 70 | **+20** |

Mechanism — `/Users/eugeniucozac/bsqgroup/rf-ctl/src/blocks/FAQs/Component.tsx:24`:

```ts
const resolvedGap = !gap || gap === 'inherit' ? (isPage ? 'section' : 'sectionLarge') : gap
```

All four pages store `gap: "inherit"` with `variant !== 'page'`, so they fall through to `sectionLarge`
(`mb-[70px] md:mb-[140px]`) where live uses the standard `section` scale (110/75/75/50/50).

**Do not fold this into the CORE-6999 fix.** `sectionLarge` is correct for FAQs blocks appearing *mid*-page
(that is what the fallback exists for), so changing the fallback needs its own mid-page verification sweep.
The `/faqs/<topic>` pages take the `isPage → 'section'` branch and match live exactly.

## 8. Finding 3 (separate defect) — `<ol>` loses its bottom margin in policy rich text

`/Users/eugeniucozac/bsqgroup/rf-ctl/src/blocks/TextContent/TextContent.styles.ts:2`, in `bulletLists`:

```
[&_ol]:!mt-2 [&_ol]:!mb-0
```

Measured: live `ol.Markdown--markdownList___ordered` has `margin-top: 8px; margin-bottom: 8px`; clone
`ol.list-number` has `margin-top: 8px; margin-bottom: 0px`. `!mt-2` = 8px is right; `!mb-0` should be
`!mb-2`. This is a −8px error under **every** `<ol>` in policy rich text, not just the last one — it only
shows up in the footer-gap measurement on `/privacy-policy`, the one page whose content ends in an `<ol>`,
where it turns the −14px structural delta into the −22px the ticket rounded to "20px". Fixing it shifts
content throughout those pages, so it needs its own ticket and its own regression sweep.

---

## 9. What did NOT reproduce

- **"SHARED" / all pages.** 84 of the 92 clone pages are unaffected by Finding 1. 54 of them end in
  `closingCTA`, which matches live to 0px.
- **"20px".** The structural error is **14px** at ≥1590 and **+5/+5/+14/+6** (wrong direction) below it.
  22px occurs on exactly one page at exactly one viewport, and 8 of those 22 are Finding 3.
- **"tighter".** Only true at ≥1590px. At 1440, 1024, 768 and 360 the clone is **looser** than live on the
  affected pages. Any fix framed as "add 20px" would make four of the five breakpoints worse.
- **A constant offset across viewports.** The delta is +5 → −14 → +14 → +6 across the breakpoint range. It
  is two different responsive scales crossing over, not a fixed offset.
- **Home page** (`/`): 0px delta at all 5 viewports. `sectionLarge` is correct there.
- **Package pages** (`/all-inclusive-package` ↔ `/package/all-inclusive-package/`): 0px delta, all viewports.
- **Service pages** (`/london-registered-office` ↔ `/additional-services/london-registered-office/`): 0px.
- **FAQ topic pages** (`/faqs/vat` ↔ `/faqs/vat/`): 0px delta on G_struct at all 5. (At 360 G_ink differs by
  0.4px — sub-pixel text layout, not a spacing defect.)
- **`/contact-us`, `/a-z-glossary-of-terms`, `/site-map`, `/renewals`**: 0px delta, all viewports.
- **name-check pages** (7 of them): `G_ink` matches exactly (106/106/106/86/101) despite a different
  trailing-section construction. Not a defect.
- **The `<footer>` element itself**: `margin-top: 0; padding-top: 0` on **both** sites at every viewport.
  The footer contributes nothing to the divergence.
- **`main`'s `pb-5`**: correctly reproduces live's `div.Wrapper--wrapper__content` `padding-bottom: 20px`
  (and its 0 below 1023px). Not at fault.
- **`LegalContent` block** (`config.ts:87`, same `paddingBottom: 'l'`): latent only — zero instances across
  all 102 pages. Not a live defect today.
- **Margin collapsing eating the fix** (the CORE-7010 failure mode): checked explicitly and does **not**
  occur — see §5. Verified 40/40 in-browser.

---

## 10. Pages excluded from the sweep (no comparable pair)

- `/posts`, `/search` — clone-only (live returns 404).
- `/faqs/limited-by-shares`, `/faqs/limited-by-guarantee` — live 200, clone 404 (missing page, unrelated ticket).
- 21 `/port-preview-*` pages — clone-internal staging pages, no live counterpart.

## 11. Note on the working directory

The shared scratchpad is being written concurrently by another session; it overwrote `measure.mjs` and
`measure-extra.mjs` mid-run. All numbers in this report were read from live process stdout, and the
remaining scripts were re-run from an isolated subdirectory (`scratchpad/core6999/`). No JSON artefact from
the shared directory was trusted. **No file in any git worktree was modified.**
