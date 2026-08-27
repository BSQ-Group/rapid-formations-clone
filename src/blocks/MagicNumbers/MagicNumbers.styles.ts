export const magicNumbersStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  wrapperPad: 'pt-10 min-[1023px]:py-5',

  heading:
    'mb-2 block text-center text-[36px] leading-[44.46px] font-normal text-[var(--text-on-light-base)]',

  subheading:
    'mb-2 block text-center text-xl leading-[30px] font-normal text-[var(--text-on-light-muted)]',

  items:
    'grid w-full grid-cols-1 gap-[15px] md:grid-cols-2 min-[1590px]:relative min-[1590px]:block min-[1590px]:py-[220px]',

  item:
    'flex flex-row md:mx-auto md:w-[280px] md:odd:mr-0 md:odd:ml-auto min-[1590px]:absolute min-[1590px]:m-0',

  icon:
    'mr-2.5 flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-full text-[rgb(var(--white))]',

  glyph: 'h-[21px] w-auto',

  content: 'flex flex-col',

  itemHeading:
    'm-0 block text-2xl leading-[32.4px] font-normal tracking-normal text-[var(--text-on-light-base)]',

  itemBody:
    'm-0 block whitespace-pre-line text-lg leading-[27px] font-normal text-[var(--text-on-light-base)]',

  dividers: 'hidden min-[1590px]:flex min-[1590px]:flex-row',

  divider: 'relative h-[10px]',

  dividerLine: 'absolute w-px',
} as const
