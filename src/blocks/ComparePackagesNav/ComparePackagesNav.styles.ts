export const comparePackagesNavStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',
  list: 'm-0 flex items-start gap-[3px] overflow-x-auto p-0 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:-mb-px md:block',
  tab: 'block cursor-pointer whitespace-nowrap border border-solid border-[var(--surface-brand-cyan)] bg-[var(--surface-brand-cyan)] px-5 py-2 text-[17px] font-normal leading-normal text-white no-underline md:mr-0.5 md:inline-block md:rounded-t-md md:text-[18px]',
  tabActive: 'border-[var(--border-compare-packages)] bg-white text-[var(--text-brand-cyan)]',
} as const
