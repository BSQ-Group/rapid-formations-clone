export const scholarshipWinnersStyles = {
  wrapper:
    'rounded-[5px] border border-solid border-[color:var(--border-on-light)] p-6 text-center',

  heading:
    'mb-2 block border-b border-solid border-[color:var(--border-on-light)] pb-5 text-[36px] leading-[44.46px] font-normal text-[var(--text-on-light-base)]',

  grid: 'grid grid-cols-1 md:grid-cols-2',

  year: 'mb-2 block text-[26px] leading-[32.11px] font-normal text-[var(--text-on-light-base)] md:text-[28px] md:leading-[34.58px]',

  // The source draws the divider with :after { content: "_____" } rather than an element,
  // so it stays out of the DOM and the accessibility tree. Underscores are escaped because
  // Tailwind reads a bare _ in an arbitrary value as a space.
  winner:
    "mb-4 after:mb-[15px] after:block after:text-lg after:leading-[27px] after:text-[var(--text-on-light-base)] after:content-['\\_\\_\\_\\_\\_']",

  name: 'mb-2 block text-2xl leading-[32.4px] font-normal tracking-normal text-[var(--text-on-light-base)]',

  detail: 'block text-lg leading-[27px] font-normal text-[var(--text-on-light-base)]',
} as const
