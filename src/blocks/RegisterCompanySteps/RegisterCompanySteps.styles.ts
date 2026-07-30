export const registerCompanyStepsStyles = {
  section: 'flex flex-col gap-12 w-full',
  header: 'flex flex-col gap-3 text-center px-4 md:px-8 lg:px-10',
  title: 'text-[var(--text-strong)]',
  subtitle: 'text-[var(--text-subtle)]',

  cardsWrapper:
    'w-full overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-4 md:px-8 lg:px-10 scroll-pl-4 md:scroll-pl-8 lg:scroll-pl-10',
  cardsTrack: 'flex gap-6 w-max mx-auto',

  card: 'flex flex-col flex-shrink-0 w-[288px] md:w-[282px] rounded-3xl overflow-hidden bg-[var(--surface-primary)] snap-start',
  cardImage: 'relative h-[340px] flex-shrink-0',
  cardBody: 'flex flex-col gap-1 pt-6 pb-7 px-6',
  stepNumber: 'text-[var(--text-strong)]',
  cardText: 'flex flex-col gap-2',
  stepTitle: 'font-bold text-[var(--text-strong)]',
  stepDescription: 'text-[var(--text-subtle)]',
} as const
