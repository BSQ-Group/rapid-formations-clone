export const aboutThisServiceStyles = {
  section: [
    'flex flex-col items-center gap-14 px-4',
    'md:px-8',
    'lg:flex-row lg:items-start lg:justify-center lg:gap-10 lg:px-10',
    'xl:gap-20',
  ].join(' '),

  textCol: [
    'flex flex-col items-start gap-5 w-full',
    'md:w-[480px]',
    'lg:flex-1 lg:min-w-0 lg:w-auto',
    'xl:flex-none xl:w-[440px]',
  ].join(' '),

  title: 'text-[var(--text-strong)]',

  paragraphs: 'flex flex-col gap-3 w-full',
  paragraph: 'text-[var(--text-subtle)]',

  note: 'text-[var(--text-muted)] w-full',
  noteLabel: 'font-semibold',

  ctaRow: 'flex flex-col items-start gap-5',
  ctaInline: 'flex items-center gap-3',
  price: 'text-[var(--text-subtle)] whitespace-nowrap',

  trustpilot: 'w-[238px] max-w-full -ml-2',

  packageCard: [
    'relative overflow-hidden shrink-0 aspect-square rounded-2xl md:rounded-3xl',
    'w-[328px] md:w-[480px] lg:w-[438px] xl:w-[500px]',
  ].join(' '),

  packageImage: 'absolute inset-0 w-full h-full object-cover',

  floatingCardBase: [
    'absolute bg-[var(--surface-primary)] flex items-center font-semibold whitespace-nowrap',
    'text-[var(--text-subtle)] shadow-[var(--shadow-xl)]',
  ].join(' '),

  // Card 01 — top centre, primary feature
  cardTop: [
    'left-1/2 -translate-x-1/2 top-[25.4%]',
    'gap-[10px] p-[14px] rounded-[14px]',
    'md:gap-[15px] md:p-[20px] md:rounded-[20px]',
    'lg:gap-[14px] lg:p-[18px] lg:rounded-[18px]',
    'xl:gap-[16px] xl:p-[21px] xl:rounded-[21px]',
  ].join(' '),
  cardTopText: [
    'text-[12px] leading-[17px]',
    'md:text-[18px] md:leading-[25px]',
    'lg:text-[16px] lg:leading-[23px]',
    'xl:text-[18px] xl:leading-[26px]',
  ].join(' '),
  cardTopIconWrap: [
    'shrink-0 flex items-center bg-[var(--icon-background-accent)]',
    'p-[10px] rounded-[4px]',
    'md:p-[15px] md:rounded-[6px]',
    'lg:p-[14px] lg:rounded-[5px]',
    'xl:p-[16px] xl:rounded-[6px]',
  ].join(' '),
  cardTopIcon: [
    'text-[var(--icon-muted)]',
    'w-[21px] h-[21px]',
    'md:w-[30px] md:h-[30px]',
    'lg:w-[27px] lg:h-[27px]',
    'xl:w-[31px] xl:h-[31px]',
  ].join(' '),

  // Card 02 — middle-left, secondary feature
  cardMid: [
    'left-[18.83%] top-[44.61%] opacity-95',
    'gap-[8px] p-[10px] rounded-[10px]',
    'md:gap-[12px] md:p-[15px] md:rounded-[15px]',
    'lg:gap-[11px] lg:p-[14px] lg:rounded-[14px]',
    'xl:gap-[12px] xl:p-[16px] xl:rounded-[16px]',
  ].join(' '),
  cardMidText: [
    'text-[9px] leading-[13px]',
    'md:text-[13px] md:leading-[19px]',
    'lg:text-[12px] lg:leading-[18px]',
    'xl:text-[14px] xl:leading-[20px]',
  ].join(' '),
  cardMidIconWrap: [
    'shrink-0 flex items-center bg-[var(--icon-background-accent)]',
    'p-[8px] rounded-[3px]',
    'md:p-[12px] md:rounded-[4px]',
    'lg:p-[11px] lg:rounded-[4px]',
    'xl:p-[12px] xl:rounded-[4px]',
  ].join(' '),
  cardMidIcon: [
    'text-[var(--icon-muted)]',
    'w-[16px] h-[16px]',
    'md:w-[23px] md:h-[23px]',
    'lg:w-[21px] lg:h-[21px]',
    'xl:w-[24px] xl:h-[24px]',
  ].join(' '),

  // Card 03 — bottom centre, tertiary feature
  cardBot: [
    'left-1/2 -translate-x-1/2 top-[59.11%] opacity-90',
    'gap-[7px] p-[9px] rounded-[9px]',
    'md:gap-[10px] md:p-[13px] md:rounded-[13px]',
    'lg:gap-[9px] lg:p-[12px] lg:rounded-[12px]',
    'xl:gap-[10px] xl:p-[14px] xl:rounded-[14px]',
  ].join(' '),
  cardBotText: [
    'text-[8px] leading-[11px]',
    'md:text-[11px] md:leading-[16px]',
    'lg:text-[10px] lg:leading-[15px]',
    'xl:text-[12px] xl:leading-[17px]',
  ].join(' '),
  cardBotIconWrap: [
    'shrink-0 flex items-center bg-[var(--icon-background-accent)]',
    'p-[7px] rounded-[2px]',
    'md:p-[10px] md:rounded-[3px]',
    'lg:p-[9px] lg:rounded-[3px]',
    'xl:p-[10px] xl:rounded-[3px]',
  ].join(' '),
  cardBotIcon: [
    'text-[var(--icon-muted)]',
    'w-[13px] h-[13px]',
    'md:w-[19px] md:h-[19px]',
    'lg:w-[18px] lg:h-[18px]',
    'xl:w-[20px] xl:h-[20px]',
  ].join(' '),
} as const
