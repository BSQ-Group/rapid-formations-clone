export const glossaryStyles = {
  section:
    'font-legacy-condensed flex w-full flex-col bg-[var(--surface-canvas)] mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]',

  root: 'w-full flow-root mb-[30px]',

  tabList:
    'mb-8 grid list-none grid-cols-4 pl-0 min-[470px]:flex min-[470px]:flex-row min-[470px]:flex-nowrap min-[470px]:justify-between',

  tabItem: 'list-none min-[470px]:flex-auto',

  tab: 'block w-full border border-solid border-white bg-[var(--surface-brand-cyan)] p-4 text-center text-xl leading-normal font-normal text-white',

  tabActive: 'bg-[var(--surface-cta-retry)] font-semibold',

  tabFirst: 'border-l-0',

  tabLast: 'border-r-0',

  tabLabel: 'block',

  letterGroup: 'mt-8 first:mt-0',

  letterHeading: 'mb-5 border-b border-solid border-[color:var(--border-on-light)]',

  letterChip:
    'mb-[15px] inline-block w-12 rounded-[5px] bg-[var(--border-on-light)] p-2.5 text-center text-[24px] leading-[1.35] font-normal text-[var(--text-on-light-base)]',

  terms: 'mb-[18px]',

  term: 'mb-2 block text-[21px] leading-normal font-semibold text-[var(--text-on-light-base)] [overflow-wrap:anywhere]',

  definition: 'mb-4',

  definitionBody:
    'text-xl leading-normal font-normal text-[var(--text-on-light-muted)] [overflow-wrap:anywhere] [&_p]:!mb-4 [&_ul]:!mb-4 [&_ul]:list-none [&_ul]:pl-0 [&_li]:!mb-2.5 [&_li]:ml-4 [&_li]:grid [&_li]:grid-cols-[20px_1fr] [&_li]:gap-2 [&_ol]:!mb-4 [&_ol]:list-decimal [&_ol]:pl-[15px] [&_ol>li]:pl-2 [&_a]:text-[var(--surface-brand-cyan)] [&_a]:no-underline hover:[&_a]:underline [&_strong]:text-[var(--text-on-light-strong)]',

  listIcon: 'mt-1.5 h-4 w-4',

  adWrap: 'flex flex-col justify-center',
} as const
