export const RATING_STAR_SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const
export const RATING_STAR_TONES = [
  'default',
  'light',
  'gold',
  'trustpilot',
  'google',
  'facebook',
  'yell',
  'freeindex',
] as const

export type RatingStarSize = (typeof RATING_STAR_SIZES)[number]
export type RatingStarTone = (typeof RATING_STAR_TONES)[number]

export const ratingStarsStyles = {
  wrap: 'relative inline-flex w-fit items-start',
  row: 'flex items-start',
  fill: 'absolute inset-y-0 left-0 overflow-hidden',
  star: 'shrink-0',

  size: {
    xs: 'size-[18px]',
    sm: 'size-[21px]',
    md: 'size-[25px]',
    lg: 'size-[27px]',
    xl: 'size-[30px]',
  } satisfies Record<RatingStarSize, string>,

  tone: {
    default: 'text-[var(--icon-rating-filled)]',
    light: 'text-[rgb(var(--white))]',
    gold: 'text-[var(--icon-rating-google)]',
    trustpilot: 'text-[var(--icon-rating-trustpilot)]',
    google: 'text-[var(--icon-rating-google)]',
    facebook: 'text-[var(--icon-rating-facebook)]',
    yell: 'text-[var(--icon-rating-yell)]',
    freeindex: 'text-[var(--icon-rating-freeindex)]',
  } satisfies Record<RatingStarTone, string>,

  starEmpty: 'text-[var(--icon-rating-empty)]',
} as const
