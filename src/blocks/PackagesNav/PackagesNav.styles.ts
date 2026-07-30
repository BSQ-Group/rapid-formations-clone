export const packagesNavStyles = {
  section: 'flex justify-center px-4',

  carouselWrapper: 'relative w-full sm:w-auto',

  // pill is the scroll container at all sizes — overflow-x-auto scrolls tabs,
  // overflow-y-hidden keeps the rounded pill shape intact, snap props move here.
  pill: 'rounded-full bg-[var(--surface-tertiary)] overflow-x-auto overflow-y-hidden flex items-center gap-2 p-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',

  // contents at all sizes — tabs are direct flex children of pill
  tabTrack: 'contents',

  tab: 'flex items-center rounded-full px-3 py-2 sm:px-4 shrink-0 whitespace-nowrap transition-colors',

  tabActive: 'bg-[var(--stepper-node-active)]',

  tabLabel: 'text-[var(--text-subtle)] font-medium',

  tabLabelActive: 'text-[var(--text-strong)] font-semibold',
} as const
