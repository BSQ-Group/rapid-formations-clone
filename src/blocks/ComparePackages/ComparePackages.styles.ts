export const comparePackagesStyles = {
  section: 'flex flex-col items-center w-full',

  inner: 'flex flex-col w-full max-w-[1280px] gap-6 px-4 md:px-8 lg:px-10',

  // ── Heading ──────────────────────────────────────────────
  headingWrap: 'flex flex-col gap-2 w-full',

  heading:
    'text-[var(--text-strong)] w-full font-bold text-[28px] leading-[32px] tracking-[-0.5px] md:text-[32px] md:leading-[36px] lg:text-[36px] lg:leading-[40px] lg:tracking-[-1px]',

  description:
    'text-[var(--text-subtle)] w-full text-[14px] leading-[20px] md:text-[16px] md:leading-[24px] lg:text-[18px] lg:leading-[28px]',

  desktopTable:
    'hidden lg:flex flex-col w-full overflow-hidden border border-solid border-[var(--border-subtle)] rounded-3xl',

  desktopHeader: 'flex w-full h-[72px] bg-[var(--surface-canvas-inverse)]',

  desktopHeaderLabelCol:
    'flex flex-1 items-center min-w-0 pl-6 border-r border-solid border-[var(--border-subtle)] text-[var(--text-inverse-subtle)] text-[20px] leading-[28px] font-semibold',

  desktopHeaderTierCol:
    'flex w-[200px] xl:w-[240px] 2xl:w-[260px] items-center justify-start p-4 border-r last:border-r-0 border-solid border-[var(--border-subtle)] text-[var(--text-inverse-subtle)] text-[20px] leading-[28px] font-semibold',

  desktopSectionLabel:
    'flex w-full items-center bg-[var(--surface-subtle)] border-b border-solid border-[var(--border-subtle)]',

  desktopSectionLabelInner:
    'flex items-center h-10 pl-6 w-[420px] text-[var(--text-muted)] font-medium text-[16px] leading-[24px] whitespace-nowrap',

  desktopFeatureRow:
    'flex w-full items-stretch bg-[var(--surface-primary)] border-b border-solid border-[var(--border-subtle)]',

  desktopFeatureLabelCell:
    'flex flex-1 min-w-0 items-center py-4 pl-4 pr-6 min-h-[96px] border-r border-solid border-[var(--border-subtle)]',

  desktopFeatureTextBlock: 'flex flex-1 min-w-0 items-start gap-2',

  desktopFeatureInfoIconWrap: 'flex items-center pt-0.5 shrink-0',

  desktopFeatureTextStack: 'flex flex-col gap-1 min-w-0 flex-1',

  desktopFeatureName: 'text-[var(--text-strong)] font-medium text-[18px] leading-[28px]',

  desktopFeatureDescription: 'text-[var(--text-muted)] text-[16px] leading-[24px]',

  desktopTierCell:
    'flex w-[200px] xl:w-[240px] 2xl:w-[260px] items-center justify-center p-4 shrink-0 border-r last:border-r-0 border-solid border-[var(--border-subtle)]',

  desktopCtaRow: 'flex w-full items-stretch bg-[var(--surface-primary)]',

  desktopCtaLabelCol: 'flex flex-1 min-w-0 border-r border-solid border-[var(--border-subtle)]',

  desktopCtaTierCell:
    'flex flex-col items-start justify-between gap-4 w-[200px] xl:w-[240px] 2xl:w-[260px] p-4 shrink-0 border-r last:border-r-0 border-solid border-[var(--border-subtle)]',

  desktopCtaPriceStack: 'flex flex-col w-full',

  desktopCtaPlanName: 'text-[var(--text-strong)] font-semibold text-[20px] leading-[28px]',
  desktopCtaPrice: 'text-[var(--text-strong)] font-bold text-[36px] leading-[40px] tracking-[-1px]',
  desktopCtaSubPrice: 'text-[var(--text-muted)] text-[14px] leading-[20px]',

  ctaButton: 'w-full',

  carouselViewport: 'lg:hidden w-full mt-6',

  // scroll-pl must mirror px, or snap-align:start scrolls the padding away.
  carouselTrack:
    'flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-8 scroll-pl-4 md:scroll-pl-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&>*]:snap-start',

  carouselCard:
    'flex flex-col shrink-0 w-[304px] bg-[var(--surface-primary)] overflow-hidden border border-solid border-[var(--border-subtle)] rounded-3xl',

  cardFooter: 'flex flex-col items-start gap-4 px-4 py-3.5 mt-auto bg-[var(--surface-primary)]',

  cardPlanName: 'text-[var(--text-strong)] font-semibold text-[20px] leading-[28px]',

  cardPriceStack: 'flex flex-col items-start w-full gap-1',

  cardPrice: 'text-[var(--text-strong)] font-bold text-[36px] leading-[40px] tracking-[-1px]',

  cardSubPrice: 'text-[var(--text-muted)] text-[12px] leading-[16px]',

  cardSectionLabel:
    'flex items-center h-10 px-4 bg-[var(--surface-subtle)] border-y border-solid border-[var(--border-subtle)] text-[var(--text-muted)] font-medium text-[14px] leading-[20px] whitespace-nowrap',

  cardFeatureRow:
    'flex w-full items-center gap-3 px-4 py-3.5 border-b border-solid border-[var(--border-subtle)] last:border-b-0',

  cardFeatureTextStack: 'flex flex-col gap-1 min-w-0 flex-1',

  cardFeatureName: 'text-[var(--text-strong)] font-medium text-[16px] leading-[24px]',
  cardFeatureDescription: 'text-[var(--text-muted)] text-[14px] leading-[20px]',

  cardFeatureInfoIconWrap: 'flex items-center shrink-0',

  cardFeatureTierIcon: 'flex items-center justify-center shrink-0 w-8 h-8',

  // ── Icons ────────────────────────────────────────────────
  checkIcon: 'text-[var(--icon-accent)] w-8 h-8',
  minusIcon: 'text-[var(--icon-background-muted)] w-8 h-8',
} as const
