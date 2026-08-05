export const promoCardStyles = {
  section: 'flex flex-col items-center w-full px-4 md:px-6',

  card: 'relative w-full max-w-[1440px] rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat bg-[var(--qcf-green-900)] flex flex-col items-center text-center gap-6 md:flex-row md:items-center md:justify-between md:text-left md:gap-6 px-6 py-8 md:px-8 md:py-6 lg:px-10 lg:py-6',

  content: 'flex flex-col gap-2 items-center md:items-start md:flex-1 md:min-w-0',

  title: 'text-[var(--text-inverse)] font-bold',

  description:
    'text-[var(--text-inverse-subtle)] [&_strong]:font-semibold [&_strong]:text-[var(--text-inverse)] [&_p]:m-0',

  pricePanel: 'flex flex-col items-center md:items-start md:shrink-0',

  addLabel: 'text-[var(--text-inverse-subtle)]',
  price: 'text-[var(--text-inverse)] font-bold leading-none',
  priceCaption: 'text-[var(--text-inverse-subtle)]',
} as const
