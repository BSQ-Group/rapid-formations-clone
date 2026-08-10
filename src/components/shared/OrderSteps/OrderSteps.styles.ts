export const orderStepsStyles = {
  list: 'flex flex-nowrap items-center gap-4 overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mb-4 md:snap-none md:overflow-x-visible min-[1023px]:mb-0',
  step: 'flex-[0_0_40%] snap-center text-center text-[var(--text-on-light-base)] transition-opacity duration-200 [transition-timing-function:ease] md:flex-1 md:snap-align-none md:transition-none',
  stepActive: 'text-[var(--icon-step-complete)] opacity-55 md:opacity-100',
  stepCurrent: 'text-[var(--icon-step-complete)] opacity-100',
  iconFrame: 'text-2xl leading-normal',
  icon: 'inline-block h-6 w-auto align-[-0.125em]',
  label: 'text-lg leading-normal',
  labelDesktop: 'hidden md:block',
  labelMobile: 'block whitespace-pre-line md:hidden',
  arrow:
    'flex flex-none items-center justify-center text-xl leading-normal text-[var(--text-on-light-muted)]',
  arrowActive: 'text-[var(--icon-step-complete)]',
  arrowIcon: 'h-5 w-auto',
} as const
