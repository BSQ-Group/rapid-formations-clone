export const registerOverseasStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  sectionHeading:
    'mb-2 block whitespace-pre-line break-words text-center text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  panel:
    'mt-8 flex flex-col-reverse border border-[var(--border-on-light)] md:grid md:grid-cols-[1.25fr_1fr] md:gap-8',

  content: 'flex flex-col justify-center bg-[var(--surface-canvas-inverse)] p-[25px] md:p-[55px]',

  heading:
    'mb-2 block break-words text-[24px] font-normal leading-[29.64px] text-[var(--text-on-light-base)]',

  body: 'text-[20px] font-normal leading-[30px] text-[var(--text-on-light-muted)] [&_p]:mb-4 [&_a]:text-[var(--surface-brand-cyan)] [&_a]:no-underline hover:[&_a]:underline',

  ctaWrap: 'mt-6 flex items-center justify-center md:mt-12',

  imageWrap: 'md:relative',

  image: 'h-auto w-full object-cover md:absolute md:inset-0 md:h-full md:w-full',
} as const
