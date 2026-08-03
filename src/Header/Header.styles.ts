export const headerStyles = {
  header:
    'group font-legacy-condensed sticky top-0 z-[1000] w-full md:relative min-[1200px]:pb-[15px] data-[on-light]:bg-[rgb(var(--white))] data-[on-light]:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.24)] min-[1200px]:data-[on-light]:border-b min-[1200px]:data-[on-light]:border-[var(--border-on-light)]',
  headerScrolled:
    'data-[scrolled]:bg-[var(--surface-hero-brand)] min-[769px]:data-[scrolled]:bg-transparent',

  container:
    'mx-auto w-full max-w-[1180px] px-5 group-data-[scrolled]:bg-[var(--scrim-hero)] min-[470px]:max-w-[1190px] md:max-w-[1210px] min-[769px]:group-data-[scrolled]:bg-transparent min-[1023px]:max-w-[1230px] min-[1023px]:px-[30px]',

  topRow:
    'grid h-[90px] w-full grid-cols-[3fr_1fr] md:grid-cols-[8fr_5fr_1fr] min-[1200px]:grid-cols-2',
  logoCell: 'flex max-h-[90px] justify-start',
  logoLink: 'my-auto flex max-w-[280px] items-center hover:underline',
  logoImage: 'my-auto flex h-auto w-full max-w-[280px]',

  burgerCell: 'flex max-h-[90px] min-[1200px]:hidden',
  burgerButton:
    'ml-auto -mr-[26.6667px] flex h-full w-[90px] cursor-pointer items-center justify-center self-center rounded-none border-0 bg-transparent p-0 px-[26.6667px] text-[rgb(var(--white))] shadow-none hover:bg-transparent group-data-[on-light]:text-[rgb(var(--black))]',
  burgerBox: 'relative h-5 w-10',
  burgerBar:
    'absolute -mt-0.5 block h-[3px] w-full origin-center bg-[rgb(var(--white))] transition-transform duration-[400ms] ease-in-out group-data-[on-light]:bg-[rgb(var(--black))]',
  burgerBarTop: 'top-0',
  burgerBarTopOpen: 'translate-y-[10px] rotate-45',
  burgerBarMiddle: 'top-[10px] transition-opacity duration-100 ease-out',
  burgerBarMiddleOpen: 'opacity-0',
  burgerBarBottom: 'top-0 translate-y-[20px]',
  burgerBarBottomOpen: 'translate-y-[10px] -rotate-45',

  bottomWrap:
    'absolute left-0 top-[90px] z-[99999] flex w-full flex-col px-5 min-[1200px]:relative min-[1200px]:top-auto min-[1200px]:z-auto min-[1200px]:h-[46px] min-[1200px]:flex-row min-[1200px]:items-stretch min-[1200px]:justify-between min-[1200px]:bg-transparent min-[1200px]:p-0 min-[1200px]:shadow-none',
  bottomWrapOpen:
    'bg-[rgb(var(--black))] shadow-[0_50px_40px_-5px_rgba(50,50,93,0.25),0_8px_16px_-8px_rgba(0,0,0,0.1),0_-6px_16px_-6px_rgba(0,0,0,0.01),0_0_20px_rgba(0,0,0,0.01)] group-data-[on-light]:bg-[rgb(var(--white))] min-[1200px]:group-data-[on-light]:bg-transparent',

  siteNav:
    'flex w-full flex-col min-[1200px]:flex min-[1200px]:w-auto min-[1200px]:flex-row min-[1200px]:justify-start',
  userNav:
    'flex w-full flex-col min-[1200px]:flex min-[1200px]:w-auto min-[1200px]:flex-row min-[1200px]:justify-end',
  navList: 'm-0 flex w-full list-none flex-col p-0 min-[1200px]:w-auto min-[1200px]:flex-row',
  siteNavListOffset: 'min-[1200px]:-ml-[18px]',
  userNavListOffset: 'min-[1200px]:ml-auto',

  navRow:
    'flex w-full border border-[var(--border-on-dark-subtle)] border-x-transparent border-t-transparent text-[18px] leading-[27px] text-[rgb(var(--white))] transition-colors duration-150 hover:text-[var(--surface-brand-cyan-light)] min-[1200px]:h-full min-[1200px]:w-auto min-[1200px]:self-center min-[1200px]:border min-[1200px]:border-b-0 min-[1200px]:border-transparent min-[1200px]:hover:text-[rgb(var(--white)/0.65)] group-data-[on-light]:border-b-[var(--border-on-light)] group-data-[on-light]:text-[var(--text-on-light-muted)] group-data-[on-light]:hover:text-[var(--surface-brand-cyan)] min-[1200px]:group-data-[on-light]:hover:text-[var(--surface-brand-cyan)]',
  navRowLast: 'border-b-0',
  navRowNoBorder: 'border-x-0 border-t-0 min-[1200px]:border-0',
  navRowPlain: 'md:hover:text-[rgb(var(--white)/0.65)]',
  navLink:
    'flex w-full items-center py-[13.5px] text-inherit [text-shadow:2px_2px_3px_rgba(0,0,0,0.2)] group-data-[on-light]:[text-shadow:none] min-[1200px]:h-full min-[1200px]:w-auto min-[1200px]:whitespace-nowrap min-[1200px]:border min-[1200px]:border-transparent min-[1200px]:px-[13.6px] min-[1200px]:py-2',
  navLinkFlushRight: 'min-[1200px]:pr-0',
  navLinkIcon: 'mr-[5px] h-[1em] w-[0.875em] shrink-0',

  dropdown: 'flex w-full flex-col border border-transparent min-[1200px]:w-auto',
  dropdownTrigger:
    'relative flex w-full cursor-pointer flex-row text-left text-inherit min-[1200px]:h-full min-[1200px]:w-auto min-[1200px]:items-center min-[1200px]:whitespace-nowrap min-[1200px]:px-[13.6px] min-[1200px]:py-2',
  dropdownTitle:
    'flex h-full w-full items-center self-center text-left font-normal text-inherit [text-shadow:2px_2px_3px_rgba(0,0,0,0.2)] group-data-[on-light]:[text-shadow:none]',
  dropdownCaret: 'ml-1.5 mt-0.5 hidden h-[18px] w-[13.5px] shrink-0 min-[1200px]:block',
  dropdownToggle: 'flex w-full justify-end self-center min-[1200px]:hidden',
  dropdownToggleIcon: 'flex p-[18px]',
  dropdownToggleGlyph: 'h-[18px] w-[15.75px] shrink-0',

  panel:
    'flex w-full flex-col pb-4 text-[20px] leading-[30px] text-[rgb(var(--white))] group-data-[on-light]:text-[var(--text-on-light-muted)] min-[1200px]:group-data-[on-light]:text-[rgb(var(--white))] min-[1200px]:absolute min-[1200px]:top-[44px] min-[1200px]:z-[9000] min-[1200px]:-ml-px min-[1200px]:w-max min-[1200px]:min-w-[360px] min-[1200px]:border-t-4 min-[1200px]:border-[var(--surface-brand-cyan-light)] min-[1200px]:bg-[rgb(var(--black))] min-[1200px]:px-[35px] min-[1200px]:py-[15px] min-[1200px]:shadow-[0_15px_35px_rgba(50,50,93,0.1),0_5px_15px_rgba(0,0,0,0.07)]',
  panelColumns: 'block',
  panelColumnsTwo: 'md:grid md:grid-cols-[auto_auto] md:gap-x-8',
  panelColumnsThree: 'md:grid md:grid-cols-[auto_auto_auto] md:gap-x-8',
  panelColumn: '',
  panelColumnSpaced: 'mb-4 md:mb-0',
  panelHeading:
    'mb-2 text-[19.2px] font-semibold leading-[25.92px] text-[rgb(var(--white))] [text-shadow:2px_2px_3px_rgba(0,0,0,0.2)] group-data-[on-light]:text-[var(--text-on-light-strong)] group-data-[on-light]:[text-shadow:none] min-[1200px]:group-data-[on-light]:text-[rgb(var(--white))]',
  panelLink:
    'flex flex-row items-baseline justify-start py-[6.4px] text-[rgb(var(--white))] transition-colors duration-100 hover:text-[var(--surface-brand-cyan)] focus:text-[var(--surface-brand-cyan)] group-data-[on-light]:text-[var(--text-on-light-muted)] group-data-[on-light]:hover:text-[var(--surface-brand-cyan)] group-data-[on-light]:focus:text-[var(--surface-brand-cyan)] min-[1200px]:group-data-[on-light]:text-[rgb(var(--white))] md:py-[3.2px] md:text-[17px] md:leading-[25.5px]',
  panelLinkIcon:
    'mb-[0.075em] mr-[0.375em] h-[0.75em] w-[0.46875em] shrink-0 md:-ml-[13px] min-[1590px]:ml-0',

  panelCtaTop: 'mb-4 flex items-center justify-start min-[1200px]:hidden',
  panelCtaBottom: 'mt-4 hidden justify-center min-[1200px]:flex',
  panelCtaLink:
    'flex items-center font-semibold uppercase text-[rgb(var(--white))] transition-colors duration-100 hover:text-[var(--surface-brand-cyan)] focus:text-[var(--surface-brand-cyan)] group-data-[on-light]:text-[var(--text-on-light-strong)] min-[1200px]:group-data-[on-light]:text-[rgb(var(--white))] min-[1200px]:text-[24px] min-[1200px]:leading-9 min-[1200px]:tracking-[1px]',
  panelCtaIcon: 'mr-2 size-[1em] shrink-0',
} as const
