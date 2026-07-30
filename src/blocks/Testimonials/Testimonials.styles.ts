export const testimonialsStyles = {
  // Prod renders this block edge-to-edge below lg (no outer vertical padding); the wrapper's
  // XL default would otherwise add 80px top + bottom on mobile/tablet. Override there so the
  // wrapper's lg+ padding (112px, matching prior `lg:py-28`) stays intact above the breakpoint.
  section: 'w-full max-lg:!py-0',
  inner: 'flex flex-col items-center gap-14 w-full max-w-[1280px] px-2 lg:px-6 mx-auto',
  header: 'flex flex-col gap-3 items-center text-center w-full px-6',
  heading: 'text-[var(--text-strong)]',
  description: 'text-[var(--text-subtle)]',
} as const
