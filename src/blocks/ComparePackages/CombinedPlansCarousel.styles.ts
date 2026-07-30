// Styles for the tablet/mobile COMBINED carousel (CORE-3620): each slide is one
// plan = marketing card (top) + that plan's services list (below), joined and
// moving together as a single scroll-snap item. Desktop is unchanged and uses
// the existing FormationPackages grid + ComparePackages table.
export const combinedPlansCarouselStyles = {
  // Tab navigation above the carousel — same look as FormationPackages tabs.
  tabs: 'flex gap-4 justify-center mb-6 px-4',
  tab: 'text-sm font-semibold text-[var(--text-muted)] pb-1 border-b-2 border-transparent transition-colors',
  tabActive: 'text-[var(--text-strong)] border-[var(--border-focus)]',

  // Horizontal scroll-snap track. One slide per plan; first/last align with the
  // page gutter via matching scroll-padding (mobile 16px, tablet 32px).
  // items-stretch makes every slide the height of the tallest, so the cards can
  // equalise (see `card` below).
  viewport: 'w-full',
  track: 'flex items-stretch gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 md:px-8 scroll-pl-4 md:scroll-pl-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&>*]:snap-start',

  // One combined column: marketing card + services list, small gap, fixed width
  // so cards align edge-to-edge of the viewport like the existing carousels.
  slide: 'flex flex-col shrink-0 w-[304px] md:w-[384px] gap-3',

  // The card grows to fill the (equal-height) slide so all plan cards are the
  // same height and their services lists start at the same line, regardless of
  // how many "Ideal for" bullets / how long the description is. The card's own
  // Read-more link is mt-auto, so it sits at the bottom of the grown card.
  card: 'grow',

  // Services list box beneath the card.
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
