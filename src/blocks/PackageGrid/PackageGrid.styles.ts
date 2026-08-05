export const packageGridStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-on-light-canvas)] pt-[104px] pb-[80px] mb-[70px] md:mb-[140px] min-[1023px]:pt-[84px] min-[1023px]:pb-[100px]',
  header: 'text-center',

  grid: 'mt-[45px] mb-[25px] md:mb-[35px] min-[1023px]:mb-[45px] mx-auto flex w-full flex-wrap min-[1023px]:justify-center min-[1023px]:max-w-[85%] gap-5',

  card: 'md:basis-[calc((100%-1.25rem)/2)] min-[1023px]:basis-[calc((100%-2.5rem)/3)]',

  footer: 'flex flex-col items-center text-center',
  compareButton:
    'inline-flex w-full md:w-auto items-center justify-center rounded-md min-h-[54.5px] px-8 py-3 border border-[var(--surface-brand-cyan)] bg-[var(--surface-brand-cyan)] hover:bg-[var(--surface-brand-cyan-hover)] text-center text-[19px] leading-[28.5px] font-semibold text-[var(--text-strong)] [overflow-wrap:anywhere]',
  contactNote:
    'mt-8 w-full break-words text-[20px] leading-[27px] md:text-[24px] md:leading-[32.4px] font-normal text-[var(--text-on-light-base)] [&_em]:not-italic [&_em]:text-[var(--surface-brand-cyan)]',
  footerNote:
    'mt-2.5 w-full break-words text-[20px] leading-[30px] font-normal text-[var(--text-on-light-muted)]',
} as const
