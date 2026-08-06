export const fourStepsStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas-inverse)] mb-[70px] md:mb-[140px]',
  header: 'text-center',

  grid: 'flex w-full snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-2 md:gap-5 md:overflow-visible min-[1023px]:grid-cols-4',
  slide: 'w-full shrink-0 snap-start min-[501px]:w-1/2 md:w-auto',
  dots: 'md:hidden',

  step: 'relative min-w-0 text-center',

  imageWrapper: 'flex h-[140px] justify-center',
  image: 'h-[140px] w-[140px] object-contain',

  body: 'relative -mt-[1.3rem]',

  number:
    'inline-flex h-[50px] w-[50px] items-center justify-center rounded-full border-4 border-[var(--border-step-number)] bg-[var(--surface-canvas-inverse)] p-[5px] text-[25px] leading-[1.25] font-normal text-[var(--surface-brand-cyan)]',

  title:
    'mt-4 mx-auto break-words whitespace-pre-line text-[24px] leading-rf-h4 font-normal tracking-normal text-[var(--text-on-light-base)]',
  content: 'mt-2 mb-4',
  description:
    'break-words text-[18px] leading-[27px] font-normal tracking-normal text-[var(--text-on-light-muted)]',

  chevron:
    'hidden min-[1023px]:block absolute right-[-5%] top-[calc(25%_+_4.5px)] h-[20px] w-auto text-[var(--surface-brand-cyan)]',

  cta: 'mt-[50px] text-center',
  ctaButton:
    'inline-flex max-w-full w-full md:w-auto items-center justify-center rounded-md border border-[var(--surface-cta-success)] bg-[var(--surface-cta-success)] hover:bg-[var(--surface-cta-success-hover)] px-8 py-3 text-center text-[19px] leading-rf-base font-semibold text-[var(--text-strong)] [overflow-wrap:anywhere]',
} as const
