export const ratingStarsStyles = {
  wrap: 'relative inline-flex w-fit items-start',
  row: 'flex items-start',
  fill: 'absolute inset-y-0 left-0 overflow-hidden',
  star: 'size-[27px] shrink-0',
  starFilled: 'text-[var(--icon-rating-filled)]',
  starEmpty: 'text-[var(--icon-rating-empty)]',
} as const
