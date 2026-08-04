export const heroServicesBannerStyles = {
  section: 'w-full px-5 md:px-10 wide:px-0',
  inner:
    'flex flex-col items-stretch gap-10 md:gap-12 mx-auto lg:flex-row lg:items-center w-full justify-between max-w-[1200px] wide:max-w-[1440px] wide:px-0 wide:mx-auto',

  textCol: 'flex flex-col items-start gap-8 w-full lg:flex-1 lg:min-w-0',

  titleBlock: 'flex flex-col items-start gap-4 md:gap-1 lg:gap-4 w-full',

  title: 'text-[var(--text-strong)] w-full md:leading-[40px] lg:leading-[68px] wide:leading-[80px]',

  description: 'text-[var(--text-muted)] w-full',

  price: 'text-[var(--text-strong)] w-full font-bold wide:leading-[56px]',

  ctaRow:
    'flex flex-col items-center gap-4 w-full md:flex-row md:items-center md:w-auto lg:flex-col lg:items-start lg:w-full',

  ctaButton: 'w-full md:w-auto',

  trustpilot: 'w-[240px] max-w-full self-start -ml-[10px]',

  visualCol:
    'relative w-full mx-auto max-w-[320px] md:max-w-[608px] lg:max-w-none lg:flex-none lg:w-[486px] xl:w-[553px] wide:w-[588px]',

  imageFrame:
    'relative overflow-hidden rounded-3xl mx-auto w-[252px] h-[202px] md:w-[520px] md:h-[322px] lg:w-[390px] lg:h-[322px] lg:mx-0 lg:ml-auto xl:w-[518px] xl:h-[348px] xl:mx-0 xl:mr-auto wide:w-[518px] wide:h-[348px]',

  image: 'absolute inset-0 w-full h-full object-cover',

  twoWidgetSlot1:
    'absolute top-[124px] left-[4px] md:left-[375px] md:top-[32px] lg:left-[263px] lg:top-[-30px] xl:left-[295px] xl:top-[42px] wide:left-[298px] wide:top-[36px]',

  twoWidgetSlot2:
    'absolute top-[180px] left-[66px] md:left-[3px] md:top-[183px] lg:left-[7px] lg:top-[180px] xl:left-[-41px] xl:top-[206px] wide:left-[-41px] wide:top-[206px]',

  threeWidgetSlot1:
    'hidden md:block md:absolute md:left-[312px] md:top-[30px] lg:left-[189px] lg:top-[-30px] xl:left-[221px] xl:top-[42px] wide:left-[215px] wide:top-[36px]',

  threeWidgetSlot2:
    'absolute top-[124px] left-[4px] md:top-[183px] md:left-[3px] lg:left-[7px] lg:top-[180px] xl:left-[-41px] xl:top-[206px] wide:left-[-40px] wide:top-[206px]',

  threeWidgetSlot3:
    'absolute top-[174px] left-[66px] md:right-auto md:left-[162px] md:top-[251px] lg:left-[139px] lg:top-[245px] xl:left-[155px] xl:top-[284px] wide:left-[176px] wide:top-[278px]',

  // Border is half-transparent white so the underlying image shows through —
  // creates the glassmorphism "halo" around each card from Figma.
  // `bg-clip-padding` is required: without it the white background paints under
  // the border, making the 50% white border look fully white.
  widgetCard:
    'flex items-center gap-[9px] bg-[var(--surface-primary)] bg-clip-padding rounded-[9px] pl-[9px] pr-[15px] py-[9px] border-[6px] border-[rgba(255,255,255,0.5)] shadow-[0px_12px_30px_0px_rgba(0,0,0,0.1)] wide:gap-3 wide:rounded-xl wide:pl-3 wide:pr-5 wide:py-3 wide:border-8 wide:shadow-[0px_16px_40px_0px_rgba(0,0,0,0.1)]',

  widgetIconTile:
    'shrink-0 flex items-center justify-center bg-[var(--surface-accent-light)] w-[42px] h-[42px] rounded-md p-[9px] md:w-[50px] md:h-[50px] md:rounded-[7px] md:p-[11px] wide:w-14 wide:h-14 wide:rounded-lg wide:p-3',

  widgetIcon:
    'text-[var(--text-strong)] w-[18px] h-[18px] md:w-[22px] md:h-[22px] wide:w-6 wide:h-6',

  widgetTextCol: 'flex flex-col items-start gap-[2px] overflow-clip',

  widgetTitle:
    'font-semibold text-[var(--text-strong)] whitespace-nowrap text-[12px] leading-[16px] md:text-[14px] md:leading-[20px] wide:text-[18px] wide:leading-[24px]',

  widgetSubtitle:
    'font-medium text-[var(--text-muted)] whitespace-nowrap text-[12px] leading-[16px] md:text-[14px] md:leading-[20px] wide:text-[18px] wide:leading-[24px]',

  progressTrack:
    'h-[3px] w-full overflow-clip rounded-full bg-[var(--surface-accent-light)] wide:h-[4px]',

  progressFill: 'h-full rounded-full bg-[var(--surface-accent-dark)]',
} as const
