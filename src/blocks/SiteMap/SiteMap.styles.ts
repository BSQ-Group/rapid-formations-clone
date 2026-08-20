export const siteMapStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',
  list: 'flex flex-col',
  item: 'mb-[30px] border border-solid border-[var(--border-on-light-tile)] bg-white p-5 shadow-tile-raised transition-shadow duration-200 ease-in-out',
  heading:
    'm-0 block text-[26px] font-normal leading-[1.235] text-[var(--text-on-light-base)] md:text-[28px]',
  links:
    'block text-[20px] leading-normal text-[var(--text-on-light-muted)] [&_ul]:!m-0 [&_ul]:!mt-4 [&_ul]:!p-0 [&_ul]:list-none [&_li]:!mb-2.5 [&_li]:grid [&_li]:grid-cols-[1em_auto] [&_li]:gap-2 [&_li:last-child]:!mb-0 [&_a]:text-[var(--text-on-light-muted)] [&_a]:no-underline [&_a:hover]:text-[var(--text-info)]',
  linkIcon: 'relative top-[6px] size-4 text-[16px] text-[var(--text-on-light-muted)]',
} as const
