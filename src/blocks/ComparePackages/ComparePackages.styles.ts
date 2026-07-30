export const comparePackagesStyles = {
  section: 'flex flex-col items-center w-full',

  inner: [
    'flex flex-col w-full max-w-[1280px] gap-6',
    'px-4 md:px-8 lg:px-10',
  ].join(' '),

  // ── Heading ──────────────────────────────────────────────
  headingWrap: 'flex flex-col gap-2 w-full',

  heading: [
    'text-[var(--text-strong)] w-full',
    'font-bold text-[28px] leading-[32px] tracking-[-0.5px]',
    'md:text-[32px] md:leading-[36px]',
    'lg:text-[36px] lg:leading-[40px] lg:tracking-[-1px]',
  ].join(' '),

  description: [
    'text-[var(--text-subtle)] w-full',
    'text-[14px] leading-[20px]',
    'md:text-[16px] md:leading-[24px]',
    'lg:text-[18px] lg:leading-[28px]',
  ].join(' '),

  // ╔══════════════════════════════════════════════════════════
  // ║  DESKTOP TABLE (lg+)
  // ╚══════════════════════════════════════════════════════════
  desktopTable: [
    'hidden lg:flex flex-col w-full overflow-hidden',
    'border border-solid border-[var(--border-subtle)] rounded-3xl',
  ].join(' '),

  desktopHeader: [
    'flex w-full h-[72px]',
    'bg-[var(--surface-canvas-inverse)]',
  ].join(' '),

  desktopHeaderLabelCol: [
    'flex flex-1 items-center min-w-0 pl-6',
    'border-r border-solid border-[var(--border-subtle)]',
    'text-[var(--text-inverse-subtle)] text-[20px] leading-[28px] font-semibold',
  ].join(' '),

  desktopHeaderTierCol: [
    'flex w-[200px] xl:w-[240px] 2xl:w-[260px] items-center justify-start p-4',
    'border-r last:border-r-0 border-solid border-[var(--border-subtle)]',
    'text-[var(--text-inverse-subtle)] text-[20px] leading-[28px] font-semibold',
  ].join(' '),

  desktopSectionLabel: [
    'flex w-full items-center',
    'bg-[var(--surface-subtle)]',
    'border-b border-solid border-[var(--border-subtle)]',
  ].join(' '),

  desktopSectionLabelInner: [
    'flex items-center h-10 pl-6 w-[420px]',
    'text-[var(--text-muted)] font-medium',
    'text-[16px] leading-[24px]',
    'whitespace-nowrap',
  ].join(' '),

  desktopFeatureRow: [
    'flex w-full items-stretch',
    'bg-[var(--surface-primary)]',
    'border-b border-solid border-[var(--border-subtle)]',
  ].join(' '),

  desktopFeatureLabelCell: [
    'flex flex-1 min-w-0 items-center',
    'py-4 pl-4 pr-6 min-h-[96px]',
    'border-r border-solid border-[var(--border-subtle)]',
  ].join(' '),

  // Inner wrapper for icon + text column. items-start so the icon sits at
  // the top of the wrapper (visually aligned with the feature name's first
  // line). The wrapper itself is vertically centered by the outer cell.
  desktopFeatureTextBlock: 'flex flex-1 min-w-0 items-start gap-2',

  desktopFeatureInfoIconWrap: 'flex items-center pt-0.5 shrink-0',

  desktopFeatureTextStack: 'flex flex-col gap-1 min-w-0 flex-1',

  desktopFeatureName: [
    'text-[var(--text-strong)] font-medium',
    'text-[18px] leading-[28px]',
  ].join(' '),

  desktopFeatureDescription: [
    'text-[var(--text-muted)]',
    'text-[16px] leading-[24px]',
  ].join(' '),

  desktopTierCell: [
    'flex w-[200px] xl:w-[240px] 2xl:w-[260px] items-center justify-center p-4 shrink-0',
    'border-r last:border-r-0 border-solid border-[var(--border-subtle)]',
  ].join(' '),

  desktopCtaRow: [
    'flex w-full items-stretch',
    'bg-[var(--surface-primary)]',
  ].join(' '),

  desktopCtaLabelCol: [
    'flex flex-1 min-w-0',
    'border-r border-solid border-[var(--border-subtle)]',
  ].join(' '),

  desktopCtaTierCell: [
    'flex flex-col items-start justify-between gap-4',
    'w-[200px] xl:w-[240px] 2xl:w-[260px] p-4 shrink-0',
    'border-r last:border-r-0 border-solid border-[var(--border-subtle)]',
  ].join(' '),

  desktopCtaPriceStack: 'flex flex-col w-full',

  desktopCtaPlanName: 'text-[var(--text-strong)] font-semibold text-[20px] leading-[28px]',
  desktopCtaPrice: 'text-[var(--text-strong)] font-bold text-[36px] leading-[40px] tracking-[-1px]',
  desktopCtaSubPrice: 'text-[var(--text-muted)] text-[14px] leading-[20px]',

  ctaButton: 'w-full',

  // ╔══════════════════════════════════════════════════════════
  // ║  CAROUSEL (< lg)  — overflow the container, snap-scroll
  // ╚══════════════════════════════════════════════════════════
  // Carousel sits outside `inner` so the cards can flow edge-to-edge of
  // the page and overflow off the right. The viewport itself is full width.
  carouselViewport: [
    'lg:hidden w-full mt-6',
  ].join(' '),

  carouselTrack: [
    // Figma uses different gaps per breakpoint: mobile 16px, tablet 24px
    // (mobile cards at x=0,320,640 → 16px; tablet cards at x=0,328,656 → 24px).
    'flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth',
    // First card lines up with the section heading (which has px-4 / md:px-8),
    // last card has matching right padding so it doesn't hug the edge.
    'px-4 md:px-8',
    // Without scroll-padding, snap-align:start eats the padding by auto-
    // scrolling the track until the first card's edge hits the container
    // edge — making the carousel look flush-left. Match scroll-padding to
    // the padding so the snap point respects it.
    'scroll-pl-4 md:scroll-pl-8',
    // Hide scrollbar
    '[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
    // Each card snaps to the left edge of the scroll container
    '[&>*]:snap-start',
  ].join(' '),

  carouselCard: [
    'flex flex-col shrink-0 w-[304px]',
    'bg-[var(--surface-primary)] overflow-hidden',
    'border border-solid border-[var(--border-subtle)] rounded-3xl',
  ].join(' '),

  // CTA at the BOTTOM of each card (plan name + price + sub + order),
  // matching the Figma tablet/mobile card "CTA Row" (node 4819:400197):
  // name, price, sub-price all stacked vertically and left-aligned, then a
  // full-width Order button below. Figma padding px-16 py-14, gap-16.
  cardFooter: 'flex flex-col items-start gap-4 px-4 py-3.5 mt-auto bg-[var(--surface-primary)]',

  cardPlanName: 'text-[var(--text-strong)] font-semibold text-[20px] leading-[28px]',

  cardPriceStack: 'flex flex-col items-start w-full gap-1',

  cardPrice: 'text-[var(--text-strong)] font-bold text-[36px] leading-[40px] tracking-[-1px]',

  cardSubPrice: 'text-[var(--text-muted)] text-[12px] leading-[16px]',

  // Section label inside a card
  cardSectionLabel: [
    'flex items-center h-10 px-4',
    'bg-[var(--surface-subtle)]',
    'border-y border-solid border-[var(--border-subtle)]',
    'text-[var(--text-muted)] font-medium text-[14px] leading-[20px] whitespace-nowrap',
  ].join(' '),

  // Feature row inside a card
  cardFeatureRow: [
    'flex w-full items-center gap-3 px-4 py-3.5',
    'border-b border-solid border-[var(--border-subtle)] last:border-b-0',
  ].join(' '),

  cardFeatureTextStack: 'flex flex-col gap-1 min-w-0 flex-1',

  cardFeatureName: 'text-[var(--text-strong)] font-medium text-[16px] leading-[24px]',
  cardFeatureDescription: 'text-[var(--text-muted)] text-[14px] leading-[20px]',

  cardFeatureInfoIconWrap: 'flex items-center shrink-0',

  cardFeatureTierIcon: 'flex items-center justify-center shrink-0 w-8 h-8',

  // ── Icons ────────────────────────────────────────────────
  checkIcon: 'text-[var(--icon-accent)] w-8 h-8',
  minusIcon: 'text-[var(--icon-background-muted)] w-8 h-8',
} as const
