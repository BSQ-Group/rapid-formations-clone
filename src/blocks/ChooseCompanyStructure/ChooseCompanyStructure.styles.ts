export const chooseCompanyStructureStyles = {
  section: 'flex flex-col items-center gap-10 md:gap-12 px-4 md:px-8 lg:px-10',
  header: 'flex flex-col gap-3 items-center text-center w-full',
  heading: 'text-[var(--text-strong)]',
  description: 'text-[var(--text-subtle)] max-w-[900px]',
  card: 'group flex flex-col gap-4 rounded-3xl pt-4 px-4 pb-5 flex-shrink-0 w-[288px] md:w-96 bg-[var(--surface-primary)] lg:bg-transparent lg:hover:bg-[var(--surface-primary)] transition-colors duration-200',
  cardImageWrapper: 'relative rounded-lg overflow-hidden w-full aspect-[35/24]',
  cardImage: 'object-cover',
  cardText: 'flex flex-col gap-2',
  cardTitleRow: 'flex items-start justify-between w-full',
  cardTitle: 'font-semibold text-[var(--text-strong)]',
  cardArrow:
    'flex-shrink-0 text-[var(--text-strong)] transition-opacity lg:opacity-0 lg:group-hover:opacity-100',
  cardDescription: 'text-[var(--text-subtle)]',
} as const
