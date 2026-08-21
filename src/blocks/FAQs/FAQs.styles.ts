export const faqsStyles = {
  subheading: 'block text-[24px] font-normal leading-[32.4px] text-[var(--text-on-light-base)]',
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  header: 'mb-8 w-full flow-root text-center',
  heading:
    'mb-2 break-words whitespace-pre-line text-[36px] leading-[44.46px] font-normal tracking-normal text-[var(--text-on-light-base)]',

  panel: 'relative overflow-hidden min-[1023px]:px-[63px] min-[1023px]:pb-[9px]',
  list: 'mb-4',

  answerText:
    'max-w-none pt-4 pb-8 text-[22px] leading-[33px] font-normal text-[var(--text-on-light-muted)] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_ul]:ml-4 [&_ol]:ml-4 [&_a]:text-[var(--surface-brand-cyan)] [&_a]:no-underline',
  answerTextLast: 'pb-0',

  pageSection: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',
  pagePanel: 'relative w-full',
  pageList: 'mt-5',
} as const
