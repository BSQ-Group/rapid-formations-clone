export const faqTopicStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] pt-[70px] mb-[50px] min-[1023px]:pt-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]',

  grid: 'grid w-full grid-cols-1 gap-5 md:grid-cols-2 min-[1590px]:grid-cols-4',

  card: 'mb-[25px] border border-[var(--border-on-light-tile)] bg-[var(--surface-canvas)] md:mb-0',

  link: 'group/card grid h-full grid-rows-[auto_1fr] text-[var(--text-on-light-muted)] no-underline',

  imageWrap: 'max-h-40 overflow-hidden',

  image: 'block h-auto w-full transition-opacity duration-150 group-hover/card:opacity-70',

  body: 'block bg-[var(--surface-on-light-tile)]',

  title:
    'flex h-full min-h-[75px] w-full items-center justify-center whitespace-pre-line px-[15px] text-center text-[21px] font-normal leading-[1.235] text-[var(--text-on-light-base)]',
} as const
