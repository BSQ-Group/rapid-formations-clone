export const servicePriceBannerStyles = {
  section:
    'font-legacy-condensed flex min-h-[400px] w-full items-center mb-[70px] min-[1023px]:mb-[50px] min-[1590px]:mb-[50px]',

  background: {
    navy: 'bg-[var(--surface-banner-navy)]',
    inverse: 'bg-[var(--surface-canvas-inverse)]',
    cyan: 'bg-[var(--surface-brand-cyan)]',
  },

  columns: 'flex flex-row items-center gap-8 md:gap-16',

  left: 'w-full min-[1023px]:w-auto',

  heading:
    'mb-2 block whitespace-pre-line text-[40px] leading-[46px] font-normal text-[rgb(var(--white))] md:text-[52px] md:leading-[59.8px]',

  subheading:
    'mb-4 block whitespace-pre-line text-2xl leading-9 font-normal tracking-normal text-[rgb(var(--white))]',

  price: 'mb-4 block text-[28px] leading-[42px] font-normal text-[rgb(var(--white))]',

  priceSuffix: 'mt-auto mb-0.5 text-sm leading-[21px]',

  cta: 'w-full md:w-auto',

  right: 'hidden min-w-0 min-[1023px]:flex min-[1023px]:flex-1 min-[1023px]:items-end',

  imageFrame: 'relative flex w-full items-end justify-end',

  imagePicture: 'block w-full max-w-[300px]',

  image: 'block h-auto w-full',

  quote: 'absolute bottom-8 left-0 w-[295px] rounded-lg bg-[var(--surface-canvas)] p-4',

  stars: 'mb-2 flex h-[27px] items-center',

  star: 'h-[18px] w-auto text-[var(--icon-trustpilot-star)]',

  quoteText:
    'block whitespace-pre-line text-lg leading-[27px] font-normal text-[var(--text-on-light-base)]',
} as const
