export const otherWaysToBuyStyles = {
  section:
    'flex flex-col items-center w-full gap-14 px-4 md:gap-14 md:px-8 lg:gap-10 lg:px-10 xl:gap-14 xl:px-0',

  header: 'flex flex-col items-start gap-3 w-full lg:w-[780px]',

  heading:
    'text-[var(--text-strong)] text-center w-full whitespace-pre-line font-bold lg:font-extrabold lg:leading-[56px] xl:leading-[56px]',

  cards: 'flex flex-col items-center w-full gap-5 lg:flex-row lg:items-stretch lg:w-auto lg:gap-5',

  card: 'bg-[var(--surface-primary)] flex w-full rounded-xl flex-col gap-4 p-4 md:flex-row md:gap-8 md:p-8 lg:flex-col lg:gap-6 lg:p-8 lg:w-[372px]',

  cardNumber:
    'font-light text-[var(--text-muted)] whitespace-nowrap shrink-0 text-[48px] leading-[48px] tracking-[-2px]',

  cardBody: 'flex flex-col w-full min-w-0 gap-6 md:flex-1 lg:flex-1 lg:justify-between',

  titleAndText: 'flex flex-col gap-3 w-full',

  cardTitle: 'text-[var(--text-strong)] w-full',

  cardDescription:
    'flex flex-col gap-3 w-full text-[var(--text-subtle)] [&_p]:text-[14px] [&_p]:leading-[20px]',

  ctaRow: 'flex w-full justify-stretch md:justify-end',

  ctaButton: 'w-full md:w-auto',

  separator:
    'font-medium text-[var(--text-muted)] text-center text-[18px] leading-[28px] lg:self-center',
} as const
