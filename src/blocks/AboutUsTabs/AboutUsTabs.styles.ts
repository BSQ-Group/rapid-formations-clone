export const aboutUsTabsStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  wrapperPad: 'pt-10 min-[1023px]:py-0',

  title:
    'mb-[30px] block text-[36px] leading-[44.46px] font-normal text-[var(--text-on-light-base)]',

  titlePageHeading: 'text-[38px] leading-[43.7px]',

  list: 'm-0 mb-[50px] grid grid-cols-2 gap-x-0.5 gap-y-[3px] p-0 min-[1023px]:block min-[1023px]:border-b min-[1023px]:border-solid min-[1023px]:border-[color:var(--border-on-light)]',

  tab: 'cursor-pointer px-5 py-2 text-center text-[17px] leading-[25.5px] focus-visible:ring-4 focus-visible:ring-[var(--border-focus)] focus-visible:outline-none md:mr-0.5 md:rounded-t md:text-lg md:leading-[27px] min-[1023px]:inline-block min-[1023px]:text-left',

  tabIdle: 'border-0 bg-[var(--surface-brand-cyan)] font-normal text-[rgb(var(--white))]',

  tabActive:
    'border border-b-0 border-solid border-[color:var(--border-compare-packages)] bg-[rgb(var(--white))] font-bold text-[var(--text-brand-cyan)]',

  panel: 'focus-visible:ring-4 focus-visible:ring-[var(--border-focus)] focus-visible:outline-none',
} as const
