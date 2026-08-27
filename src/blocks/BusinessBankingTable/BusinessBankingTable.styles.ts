export const businessBankingTableStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  wrapperPad: 'pt-10 min-[1023px]:pt-5',

  inner: 'my-8 w-full',

  heading:
    'mb-5 block text-[23px] leading-[28.405px] font-normal text-[var(--text-on-light-base)]',

  copy:
    'block text-xl leading-[30px] text-[var(--text-on-light-muted)] [&_a]:!text-[var(--text-on-light-link-hover)] [&_a:hover]:!underline [&_p]:!mb-4',

  scrollShell:
    'relative my-7 w-full after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-5 after:bg-gradient-to-r after:from-transparent after:to-[rgb(var(--white))]/80 min-[1023px]:after:hidden',

  scroller:
    'w-full overflow-x-auto focus-visible:ring-4 focus-visible:ring-[var(--border-focus)] focus-visible:outline-none',

  table:
    'w-full min-w-[600px] border-collapse border border-solid border-[color:var(--surface-brand-cyan)] bg-[rgb(var(--white))] md:min-w-0',

  headRow: 'bg-[var(--surface-brand-cyan)]',

  th:
    'min-w-[120px] border-r border-solid border-[color:var(--surface-brand-cyan)] px-2 py-3 text-center text-lg leading-[27px] font-semibold tracking-[0.5px] whitespace-nowrap text-[rgb(var(--white))] first:min-w-[140px] last:min-w-[200px] last:border-r-0 md:min-w-0 md:px-3 md:py-4 md:first:min-w-0 md:last:min-w-0',

  row: 'border-b border-solid border-[color:var(--surface-brand-cyan)] last:border-b-0',

  td:
    'min-w-[120px] border-r border-solid border-[color:var(--surface-brand-cyan)] px-2 py-3 text-center align-middle text-lg leading-[27px] whitespace-pre-line text-[var(--text-on-light-base)] last:border-r-0 md:min-w-0 md:px-3 md:py-4',

  rowHeader: 'font-normal',

  logoCell: 'flex items-center justify-center',

  logoWrap: 'inline-block',

  logoPicture: 'inline-block align-middle',

  logo: 'block h-auto max-w-[75px] rounded-lg',

  logoSizes: '75px',

  marker: 'top-0 align-super text-[0.8333em] leading-[1.5]',

  iconYes: 'h-[18px] w-4 text-[var(--surface-cta-success)]',

  iconNo: 'h-[18px] w-[11px] text-[var(--icon-on-light-faint)]',
} as const
