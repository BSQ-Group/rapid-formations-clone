export const scholarshipProgrammeStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  wrapperPad: 'pt-10 min-[1023px]:py-5',

  grid: 'grid w-full grid-cols-1 gap-5 md:grid-cols-[3fr_1fr] md:gap-[50px] min-[1023px]:grid-cols-[4fr_1fr] min-[1590px]:grid-cols-[3fr_1fr]',

  // 44px under the title, matching the source — the shared heading margin leaves 20px.
  title:
    'mt-5 mb-11 block text-[38px] leading-[1.15] font-semibold text-[var(--text-on-light-base)] md:mt-5',

  ctaWrap: 'mt-8 mb-16 w-full md:w-max',

  // The shared shell sets a tighter rhythm than this page's source, which runs 16px
  // between paragraphs, 24px headings and 8px around list items. Passed last through
  // cn() so tailwind-merge drops the shell's conflicting utilities outright.
  intro:
    '[&_p]:!mb-4 [&_h3]:!mt-8 [&_h3]:!mb-5 [&_h3]:text-[24px] [&_h3]:leading-[29.64px] [&_ul]:!mb-4 [&_ol]:!mb-4 [&_li]:!my-2',

  inlinePartners: 'mt-[60px]',
} as const
