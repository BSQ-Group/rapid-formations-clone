export const howItWorksListStyles = {
  section: 'flex flex-col items-center w-full px-4 md:px-8 lg:px-10',

  container:
    'flex flex-col gap-6 w-full md:flex-row md:items-start md:gap-6 md:justify-between xl:max-w-[1200px] wide:max-w-[1440px]',

  stepsCol:
    'flex flex-col gap-6 w-full md:flex-1 md:min-w-0 wide:flex-none wide:w-[708px] wide:shrink-0',
  includedCol:
    'flex flex-col gap-6 w-full md:flex-1 md:min-w-0 wide:flex-none wide:w-[464px] wide:shrink-0',

  heading: 'w-full font-bold md:font-bold text-[var(--text-strong)] wide:leading-[56px]',

  list: 'flex flex-col gap-4 w-full',

  stepRow: 'flex items-start gap-3 w-full',
  stepNumber: 'shrink-0 w-6 font-semibold text-[var(--text-strong)]',
  stepText: 'flex-1 min-w-0 text-[var(--text-muted)] wide:leading-6',

  includedRow: 'flex items-start gap-3 w-full',
  iconBubble:
    'shrink-0 flex items-center justify-center size-8 rounded-full bg-[var(--surface-accent-light)]',
  iconCheck: 'text-[var(--icon-accent)]',
  includedText: 'flex-1 min-w-0 text-[var(--text-muted)] wide:leading-6',
} as const
