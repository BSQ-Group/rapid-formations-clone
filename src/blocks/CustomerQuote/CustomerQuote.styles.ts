export const customerQuoteStyles = {
  section: 'font-legacy-condensed w-full',

  panel:
    'flex w-full flex-col-reverse overflow-hidden rounded-xl border border-transparent bg-[var(--surface-brand-cyan-wash)] px-3 py-8 md:grid md:grid-cols-[1.5fr_1fr] md:gap-8 min-[1200px]:p-8',

  panelSolo: 'md:grid-cols-1',

  textCol:
    'flex flex-col items-center justify-around pt-4 text-center md:items-end md:p-4 md:text-right',

  textColSolo: 'md:items-center md:text-center',

  quote:
    'my-6 block text-[28px] font-semibold leading-[34.58px] text-[rgb(var(--black))] md:my-0 min-[1200px]:mb-6 min-[1200px]:w-[90%] min-[1200px]:text-[36px] min-[1200px]:font-bold min-[1200px]:leading-[44.46px]',

  authorName: 'block text-[21.6px] font-normal leading-[32.4px] text-[var(--text-on-light-base)]',

  authorRole: 'text-[21.6px] font-normal leading-[32.4px] text-[var(--text-on-light-muted)]',

  imageCol:
    'flex h-full items-center justify-center self-center justify-self-center min-[1200px]:p-6',

  imageWrap: 'relative size-[325px] overflow-hidden rounded-xl border border-transparent',

  image: 'object-cover object-center',

  posterButton:
    'block h-[300px] w-[325px] overflow-hidden rounded-xl border border-transparent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--surface-brand-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-brand-cyan-wash)]',

  posterMedia:
    'absolute inset-x-0 top-0 h-[323px] transition-opacity duration-150 group-hover:opacity-80',

  playIcon: 'h-[80px] w-[60px] opacity-75',
} as const
