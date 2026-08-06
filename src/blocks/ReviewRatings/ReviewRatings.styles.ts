export const reviewRatingsStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]',

  header: 'mb-8 w-full flow-root',

  heading:
    'mb-2 block text-center text-[36px] font-normal leading-[1.235] text-[var(--text-on-light-base)]',

  subheading:
    'mb-[30px] block text-center text-[18px] font-normal leading-normal text-[var(--text-on-light-muted)] md:mb-[50px] min-[1023px]:mb-10',

  trackWrap: 'mx-auto mb-[30px] w-full min-[1023px]:w-1/2',

  track:
    'flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',

  slide: 'w-full shrink-0 snap-start md:w-1/2',

  ctaWrap: 'flex justify-center pt-2',

  cta: 'w-full md:w-auto',
} as const
