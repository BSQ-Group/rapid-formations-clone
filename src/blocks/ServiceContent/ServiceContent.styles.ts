export const serviceContentStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  root: 'flex flex-col',

  split: 'min-[1023px]:grid min-[1023px]:grid-cols-2 min-[1023px]:gap-[30px]',

  column: 'max-[1023px]:[&>aside+div_h3]:!mt-0',

  columnFlush: '[&>div:first-child_h3]:!mt-0',

  columnFlushStacked: 'max-[1022px]:[&>div:first-child_h3]:!mt-0',

  item: 'mb-[30px] min-[1023px]:last:mb-0',

  cardsLead: 'flex flex-col lg:hidden',
  cardsAside: 'hidden lg:flex lg:flex-col',
  cardsTrail: 'hidden lg:flex lg:flex-col',

  columnDesktopOnly: 'hidden lg:block',

  card: 'mb-8 last:mb-14',

  cardCompact: 'mb-8 last:mb-14 min-[1023px]:last:mb-10 min-[1590px]:last:mb-3',

  cardMobile:
    'mb-8 last:mb-14 !border-0 !border-b !border-solid !border-[color:var(--border-on-light)]',

  formPanel:
    'border border-solid border-[color:var(--border-on-light-tile)] bg-[var(--surface-on-light-canvas)] p-5 [&_form]:mt-[18px]',

  formPanelHeading:
    'mb-2 block text-[24px] leading-[32.4px] font-normal text-[var(--text-on-light-base)]',

  content:
    'block text-xl leading-normal text-[var(--text-on-light-muted)] [&_h3]:!mt-8 [&_h3]:!mb-5 [&_h3]:text-[23px] [&_h3]:leading-[1.235] [&_h3]:font-normal [&_h3]:text-[var(--text-on-light-base)] [&_h4]:!mt-[27.2px] [&_h4]:!mb-[17.6px] [&_h4]:text-[20.8px] [&_h4]:leading-[1.35] [&_h4]:font-normal [&_h4]:text-[var(--text-on-light-base)] [&_p]:!mb-4 [&_ul]:!mb-4 [&_ol]:!mb-4 [&_p:last-child]:!mb-0 [&_li]:!mb-0 [&_ol]:!pl-[15px] [&_ol>li]:pl-2 [&_blockquote]:my-[18px] [&_blockquote]:mr-10 [&_blockquote]:ml-5 [&_blockquote_p]:!mb-0 [&_strong]:text-[var(--text-on-light-strong)]',

  leadHeading:
    '[&_h3:first-of-type]:text-[26px] md:[&_h3:first-of-type]:text-[28px] lg:[&_h3:first-of-type]:text-[23px]',

  bulleted: '[&_ul]:list-disc [&_ul]:!pl-0 [&_li]:ml-4',

  iconList:
    '[&_ul]:list-none [&_ul]:!pl-0 [&_li]:ml-4 [&_li]:!mb-2.5 [&_li]:grid [&_li]:grid-cols-[20px_1fr] [&_li]:gap-2',

  icon: 'mt-1.5 h-4 w-4',

  iconInherit: 'text-[var(--text-on-light-muted)]',

  iconGreen: 'text-[var(--icon-list-check)]',

  iconSubtle: 'text-[var(--text-on-light-subtle)]',
} as const
