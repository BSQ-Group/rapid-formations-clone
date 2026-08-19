export const serviceContentStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  root: 'flex flex-col',

  split: 'min-[1023px]:grid min-[1023px]:grid-cols-2 min-[1023px]:gap-[30px]',

  column: '[&>div:first-child_h3]:!mt-0 max-[1022px]:[&>aside+div_h3]:!mt-0',

  item: 'mb-[30px] min-[1023px]:last:mb-0',

  cardsLead: 'flex flex-col min-[1023px]:hidden',
  cardsAside: 'hidden min-[1023px]:flex min-[1023px]:flex-col',
  cardsTrail: 'hidden min-[1023px]:flex min-[1023px]:flex-col',

  columnDesktopOnly: 'hidden min-[1023px]:block',

  card: 'mb-8 last:mb-14',

  cardCompact: 'mb-8 last:mb-14 min-[1023px]:last:mb-10 min-[1590px]:last:mb-3',

  cardMobile:
    'mb-8 last:mb-14 !border-0 !border-b !border-solid !border-[color:var(--border-on-light)]',

  content:
    'block text-xl leading-normal text-[var(--text-on-light-muted)] [&_h3]:!mt-8 [&_h3]:!mb-5 [&_h3]:text-[23px] [&_h3]:leading-[1.235] [&_h3]:font-normal [&_h3]:text-[var(--text-on-light-base)] [&_h4]:!mt-[27.2px] [&_h4]:!mb-[17.6px] [&_h4]:text-[20.8px] [&_h4]:leading-[1.235] [&_h4]:font-normal [&_h4]:text-[var(--text-on-light-base)] [&_p]:!mb-4 [&_ul]:!mb-4 [&_ol]:!mb-4 [&_p:last-child]:!mb-0 [&_li]:!mb-0 [&_ol]:!pl-[15px] [&_ol>li]:pl-2 [&_blockquote]:my-[18px] [&_blockquote]:mr-10 [&_blockquote]:ml-5 [&_blockquote_p]:!mb-0 [&_strong]:text-[var(--text-on-light-strong)]',

  bulleted: '[&_ul]:list-disc [&_ul]:!pl-0 [&_li]:ml-4',

  iconList:
    '[&_ul]:list-none [&_ul]:!pl-0 [&_li]:ml-4 [&_li]:!mb-2.5 [&_li]:grid [&_li]:grid-cols-[20px_1fr] [&_li]:gap-2',

  icon: 'mt-1.5 h-4 w-4',

  iconInherit: 'text-[var(--text-on-light-muted)]',

  iconGreen: 'text-[var(--icon-list-check)]',

  iconSubtle: 'text-[var(--text-on-light-subtle)]',
} as const
