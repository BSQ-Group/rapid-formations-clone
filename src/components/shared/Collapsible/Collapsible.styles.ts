export const collapsibleStyles = {
  list: 'block list-none p-0',

  item: 'mb-5 last:mb-0',

  heading: 'm-0 font-normal',

  trigger:
    'group/collapsible flex w-full cursor-pointer items-center justify-between gap-4 border-b border-[var(--border-on-light)] bg-transparent pb-2.5 text-left transition-all duration-[350ms] hover:border-b-[var(--surface-brand-cyan)] focus-visible:border-b-[var(--surface-brand-cyan)]',
  triggerOpen: 'border-b-transparent hover:border-b-transparent focus-visible:border-b-transparent',

  title:
    'mb-2 min-w-0 break-words text-[24px] leading-rf-h4 font-normal tracking-normal text-[var(--text-on-light-base)] transition-colors duration-[350ms]',
  titleOpen: 'text-[var(--surface-brand-cyan)]',

  iconCircle:
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current text-[var(--text-on-light-muted)] transition-all duration-[350ms] group-hover/collapsible:text-[var(--surface-brand-cyan)] group-focus-visible/collapsible:text-[var(--surface-brand-cyan)]',
  iconCircleOpen:
    'rotate-180 text-[var(--surface-brand-cyan)] group-hover/collapsible:text-[var(--surface-brand-cyan)]',
  icon: 'h-[17px] w-auto',

  panel: 'grid overflow-hidden',
  panelOpen: 'grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in',
  panelClosed: 'grid-rows-[0fr] transition-[grid-template-rows] duration-[350ms] ease-out',
  panelInner: 'min-h-0',
} as const
