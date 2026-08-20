export const affiliateProgramStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',
  panel: 'flex flex-col bg-[var(--surface-on-light-wash-blue)] px-10 pb-4 pt-[30px]',
  content:
    'block text-[20px] leading-[30px] text-[var(--text-on-light-muted)] [&_h3]:!mt-0 [&_h3]:!mb-[23.2px] [&_h3]:text-[26px] [&_h3]:font-normal [&_h3]:leading-[1.235] [&_h3]:text-[var(--text-on-light-base)] [&_h3]:md:text-[28px] [&_p]:!mb-4 [&_p]:text-[20px] [&_p]:leading-[30px] [&_ul]:!m-0 [&_ul]:!p-0 [&_ul]:!pl-2 [&_ul]:list-none [&_ul]:min-[1023px]:!pl-4 [&_li]:!mb-2.5 [&_li]:grid [&_li]:grid-cols-[1em_auto] [&_li]:gap-2 [&_li:last-child]:!mb-0 [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline',
  bullet: 'relative top-[6px] size-4 text-[16px] text-[var(--text-on-light-muted)]',
  cta: 'mx-4 my-6 self-center text-[20.8px] leading-[31.2px] min-[1023px]:px-12 min-[1023px]:text-[25.6px] min-[1023px]:leading-[38.4px]',
} as const
