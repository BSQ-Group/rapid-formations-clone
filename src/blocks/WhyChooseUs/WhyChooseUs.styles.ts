export const whyChooseUsStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  heading:
    'mb-10 block whitespace-pre-line break-words text-center text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  carousel: 'relative',

  track:
    'mx-[35px] flex snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',

  slide: 'w-full shrink-0 snap-start',

  arrows:
    'pointer-events-none absolute inset-x-0 top-[40%] m-0 flex items-start justify-between [&>button]:pointer-events-auto',

  pane: 'flex min-h-[350px] w-full flex-col-reverse border border-[var(--border-on-light)] md:grid md:grid-cols-[3fr_2fr] md:items-stretch',

  copy: "relative min-h-[430px] p-[15px] after:absolute after:right-0 after:top-[-5%] after:z-[999] after:h-0 after:w-0 after:border-b-[30px] after:border-l-[30px] after:border-r-[30px] after:border-t-0 after:border-b-white after:border-l-transparent after:border-r-transparent after:content-[''] md:min-h-[400px] md:after:right-[-15px] md:after:top-[5%] md:after:border-b-[30px] md:after:border-r-0 md:after:border-t-[30px] md:after:border-b-transparent md:after:border-l-white md:after:border-t-transparent lg:p-[50px]",

  title:
    'mb-2 block max-w-full break-words text-[22.4px] font-normal leading-[27.66px] text-[var(--text-on-light-base)] md:text-[24px] md:leading-[29.64px]',

  body: 'block max-w-full [overflow-wrap:anywhere] text-[17px] font-normal leading-[25.5px] text-[var(--text-on-light-muted)] md:text-[19px] md:leading-[28.5px] [&_p]:!mb-4 [&_a]:text-[var(--surface-brand-cyan)] [&_a]:no-underline hover:[&_a]:underline',

  imageWrap: 'relative min-h-[200px] w-full overflow-hidden',

  image: 'object-cover object-top',
} as const
