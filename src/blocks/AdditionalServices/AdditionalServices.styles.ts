export const additionalServicesStyles = {
  section: 'flex flex-col items-center gap-14 w-full px-4 md:px-10',

  header: 'flex flex-col gap-3 items-center text-center w-full max-w-[792px]',
  heading: 'text-[var(--text-strong)]',

  grid: 'grid grid-cols-1 md:grid-cols-3 gap-6 w-full mx-auto xl:max-w-[1200px] wide:max-w-[1440px]',

  card: 'group/card flex flex-col justify-between p-8 rounded-3xl h-full transition-colors duration-200 bg-[var(--surface-primary)] md:bg-transparent md:hover:bg-[var(--surface-primary)]',

  cardContent: 'flex flex-col gap-2',
  cardTitle: 'font-medium text-[var(--text-strong)]',
  cardDescription: 'text-[var(--text-subtle)]',

  cardFooter: 'flex items-center justify-end mt-5 transition-opacity duration-200 md:opacity-0 md:pointer-events-none md:group-hover/card:opacity-100 md:group-hover/card:pointer-events-auto',

  ctaLink: 'flex items-center gap-1 text-sm font-medium text-[var(--text-strong)]',
  ctaIcon: 'shrink-0',
} as const
