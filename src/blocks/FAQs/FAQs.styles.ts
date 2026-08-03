export const faqsStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)] mb-[70px] md:mb-[140px]',

  header: 'mb-8 w-full text-center',
  heading:
    'mb-2 break-words whitespace-pre-line text-[36px] leading-[44.46px] font-normal tracking-normal text-[var(--text-on-light-base)]',

  panel: 'relative min-[1023px]:px-[63px] min-[1023px]:pb-[9px]',
  list: 'block list-none p-0',
  item: 'mb-5 last:mb-0',

  questionHeading: 'm-0 font-normal',
  trigger:
    'group/faq flex w-full cursor-pointer items-center justify-between gap-4 border-b border-[var(--border-on-light)] bg-transparent pb-2.5 text-left transition-all duration-[350ms] hover:border-b-[var(--surface-brand-cyan)] focus-visible:border-b-[var(--surface-brand-cyan)]',
  triggerOpen:
    'border-b-transparent hover:border-b-transparent focus-visible:border-b-transparent',

  question:
    'mb-2 min-w-0 break-words text-[24px] leading-[32.4px] font-normal tracking-normal text-[var(--text-on-light-base)] transition-colors duration-[350ms]',
  questionOpen: 'text-[var(--surface-brand-cyan)]',

  iconCircle:
    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-current text-[var(--text-on-light-muted)] transition-all duration-[350ms] group-hover/faq:text-[var(--surface-brand-cyan)] group-focus-visible/faq:text-[var(--surface-brand-cyan)]',
  iconCircleOpen:
    'rotate-180 text-[var(--surface-brand-cyan)] group-hover/faq:text-[var(--surface-brand-cyan)]',
  icon: 'h-[17px] w-auto fill-current',

  answer: 'grid overflow-hidden',
  answerOpen: 'grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in',
  answerClosed: 'grid-rows-[0fr] transition-[grid-template-rows] duration-[350ms] ease-out',
  answerInner: 'min-h-0',

  answerText:
    'max-w-none pt-4 pb-8 text-[22px] leading-[33px] font-normal text-[var(--text-on-light-muted)] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:ml-4 [&_ol]:ml-4 [&_a]:text-[var(--surface-brand-cyan)] [&_a]:no-underline',
  answerTextLast: 'pb-0',
} as const
