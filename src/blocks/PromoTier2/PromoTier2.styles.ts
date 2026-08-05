export const promoTier2Styles = {
  section: 'bg-[var(--text-subtle)]',

  inner:
    'flex w-full max-w-[1440px] mx-auto flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-8 px-4 md:px-8 lg:px-10 wide:px-0',

  left: 'flex items-center gap-8 md:flex-1 md:min-w-0',

  iconTile:
    'shrink-0 flex items-center justify-center size-[88px] rounded-[20px] bg-[rgba(122,122,134,0.3)] border-[0.7px] border-[rgba(225,225,230,0.2)]',

  icon: 'text-[var(--surface-accent)] size-8',

  title: 'text-[var(--text-inverse)] w-full',

  right: 'flex flex-wrap items-center justify-end gap-4 w-full md:w-auto md:shrink-0',

  priceBlock: 'flex flex-col justify-center flex-1 items-start md:flex-none md:items-end',

  pricePrefix: 'text-[var(--text-inverse-subtle)]',

  price: 'text-[var(--text-inverse)] whitespace-nowrap',

  ctaLink: 'inline-block shrink-0',
  cta: 'xl:!text-[20px] xl:!leading-8',
} as const
