export const servicesBenefitsStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  header: 'mb-8 flex w-full flex-col text-center',

  heading:
    'mb-2 block break-words whitespace-pre-line text-[36px] leading-[44.46px] font-normal tracking-normal text-[var(--text-on-light-base)]',

  subheading:
    'block whitespace-pre-line text-2xl leading-[32.4px] font-normal tracking-normal text-[var(--text-on-light-muted)]',

  grid: 'flex flex-col gap-6 md:grid md:grid-cols-2 md:items-start md:gap-16',

  items: 'flex flex-col gap-6',

  item: 'grid grid-cols-[50px_auto] gap-4',

  icon: 'flex h-10 w-10 items-center justify-center rounded-[50%] bg-[var(--surface-brand-cyan)]',

  iconGlyph: 'h-[18px] w-auto text-[rgb(var(--white))]',

  itemTitle:
    'mb-2 block text-2xl leading-[29.64px] font-normal tracking-normal text-[var(--text-on-light-base)]',

  itemBody:
    'mb-4 block whitespace-pre-line text-xl leading-[30px] font-normal text-[var(--text-on-light-muted)]',

  image: 'block h-auto w-full',
} as const
