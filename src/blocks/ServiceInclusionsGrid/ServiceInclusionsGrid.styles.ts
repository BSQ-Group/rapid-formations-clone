export const serviceInclusionsGridStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  header: 'mb-8 flex w-full flex-col text-center',

  heading:
    'mb-2 block break-words whitespace-pre-line text-[36px] leading-[44.46px] font-normal text-[var(--text-on-light-base)]',

  grid: 'flex flex-col gap-6 md:grid md:grid-cols-3',

  item: 'rounded-lg border border-solid border-[color:var(--border-on-light)] px-6 py-4',

  iconPicture: 'mb-[7px] block',

  icon: 'block size-20 object-cover',

  itemTitle:
    'mb-2 block break-words text-xl leading-[24.7px] font-semibold text-[var(--text-on-light-base)]',

  itemBody:
    'block break-words whitespace-pre-line text-xl leading-[30px] font-normal text-[var(--text-on-light-muted)]',
} as const
