export const registerOverseasStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  sectionHeading:
    'mb-2 block whitespace-pre-line break-words text-center text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  panel:
    'mt-8 flex flex-col-reverse border border-[var(--border-on-light)] md:grid md:grid-cols-[1.25fr_1fr] md:gap-8',

  panelNoImage: 'md:grid-cols-1',

  content: 'flex flex-col justify-center bg-[var(--surface-canvas-inverse)] p-[25px] md:p-[55px]',

  heading:
    'mb-2 block break-words text-[24px] font-normal leading-[29.64px] text-[var(--text-on-light-base)]',

  body: 'text-[20px] font-normal leading-[30px] text-[var(--text-on-light-muted)] [&_p]:mb-4 [&_a]:text-[var(--surface-brand-cyan)] [&_a]:no-underline hover:[&_a]:underline',

  // CORE-6960: left-align the CTA with the card text (was centred at 1024/1800)
  // and tighten the gap above it to match live (~17px; the body's last <p>
  // supplies its own mb-4). Was `mt-6 ... md:mt-12` which over-spaced 768+.
  ctaWrap: 'mt-1 flex items-center justify-start',

  imageWrap: 'md:relative',

  image: 'h-auto w-full object-cover md:absolute md:inset-0 md:h-full md:w-full',
} as const
