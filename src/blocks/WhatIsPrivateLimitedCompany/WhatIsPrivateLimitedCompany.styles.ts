export const whatIsPrivateLimitedCompanyStyles = {
  section: [
    'flex flex-col items-center gap-14',
    'px-4',
    'md:px-8',
    'lg:px-10',
    'xl:px-0',
    '2xl:px-16',
  ].join(' '),

  container: [
    'flex flex-col gap-14 items-start w-full max-w-[1200px]',
    'lg:flex-row lg:justify-center lg:gap-14',
    // Figma narrows the 1280 tier container to 994px so the heading wraps
    // to two lines; 2xl returns to the full 1200 max for the 1800 tier.
    'xl:max-w-[994px] 2xl:max-w-[1200px]',
  ].join(' '),

  image: [
    'relative w-full h-[360px] shrink-0 rounded-3xl overflow-hidden',
    'lg:h-auto lg:w-[384px] lg:self-stretch',
  ].join(' '),

  // Portrait source covers a landscape container at the column-layout tiers,
  // so the crop window has to skew up to keep the face roughly where Figma
  // shows it. Mobile container is nearly square (~313×360) — object-top works.
  // Tablet container is much wider (~689×360) so the source is scaled more
  // aggressively; shifting the crop window down ~25% lifts the face to the
  // top quarter of the frame, matching Figma. lg+ uses the portrait container
  // and the source fits 1:1.
  imageEl: [
    'absolute inset-0 w-full h-full object-cover',
    'object-top md:object-[0%_25%] lg:object-top',
  ].join(' '),

  textCol: ['flex flex-col gap-4 items-start justify-center w-full', 'lg:flex-1 lg:min-w-0'].join(
    ' ',
  ),

  title: [
    'text-[var(--text-strong)] tracking-[-1px] w-full',
    'text-[36px] leading-[40px] font-bold',
    '2xl:text-[48px] 2xl:leading-[56px] 2xl:font-extrabold',
  ].join(' '),

  paragraphs: 'flex flex-col gap-3 w-full',

  paragraph: [
    'text-[var(--text-subtle)] w-full',
    'text-[16px] leading-[24px]',
    '2xl:text-[18px] 2xl:leading-[28px]',
  ].join(' '),
} as const
