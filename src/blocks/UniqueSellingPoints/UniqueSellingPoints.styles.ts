export const uniqueSellingPointsStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas-inverse)] border-b border-[var(--border-on-light)]',

  grid: 'flex w-full snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] min-[1023px]:grid min-[1023px]:grid-cols-4 min-[1023px]:overflow-visible',
  slide: 'w-full shrink-0 snap-start min-[1023px]:w-auto',
  dots: 'min-[1023px]:hidden',

  item: 'flex min-w-0 flex-col items-center text-center p-5 md:px-2.5 md:py-[15px] min-[1023px]:h-full min-[1023px]:px-5 min-[1023px]:pt-[15px] min-[1023px]:pb-5 min-[1023px]:border-r min-[1023px]:border-[var(--border-on-light)]',
  itemHover: 'transition-colors duration-200 ease-in-out hover:bg-[var(--surface-on-light-hover)]',

  icon: 'mb-[5px] size-[90px] object-contain',
  title:
    'mb-[5px] max-w-full [overflow-wrap:anywhere] text-[24px] leading-rf-heading font-normal tracking-normal text-[var(--text-on-light-strong)]',
  description:
    'max-w-full whitespace-pre-line [overflow-wrap:anywhere] text-[20px] leading-[30px] font-normal tracking-normal text-[var(--text-on-light-muted)]',
} as const
