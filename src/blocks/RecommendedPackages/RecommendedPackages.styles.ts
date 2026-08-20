export const recommendedPackagesStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  inner: 'flex flex-col',

  header: 'mb-8 flex flex-col text-center',

  heading:
    'mb-2 block text-4xl font-normal leading-[1.235] tracking-normal text-[var(--text-on-light-base)]',

  subheading:
    'mb-2 block text-2xl font-normal leading-[1.35] tracking-normal text-[var(--text-on-light-muted)]',

  grid: 'mb-[25px] grid grid-cols-1 justify-items-center gap-4 md:my-[35px] md:grid-cols-2 min-[1023px]:mx-auto min-[1023px]:my-[45px] min-[1023px]:max-w-[80%] min-[1023px]:grid-cols-3 min-[1023px]:items-stretch',

  card: 'relative flex h-full w-full max-w-[380px] min-h-[540px] flex-col rounded border border-solid border-black/5 bg-white bg-clip-padding px-[25px] py-[30px] shadow-[0_1px_5px_rgb(0_0_0/0.15)]',

  cardStart: 'justify-self-start',

  cardEnd: 'justify-self-end',

  cardHeader: 'min-h-[130px]',

  name: 'mb-[5px] mt-0 block text-[26px] font-bold leading-[1.235] text-[var(--text-brand-cyan)] md:text-[28px]',

  nameLink: 'text-inherit no-underline',

  prices: 'flex flex-col leading-none',

  price: 'block text-[42px] font-bold leading-none text-[var(--text-on-light-base)]',

  priceNote: 'mt-[5px] block text-base font-normal leading-none text-[var(--text-on-light-base)]',

  description:
    'block text-lg leading-normal text-[var(--text-on-light-base)] md:min-h-[300px] min-[1023px]:min-h-[450px] min-[1590px]:min-h-[175px]',

  label: 'font-bold text-[var(--text-on-light-strong)]',

  content:
    'block [&_p]:!mb-4 [&_p]:text-xl [&_p]:leading-normal [&_p]:text-[var(--text-on-light-muted)] [&_ul]:!mb-4 [&_ul]:!pl-0 [&_ul]:list-none [&_ul]:text-[17px] [&_ul]:leading-[1.15] [&_ul]:text-[var(--text-on-light-muted)] [&_li]:!mb-2.5 [&_li]:grid [&_li]:grid-cols-[17px_1fr] [&_li]:gap-2 [&_strong]:font-bold',

  contentIcon: 'relative top-1 size-3.5 text-[14px] text-[var(--text-on-light-muted)]',

  cta: 'mb-[5px] mt-auto',

  ribbon: 'hidden absolute -right-2.5 -top-2.5 size-[150px] overflow-hidden min-[1023px]:block',

  ribbonLabel:
    'absolute -left-[25px] top-[30px] block w-[225px] rotate-45 bg-[var(--surface-brand-cyan)] px-2.5 py-[7px] text-center text-lg font-normal uppercase leading-normal text-white shadow-[0_5px_10px_rgb(0_0_0/0.1)] [text-shadow:0_1px_1px_rgb(0_0_0/0.2)]',
} as const
