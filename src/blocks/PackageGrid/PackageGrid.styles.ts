export const packageGridStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-on-light-canvas)] pt-[104px] pb-[80px] mb-[70px] md:mb-[140px] min-[1023px]:pt-[84px] min-[1023px]:pb-[100px]',
  header: 'text-center',
  heading:
    'break-words text-[36px] leading-[44.46px] font-normal tracking-normal text-[var(--text-on-light-base)]',
  subheading:
    'mt-2 break-words text-[24px] leading-[32.4px] font-normal tracking-normal text-[var(--text-on-light-muted)]',

  grid: 'mt-[45px] mb-[25px] md:mb-[35px] min-[1023px]:mb-[45px] mx-auto flex w-full flex-wrap min-[1023px]:justify-center min-[1023px]:max-w-[85%] gap-5',

  card: 'relative flex min-w-0 w-full md:basis-[calc((100%-1.25rem)/2)] min-[1023px]:basis-[calc((100%-2.5rem)/3)] flex-col rounded-md bg-[var(--surface-canvas-inverse)] border border-[var(--border-on-light-faint)] shadow-[0_1px_5px_rgba(0,0,0,0.15)] px-[25px] py-[30px]',

  cardHeader: 'flex min-h-[130px] flex-col pb-2.5',
  packageName:
    'break-words text-[26px] leading-[32.11px] md:text-[28px] md:leading-[34.58px] font-bold tracking-normal text-[var(--surface-brand-cyan)]',
  packageNameBadgeGutter: 'min-[1023px]:pr-16',
  packageNameLink: 'text-inherit hover:underline',
  price:
    'mt-[5px] break-words text-[42px] leading-[42px] font-bold tracking-normal text-[var(--text-on-light-base)]',
  priceNote:
    'mt-[5px] break-words text-[16px] leading-[16px] font-normal text-[var(--text-on-light-base)]',
  description:
    'mb-6 md:min-h-[75px] break-words text-[16px] leading-[24px] font-normal text-[var(--text-on-light-base)]',

  buyGroup: 'flex flex-col',
  buyButton:
    'mb-[5px] flex min-h-11 w-full items-center justify-center rounded-md px-6 py-2 bg-[var(--surface-cta-success)] hover:bg-[var(--surface-cta-success-hover)] text-center text-[17px] leading-[25.5px] font-semibold text-[var(--text-strong)] [overflow-wrap:anywhere]',

  highlights: 'mt-6 mb-6 flex flex-col gap-3 md:min-h-[300px] min-[1023px]:min-h-[420px]',
  highlightsTitle:
    'break-words text-[20px] leading-[30px] font-bold text-[var(--text-on-light-base)]',
  highlightsList: 'flex flex-col gap-3',
  highlightItem: 'flex min-h-[23px] min-[1023px]:min-h-[21px] flex-row items-start gap-2.5',
  highlightIcon: 'shrink-0 size-[22px] min-[1023px]:size-[18px] text-[var(--icon-on-light-faint)]',

  highlightTrigger:
    'p-0 leading-none text-[var(--icon-on-light-faint)] hover:text-[var(--text-on-light-link-hover)]',
  highlightText:
    'min-w-0 break-words text-[17px] leading-[19.55px] font-normal text-[var(--text-on-light-muted)]',

  readMoreButton:
    'mt-auto flex min-h-11 w-full items-center justify-center rounded-md px-6 py-2 bg-[var(--surface-canvas-inverse)] border border-[var(--border-on-light)] text-center text-[17px] leading-[25.5px] font-normal text-[var(--text-on-light-subtle)] hover:bg-[var(--surface-on-light-canvas)] [overflow-wrap:anywhere]',

  badgeClip:
    'hidden min-[1023px]:block pointer-events-none absolute -top-2.5 -right-2.5 size-[150px] overflow-hidden',
  badge:
    'absolute top-[30px] left-[-25px] right-[-50px] rotate-45 bg-[var(--surface-brand-cyan)] px-2.5 py-[7px] text-center uppercase text-[18px] leading-[27px] font-normal text-[var(--text-strong)] line-clamp-1 break-words',

  footer: 'flex flex-col items-center text-center',
  compareButton:
    'inline-flex w-full md:w-auto items-center justify-center rounded-md min-h-[54.5px] px-8 py-3 border border-[var(--surface-brand-cyan)] bg-[var(--surface-brand-cyan)] hover:bg-[var(--surface-brand-cyan-hover)] text-center text-[19px] leading-[28.5px] font-semibold text-[var(--text-strong)] [overflow-wrap:anywhere]',
  contactNote:
    'mt-8 w-full break-words text-[20px] leading-[27px] md:text-[24px] md:leading-[32.4px] font-normal text-[var(--text-on-light-base)] [&_em]:not-italic [&_em]:text-[var(--surface-brand-cyan)]',
  footerNote:
    'mt-2.5 w-full break-words text-[20px] leading-[30px] font-normal text-[var(--text-on-light-muted)]',
} as const
