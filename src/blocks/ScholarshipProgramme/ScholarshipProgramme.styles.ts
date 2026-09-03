export const scholarshipProgrammeStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  wrapperPad: 'pt-10 min-[1023px]:pt-0 min-[1023px]:pb-5',

  grid: 'grid w-full grid-cols-1 gap-5 md:grid-cols-[minmax(520px,3fr)_1fr] md:gap-[50px] min-[1023px]:grid-cols-[80%_20%] min-[1590px]:grid-cols-[75%_1fr]',

  // 44px under the title, matching the source — the shared heading margin leaves 20px.
  title:
    'mt-5 mb-11 block text-[38px] leading-[1.15] font-semibold text-[var(--text-on-light-base)] md:mt-6 min-[1023px]:mt-6',

  ctaWrap: 'mt-8 mb-16 w-full md:mx-auto md:w-max',

  // The shared shell sets a tighter rhythm than this page's source, which runs 16px
  // between paragraphs, 24px headings and 8px around list items. Passed last through
  // cn() so tailwind-merge drops the shell's conflicting utilities outright.
  intro:
    '[&_p]:!mb-4 [&_h3]:!mt-8 [&_h3]:!mb-5 [&_h3]:text-[24px] [&_h3]:leading-[29.64px] [&_ul]:!mb-4 [&_ol]:!mb-4 [&_li]:!my-2 [&_ol]:!mt-0 [&_ul]:!mt-0 [&_ol]:!pl-0 [&_ul]:!pl-0 [&_ol]:list-none [&_ul]:list-none [&_li]:!ml-4 [&_li]:grid [&_li]:grid-cols-[20px_1fr] [&_li]:gap-2 [&_ol>li]:!pl-2 [&_ul>li]:!pl-0',

  listIcon: 'mt-1.5 h-4 w-4 text-[var(--text-on-light-muted)]',

  inlinePartners: 'mt-[60px] min-[1023px]:mb-0',
} as const
