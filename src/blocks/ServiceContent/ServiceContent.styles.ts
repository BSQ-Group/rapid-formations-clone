export const serviceContentStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  root: 'flex flex-col',

  split: 'min-[1023px]:grid min-[1023px]:grid-cols-2 min-[1023px]:gap-[30px]',

  column: 'flex flex-col [&>*:first-child_h3]:!mt-0',

  item: 'mb-[30px] min-[1023px]:last:mb-0',

  content:
    'block text-xl leading-normal text-[var(--text-on-light-muted)] [&_h3]:!mt-8 [&_h3]:!mb-5 [&_h3]:text-[23px] [&_h3]:leading-[1.235] [&_h3]:font-normal [&_h3]:text-[var(--text-on-light-base)] [&_h4]:!mt-[27.2px] [&_h4]:!mb-[17.6px] [&_h4]:text-[20.8px] [&_h4]:leading-[1.235] [&_h4]:font-normal [&_h4]:text-[var(--text-on-light-base)] [&_p:last-child]:!mb-0 [&_li]:!mb-2.5',

  bulleted: '[&_ul]:list-disc [&_ul]:!pl-0 [&_li]:ml-4',

  iconList:
    '[&_ul]:list-none [&_ul]:!pl-0 [&_li]:ml-4 [&_li]:grid [&_li]:grid-cols-[20px_1fr] [&_li]:gap-2',

  icon: 'mt-1.5 h-4 w-4',

  iconInherit: 'text-[var(--text-on-light-muted)]',

  iconGreen: 'text-[var(--icon-list-check)]',

  iconSubtle: 'text-[var(--text-on-light-subtle)]',
} as const
