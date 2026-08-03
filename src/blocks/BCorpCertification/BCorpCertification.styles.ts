export const bCorpCertificationStyles = {
  section: 'w-full',

  banner:
    'font-legacy-condensed relative flex w-full flex-col-reverse items-end justify-start gap-8 p-6 min-h-[500px] mb-[70px] md:flex-row md:justify-between md:gap-0 md:p-12 md:min-h-screen md:mb-[140px]',

  backgroundWrapper: 'absolute inset-0',
  backgroundImage: 'object-cover',

  overlay: 'hidden',

  caption:
    'relative min-w-0 max-w-full [overflow-wrap:anywhere] text-right text-[20px] font-normal text-[var(--text-strong)] md:text-left md:text-[28px] md:leading-[42px] md:font-semibold',

  badgeLink: 'relative hover:underline hover:text-[var(--text-on-light-link-hover)]',

  badgeImage: 'h-auto w-full max-w-[250px] md:max-w-[350px] min-[1023px]:max-w-[500px]',
} as const
