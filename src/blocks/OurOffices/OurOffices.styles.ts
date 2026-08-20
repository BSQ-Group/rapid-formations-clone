export const ourOfficesStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] text-[18px] leading-[27px] text-[var(--text-on-light-base)]',
  titleWrap: 'mb-[25px] border-b border-solid border-[var(--border-on-light)] pb-2.5',
  heading:
    'mb-2 block whitespace-pre-line break-words text-[36px] font-normal leading-[1.235] text-[var(--text-on-light-base)]',
  grid: 'grid w-full gap-5 md:grid-cols-[1fr_1fr]',
  office:
    'grid gap-0 border border-solid border-[var(--border-on-light-tile)] bg-white md:grid-cols-[6fr_4fr] md:gap-2.5',
  imageWrap: 'md:w-[338px]',
  image: 'h-[300px] w-full object-cover object-[var(--photo-focus)] md:w-[338px]',
  content: 'flex flex-col p-[15px]',
  address:
    'm-0 block min-h-[125px] whitespace-pre-line text-[20px] leading-[30px] text-[var(--text-on-light-muted)] md:mb-2.5',
  linkWrap: 'flex flex-row items-center',
  marker: 'mr-2 h-[18px] w-auto text-[var(--icon-map-marker)]',
  link: 'block text-[18px] font-bold leading-[27px] text-[var(--text-on-light-muted)] no-underline hover:text-[var(--text-brand-cyan)]',
} as const
