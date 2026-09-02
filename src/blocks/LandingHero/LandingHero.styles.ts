export const landingHeroStyles = {
  section:
    'font-legacy-condensed relative w-full flex flex-col -mt-[var(--header-height)] pt-[var(--header-height)] min-h-[820px] min-[1023px]:min-h-[700px] min-[1200px]:min-h-[1045px] bg-[var(--surface-hero-brand)] overflow-hidden',

  backgroundWrapper:
    'hidden md:block absolute inset-0 bg-cover bg-fixed bg-left-top bg-repeat',

  overlay: 'absolute inset-0 pointer-events-none bg-[var(--scrim-hero)] md:bg-transparent',

  accreditations:
    'hidden min-[1590px]:flex flex-col items-end gap-4 absolute top-4 right-4 z-[1001]',
  accreditationItem: 'flex flex-row items-center gap-2',
  accreditationLabel: 'max-w-xs break-words text-right text-[var(--text-strong)]',
  accreditationLogoSm: 'w-11 h-auto',
  accreditationLogoLg: 'w-28 h-auto',

  // CORE-6959: cap the hero container at 1184px on large desktops too (was
  // widening to 1456px at `wide`/1800, oversizing the review + bank cards and
  // the search→laptop gap). Live stays at 1184px past 1200px.
  container:
    'w-full mx-auto px-2 min-[576px]:max-w-[560px] md:max-w-[752px] min-[992px]:max-w-[976px] min-[1200px]:max-w-[1184px]',
  row: 'flex flex-row flex-wrap -mx-2',
  col: 'w-full px-2',
  colMain: 'w-full px-2 flex flex-col min-[1200px]:w-7/12',
  colIllustration: 'w-full px-2 min-[1200px]:w-5/12',
  colReviews: 'w-full px-2 min-[1200px]:w-11/12',

  namecheckSection: 'relative mt-10 min-[1023px]:mt-7 min-[1590px]:mt-[60px] min-[1590px]:mb-8',

  headlineBlock:
    'flex flex-col px-5 text-center min-h-[206.36px] md:px-0 md:text-left md:min-h-[128px] min-[1023px]:min-h-[206.36px]',

  mobileBadge: 'block md:hidden mx-auto mb-6 w-full max-w-[50px] h-auto',

  eyebrow: 'mb-2 break-words font-medium opacity-80 text-[var(--text-strong)]',

  heading:
    'block mb-4 break-words text-[var(--text-strong)] [text-shadow:2px_2px_3px_rgba(0,0,0,0.1)] text-[42px] leading-[48.3px] font-normal md:text-[44px] md:leading-[50.6px] md:font-semibold min-[1023px]:text-[50px] min-[1023px]:leading-[57.5px]',

  benefitsWrap:
    'mb-4 text-left text-[var(--text-strong)] [text-shadow:2px_2px_3px_rgba(0,0,0,0.15)]',
  benefitsList: 'mb-4 flex flex-col gap-2.5',
  benefitItem: 'grid grid-cols-[20px_minmax(0,1fr)] gap-2 items-start',
  benefitIcon: 'mt-[7px] size-[18px] shrink-0 text-[var(--icon-default)]',
  benefitText: 'block break-words text-[20px] leading-[30px] font-light text-[var(--text-strong)]',

  searchForm:
    'my-4 flex w-full max-w-[670px] flex-row justify-center rounded-[5px] p-[15px] md:p-0',

  searchRow:
    'flex flex-col gap-2 w-full shadow-[2px_2px_3px_rgba(0,0,0,0.1)] md:flex-row md:gap-0 md:items-stretch md:justify-start',
  searchInput:
    'flex-1 min-w-0 min-h-[59.5px] rounded-[6px] border border-[var(--surface-canvas-inverse)] bg-[var(--surface-canvas-inverse)] px-[21px] py-[15.75px] text-[21px] leading-[normal] text-[var(--text-on-light-muted)] outline-none placeholder:text-center placeholder:text-[var(--text-on-light-subtle)] md:min-h-0 md:rounded-r-none md:border-r-0 md:placeholder:text-left',
  searchButton:
    'flex-shrink-0 rounded-[6px] md:rounded-l-none h-[65px] px-6 md:px-10 md:min-w-[25%] bg-[var(--surface-cta-success)] hover:bg-[var(--surface-cta-search-hover)] focus:bg-[var(--surface-cta-search-hover)] active:bg-[var(--surface-cta-search-hover)] text-[var(--text-strong)] font-semibold text-[21px] leading-[31.5px]',
  searchButtonIcon: 'text-[var(--icon-default)]',

  pricingLinkWrap: 'min-w-0 leading-[27px] [&>*]:align-top',
  pricingLink:
    'inline-block w-fit max-w-full py-px pr-0.5 text-[18px] md:text-[21px] leading-[normal] font-semibold text-[var(--text-strong)] [text-shadow:2px_2px_3px_rgba(0,0,0,0.15)] no-underline border-b border-[var(--text-strong)] hover:opacity-80 [overflow-wrap:anywhere]',

  illustration:
    'hidden min-[1200px]:block min-[1200px]:min-h-[337px] shrink-0 text-[18px] leading-[27px]',
  illustrationVideo:
    'hidden min-[1201px]:inline align-baseline w-[500px] h-[400px] -mt-12 max-w-none min-[1400px]:w-[600px]',

  resultBadge:
    'flex items-center gap-1.5 w-fit rounded-full px-4 py-2 border text-sm font-semibold',
  resultBadgeAvailable:
    'bg-[rgba(121,217,133,0.1)] border-[rgba(121,217,133,0.4)] text-[var(--surface-accent)]',
  resultBadgeUnavailable:
    'bg-[rgba(231,71,39,0.1)] border-[rgba(231,71,39,0.4)] text-[var(--border-error)]',

  resultEyebrow: 'text-[var(--text-subtle)] text-xs font-semibold uppercase tracking-wider',

  resultNameBlock: 'flex flex-col gap-1.5',
  resultName: 'text-[var(--text-strong)] uppercase',
  resultNameUnavailable: 'line-through decoration-[rgba(234,61,61,0.6)]',
  resultBarAvailable: 'h-[3px] w-16 rounded-sm bg-[var(--surface-accent)]',
  resultBarUnavailable: 'h-[3px] w-16 rounded-sm bg-[var(--border-error)]',

  resultDescription: 'text-[var(--text-strong)]',

  availableCtaRow: 'flex flex-col sm:flex-row items-stretch sm:items-center gap-3',
  searchAgainLink:
    'text-[var(--text-subtle)] text-sm font-medium underline cursor-pointer whitespace-nowrap hover:opacity-80 text-center sm:text-left',

  unavailableSearchRow: 'flex flex-col sm:flex-row items-stretch w-full max-w-[500px] gap-4',
  unavailableInput:
    'flex-1 min-w-0 px-4 py-3 bg-transparent border border-[rgba(255,255,255,0.2)] rounded sm:rounded-r-none text-[var(--text-strong)] placeholder:text-[var(--text-subtle)] outline-none focus:border-[rgba(255,255,255,0.5)] transition-colors',
  unavailableSearchButton: 'sm:rounded-l-none',

  reviewsSection: 'relative mb-8 md:mb-0 min-[1590px]:mb-8',
  reviews: 'mt-[15px] grid gap-[15px] md:grid-cols-2 md:pb-8 md:pr-32 min-[1023px]:pr-56',
  reviewCard:
    'relative flex flex-col justify-between min-h-[104px] rounded-[6px] border border-[var(--border-review-card-dim)] md:border-[var(--border-review-card)] bg-[var(--surface-review-card)] shadow-[2px_2px_3px_rgba(0,0,0,0.15)] px-5 py-4',
  reviewTop:
    'flex flex-col items-center min-h-[70px] min-[1200px]:min-h-0 min-[1200px]:flex-row min-[1200px]:justify-between',
  reviewLogo: 'mb-1.5 h-[30px] w-auto object-contain brightness-0 invert',
  reviewStarsWrap: 'h-[34px]',
  reviewBottom:
    'flex flex-col items-center justify-between text-[21px] leading-[31.5px] [text-shadow:2px_2px_3px_rgba(0,0,0,0.1)] min-[1200px]:flex-row',
  reviewCount: 'block text-[var(--text-strong)]',
  reviewScore: 'block text-[var(--text-strong)] whitespace-nowrap',

  bankSection: 'relative mb-12',
  bankHeading:
    'block mb-4 break-words text-center text-[21px] leading-[25.935px] font-normal text-[var(--text-strong)] [text-shadow:2px_2px_3px_rgba(0,0,0,0.15)] md:text-left md:text-[22.8px] md:leading-[28.158px] md:font-light',
  bankGrid: 'grid grid-cols-4 md:grid-cols-8 gap-2.5 w-full',
  bankCard:
    'relative overflow-hidden rounded p-2.5 bg-auto bg-repeat [background-blend-mode:overlay] shadow-[0_2px_7px_1px_rgba(0,0,0,0.2)]',
  bankLogoTile:
    'mb-[5px] grid justify-center overflow-hidden size-8 rounded-[5px] bg-[var(--surface-canvas-inverse)]',
  bankLogo: 'size-8 object-contain',
  bankName:
    'block [overflow-wrap:anywhere] text-[16px] leading-[19.76px] font-normal text-[var(--text-strong)] [text-shadow:2px_2px_3px_rgba(0,0,0,0.15)]',
} as const
