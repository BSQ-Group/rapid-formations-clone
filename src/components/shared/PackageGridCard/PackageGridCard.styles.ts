export const packageGridCardStyles = {
  card: 'relative flex min-w-0 w-full flex-col rounded-md bg-[var(--surface-canvas-inverse)] border border-[var(--border-on-light-faint)] shadow-[0_1px_5px_rgba(0,0,0,0.15)] px-[25px] py-[30px]',

  header: 'flex min-h-[130px] flex-col pb-2.5',
  name: 'break-words text-[26px] leading-[32.11px] md:text-[28px] md:leading-[34.58px] font-bold tracking-normal text-[var(--surface-brand-cyan)]',
  nameBadgeGutter: 'min-[1023px]:pr-16',
  nameLink: 'text-inherit hover:underline',
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
} as const
