export const nameCheckStyles = {
  root: 'relative flex w-full flex-col',
  rootPackage: 'items-center',

  form: 'my-4 flex w-full max-w-[670px] flex-row justify-center rounded-[5px] p-[15px] md:p-0',
  formPackage: 'my-9',
  formRetry: 'mt-8 mb-0',
  row: 'flex w-full flex-col gap-2 shadow-[2px_2px_3px_rgba(0,0,0,0.1)] md:flex-row md:items-stretch md:justify-start md:gap-0',
  input:
    'flex-1 min-w-0 min-h-[59.5px] rounded-[6px] border border-[var(--surface-canvas-inverse)] bg-[var(--surface-canvas-inverse)] px-[21px] py-[15.75px] text-[21px] leading-[normal] text-[var(--text-on-light-muted)] outline-none placeholder:text-center placeholder:text-[var(--text-on-light-subtle)] md:min-h-0 md:rounded-r-none md:border-r-0 md:placeholder:text-left',
  inputOnLight: 'border-[var(--border-on-light)] md:border-r-0',
  button:
    'flex-shrink-0 rounded-[6px] md:rounded-l-none h-[65px] px-6 md:min-w-[25%] px-[21px] bg-[var(--surface-cta-success)] hover:bg-[var(--surface-cta-search-hover)] focus:bg-[var(--surface-cta-search-hover)] active:bg-[var(--surface-cta-search-hover)] text-[var(--text-strong)] font-semibold text-[21px] leading-[31.5px]',
  buttonRetry:
    'bg-[var(--surface-cta-retry)] hover:bg-[var(--surface-cta-retry)] text-[rgb(var(--white))] hover:opacity-90',
  buttonIcon: 'text-[var(--icon-default)]',

  result: 'mx-auto my-8 flex w-full max-w-[670px] flex-col text-center',
  resultHero: 'rounded-[4px] bg-[rgb(0_0_0/0.3)] p-5',
  resultNameHero:
    'text-[32px] font-normal leading-[39.52px] md:text-[32px] md:leading-[39.52px] text-[rgb(var(--white))]',
  resultDescriptionHero: 'text-[22px] text-[rgb(var(--white))]',
  searchAgainHero: 'text-[rgb(var(--white))]',
  resultIcon: 'mx-auto mb-[15px] h-10 w-10',
  resultName:
    'mb-2 text-center text-[28px] font-semibold leading-[1.235] md:text-[36px] [overflow-wrap:anywhere]',
  resultNameAvailable: 'text-[var(--text-namecheck-success)]',
  resultNameUnavailable: 'text-[var(--text-namecheck-error)]',
  resultNameError: 'text-[var(--text-on-light-base)]',
  resultDescription: 'text-center text-[24px] leading-normal text-[var(--text-on-light-muted)]',

  ctaRow: 'mb-[30px] flex w-full flex-col items-center',
  cta: 'inline-flex min-h-[65px] min-w-[25%] items-center justify-center text-center rounded border border-solid border-[var(--surface-cta-success)] px-[21px] py-[15.75px] text-[21px] font-semibold text-[rgb(var(--white))] bg-[var(--surface-cta-success)] hover:border-[var(--surface-cta-success-hover)] hover:bg-[var(--surface-cta-success-hover)]',
  searchAgain:
    'mt-[5px] block min-w-[25%] cursor-pointer border border-transparent px-[18px] py-[13.5px] text-[18px] font-bold underline text-[var(--text-on-light-muted)] hover:opacity-80',

  retryRow: 'flex w-full max-w-[500px] flex-col items-stretch gap-4 sm:flex-row',
  retryInput:
    'flex-1 min-w-0 rounded-[6px] border border-[var(--border-on-light)] bg-[var(--surface-canvas-inverse)] px-4 py-3 text-base text-[var(--text-on-light-muted)] outline-none sm:rounded-r-none',
  retryButton: 'sm:rounded-l-none',
  retryButtonOnLight:
    'border border-[var(--border-on-light)] bg-transparent text-[var(--text-on-light-strong)] hover:bg-[var(--surface-on-light-hover)]',
} as const
