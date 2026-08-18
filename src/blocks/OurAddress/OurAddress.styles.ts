export const ourAddressStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  headingWrap: 'mb-8',
  heading:
    'mb-2 block text-center text-4xl font-normal leading-[1.235] tracking-normal text-[var(--text-on-light-base)]',

  compact: {
    wrap: 'w-full md:mx-auto md:max-w-[50%]',
    card: 'grid w-full grid-cols-1 border border-solid border-[color:var(--border-on-light)] md:grid-rows-[250px_250px] md:gap-5 min-[1023px]:grid-cols-[6fr_3fr] min-[1023px]:grid-rows-1 min-[1023px]:gap-2.5',
    imageWrap:
      'relative h-[225px] w-full md:h-[250px] min-[1023px]:h-auto min-[1023px]:aspect-[var(--photo-aspect)] min-[1023px]:w-[375px] min-[1023px]:max-w-full',
    image: 'object-cover',
    content: 'flex flex-col p-[15px]',
    address:
      'block whitespace-pre-line text-md leading-normal text-[var(--text-on-light-muted)] md:mb-2.5',
    footer: 'mt-2.5 flex flex-col md:mt-auto',
    price: 'block text-lg font-bold leading-normal text-[var(--text-on-light-base)]',
    priceSmall: 'text-lg font-normal leading-normal',
    cta: 'mt-[15px] self-start',
  },

  feature: {
    wrap: 'w-full',
    card: 'mx-auto grid w-full gap-5 border border-solid border-[color:var(--border-on-light-tile)] bg-[var(--surface-on-light-canvas)] px-5 py-[30px] md:grid-cols-[450px_auto] min-[1023px]:w-4/5 min-[1023px]:grid-cols-[600px_auto]',
    imageWrap: 'relative h-[250px] w-full md:h-[400px]',
    image: 'object-cover',
    content: 'flex flex-col justify-between min-[1023px]:px-4',
    label: 'mb-2 block text-[32px] font-normal leading-[1.235] text-[var(--text-on-light-base)]',
    address:
      'block whitespace-pre-line text-md leading-normal text-[var(--text-on-light-base)] md:text-xl md:leading-normal',
    footer: 'flex flex-col',
    price:
      'mb-2 block text-xl font-normal leading-normal text-[var(--text-on-light-base)] md:text-[32px]',
    priceSmall: 'text-[18.4px] font-normal leading-normal',
    cta: 'w-3/5 self-start',
  },
} as const
