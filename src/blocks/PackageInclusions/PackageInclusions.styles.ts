export const packageInclusionsStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  grid: 'grid gap-5 md:gap-10',

  heading:
    'mb-8 block text-left text-2xl font-normal leading-[1.235] tracking-normal text-[var(--text-on-light-base)]',

  list: 'm-0 flex list-none flex-col gap-[26px] p-0 min-[1023px]:block min-[1023px]:columns-2 min-[1023px]:gap-x-[26px]',

  item: 'relative grid break-inside-avoid grid-cols-[36px_auto] gap-5 pl-[5px] pr-2.5 min-[1023px]:mb-[25px] min-[1023px]:min-h-[125px] min-[1023px]:p-0',

  icon: 'mt-[5.6px] size-8 text-[var(--surface-cta-success)]',

  title: 'mb-1 block text-[21px] font-bold leading-[1.35] text-[var(--text-on-light-title)]',

  content:
    'block text-xl leading-normal text-[var(--text-on-light-muted)] [&_p]:!mb-4 [&_ul]:!mb-[15px] [&_ul]:list-disc [&_li]:!mb-[5px] [&_li:last-child]:!mb-0 [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline min-[1023px]:[&_p]:!mb-0 min-[1023px]:[&_p]:pr-[55px]',

  buy: 'mt-5 flex flex-col min-[470px]:flex-row min-[470px]:justify-self-end',

  pricesWrap: 'mr-[6.4px] mb-4 flex flex-col md:mb-0 md:items-end',

  price: 'block text-[38px] font-semibold leading-[1.15] text-[var(--text-on-light-base)]',

  priceNote: 'mt-[-3px] block text-lg font-normal leading-normal text-[var(--text-on-light-base)]',

  buttons: 'mb-4 flex flex-col [&_a]:w-full md:mb-0 md:ml-2 md:[&_a]:h-full md:[&_a]:w-auto',
} as const
