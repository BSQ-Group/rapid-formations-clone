export const registeredOfficePurposeStyles = {
  section: 'flex flex-col items-center justify-center w-full gap-14 px-4 md:gap-14 md:px-8 lg:gap-10 lg:px-0 xl:gap-14',
  titleWrap: 'flex flex-col items-start w-full min-h-[132px] md:min-h-[100px] lg:min-h-[92px] lg:w-[780px] lg:max-w-[780px]',
  title: 'text-[var(--text-strong)] text-center w-full font-bold md:font-bold lg:font-extrabold leading-9 md:leading-10 lg:leading-[56px]',
  grid: 'flex flex-col items-start w-full gap-8 md:gap-8 lg:gap-10 lg:w-auto',
  row: 'flex flex-col items-start w-full gap-8 md:flex-row md:gap-6 md:items-start lg:gap-10',
  item: 'flex items-start gap-4 w-full md:flex-1 md:min-w-0 lg:w-[376px] lg:flex-none lg:min-w-0',
  iconWrap: 'flex items-center justify-center shrink-0 p-3 rounded-lg bg-[var(--icon-background-accent)]',
  icon: 'size-6 text-[var(--icon-muted)]',
  body: 'flex-1 min-w-0 text-[var(--text-subtle)]',
} as const
