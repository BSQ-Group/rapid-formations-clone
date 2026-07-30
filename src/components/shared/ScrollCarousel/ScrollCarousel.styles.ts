export const scrollCarouselStyles = {
  container: 'flex flex-col gap-8 w-full',
  track:
    'flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&>*]:snap-start',
  trackBleedRight: 'mr-[-16px] md:mr-[-32px] lg:mr-[-40px]',
  trackBleedBoth: 'mr-[-16px] md:mx-[-32px] lg:mx-[-40px]',
  footer: 'flex items-center w-full',
  footerSpacer: 'hidden md:block w-24 flex-shrink-0',
  arrows: 'flex gap-4 flex-shrink-0',
  arrowButton: '[&_svg]:!size-6 !rounded-lg',
} as const
