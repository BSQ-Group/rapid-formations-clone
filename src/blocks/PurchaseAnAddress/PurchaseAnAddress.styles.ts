export const purchaseAnAddressStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]',

  heading:
    'mb-2 block text-center text-4xl font-normal leading-[1.235] tracking-normal text-[var(--text-on-light-base)]',

  headingWrap: 'mb-8',

  grid: 'flex flex-col min-[1023px]:grid min-[1023px]:grid-cols-2 min-[1023px]:gap-5',

  card: 'mb-[15px] flex flex-col items-center border border-solid border-[color:var(--border-on-light-tile)] bg-white p-10 text-center shadow-tile-raised transition-shadow duration-200 ease-in-out hover:shadow-tile-raised-hover',

  circle: 'mb-2.5 flex h-20 w-20 items-center justify-center rounded-full',

  circleCyan: 'bg-[var(--surface-icon-badge-cyan)]',

  circleGreen: 'bg-[var(--surface-cta-success)]',

  icon: 'h-8 text-[var(--text-strong)]',

  title:
    'mb-2 block whitespace-pre-line text-[26px] font-normal leading-[1.235] text-[var(--text-on-light-base)] md:text-[28px]',

  body: 'mb-4 block text-xl font-normal leading-normal text-[var(--text-on-light-muted)] min-[1023px]:min-h-[180px]',

  cta: 'mt-auto mb-[5px] block min-[1023px]:mb-0',
} as const
