export const contactUsStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] text-[18px] leading-[27px] text-[var(--text-on-light-base)]',
  block: 'mb-12',
  titleWrap: 'mb-8',
  heading:
    'm-0 block whitespace-pre-line break-words text-[28px] font-normal leading-[1.235] text-[var(--text-on-light-base)]',
  body: 'block text-[20px] leading-[30px] text-[var(--text-on-light-muted)] [&_p]:!mb-4 [&_p]:text-[20px] [&_p]:leading-[30px] [&_strong]:font-bold [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline',
  buttons: 'mt-4 flex flex-col md:inline-flex md:flex-row md:flex-wrap',
  button: 'mb-2.5 w-full last:mb-0 md:mb-0 md:mr-2.5 md:w-auto md:last:mr-0',
  icon: 'mr-1 h-[17px] w-auto',
} as const
