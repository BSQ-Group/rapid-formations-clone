export const howItWorksScreensStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  heading:
    'mb-2 block break-words whitespace-pre-line text-center text-[36px] leading-[44.46px] font-normal tracking-normal text-[var(--text-on-light-base)]',

  grid: 'flex flex-col gap-8 md:grid md:[grid-template-columns:repeat(var(--screen-count),1fr)]',

  item: 'mb-8 last:mb-0 md:mb-0',

  window:
    'mx-auto w-full max-w-[900px] overflow-hidden rounded-lg bg-[var(--surface-canvas)] shadow-browser-window',

  bar: 'relative flex h-10 items-center bg-[var(--surface-browser-chrome)] px-3',

  dots: 'flex gap-2',

  dot: 'h-3 w-3 rounded-[50%]',

  dotRed: 'bg-[var(--surface-browser-dot-red)]',
  dotAmber: 'bg-[var(--surface-browser-dot-amber)]',
  dotGreen: 'bg-[var(--surface-browser-dot-green)]',

  plain: 'overflow-hidden rounded-lg',

  screen: 'block h-auto w-full',

  captionWrap: 'mt-4 text-center',

  caption:
    'mb-4 block whitespace-pre-line text-xl leading-[30px] font-normal text-[var(--text-on-light-muted)]',
} as const
