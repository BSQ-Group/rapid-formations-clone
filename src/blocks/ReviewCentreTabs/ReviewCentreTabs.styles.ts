export const reviewCentreTabsStyles = {
  section: 'font-legacy-condensed block w-full text-lg leading-[27px]',

  wrapperPad: 'pt-10 min-[1023px]:py-5',

  mobileNav:
    'sticky top-0 z-[5] flex flex-row border-y border-l border-solid border-[color:var(--surface-on-light-canvas)] bg-[var(--surface-on-light-canvas)] md:hidden',

  mobileActive:
    'block h-[45px] bg-[var(--surface-brand-cyan)] px-[15px] py-2.5 text-lg leading-[27px] text-[rgb(var(--white))]',

  mobileToggle:
    'ml-auto block h-[45px] cursor-pointer border-0 bg-[rgb(var(--white))] px-[15px] py-2.5 text-lg leading-[27px] text-[var(--text-info)]',

  mobileToggleIcon: 'ml-1 inline-block h-3 w-3 align-baseline',

  list: 'sticky top-[46px] z-[5] bg-[var(--surface-on-light-sunken)] md:top-0',

  listOpen: 'block md:flex',

  listClosed: 'hidden md:flex',

  ul: 'm-0 block list-none px-0 pt-2.5 pb-2 md:mx-[5px] md:flex md:w-full md:flex-row md:p-0 min-[1023px]:m-auto min-[1023px]:-mt-11 min-[1023px]:justify-center',

  item: 'mx-[15px] my-2.5 block cursor-pointer border border-solid border-[color:var(--border-on-light)] px-[18px] py-2 text-center text-xl leading-[30px] first:mt-0 md:mx-0.5 md:my-0 md:border-0 min-[1023px]:my-0',

  itemIdle: 'text-[var(--text-on-light-muted)] md:bg-[rgb(var(--white))]',

  itemActive:
    'bg-[var(--surface-brand-cyan)] text-[rgb(var(--white))] md:bg-[var(--surface-brand-cyan)]',

  ratingsHeading:
    'mt-[45px] mb-8 block text-center text-[36px] leading-[1.235] font-normal text-[var(--text-on-light-base)]',

  banner: 'block w-full bg-[var(--surface-brand-cyan)] text-[rgb(var(--white))] md:py-[15px]',

  bannerTitle:
    'mx-auto mb-5 block break-words text-center text-[30px] leading-[1.15] font-normal text-[rgb(var(--white))] min-[470px]:px-[50px] md:mx-0 md:px-0 md:text-left md:text-[36px]',

  bannerRow: 'flex flex-col items-center md:flex-row',

  bannerScore: 'mb-[5px] block text-[104px] leading-none md:mr-[15px] md:mb-0 md:text-[36px]',

  bannerStars: 'h-[37px]',

  bannerTotal: 'my-2.5 block text-lg leading-[27px] md:mx-[15px] md:my-0',

  bannerLink:
    'mt-[25px] mb-[15px] block rounded border border-solid border-[color:rgb(var(--white))] bg-[rgb(var(--white))] px-[25px] py-[7px] text-lg leading-[27px] text-[var(--text-brand-cyan)] no-underline md:m-0',

  bannerLinkIcon: 'ml-1 inline-block h-3.5 w-3.5 align-baseline',

  reviews: 'block w-full bg-[var(--surface-on-light-tile)] pb-[30px]',

  logoWrap: 'mt-[45px] flex w-full flex-col items-start justify-start',

  logoFrame: 'mb-[15px] block w-full max-w-[200px]',

  logoMaxWidth: 200,

  logo: 'block h-auto w-full object-contain',

  reviewsHeading: 'mb-4 block text-xl leading-[30px] text-[var(--text-on-light-base)]',

  grid: 'block min-[1023px]:grid min-[1023px]:pt-[15px] min-[1023px]:grid-cols-2 min-[1023px]:gap-5',

  cell: 'mb-5 block h-full min-h-[238px] rounded-[5px] min-[1023px]:mb-0',

  card: 'grid h-full min-h-[240px] grid-cols-[50px_auto] gap-[30px] rounded-[5px] border border-solid border-[color:var(--border-on-light-tile)] bg-[rgb(var(--white))] p-[30px] shadow-tile-raised transition-shadow duration-200 ease-in-out',

  avatar:
    'mr-[15px] flex h-[45px] w-[45px] items-center justify-center rounded-full bg-[var(--surface-brand-cyan)]',

  avatarText: 'font-bold text-[rgb(var(--white))]',

  cardName:
    'mt-[13px] mb-2 block text-lg leading-[24.3px] font-normal text-[var(--text-on-light-base)] md:mt-[11px]',

  cardMeta: 'flex flex-col md:flex-row',

  cardStars: 'h-[29px]',

  cardDate: 'ml-0 block text-lg leading-[27px] text-[var(--text-on-light-base)] md:ml-2.5',

  cardBody: 'mb-4 block text-xl leading-[30px] text-[var(--text-on-light-muted)]',

  cardToggle:
    'block cursor-pointer border-0 bg-transparent p-0 text-left text-lg leading-[27px] text-[var(--text-brand-cyan)]',

  readAll:
    'block h-full min-h-[238px] w-full rounded-[5px] border border-solid border-[color:var(--border-on-light-tile)] bg-[var(--surface-brand-cyan)] p-5 text-[22px] leading-[33px] text-[rgb(var(--white))] no-underline shadow-tile-raised transition-shadow duration-200 ease-in-out hover:no-underline',

  readAllIcon: 'ml-1 inline-block h-4 w-4 align-baseline',
} as const
