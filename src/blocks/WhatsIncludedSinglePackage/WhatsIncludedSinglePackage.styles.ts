export const whatsIncludedSinglePackageStyles = {
  section: [
    'w-full',
    'px-4 md:px-8 lg:px-10 xl:px-10 2xl:px-[180px]',
  ].join(' '),

  inner: [
    'w-full mx-auto',
    'flex flex-col gap-4 md:gap-6 2xl:gap-8',
    'max-w-[704px] lg:max-w-[944px] xl:max-w-[1200px] 2xl:max-w-[1440px]',
  ].join(' '),

  titleBlock: 'w-full flex flex-col items-center md:items-start gap-1.5',
  title:
    'text-[var(--text-strong)] text-center md:text-left text-3xl leading-9 font-bold tracking-[-0.25px]',

  table: [
    'w-full bg-[var(--surface-primary)]',
    'border border-[var(--border-subtle)]',
    'rounded-2xl lg:rounded-3xl',
    'overflow-clip',
    'flex flex-col',
  ].join(' '),

  // Sticky header
  header: [
    'w-full bg-[var(--surface-canvas-inverse)]',
    'flex items-center justify-center md:justify-start',
    'p-4 md:px-6 md:py-0 md:h-16 2xl:h-[88px]',
  ].join(' '),
  headerLabel:
    'text-[var(--text-inverse)] font-semibold text-center md:text-left text-xl leading-7',

  // Feature row — every row carries its own border-b, separating it from
  // both the next feature row AND the CTA row below. The CTA row therefore
  // doesn't add its own border-t to avoid doubling.
  featureRow: [
    'w-full flex items-center',
    'gap-3 md:gap-3',
    'px-6 py-3.5 md:py-4',
    'border-b border-[var(--border-subtle)]',
  ].join(' '),
  featureRowOdd: 'bg-[var(--surface-primary)]',
  featureRowEven: 'bg-[var(--surface-tertiary)]',

  featureContent: 'flex-1 min-w-0 flex items-center gap-3',
  featureTextBlock: 'flex-1 min-w-0 flex flex-col gap-1 overflow-clip',
  featureTitle: 'text-[var(--text-strong)] font-medium text-base leading-6',
  featureDescription: 'text-[var(--text-muted)] font-normal text-sm leading-5',
  featureInfoIconWrap: 'flex items-center shrink-0 py-0.5',

  featureCheckIcon: 'shrink-0 text-[var(--icon-accent)] w-8 h-8',

  // CTA row — separator is provided by the previous feature row's border-b.
  ctaRow: 'w-full bg-[var(--surface-primary)]',
  ctaInner: [
    'w-full flex p-6',
    'flex-col gap-4',
    'lg:flex-row lg:items-center lg:justify-end lg:gap-4',
  ].join(' '),

  ctaContent: [
    'flex w-full',
    'flex-col gap-4 items-center text-center',
    'md:flex-row md:items-start md:justify-between md:gap-3 md:text-left',
    'lg:flex-1 lg:min-w-0 lg:items-start',
  ].join(' '),
  ctaPackageName: [
    'text-[var(--text-strong)] font-semibold tracking-[-0.25px]',
    'text-2xl leading-8',
    'w-full md:w-auto text-center md:text-left',
    'lg:flex-1 lg:min-w-0',
  ].join(' '),

  ctaPrice: 'flex flex-col gap-1 items-center md:items-end justify-center whitespace-nowrap',
  ctaPriceAmount: 'text-[var(--text-strong)] font-bold tracking-[-1px] text-4xl leading-10',
  ctaPriceSubtext: 'text-[var(--text-muted)] font-normal text-sm leading-5',

  ctaButton: 'w-full lg:w-auto lg:shrink-0',
} as const
