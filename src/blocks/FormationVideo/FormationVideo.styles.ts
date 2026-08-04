export const formationVideoStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  header: 'mb-8 flex flex-col text-center',

  heading:
    'mb-2 block whitespace-pre-line break-words text-center text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  subheading:
    'mb-2 block whitespace-pre-line break-words text-center text-[24px] font-normal leading-[32.4px] text-[var(--text-on-light-muted)]',

  videoWrap: 'relative w-full',

  trigger:
    'block w-full min-[1023px]:mx-auto min-[1023px]:max-w-[640px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2',

  playIconHidden: 'hidden',

  playIcon: 'h-16 w-12 opacity-75 transition-opacity duration-300 group-hover:opacity-100',

  mediaWrap: 'block w-full',

  image: 'h-auto w-full',

  imageSizes: '(max-width: 1022px) 100vw, 640px',
} as const
