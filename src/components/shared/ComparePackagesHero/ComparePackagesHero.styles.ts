export const styles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  grid: 'flex flex-col justify-between md:grid md:grid-cols-[3fr_1fr] md:items-start md:gap-8',

  heading:
    'mt-0 mb-2.5 block text-[28px] font-normal leading-[1.15] text-[var(--text-on-light-base)] md:text-[36px]',

  body: 'block text-[18px] leading-normal text-[var(--text-on-light-muted)] md:text-[21px] [&_p]:!mb-0 [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline',
} as const
