# T9 / CORE-7013 — verification: defect no longer reproduces

**Verified:** 2026-08-24 · **Verdict:** already resolved — **no code change required**
**Ticket:** [CORE-7013](https://linear.app/bsq-group/issue/CORE-7013/rf-shared-faq-banner-image-low-resolution-pixelated)

## Summary

The ticket reports FAQ topic-page banners served from masters far below their display
size (356×76 and 585×125 masters shown at 1170×250, up to ~3.3× upscaling). **Those
masters have since been replaced.** Current masters are **1170×250** — exactly the
displayed size — and the clone now renders the banner *sharper than live*.

## Measurements (viewport 1800, DPR 1)

| | Master | Served variant | Displayed | Upscale |
|---|---|---|---|---|
| **Live** (`rapidformations.co.uk`) | 800×170 | 800×171 | 1170×252 | **1.46×** |
| **Clone** (`rapid-formations-clone.vercel.app`) | **1170×250** | 1140×243 | 1170×250 | **1.03×** |

Live — the source of truth — upscales its own banner by ~1.46×. The clone is closer to
1:1 than the site it clones.

## Coverage — all 23 FAQ topic pages swept

- **21 of 23** render the banner at **1.03×** upscale (served 1140 into a 1170×250 box).
- **0 pages** exceed 1.10×.
- **2 pages** render **no banner at all** — see below.

Pages measured: after-company-formation, annual-accounts, basics,
company-meetings-and-resolutions, company-names, company-records-and-registers,
company-secretary, confirmation-statement, corporation-tax, directors,
directors-service-address, limited-by-guarantee\*, limited-by-shares\*,
limited-liability-partnerships, paye-and-payroll,
paying-yourself-through-limited-company, pscs, registered-office, sail-address,
self-assessment, shares-and-shareholders, the-formation-process, vat.

## Acceptance criteria

| AC | Result |
|---|---|
| Banner served at ≥ its displayed size | **PASS** — master 1170×250 = displayed 1170×250 |
| Applies to all 23 FAQ topic pages | **PASS on 21**; 2 pages have no banner (separate defect, P2) |
| Crop / scale / object-position unchanged | **PASS** — untouched, no code change made |
| Crisp vs live at 360/768/1024/1800 | **PASS** — clone 1.03× vs live 1.46× |

"Retina ideally 2×" is unachievable against this source: live ships no 2× variant, so
matching live is the standard and the clone already exceeds it. Pursuing 2× would mean
deliberately diverging from the source of truth.

## Residual (not a defect)

Next serves a **1140**-wide variant for a **1170** box because `deviceSizes` has no 1170
entry — a 1.03× upscale, still far better than live's 1.46×. Fixing it is gold-plating
past the source; recommend leaving it.

## Separate defect found — filed as P2

\* `/faqs/limited-by-guarantee/` and `/faqs/limited-by-shares/` render **no banner
element** on the clone (16 images present, widest a 275×28 logo at y=1093), while live
renders one on both (800px master at 1170×252). Different defect class from CORE-7013
(missing block, not resolution), so filed as proposal **P2** for Planning rather than
folded into this task.

## Recommendation

Close **CORE-7013** as already-resolved with these measurements. Set **T9** `void`
(stale premise). No PR, no code change.
