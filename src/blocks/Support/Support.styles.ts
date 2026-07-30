export const supportStyles = {
  section:
    'flex flex-col gap-6 w-full px-4 md:px-8 lg:px-10 wide:px-0 max-w-[1200px] xl:max-w-[1440px] mx-auto',
  header: 'flex flex-col',
  heading: 'text-[var(--text-strong)]',
  imageWrapper:
    'relative w-full overflow-hidden rounded-lg md:rounded-3xl aspect-[358/155] md:aspect-[704/318] lg:aspect-[1064/356] xl:aspect-[1440/401]',
  image: 'object-cover object-[50%_12%]',
  statsList: 'grid grid-cols-1 xl:grid-cols-4 gap-4',
  statItem:
    'flex flex-row items-center justify-between flex-row-reverse xl:flex-col xl:items-start xl:justify-start gap-3 border-t border-[var(--border-strong)] first:border-t-0 xl:border-t-0 pt-6 pb-2',
  statLabel: 'font-medium text-[var(--text-muted)]',
  statValue: 'text-[var(--text-strong)]',
} as const
