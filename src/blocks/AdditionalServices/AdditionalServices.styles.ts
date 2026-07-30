export const additionalServicesStyles = {
  // Section: full-width, edge padding only (no max-w here — grid handles its own
  // max-width cap so there's no "island" effect between 1280 and 1800px).
  // px-4 / md:px-10 match Figma's 16px (360px) and 40px (768–1280px) gutters.
  section: 'flex flex-col items-center gap-14 w-full px-4 md:px-10',

  // Header: centered with a readability cap; section padding provides edge clearance.
  header: 'flex flex-col gap-3 items-center text-center w-full max-w-[792px]',
  heading: 'text-[var(--text-strong)]',

  // Grid: xl:max-w-[1200px] caps content at 1200px from the xl (1280px) breakpoint
  // through to wide, matching Figma's 40px gutter at 1280px.
  // wide:max-w-[1440px] expands to 1440px at the 1800px breakpoint — together with
  // the section's 40px padding and mx-auto centering on the grid, this produces
  // the 180px gutters Figma shows at 1800px: (1800 − 80 − 1440) / 2 + 40 = 180px.
  grid: 'grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto xl:max-w-[1200px] wide:max-w-[1440px]',

  card: 'group/card flex flex-col justify-between p-8 rounded-3xl h-full transition-colors duration-200 bg-[var(--surface-primary)] md:bg-transparent md:hover:bg-[var(--surface-primary)]',

  cardContent: 'flex flex-col gap-2',
  cardTitle: 'font-medium text-[var(--text-strong)]',
  cardDescription: 'text-[var(--text-subtle)]',

  cardFooter: 'flex items-center justify-end mt-5 transition-opacity duration-200 md:opacity-0 md:pointer-events-none md:group-hover/card:opacity-100 md:group-hover/card:pointer-events-auto',

  ctaLink: 'flex items-center gap-1 text-sm font-medium text-[var(--text-strong)]',
  ctaIcon: 'shrink-0',
} as const
