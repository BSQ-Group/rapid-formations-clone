export const collapsibleStyles = {
  list: 'block list-none p-0',

  item: 'mb-5 last:mb-0',

  heading: 'm-0 font-normal',

  trigger:
    'group/collapsible flex w-full cursor-pointer items-center justify-between border-b border-[var(--border-on-light)] bg-transparent pb-2.5 text-left transition-all duration-350 ease-legacy hover:border-b-[var(--surface-brand-cyan)] focus-visible:border-b-[var(--surface-brand-cyan)]',
  triggerOpen: 'border-b-0 hover:border-b-0 focus-visible:border-b-0',

  title:
    'mb-2 min-w-0 break-words text-[24px] leading-[32.4px] font-normal tracking-normal text-[var(--text-on-light-base)] transition-colors duration-350 ease-legacy',
  titleOpen: 'text-[var(--surface-brand-cyan)]',

  iconCircle:
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current text-[var(--text-on-light-muted)] transition-all duration-350 ease-legacy group-hover/collapsible:text-[var(--surface-brand-cyan)] group-focus-visible/collapsible:text-[var(--surface-brand-cyan)]',
  iconCircleOpen:
    'rotate-540 text-[var(--surface-brand-cyan)] group-hover/collapsible:text-[var(--surface-brand-cyan)]',
  icon: 'h-[17px] w-auto',

  panel: 'overflow-hidden',
  panelOpen: 'max-h-[2000px] transition-[max-height] duration-500 ease-in',
  panelClosed: 'max-h-0 transition-[max-height] duration-350 ease-out',
} as const
