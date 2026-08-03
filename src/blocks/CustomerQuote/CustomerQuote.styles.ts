export const customerQuoteStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  panel:
    'flex w-full flex-col items-center gap-4 rounded-xl bg-[var(--surface-brand-cyan-wash)] px-3 py-8 md:flex-row md:justify-between md:gap-6 min-[1200px]:gap-8 min-[1200px]:p-8',

  textCol:
    'flex w-full flex-col text-center md:order-first md:flex-1 md:text-right min-[1200px]:max-w-[643px] min-[1200px]:px-4',

  textColSolo: 'md:text-center',

  quoteWrap: 'md:ml-auto md:max-w-[313px] min-[1200px]:max-w-[550px]',

  quoteWrapSolo: 'md:mx-auto',

  quote:
    'block text-[28px] font-semibold leading-[34.58px] text-[rgb(var(--black))] min-[1200px]:text-[36px] min-[1200px]:font-bold min-[1200px]:leading-[44.46px]',

  authorName:
    'mt-6 block text-[21.6px] font-normal leading-[32.4px] text-[var(--text-on-light-base)]',

  authorRole: 'block text-[21.6px] font-normal leading-[32.4px] text-[var(--text-on-light-muted)]',

  imageCol:
    'flex w-full shrink-0 items-center justify-center md:order-last md:h-[302px] md:w-[373px] md:px-6 min-[1200px]:h-[350px]',
  imageWrap: 'relative w-[323px] shrink-0 aspect-square',
  image: 'object-cover',

  posterButton:
    'block aspect-square w-[323px] shrink-0 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--surface-brand-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-brand-cyan-wash)]',

  posterMedia: 'absolute inset-0 transition-opacity duration-150 group-hover:opacity-80',

  playIcon: 'h-[80px] w-[60px] opacity-75',
} as const
