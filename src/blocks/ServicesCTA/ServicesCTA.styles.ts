export const servicesCTAStyles = {
  // Outer section — full-bleed green gradient at every breakpoint (no rounded card,
  // no max-width). Vertical section padding comes entirely from the shared
  // `--section-spacing-l` token via SectionWrapper's sectionLayout (paddingTop/Bottom
  // = 'l'); the token's curve is corrected to 56/64/80(≥1024)/96(≥1800) in #265
  // (CORE-3575) to match Figma — no block-level override.
  // `relative overflow-hidden` lets the gradient layer below fill the whole section
  // (including that vertical padding) via `absolute inset-0`, matching Figma where the
  // gradient is `inset-0 size-full` on the padded frame — so no canvas bands show
  // above/below the green.
  section: 'relative w-full overflow-hidden',

  // Background gradient — absolute layer covering the full section, padding included.
  background: 'absolute inset-0 pointer-events-none',

  // Content — centered column on top of the gradient, capped at 1440px so large
  // viewports self-gutter; small viewports use explicit horizontal padding per
  // breakpoint (Figma: 16/80/80/0/0).
  // Figma nests a "Text + trust pill lock up" (pill + heading/description) above
  // the button: the lock-up uses gap/5 (20px), the outer container uses gap/8
  // (32px) between the lock-up and the button. So the column gap stays gap-8
  // (lock-up → button = 32px) and the pill → text gap lives on `lockup` (gap-5).
  // `max-md:py-4` (16px) reproduces the Figma mobile-only inner-Container padding
  // (spacing/4 top+bottom) the 360 frame adds around the content lock-up — without
  // it the mobile section is 32px shorter than Figma. md+ frames have no such inner
  // padding (heights match exactly at 768/1024/1280), so it is scoped to <md only.
  content:
    'relative flex flex-col items-center gap-8 max-md:py-4 mx-auto max-w-[1440px] px-4 md:px-20 xl:px-0 text-center',

  // Text + trust pill lock-up — pill above the heading/description block, gap/5
  // (20px) between them per Figma. Previously the pill sat directly in `content`
  // at gap-8 (32px), pushing the heading/price/button 12px too low at every
  // breakpoint (the overlay vertical drift).
  lockup: 'flex flex-col items-center gap-5 w-full',

  // Trust pill — semi-transparent white capsule. Figma fixes the pill to a
  // hard 302px width at the 360 mobile frame (`w-[302px]`), so the full trust
  // copy wraps to two lines at "…formed ·" / "Rated Excellent on Trustpilot".
  // Live `inline-flex` grows to content, making the pill ~30px wider so it wrapped
  // one word later ("…formed · Rated" / "Excellent on Trustpilot") and the two
  // lines ghosted in the 360 overlay. `max-md:w-[302px]` reproduces the Figma
  // mobile-only fixed width (per-breakpoint exception — Figma is the source of
  // truth); md+ keeps the single-line `whitespace-nowrap` desktop pill unchanged.
  pill: 'relative inline-flex items-center gap-2 px-5 py-2 rounded-full max-md:w-[302px]',
  pillBorder:
    'absolute inset-0 rounded-full border-[1.4px] border-white opacity-50 pointer-events-none',
  pillFill: 'absolute inset-0 rounded-full bg-white opacity-40 pointer-events-none',
  pillTextMobile:
    'relative flex-1 text-center text-sm font-medium text-[var(--text-strong)] md:hidden',
  pillTextDesktop:
    'relative text-sm wide:text-base font-medium text-[var(--text-strong)] whitespace-nowrap hidden md:inline',
  pillBoldText: 'font-bold text-[var(--text-strong)]',

  // Text block — heading + description lock-up, centered, full width within the cap
  textGroup: 'flex flex-col items-center gap-4 w-full text-[var(--text-subtle)]',
  // Heading tracks the headline-4xl preset exactly — 30/36 (md), 36/40 (lg + xl),
  // 48/56 (wide) — which matches Figma at every tier (768=30/36, 1024=36/40,
  // 1280=36/40, 1800=48/56). The only divergence is weight: Figma's heading-4xl is
  // bold (700) at every breakpoint, but the preset is semibold below lg, so force
  // bold here. No per-breakpoint size override is needed.
  heading: 'text-[var(--text-strong)] w-full font-bold',
  // Description tracks the headline-2xl preset exactly — 20/28 (md), 24/32 (lg + xl),
  // 30/36 (wide) — matching Figma at every tier (768=20/28, 1024=24/32, 1280=24/32,
  // 1800=30/36). Only the colour override is needed; the preset already supplies the
  // semibold weight and tracking.
  description: 'text-[var(--text-subtle)]',
} as const
