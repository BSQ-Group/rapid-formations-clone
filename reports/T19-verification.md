# T19 / CORE-7041 — verification: defect does not reproduce

**Verified:** 2026-08-25 · **Verdict:** does **not** reproduce — **no code change required**
**Ticket:** [CORE-7041](https://linear.app/bsq-group/issue/CORE-7041) — "SHARED: FAQ question text column 16px narrow, wraps early"

## Summary

The clone's FAQ question column is **not** narrower than live. Measured headed on both
sites across two FAQ container variants, five page templates and eight viewport widths:
the trigger row width is **identical to the pixel** at every single one, and no question
wraps at a different point.

## Column width sweep — `/faqs/directors/` vs `/faqs/directors`

| viewport | live | clone | Δ |
|---|---|---|---|
| 1920 | 1170 | 1170 | 0 |
| 1440 | 1170 | 1170 | 0 |
| 1280 | 1170 | 1170 | 0 |
| 1200 | 1125 | 1125 | 0 |
| 1100 | 1025 | 1025 | 0 |
| 1023 | 948 | 948 | 0 |
| 992 | 937 | 937 | 0 |
| 900 | 845 | 845 | 0 |

## Wrap points — all 18 questions on that page

Every question renders at the same width and the same line count on both sites at
1440 / 768 / 360. Widths ranged 259–544px; **0 differences greater than 2px, 0 line-count
differences.**

## Both FAQ container variants covered

The clone has two: `faqsStyles.panel` (`min-[1023px]:px-[63px]`, used on service and
package pages) and `faqsStyles.pagePanel` (FAQ topic pages). Both were measured.

| page | live | clone |
|---|---|---|
| `/faqs/directors/` (pagePanel) | 1170 @1440 · 949 @1024 | identical |
| `/package/all-inclusive-package/` (panel) | 1044 @1440 · 713 @768 · 305 @360 | identical |
| `/vat-registration/` (panel) | 1044 @1440 · 823 @1024 | identical |
| `/business-telephone/` (panel) | 1044 @1440 · 823 @1024 | identical |

`1044 = 1170 − 2×63`, i.e. the clone's `px-[63px]` reproduces live's inset exactly.

## Answer column also checked

In case "question text column" was meant loosely, the expanded answer column was measured
too — `/faqs/directors/`, first answer:

| viewport | live | clone |
|---|---|---|
| 1440 | 1170×99, 22px/33px | 1170×99, 22px/33px |
| 1024 | 949×99, 22px/33px | 949×99, 22px/33px |

Same width, same rendered height (so the same 3 lines), same type metrics. The only
difference found anywhere was a **1px** left offset at 1024 (29 vs 30) — sub-pixel
rounding, not 16px.

## Recommendation

Close CORE-7041 as **not reproducible**. If the reporter still sees it, the report needs
the exact page URL and viewport width — nothing in the shared FAQ components produces a
16px inset on the clone that live does not also have.

## Method

Headed Chromium, real viewports, cookie consent dismissed on live so the banner could not
displace layout. Column width read from the accordion trigger's own bounding box; wrap
points from each question's rendered height divided by its computed line-height.
