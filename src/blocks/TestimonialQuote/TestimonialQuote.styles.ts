export const testimonialQuoteStyles = {
  section: 'font-legacy-condensed w-full',

  box: 'border border-solid border-[color:var(--border-on-light-tile)] bg-[var(--surface-on-light-canvas)] px-5 py-[30px]',

  wrapper: 'text-center font-normal',

  iconWrap: 'mb-4 block text-[31px] leading-normal text-[var(--text-info)]',

  icon: 'inline-block h-[31px] w-[27px] align-baseline',

  comment:
    'mb-8 text-[21px] font-normal text-[var(--text-on-light-muted)] min-[1023px]:text-[28px] min-[1023px]:font-light',

  author:
    'relative mb-[5px] text-[21px] text-[var(--text-on-light-muted)] before:mr-[15px] before:inline-block before:h-px before:w-[50px] before:align-middle before:bg-[var(--border-brand-cyan)] before:content-[""] after:ml-[15px] after:inline-block after:h-px after:w-[50px] after:align-middle after:bg-[var(--border-brand-cyan)] after:content-[""] min-[470px]:before:w-[90px] min-[470px]:after:w-[90px] md:before:w-[125px] md:after:w-[125px]',

  brand: 'mt-[5px] mb-5 text-xl leading-normal uppercase text-[var(--text-on-light-muted)]',
} as const
