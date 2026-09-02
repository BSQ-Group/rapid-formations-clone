export const ourOfficesStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] text-[18px] leading-[27px] text-[var(--text-on-light-base)]',

  titleWrap: 'mb-10 text-center',

  heading:
    'block whitespace-pre-line break-words text-[36px] font-normal leading-[1.235] text-[var(--text-on-light-base)]',

  grid: 'mx-auto grid w-full gap-5 md:max-w-[50%]',

  office:
    'flex flex-col border border-solid border-[var(--border-on-light-tile)] bg-[var(--surface-on-light-panel)] p-[15px]',

  address:
    'm-0 mb-[15px] block whitespace-pre-line text-[20px] leading-[30px] text-[var(--text-on-light-muted)]',

  mediaBox: 'border border-solid border-[var(--border-on-light)] bg-white p-2',

  imageWrap: 'mb-2 block last:mb-0',

  image:
    'block h-[200px] w-full object-cover object-[var(--photo-focus)] min-[1023px]:h-[300px] min-[1200px]:h-[352px]',

  imageSizes: '(min-width: 1200px) 535px, (min-width: 768px) 46vw, 100vw',

  linkWrap: 'mt-[15px] flex flex-row items-center',

  marker: 'mr-2 h-[18px] w-auto text-[var(--icon-map-marker)]',

  link: 'block text-[18px] font-bold leading-[27px] text-[var(--text-on-light-muted)] no-underline hover:text-[var(--text-brand-cyan)]',
} as const
