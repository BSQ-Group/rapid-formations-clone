export const registerCtaPanelStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  container: 'mx-auto w-full max-w-[1230px] px-5 pb-[27px] min-[1023px]:px-[30px]',

  heading:
    'mb-2 block whitespace-pre-line break-words text-center text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  description:
    'mb-2 block break-words text-center text-[24px] font-normal leading-[32.4px] text-[var(--text-on-light-muted)]',

  phoneLink: 'text-[var(--surface-brand-cyan)] hover:underline',

  ctaRow: 'mt-8',
  ctaButton:
    'mx-auto flex w-fit max-w-full items-center justify-center rounded border border-[var(--surface-cta-success)] bg-[var(--surface-cta-success)] px-8 py-3 text-center text-[19px] font-semibold leading-[28.5px] text-[rgb(var(--white))] transition-colors duration-150 [overflow-wrap:anywhere] hover:border-[var(--surface-cta-success-hover)] hover:bg-[var(--surface-cta-success-hover)]',
} as const
