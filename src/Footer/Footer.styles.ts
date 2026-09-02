export const footerStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-on-light-sunken)] pb-[50px] text-[18px] leading-[27px] text-[var(--text-on-light-base)] min-[1023px]:pb-0',

  scrollToTopRow: 'flex h-0 justify-center',
  scrollToTopButton:
    'relative top-[-18px] inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none bg-[var(--surface-canvas-inverse)] p-2 text-[var(--surface-brand-cyan)] transition-colors hover:text-[var(--surface-brand-cyan-light)]',
  scrollToTopIcon: 'inline-block shrink-0 text-[2rem]',

  container:
    'mx-auto block w-full max-w-[1210px] px-5 min-[1023px]:max-w-[1230px] min-[1023px]:px-[30px]',
  content: 'flex flex-col pt-10 min-[1023px]:py-5',

  iconsRow:
    'flex flex-col-reverse md:flex-row md:items-center md:justify-between min-[1023px]:mb-[27px] min-[1023px]:grid min-[1023px]:grid-cols-[2fr_1fr] min-[1023px]:gap-5',

  cardIcons: 'mb-5 flex flex-row justify-center gap-2.5 md:mb-0 md:justify-start',
  cardIcon: 'h-[35px] w-[55px] md:h-[45px] md:w-[65px]',

  socialSlot: 'flex justify-center',
  socialIcons: 'mx-auto mb-4 flex flex-row min-[1023px]:ml-auto min-[1023px]:mr-0',
  socialLink: 'block px-[0.3em] hover:underline',
  socialIcon: 'inline-block align-[-0.125em] text-[42px]',

  linkColumns: 'grid w-full grid-cols-1 gap-5 min-[1023px]:grid-cols-5',
  column: 'flex w-full flex-col overflow-hidden',
  columnHeader:
    'flex w-full cursor-pointer flex-row justify-normal border-b-[3px] border-[var(--border-on-light)] bg-transparent p-0 text-left min-[1023px]:grid min-[1023px]:cursor-auto min-[1023px]:gap-5 min-[1023px]:border-b min-[1023px]:py-2.5',
  columnTitle:
    'self-center text-[22px] font-semibold leading-[33px] text-[var(--text-on-light-base)]',
  columnToggle: 'ml-auto flex flex-row justify-end self-center min-[1023px]:hidden',
  columnToggleIcon: 'flex p-[18px] text-[18px]',
  columnList:
    'mt-2.5 mb-0 list-none p-0 text-left text-[20px] leading-[30px] text-[var(--text-on-light-muted)]',
  columnListClosed: 'hidden min-[1023px]:block',
  columnListOpen: 'block',
  columnLink:
    'mb-2 inline-block h-full min-w-full text-[17px] leading-[25.5px] text-[var(--text-on-light-muted)] no-underline hover:underline',

  companyRow:
    'mt-[18px] flex flex-col min-[1023px]:grid min-[1023px]:grid-cols-[1fr_1fr] min-[1023px]:flex-row',
  company: 'mt-[18px] min-[1023px]:w-[450px]',
  companyBsq: 'mb-2 flex flex-row items-center gap-2',
  companyLogoLink: 'hover:underline',
  companyBsqLogo: 'block w-[111px]',
  companyLogo: 'block w-[275px]',
  companyDetails: 'mt-6 mb-8 text-[var(--text-on-light-muted)] min-[1023px]:mt-4 min-[1023px]:mb-0',
  companyDetailLine: 'block w-full md:inline-block md:w-auto',
  companyDetailLink: 'text-[var(--text-on-light-muted)] no-underline hover:underline',
  divider: 'md:hidden min-[1023px]:block',
  accreditationSlot: 'block max-w-full',

  accreditations:
    'flex h-full flex-row flex-wrap md:pt-[18px] min-[1023px]:flex-nowrap min-[1023px]:justify-start min-[1300px]:justify-end',
  accreditation:
    'mb-6 flex max-w-full flex-[1_1_50%] items-center justify-center self-center md:mx-[18px] md:mt-4 md:mb-0 md:flex-[1_1_20%] md:first:ml-0 md:[&:nth-child(-n+4)]:mt-0 min-[1023px]:mt-0 min-[1023px]:flex-1',
  accreditationBox: 'shrink-0',
  accreditationImage: 'h-auto w-full max-w-full object-contain object-left',

  contacts:
    'mt-[18px] flex flex-col border-t border-[var(--border-on-light)] pt-[9px] pb-5 min-[470px]:mt-[9px] min-[470px]:grid min-[470px]:w-full min-[470px]:grid-cols-2 min-[470px]:gap-5 min-[470px]:pt-[22.5px] md:pb-8 min-[1023px]:mt-[54px] min-[1023px]:pb-12 min-[1590px]:pb-5',
  copyright: 'm-0 block text-[20px] leading-[30px] text-[var(--text-on-light-muted)]',
  copyrightReg: 'relative top-1 inline align-middle text-[200%] font-thin leading-[0]',
  copyrightLink:
    'text-[var(--text-on-light-muted)] no-underline hover:underline',
} as const
