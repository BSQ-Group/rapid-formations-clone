export const combinedPlansCarouselStyles = {
  tabs: 'flex gap-4 justify-center mb-6 px-4',
  tab: 'text-sm font-semibold text-[var(--text-muted)] pb-1 border-b-2 border-transparent transition-colors',
  tabActive: 'text-[var(--text-strong)] border-[var(--border-focus)]',

  viewport: 'w-full',
  track: 'flex items-stretch gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-8 scroll-pl-4 md:scroll-pl-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&>*]:snap-start',

  slide: 'flex flex-col shrink-0 w-[304px] md:w-[384px] gap-3',

  card: 'grow',

  servicesCard: 'flex flex-col bg-[var(--surface-primary)] overflow-hidden border border-solid border-[var(--border-subtle)] rounded-3xl',

  sectionLabel: 'flex items-center h-10 px-4 bg-[var(--surface-subtle)] border-y border-solid border-[var(--border-subtle)] text-[var(--text-muted)] font-medium text-[14px] leading-[20px] whitespace-nowrap',

  featureRow: 'flex w-full items-center gap-3 px-4 py-3.5 border-b border-solid border-[var(--border-subtle)] last:border-b-0',
  featureTextStack: 'flex flex-col gap-1 min-w-0 flex-1',
  featureName: 'text-[var(--text-strong)] font-medium text-[16px] leading-[24px]',
  featureDescription: 'text-[var(--text-muted)] text-[14px] leading-[20px]',
  featureInfoIconWrap: 'flex items-center shrink-0',
  featureTierIcon: 'flex items-center justify-center shrink-0 w-8 h-8',

  checkIcon: 'text-[var(--icon-accent)] w-8 h-8',
  minusIcon: 'text-[var(--icon-background-muted)] w-8 h-8',
} as const
