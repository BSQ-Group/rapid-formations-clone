// Per-breakpoint values come straight from Figma. The Text component handles
// title/price typography via textStyle presets (headline-6xl, headline-4xl,
// body-base); everything below is layout, spacing, and the floating widget
// cards that overlap the hero image.
//
// Widget slot positions are absolute offsets inside visualCol. Both 2-widget
// and 3-widget configurations have their own slot map because the top-right
// widget sits further left in the 3-widget design to make room for the
// bottom-right widget below it.
export const heroServicesBannerStyles = {
  section: 'w-full px-5 md:px-10 wide:px-0',
  // Inner wrapper carries layout + horizontal padding + max-width so the outer
  // SectionWrapper's bg color stays edge-to-edge at wide viewports (CORE-3538).
  // At wide the Figma "Container" is exactly 1440px wide with no inner padding
  // (the 180px gutter is the frame's outer padding). max-w-[1440px] + px-0 +
  // mx-auto reproduces that: 1440 content centered, ≥180px gutters at ≥1800.
  // gap stays 48px (xl:gap-12) — Figma's container gap at wide is 48, not 96.
  inner:
    'flex flex-col items-stretch gap-10 md:gap-12 mx-auto lg:flex-row lg:items-center w-full justify-between max-w-[1200px] wide:max-w-[1440px] wide:px-0 wide:mx-auto',

  // Text column grows to fill (Figma: flex-1 ≈ 804px at wide) — the visual
  // column stays fixed 588px, so flex-1 consumes the remaining space.
  textCol: 'flex flex-col items-start gap-8 w-full lg:flex-1 lg:min-w-0',

  titleBlock: 'flex flex-col items-start gap-4 md:gap-1 lg:gap-4 w-full',

  // Figma overrides headline-6xl preset's default leading at md/lg/wide.
  title: 'text-[var(--text-strong)] w-full md:leading-[40px] lg:leading-[68px] wide:leading-[80px]',

  description: 'text-[var(--text-muted)] w-full',

  // Figma wants 700 weight at all viewports + tighter leading at wide.
  price: 'text-[var(--text-strong)] w-full font-bold wide:leading-[56px]',

  ctaRow:
    'flex flex-col items-center gap-4 w-full md:flex-row md:items-center md:w-auto lg:flex-col lg:items-start lg:w-full',

  ctaButton: 'w-full md:w-auto',

  trustpilot: 'w-[240px] max-w-full self-start -ml-[10px]',

  // visualCol matches the Figma "Visual" frame width at each breakpoint so
  // widget pixel offsets below land on the right spots. overflow-visible (the
  // default) lets widgets sit outside the column when they overhang the image.
  visualCol:
    'relative w-full mx-auto max-w-[320px] md:max-w-[608px] lg:max-w-none lg:flex-none lg:w-[486px] xl:w-[553px] wide:w-[588px]',

  // Image frame: Figma widths/heights per viewport. Alignment inside visualCol
  // matches Figma — image is right-aligned at lg (items-end), left-aligned at
  // xl/wide (items-start), centered at md/mobile.
  imageFrame:
    'relative overflow-hidden rounded-3xl mx-auto w-[252px] h-[202px] md:w-[520px] md:h-[322px] lg:w-[390px] lg:h-[322px] lg:mx-0 lg:ml-auto xl:w-[518px] xl:h-[348px] xl:mx-0 xl:mr-auto wide:w-[518px] wide:h-[348px]',

  image: 'absolute inset-0 w-full h-full object-cover',

  // ---------- Widget slot positions (absolute inside visualCol) ----------
  //
  // At md the visualCol is max-w-[608px] centered; image (520) is centered
  // inside it, so the image starts at left=44 within visualCol.
  // At lg the visualCol is 486 wide; image (390) right-aligns, so image starts
  // at left=96 within visualCol.
  // At xl visualCol=553, image (518) left-aligns, image at left=0.
  // At wide visualCol=588, image (518) left-aligns, image at left=0.

  // === 2-widget configuration ===
  // Slot 1: top-right of image.
  twoWidgetSlot1:
    'absolute top-[124px] left-[4px] md:left-[375px] md:top-[32px] lg:left-[263px] lg:top-[-30px] xl:left-[295px] xl:top-[42px] wide:left-[298px] wide:top-[36px]',

  // Slot 2: middle-left of image, overhanging the left edge.
  twoWidgetSlot2:
    'absolute top-[180px] left-[66px] md:left-[3px] md:top-[183px] lg:left-[7px] lg:top-[180px] xl:left-[-41px] xl:top-[206px] wide:left-[-41px] wide:top-[206px]',

  // === 3-widget configuration ===
  // Slot 1: top-right, sits further inset (and is hidden at mobile because the
  // Figma mobile design for 3-widget only shows the bottom two).
  threeWidgetSlot1:
    'hidden md:block md:absolute md:left-[312px] md:top-[30px] lg:left-[189px] lg:top-[-30px] xl:left-[221px] xl:top-[42px] wide:left-[215px] wide:top-[36px]',

  // Slot 2: middle-left of image, same column position as 2-widget config.
  // At mobile this is the first widget visible (3-widget hides slot 1).
  threeWidgetSlot2:
    'absolute top-[124px] left-[4px] md:top-[183px] md:left-[3px] lg:left-[7px] lg:top-[180px] xl:left-[-41px] xl:top-[206px] wide:left-[-40px] wide:top-[206px]',

  // Slot 3: bottom-right of image, overhanging the bottom-right corner.
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
