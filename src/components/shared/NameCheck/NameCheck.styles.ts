export const nameCheckStyles = {
  root: 'relative flex w-full flex-col',
  rootPackage: 'items-center',

  form: 'my-4 flex w-full max-w-[670px] flex-row justify-center rounded-[5px] p-[15px] md:p-0',
  formPackage: 'my-9',
  row: 'flex w-full flex-col gap-2 shadow-[2px_2px_3px_rgba(0,0,0,0.1)] md:flex-row md:items-stretch md:justify-start md:gap-0',
  input:
    'flex-1 min-w-0 min-h-[59.5px] rounded-[6px] border border-[var(--surface-canvas-inverse)] bg-[var(--surface-canvas-inverse)] px-[21px] py-[15.75px] text-[21px] leading-[normal] text-[var(--text-on-light-muted)] outline-none placeholder:text-center placeholder:text-[var(--text-on-light-subtle)] md:min-h-0 md:rounded-r-none md:border-r-0 md:placeholder:text-left',
  inputOnLight: 'border-[var(--border-on-light)] md:border-r-0',
  button:
    'flex-shrink-0 rounded-[6px] md:rounded-l-none h-[65px] px-6 md:px-10 md:min-w-[25%] bg-[var(--surface-cta-success)] hover:bg-[var(--surface-cta-success-hover)] text-[var(--text-strong)] font-semibold text-[21px] leading-[31.5px]',
  buttonIcon: 'text-[var(--icon-default)]',

  result: 'flex flex-col gap-6',
  resultHead: 'flex flex-col gap-5',
  resultBadge: 'inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold',
  resultBadgeAvailable: 'bg-[var(--surface-cta-success)] text-[var(--text-strong)]',
  resultBadgeUnavailable: 'bg-[var(--border-error)] text-[var(--text-strong)]',
  resultEyebrow: 'text-[var(--text-subtle)] text-xs font-semibold uppercase tracking-wider',
  resultEyebrowOnLight: 'text-[var(--text-on-light-subtle)]',
  resultNameBlock: 'flex flex-col gap-1.5',
  resultName: 'text-[var(--text-strong)] uppercase',
  resultNameOnLight: 'text-[var(--text-on-light-strong)]',
  resultNameUnavailable:
    'line-through decoration-[color-mix(in_srgb,var(--border-error)_60%,transparent)]',
  resultBarAvailable: 'h-[3px] w-16 rounded-sm bg-[var(--surface-accent)]',
  resultBarUnavailable: 'h-[3px] w-16 rounded-sm bg-[var(--border-error)]',
  resultDescription: 'text-[var(--text-strong)]',
  resultDescriptionOnLight: 'text-[var(--text-on-light-base)]',

  ctaRow: 'flex flex-col items-stretch gap-3 sm:flex-row sm:items-center',
  cta: 'inline-flex w-full items-center justify-center gap-2 rounded bg-[var(--surface-cta-success)] px-4 py-3 text-base font-bold text-[var(--text-strong)] shadow-sm hover:bg-[var(--surface-cta-success-hover)] sm:w-auto',
  searchAgain:
    'cursor-pointer text-base font-semibold underline underline-offset-2 text-[var(--text-strong)] hover:opacity-80',
  searchAgainOnLight: 'text-[var(--text-on-light-base)]',

  retryRow: 'flex w-full max-w-[500px] flex-col items-stretch gap-4 sm:flex-row',
  retryInput:
    'flex-1 min-w-0 rounded-[6px] border border-[var(--border-on-light)] bg-[var(--surface-canvas-inverse)] px-4 py-3 text-base text-[var(--text-on-light-muted)] outline-none sm:rounded-r-none',
  retryButton: 'sm:rounded-l-none',
  retryButtonOnLight:
    'border border-[var(--border-on-light)] bg-transparent text-[var(--text-on-light-strong)] hover:bg-[var(--surface-on-light-hover)]',
} as const
