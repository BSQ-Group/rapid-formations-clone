export const registerOverseasStyles = {
  // Section: full-width, card centered. Horizontal padding per breakpoint
  // (mobile px-4 / tablet px-8 / desktop px-0 — max-width constrains the card).
  section: 'flex flex-col items-center w-full px-4 md:px-8 lg:px-0',

  // Card: white rounded-3xl container, max 1200px wide.
  // Mobile/tablet: vertical stack (text top, image bottom).
  // Desktop (lg+): horizontal row (text left, image right), 50/50 split.
  card: 'bg-[var(--surface-primary)] rounded-3xl overflow-hidden w-full max-w-[1200px] flex flex-col gap-4 p-4 md:gap-4 md:p-8 lg:flex-row lg:items-center lg:gap-10 lg:p-4',

  // Content column (text + button).
  // Mobile: gap-8 (32px) between text and button, pb-5 (20px).
  // Tablet: gap-12 (48px), no bottom padding.
  // Desktop: flex-1, p-5 (20px), full height, button anchored to bottom (justify-between).
  content: 'flex flex-col items-start gap-8 pb-5 md:gap-12 md:pb-0 lg:flex-1 lg:basis-1/2 lg:min-w-0 lg:justify-between lg:gap-0 lg:self-stretch lg:p-5',

  // Text group: heading + body stacked with 8px gap.
  textGroup: 'flex flex-col gap-2 w-full',

  // Heading carries an authored <br> after "company" (matches Figma). The break
  // shows on mobile and desktop (two lines) but is suppressed at tablet, where
  // Figma renders the heading on a single line.
  heading: 'text-[var(--text-strong)] [&_br]:inline md:[&_br]:hidden lg:[&_br]:inline',

  body: 'text-[var(--text-subtle)]',

  // Image wrapper: full-width below text on mobile/tablet, right 50% column on desktop.
  // Mobile: 198px tall; Tablet: 343px tall; Desktop: flex-1 (50%), 343px tall.
  imageWrapper: 'relative w-full h-[198px] md:h-[343px] lg:w-auto lg:flex-1 lg:basis-1/2 lg:min-w-0 lg:h-[343px] rounded-xl overflow-hidden',

  image: 'object-cover',
} as const
