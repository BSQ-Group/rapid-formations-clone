export const serviceTextStyles = {
  section:
    'w-full px-5 md:px-10 wide:px-0 pt-20 lg:pt-24 pb-10 md:pb-12 xl:pb-20',

  container:
    'w-full mx-auto lg:max-w-[1200px] wide:max-w-[1440px] flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-6',

  copyCol:
    'flex flex-col gap-8 w-full lg:flex-1 lg:max-w-[486px] wide:max-w-[585px]',
  title: 'font-extrabold text-[var(--text-strong)] md:tracking-[-1.5px] lg:leading-[56px]',
  description: 'font-medium leading-6 text-[var(--text-subtle)]',

  listCol:
    'flex flex-col gap-8 lg:gap-4 w-full lg:w-[462px] lg:shrink-0 xl:w-[486px] wide:w-[585px]',
  listTitle: 'font-bold text-[var(--text-strong)] w-full text-left',

  itemsWrap:
    'w-full flex flex-col gap-4 md:flex-row md:gap-4 md:items-start lg:flex-col lg:gap-4',
  itemsColumn: 'flex flex-col gap-4 w-full md:flex-1 md:min-w-0',

  itemRow: 'flex items-start gap-3 w-full lg:items-center',

  iconBubble:
    'shrink-0 flex items-center justify-center size-8 rounded-full bg-[var(--surface-accent-light)]',
  iconCheck: 'text-[var(--icon-accent)]',

  itemText: 'flex-1 min-w-0 leading-6 text-[var(--text-muted)]',
} as const
