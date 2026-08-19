export const buyServiceCardStyles = {
  card: 'mb-8 border-0 border-b border-solid border-[color:var(--border-on-light-tile)] bg-white p-[30px] shadow-tile-raised transition-shadow duration-200 ease-in-out last:mb-14 lg:border',

  header:
    'mb-[15px] flex flex-col items-start border-b border-solid border-[color:var(--border-on-light)] pb-2.5',

  title: 'm-0 block text-[26px] font-normal leading-[1.235] text-[var(--text-brand-cyan)]',

  titleMobile: 'lg:hidden',

  titleDesktop: 'hidden lg:block',

  price: 'mt-0 block text-[38px] font-semibold leading-normal text-[var(--text-on-light-base)]',

  priceSmall: 'm-0 text-md',

  body: 'block text-xl leading-normal text-[var(--text-on-light-muted)] [&_p]:!mb-4 [&_p:last-child]:!mb-0 [&_ul]:!mt-2 [&_ul]:!mb-0 [&_ul]:!pl-10 [&_ul]:list-disc [&_li]:!mb-2.5',

  bodyHiddenOnMobile: 'hidden lg:block',

  footer: 'mt-5 flex flex-row justify-between md:items-center',

  cta: 'block',
} as const
