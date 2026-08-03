export const promoTier3Styles = {
  inner: 'flex w-full justify-center px-4 md:px-10 wide:px-[180px]',

  card: 'relative w-full max-w-[1440px] overflow-hidden rounded-3xl',

  bgImage: 'absolute inset-0 h-full w-full object-cover',

  overlayGreen:
    'absolute inset-0 pointer-events-none bg-[#79d985] mix-blend-multiply',
  overlayBlue:
    'absolute inset-0 pointer-events-none bg-[rgba(128,217,255,0.43)] mix-blend-hard-light',
  overlayWhite:
    'absolute inset-0 pointer-events-none bg-[rgba(245,245,245,0.58)]',

  content:
    'relative flex flex-col gap-7 px-6 py-8 md:flex-row md:items-end md:justify-between md:gap-6 md:p-8 md:min-h-[328px] lg:items-center lg:px-8 lg:py-3 lg:gap-8 lg:min-h-[232px]',

  textCol: 'flex flex-col items-start gap-5 md:flex-1 md:min-w-0',

  titleBlock: 'flex flex-col items-start gap-3 w-full',

  eyebrow:
    'font-semibold uppercase text-[var(--text-subtle)] whitespace-nowrap',

  title: 'font-bold text-[var(--text-strong)]',

  description: 'text-[var(--text-subtle)]',

  pills: 'flex flex-col gap-2.5 lg:flex-row lg:flex-wrap',

  pill:
    'inline-flex items-center gap-1.5 rounded-2xl border border-[rgba(225,225,230,0.2)] bg-[rgba(255,255,255,0.6)] px-4 py-2 self-start',

  pillIcon: 'h-4 w-4 shrink-0 text-[var(--text-strong)]',

  pillLabel: 'font-medium text-[var(--text-strong)] whitespace-nowrap',

  rightCol:
    'flex flex-col gap-4 items-stretch w-full md:w-auto md:shrink-0 md:items-end',

  priceRow:
    'flex flex-row items-center gap-2 md:flex-col md:items-end md:gap-0',

  // wide:text-4xl is not redundant — utilities are emitted after the @apply'd
  // preset, so md:text-3xl would otherwise cascade past wide.
  price:
    'font-bold text-[var(--text-strong)] tracking-[-0.25px] text-2xl md:text-3xl wide:text-4xl wide:tracking-[-1px]',

  priceCaption: 'text-[var(--text-subtle)]',

  ctaLink: 'inline-block w-full md:w-auto',

  cta:
    'w-full !bg-white !text-[var(--text-strong)] hover:!bg-white/90 !rounded-lg !shadow-none !h-auto !px-6 !py-3 !text-base !leading-6 !font-semibold xl:!text-[20px] xl:!leading-8',
} as const
