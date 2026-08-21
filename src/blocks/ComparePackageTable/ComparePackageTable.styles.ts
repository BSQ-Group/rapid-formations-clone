export const comparePackageTableStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  grid: 'hidden rounded-[0_5px_5px_5px] border border-solid border-[var(--border-compare-packages)] md:block',

  header: 'grid grid-cols-1',
  headerThree: 'text-center min-[470px]:grid-cols-[1.5fr_1fr_1fr_1fr]',
  headerTwo: 'text-center md:grid-cols-[2.5fr_2fr_2fr]',

  column:
    'p-2.5 text-left [&:not(:last-child)]:border-r [&:not(:last-child)]:border-solid [&:not(:last-child)]:border-[var(--border-compare-packages)]',
  columnStart: 'items-start',
  columnCenter: 'items-center',

  intro: 'block',
  details: 'mb-4 flex w-full flex-row items-end justify-between [&_h3]:!mb-0',
  actions: 'flex items-center justify-between',
  actionsPrices:
    'mr-2.5 mb-0 flex flex-col items-end text-[21px] font-bold leading-none text-[var(--text-on-light-base)] md:text-[20px] min-[1023px]:text-[24px] min-[1590px]:text-[26px]',
  introHeading:
    'm-0 block text-[23px] font-normal leading-[1.235] text-[var(--text-on-light-base)]',
  introBody:
    'flex flex-col text-left text-[20px] leading-normal text-[var(--text-on-light-muted)] [&_p]:!mb-4 [&_p]:text-[20px] [&_p]:leading-normal [&_strong]:font-bold [&_strong]:text-[var(--text-on-light-strong)] [&_ul]:!mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:!mb-2 [&_li]:text-[20px] [&_li]:leading-normal [&_h5]:!mt-[15px] [&_h5]:!mb-0 [&_h5]:text-[23px] [&_h5]:font-normal [&_h5]:leading-[1.5] [&_h5]:text-[var(--text-on-light-base)] [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline',

  sameDay: 'mt-4 block',
  sameDayHeading:
    'mb-2 block text-base font-semibold leading-[1.35] text-[var(--text-on-light-strong)]',
  sameDayBody:
    'block text-base font-normal leading-[1.25] text-[var(--text-on-light-muted)] [&_p]:!mb-0 [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline',

  package:
    'relative flex min-h-[150px] min-w-[175px] flex-col bg-white md:min-w-[130px] min-[1023px]:min-w-[175px]',
  packageName:
    'mb-[5px] mt-0 block text-[21px] font-bold leading-[1.235] text-[var(--text-brand-cyan)] md:text-[20px] min-[1023px]:text-[24px] min-[1590px]:text-[26px]',
  packageNameLink: 'text-inherit no-underline',

  prices:
    'mb-[15px] flex flex-col items-start text-[24px] font-bold leading-none text-[var(--text-on-light-base)] md:text-[36px] min-[1023px]:text-[38px] min-[1590px]:text-[42px]',
  pricesMinHeight: 'min-h-[5.25rem]',
  pricesCentered: 'items-center',
  priceNote:
    'mt-[5px] block text-[18px] font-normal leading-none text-[var(--text-on-light-base)] md:text-[15px]',

  whosItFor:
    'block text-[var(--text-on-light-muted)] md:min-h-[280px] [&_h4]:!mb-0 [&_h4]:text-base [&_h4]:font-normal [&_h4]:leading-[1.35] [&_h4]:text-[var(--text-on-light-base)] [&_p]:!mb-2 [&_p]:text-[20px] [&_p]:leading-none [&_strong]:text-base [&_strong]:font-bold [&_strong]:leading-none [&_strong]:text-[var(--text-on-light-strong)] [&_b]:text-base [&_b]:font-bold [&_b]:leading-none [&_b]:text-[var(--text-on-light-strong)] [&_ul]:!mb-4 [&_ul]:pl-3 [&_ul]:text-base [&_ul]:leading-normal [&_li]:!mb-2 [&_li]:text-base [&_li]:leading-[1.25] [&_li::marker]:text-xs [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline',

  buttons: 'flex flex-col',
  buttonsFull: 'w-full',
  buyButton:
    'flex items-center justify-center whitespace-nowrap rounded-md border border-solid border-[var(--surface-cta-success)] bg-[var(--surface-cta-success)] px-4 py-2 text-center text-[17px] font-semibold leading-normal text-white no-underline min-[1023px]:px-6',
  readMoreButton:
    'mt-[5px] flex items-center justify-center whitespace-nowrap rounded-md border border-solid border-[var(--border-on-light-strong)] bg-white px-4 py-2 text-center text-[17px] font-normal leading-normal text-[var(--text-on-light-muted)] no-underline min-[1023px]:px-6',

  products: 'grid grid-cols-1',
  product:
    'grid grid-cols-[3fr_1fr] border-t border-solid border-[var(--border-compare-packages)] md:grid-cols-[2fr_1fr] [&:last-child]:rounded-b-[5px]',
  productThree: 'grid-cols-[1.5fr_1fr_1fr_1fr] md:grid-cols-[1.5fr_1fr_1fr_1fr]',
  productTwo: 'grid-cols-[3fr_2fr_2fr] md:grid-cols-[2.5fr_2fr_2fr]',

  productName:
    'flex flex-row items-center justify-between border-r border-solid border-[var(--border-compare-packages)] bg-white px-[15px] py-2.5',
  productTitle:
    'm-0 block whitespace-pre-line text-[17px] font-normal leading-[1.235] text-[var(--text-on-light-base)] md:text-[18px]',
  infoIcon:
    'ml-2.5 size-[22px] shrink-0 text-[var(--icon-on-light-faint)] transition-colors duration-300 hover:cursor-pointer',

  includedItem:
    'grid min-w-[175px] items-center justify-items-center border-r border-solid border-[var(--border-compare-packages)] bg-white p-2.5 text-center text-[26px] md:min-w-[130px] min-[1023px]:min-h-14 min-[1023px]:min-w-[175px] [&:last-child]:border-r-0',
  check: 'h-[1.25em] w-auto text-[var(--icon-success)]',
  minus: 'h-[15px] w-auto text-[var(--text-on-light-base)]',

  footer: 'grid grid-cols-1 border-t border-solid border-[var(--border-compare-packages)]',
  footerThree: 'text-center md:grid-cols-[1.5fr_1fr_1fr_1fr]',
  footerTwo: 'text-center md:grid-cols-[2.5fr_2fr_2fr]',

  ribbon:
    'absolute -top-[21px] -right-[21px] block size-[150px] overflow-hidden md:hidden min-[1023px]:-right-[0.3rem] min-[1023px]:-top-[6px] min-[1023px]:block min-[1023px]:size-[8.7rem] min-[1200px]:right-0 min-[1200px]:-top-[2px] min-[1200px]:size-[150px]',
  ribbonLabel:
    'absolute -left-[0.5rem] top-8 block w-[225px] rotate-45 bg-[var(--surface-brand-cyan)] px-2.5 py-[7px] text-center uppercase text-white shadow-[0_5px_10px_rgb(0_0_0/0.1)] [text-shadow:0_1px_1px_rgb(0_0_0/0.2)] min-[1023px]:left-8 min-[1023px]:top-4 min-[1023px]:w-40 min-[1023px]:p-0 min-[1023px]:text-[0.8rem] min-[1200px]:left-[2.4rem] min-[1200px]:top-[1.2rem] min-[1200px]:text-base',

  footnote: 'border-t-0 bg-white pt-4 text-left md:rounded-b md:p-[15px] md:pt-6',
  footnoteBody:
    'block text-[var(--text-on-light-muted)] [&_h3]:!mt-0 [&_h3]:!mb-2 [&_h3]:text-[28px] [&_h3]:font-normal [&_h3]:leading-[1.235] [&_h3]:text-[var(--text-on-light-base)] [&_p]:!mb-4 [&_p]:text-[20px] [&_p]:leading-normal [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:!mb-0 [&_li]:text-[20px] [&_li]:leading-normal [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline',

  mobile: 'block md:hidden',
  carousel:
    'flex items-start gap-6 overflow-x-auto py-8 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden',
  carouselSingle: 'overflow-x-hidden',
  box: 'flex-[0_0_calc(85%-0.5rem)] snap-start',
  boxFull: 'flex-[0_0_100%]',

  mobilePackage: 'relative p-0 text-left',
  mobileHeader: 'rounded-lg bg-[var(--surface-compare-packages-card)] p-6',
  mobileName: 'mb-[5px] mt-0 block text-[24px] font-bold leading-9 text-[var(--text-brand-cyan)]',
  mobileDescription:
    'mb-4 flow-root text-left text-base text-[var(--text-on-light-muted)] [&_h4]:!mb-0 [&_h4]:text-base [&_h4]:leading-[1.35] [&_p]:!mb-2 [&_p]:text-base [&_ul]:!mb-4 [&_ul]:pl-4 [&_ul]:text-base [&_li]:!mb-2 [&_li]:text-base [&_li]:leading-[1.25] [&_li::marker]:text-xs [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline',
  mobileDescriptionTall: 'min-h-[255px] min-[470px]:min-h-[220px]',
  mobileDescriptionTaller: 'min-h-[315px] min-[470px]:min-h-[270px]',
  mobileProducts: 'mt-4 mb-0 block list-none p-0',
  mobileProductsAligned: '[&_li]:min-h-[58px]',
  mobileProduct:
    'm-0 flex items-center gap-3 border-t-0 border-b border-solid border-[var(--border-on-light)] !rounded-none px-[5px] py-2.5',
  mobileCheck: 'h-[15px] w-auto shrink-0 text-[var(--icon-success)]',
  mobileProductLabel:
    'flex-1 whitespace-pre-line text-[15px] leading-[1.2] text-[var(--text-on-light-muted)]',
  mobileInfoIcon: 'ml-2.5 size-[15px] shrink-0 text-[15px] text-[var(--icon-on-light-faint)]',
} as const
