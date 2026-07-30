// Promo Tier 3 — banner-style card with a glassmorphism background, eyebrow,
// heading, description, benefit pills, price, and CTA. Designed at five
// viewports (390 / 768 / 1024 / 1280 / 1800); per-viewport sizing comes from
// Figma metadata directly.
export const promoTier3Styles = {
  // Inner wrapper provides horizontal section padding + max-width so the
  // SectionWrapper bg colour stays edge-to-edge.
  inner: 'flex w-full justify-center px-4 md:px-10 wide:px-[180px]',

  // Card — rounded gradient bg, contains the layered overlays + content.
  card: 'relative w-full max-w-[1440px] overflow-hidden rounded-3xl',

  // Background image fills the card. Img element sits absolute so overlays can
  // multiply/hard-light over it.
  bgImage: 'absolute inset-0 h-full w-full object-cover',

  // Overlays match Figma exactly (green multiply, blue hard-light, white wash).
  overlayGreen:
    'absolute inset-0 pointer-events-none bg-[#79d985] mix-blend-multiply',
  overlayBlue:
    'absolute inset-0 pointer-events-none bg-[rgba(128,217,255,0.43)] mix-blend-hard-light',
  overlayWhite:
    'absolute inset-0 pointer-events-none bg-[rgba(245,245,245,0.58)]',

  // Card inner padding + flex layout. Mobile = column with price block under
  // the text+pills column; tablet+ = row, padded 32px all sides up to lg, then
  // px-8 py-3 from lg upward. Figma fixes the card height per breakpoint
  // (tablet 328px, desktop 232px) — without it the card hugs its content and
  // the label/pills end up flush to the edges (CORE-3564 QA bug 2), so the
  // min-heights restore the breathing room. Tablet bottom-anchors both columns
  // (`md:items-end`, matching Figma's `items-end` container so the price + CTA
  // sit at the bottom alongside the pills — CORE-3564 QA bug 1); desktop centers
  // them (`lg:items-center`, matching Figma's centred 200px container).
  content:
    'relative flex flex-col gap-7 px-6 py-8 md:flex-row md:items-end md:justify-between md:gap-6 md:p-8 md:min-h-[328px] lg:items-center lg:px-8 lg:py-3 lg:gap-8 lg:min-h-[232px]',

  // Text + pills column.
  textCol: 'flex flex-col items-start gap-5 md:flex-1 md:min-w-0',

  // Title + eyebrow + description grouping.
  titleBlock: 'flex flex-col items-start gap-3 w-full',

  // Eyebrow — `body-xs` preset (12px → wide:14px) matches Figma; only the
  // uppercase + semibold + colour come from here.
  eyebrow:
    'font-semibold uppercase text-[var(--text-subtle)] whitespace-nowrap',

  // Title — `headline-3xl` preset (20/24/30/30/36) matches Figma exactly.
  // Preset bakes in `font-semibold`; Figma wants bold, hence the override.
  title: 'font-bold text-[var(--text-strong)]',

  // Description — `body-sm` preset (14 → wide:16) matches Figma; only colour
  // comes from here.
  description: 'text-[var(--text-subtle)]',

  // Pills row — stacks vertically on mobile + tablet (md), wraps to row at
  // lg (1024+).
  pills: 'flex flex-col gap-2.5 lg:flex-row lg:flex-wrap',

  // Single pill — translucent white capsule with check + label.
  pill:
    'inline-flex items-center gap-1.5 rounded-2xl border border-[rgba(225,225,230,0.2)] bg-[rgba(255,255,255,0.6)] px-4 py-2 self-start',

  // Check icon — small, dark.
  pillIcon: 'h-4 w-4 shrink-0 text-[var(--text-strong)]',

  // Pill label — `body-xs` preset (12 → wide:14) matches Figma; only the
  // medium weight + colour + nowrap come from here.
  pillLabel: 'font-medium text-[var(--text-strong)] whitespace-nowrap',

  // Right column — price + CTA. Mobile = full width column; tablet+ shrinks
  // to content width on the right of the card.
  rightCol:
    'flex flex-col gap-4 items-stretch w-full md:w-auto md:shrink-0 md:items-end',

  // Price row — on mobile the price + caption sit on one line; on tablet+ they
  // stack vertically with the caption right under the price.
  priceRow:
    'flex flex-row items-center gap-2 md:flex-col md:items-end md:gap-0',

  // Price — `headline-3xl` preset matches the desktop Figma value (36px at
  // wide). Mobile (24) and md (30) diverge from the preset's 20/24, so they
  // are overridden here per CLAUDE.md's per-breakpoint-exception rule. The
  // `wide:text-4xl` override is required because utility classes are emitted
  // after the @apply'd preset rule, so without it `md:text-3xl` cascades
  // past wide and overrides the preset's wide:text-4xl (rendering 30 not 36).
  price:
    'font-bold text-[var(--text-strong)] tracking-[-0.25px] text-2xl md:text-3xl wide:text-4xl wide:tracking-[-1px]',

  // Price caption — `body-sm` preset (14 → wide:16) matches Figma; only
  // colour comes from here.
  priceCaption: 'text-[var(--text-subtle)]',

  // CTA wrapper — Next/Link wraps the Button so the whole capsule is the
  // hit target without going through the Button → Slot path (which was
  // stripping Button's base classes when nested via CMSLink/Slot).
  ctaLink: 'inline-block w-full md:w-auto',

  // CTA button — overrides Button's primary defaults so the
  // size/padding/typography match Figma's spec. Figma's button font scales at
  // 1280, not 1800: 16px/24 below xl (mobile/tablet/laptop), 20px/32 at xl+
  // (1280+, covering both the 1280 and 1800 desktop frames). Padding 24×12,
  // 8px radius, no shadow, white-on-card at every breakpoint.
  cta:
    'w-full !bg-white !text-[var(--text-strong)] hover:!bg-white/90 !rounded-lg !shadow-none !h-auto !px-6 !py-3 !text-base !leading-6 !font-semibold xl:!text-[20px] xl:!leading-8',
} as const
