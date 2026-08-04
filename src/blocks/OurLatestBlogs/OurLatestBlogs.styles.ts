export const ourLatestBlogsStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  heading:
    'mb-2 block whitespace-pre-line break-words text-center text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  grid: 'mt-10 grid grid-cols-1 gap-5 md:grid-cols-3',

  card: 'flex min-h-[375px] flex-col border border-[var(--border-on-light)]',

  cardImage: 'aspect-[2/1] h-auto w-full object-cover',

  cardBody: 'block h-full min-h-[235px] p-6',

  cardTitle: 'mb-2 block min-h-[65px] break-words text-[26px] font-normal leading-[32.11px]',

  cardTitleLink:
    'text-[var(--text-on-light-base)] no-underline hover:text-[var(--text-on-light-link-hover)]',

  cardDescription:
    'mb-4 line-clamp-3 break-words text-[20px] font-normal leading-[30px] text-[var(--text-on-light-muted)]',

  cardCtaWrap: 'flex flex-col justify-center pt-4 md:flex-row',

  ctaWrap: 'mt-12 flex flex-col justify-center md:flex-row',

  viewBlogCta: 'w-full md:w-auto',
} as const
