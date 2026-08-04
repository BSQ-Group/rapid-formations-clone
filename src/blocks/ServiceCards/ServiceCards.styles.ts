export const serviceCardsStyles = {
  section:
    'flex flex-col items-center w-full mx-auto gap-8 px-4 md:gap-14 md:px-8 lg:px-10 xl:max-w-[1280px] wide:max-w-[1800px] wide:px-[180px]',

  title: 'text-[var(--text-strong)] font-extrabold w-full text-5xl tracking-[-1px]',

  sectionLegacy:
    'flex flex-col items-center w-full mx-auto gap-8 px-4 md:gap-14 md:px-8 lg:px-10 xl:max-w-[1280px] wide:max-w-[1800px] wide:px-[180px]',

  titleLegacy: 'text-[var(--text-strong)] font-bold w-full wide:leading-[56px]',

  groupsList: 'flex flex-col items-stretch gap-10 w-full',

  group: 'flex flex-col items-start gap-6 w-full',

  groupSubtitle: 'text-[var(--text-subtle)] font-semibold w-full wide:text-2xl wide:leading-8 wide:tracking-[-0.25px]',

  cardsListLegacy: 'flex flex-col items-stretch gap-6 w-full lg:flex-row',

  cardsListTwoUp: 'flex flex-col items-stretch gap-6 w-full lg:flex-row',

  cardsListMultiUp: 'flex flex-col items-stretch gap-6 w-full lg:flex-row lg:flex-wrap',

  cardTwoUp:
    'flex flex-col items-start w-full gap-6 p-6 rounded-3xl bg-[var(--surface-tertiary)] border border-[var(--border-subtle)] md:gap-5 md:p-8 lg:flex-1 lg:justify-between lg:self-stretch xl:gap-7',

  cardMultiUp:
    'flex flex-col items-start w-full gap-5 p-6 rounded-3xl bg-[var(--surface-tertiary)] border border-[var(--border-subtle)] md:p-8 lg:w-[calc(33.333%-16px)] lg:flex-none lg:justify-between lg:self-stretch xl:gap-4',

  iconTile:
    'flex items-center justify-center shrink-0 w-12 h-12 p-3 rounded-lg bg-[var(--surface-accent-light)]',

  iconSvg: 'w-6 h-6 text-[var(--text-strong)]',

  body:
    'flex flex-col items-start gap-6 w-full md:flex-row md:items-end md:gap-8 lg:flex-col lg:items-start lg:gap-5 lg:flex-1 lg:w-full xl:gap-7',

  textCol:
    'flex flex-col items-start gap-1 w-full md:flex-1 md:gap-2 md:min-w-0 md:w-auto lg:w-full lg:gap-4',

  cardTitle:
    'text-[var(--text-strong)] font-bold text-xl leading-7 md:text-2xl md:leading-8 md:tracking-[-0.25px] lg:text-3xl lg:leading-9',

  description: 'text-[var(--text-muted)] w-full text-base leading-6',

  cardTitleLegacy: 'text-[var(--text-strong)] font-bold',

  descriptionLegacy: 'text-[var(--text-muted)] w-full leading-6 wide:leading-6',

  priceCol:
    'flex flex-col items-start gap-2 w-full md:w-[159px] md:items-end md:gap-4 md:shrink-0 lg:w-full lg:flex-row lg:items-center lg:justify-between lg:gap-4',

  priceColMultiUp:
    'flex flex-col items-start gap-2 w-full md:w-[159px] md:items-end md:gap-4 md:shrink-0 lg:w-full lg:items-start lg:gap-4 wide:flex-row wide:items-center wide:justify-between',

  price:
    'text-[var(--text-strong)] font-bold tracking-[-0.25px] text-2xl leading-8 md:text-2xl md:leading-8 md:text-right whitespace-nowrap lg:text-3xl lg:leading-9 lg:text-left lg:flex-1 lg:tracking-[-0.25px] wide:text-4xl wide:leading-10 wide:tracking-[-1px]',

  priceMultiUp:
    'text-[var(--text-strong)] font-bold tracking-[-0.25px] text-2xl leading-8 md:text-right whitespace-nowrap lg:text-3xl lg:leading-9 lg:text-left',

  orderBtn: 'w-full md:w-auto',
} as const
