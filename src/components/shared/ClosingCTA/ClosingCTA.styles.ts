export const closingCTAStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] mb-[50px] min-[1023px]:mb-[75px] min-[1590px]:mb-[110px]',

  wrapper: 'text-center',

  heading: 'block whitespace-pre-line',

  description: 'block whitespace-pre-line font-normal text-[var(--text-on-light-muted)]',

  telephone: 'text-[var(--text-brand-cyan)] hover:underline',

  ctaWrap: 'flex justify-center pt-[15px]',
} as const

const standard = {
  section: '',

  heading: 'mb-2 text-[32px] font-bold leading-[1.235] text-[var(--surface-brand-cyan)]',

  description: 'mb-4 text-[21px] leading-normal',
}

// The review centre closes on a quieter panel than the rest of the site: the heading
// drops to body colour at a regular weight and carries its own line break, and the
// standfirst under it is a size larger.
const panel = {
  // The panel stands well clear of the section above it — the source opens it on
  // 90px, easing to 70px once there is room for the heading on one line.
  section: 'pt-[90px] lg:pt-[70px]',

  heading: 'mb-2 text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  description: 'mb-4 text-[24px] leading-[32.4px]',
}

export const closingCTAVariants = {
  standard,
  panel,
}
