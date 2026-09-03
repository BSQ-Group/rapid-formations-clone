export const styles = {
  content:
    'font-legacy-condensed max-h-[750px] w-full max-w-[720px] overflow-hidden bg-[var(--surface-canvas)] pt-12 pb-8 pl-8 pr-0 text-[var(--text-on-light-base)] sm:max-w-[720px]',
  closeWrap: 'absolute right-[15px] top-[15px] z-10',
  close:
    'block cursor-pointer text-[var(--icon-dialog-close)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',
  closeIcon: 'h-7 w-auto',
  updated: 'block text-[18px] font-bold leading-normal text-[var(--text-on-light-strong)]',
  scroller: 'max-h-[600px] overflow-y-scroll',
  heading:
    'mb-2 mt-4 block text-[28px] font-normal leading-[1.235] text-[var(--text-on-light-base)]',
  intro: 'mr-8 mb-4 block text-base leading-normal text-[var(--text-on-light-muted)]',
  list: 'm-0 list-none p-0',
  item: 'border-b border-solid border-[var(--border-on-light)] py-2 text-base text-[var(--text-on-light-muted)]',
} as const
