export const companyAddressGuideTableStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  heading:
    'mb-5 block break-words whitespace-pre-line text-[36px] leading-[44.46px] font-normal text-[var(--text-on-light-base)]',

  scroller:
    'mb-[30px] w-full overflow-x-scroll focus-visible:ring-4 focus-visible:ring-[var(--border-focus)] focus-visible:outline-none md:overflow-x-auto',

  table: 'grid [&>div:last-child>div]:border-b md:w-full md:min-w-full',

  row: 'grid grid-cols-[repeat(4,380px)] text-xl leading-[30px] md:grid-cols-[1.1fr_1fr_1fr_1fr]',

  headerRow: 'bg-[var(--surface-on-light-canvas)] text-center',

  cell: 'border-t border-r border-solid border-[color:var(--border-on-light)] p-2.5 text-[var(--text-on-light-base)] [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-5 [&_sup]:top-0 [&_sup]:align-super [&_sup]:text-[0.8333em] [&_sup]:leading-[1.5]',

  questionCell: 'border-l border-solid text-left',

  columnHeading:
    'block break-words whitespace-pre-line text-2xl leading-[32.4px] font-normal tracking-normal text-[var(--text-on-light-base)] min-[1023px]:mx-auto min-[1023px]:max-w-[75%]',

  footnote:
    'mb-[30px] bg-[var(--surface-on-light-canvas)] p-[15px] text-lg leading-[27px] text-[var(--text-on-light-base)] [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_li]:mb-2.5 [&_li:last-child]:mb-0 [&_ol]:m-0 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:text-xl [&_ol]:leading-[30px]',
} as const
