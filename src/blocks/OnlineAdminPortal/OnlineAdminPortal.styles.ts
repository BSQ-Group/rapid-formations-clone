export const onlineAdminPortalStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]',

  grid: 'grid grid-cols-1 gap-5 md:grid-cols-2',

  full: 'md:col-span-2',

  half: 'mb-[15px] flex flex-col items-center justify-between border border-solid border-[color:var(--border-on-light-tile)] bg-white p-10 shadow-tile-raised transition-shadow duration-200 ease-in-out',

  halfBody: 'md:min-h-[400px]',

  circle: 'mx-auto my-2.5 flex size-[100px] items-center justify-center rounded-full',

  circleCyan: 'bg-[var(--surface-icon-badge-cyan)]',

  circleGreen: 'bg-[var(--surface-cta-success)]',

  icon: 'h-8 text-white',

  titleFull:
    'mb-5 block text-[26px] font-normal leading-[1.235] text-[var(--text-on-light-base)] md:text-[28px]',

  titleHalf:
    'mb-2 block text-center text-[26px] font-normal leading-[1.235] text-[var(--text-on-light-base)] md:text-[28px]',

  content:
    'block text-xl leading-normal text-[var(--text-on-light-muted)] [&_p]:!mb-4 [&_ul]:!mb-4 [&_ul]:list-none [&_ul]:!pl-0 [&_li]:ml-4 [&_li]:!mb-2.5 [&_li]:grid [&_li]:grid-cols-[20px_1fr] [&_li]:gap-2 [&_strong]:text-[var(--text-on-light-strong)]',

  contentCentred: '[&_p]:text-center',

  listIcon: 'mt-1.5 size-4',

  cta: 'mt-auto',

  ctaBlue:
    '[--button-promo-idle:var(--surface-brand-cyan)] [--button-promo-hover:var(--surface-brand-cyan-lift)]',
} as const
