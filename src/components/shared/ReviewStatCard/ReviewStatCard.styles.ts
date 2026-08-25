export const reviewStatCardStyles = {
  card: 'flex h-full flex-col pb-[5px] text-center no-underline hover:bg-[var(--surface-review-card-hover)]',

  logoWrap: 'm-auto flex min-h-[90px] items-center justify-center',

  logo: 'h-[50px] w-[200px] max-w-full object-contain',

  stars: 'mx-auto flex h-8',

  rating: 'block text-[20px] font-normal leading-normal text-[var(--text-on-light-muted)]',

  ratingScore: 'font-bold',

  reviews:
    'block px-2.5 pb-5 pt-[5px] text-[20px] font-normal leading-normal text-[var(--text-on-light-muted)]',
} as const
