export const stepsItemsStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]',

  list: 'flex flex-col',

  item: 'mb-[30px] block border border-solid border-[color:var(--border-on-light-tile)] bg-white p-5 shadow-tile-raised',

  title:
    'mb-[25px] flex flex-row items-center border-b border-solid border-[color:var(--border-on-light)] pb-2.5 text-left',

  icon: 'mr-[15px] flex min-w-[29px] justify-center text-[23px] leading-normal',

  iconAlignTop: 'mt-1 self-start',

  iconGlyph: 'h-[23px]',

  iconCyan: 'text-[var(--text-brand-cyan)]',

  iconGreen: 'text-[var(--icon-list-check)]',

  iconOrange: 'text-[var(--surface-brand-orange)]',

  iconMagenta: 'text-[var(--icon-step-magenta)]',

  iconBlue: 'text-[var(--border-brand-cyan)]',

  heading:
    'mb-0 block text-[26px] font-normal leading-[1.235] tracking-normal text-[var(--text-on-light-heading)]',

  subtitle: 'ml-6 block text-[21px] font-normal leading-[1.235] text-[var(--text-on-light-muted)]',

  content:
    'block pl-[45px] text-xl leading-normal text-[var(--text-on-light-muted)] [&_p]:!mb-4 [&_ul]:!mb-4 [&_ul]:!pl-0 [&_ul]:list-none [&_ul_ul]:!mt-2.5 [&_li]:!mb-2.5 [&_li]:grid [&_li]:grid-cols-[20px_1fr] [&_li]:gap-2 [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline [&_strong]:text-[var(--text-on-light-strong)]',

  contentIcon: 'mt-1.5 h-4 w-4',
} as const
