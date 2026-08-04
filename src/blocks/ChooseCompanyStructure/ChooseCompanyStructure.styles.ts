export const chooseCompanyStructureStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  heading:
    'mb-10 block whitespace-pre-line break-words text-center text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  track:
    'mx-auto flex w-full snap-x snap-mandatory overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] md:w-4/5 min-[1023px]:w-[90%] min-[1023px]:scroll-pl-[9.6px] min-[1023px]:px-[9.6px] min-[1025px]:grid min-[1025px]:grid-cols-3 min-[1025px]:gap-5 min-[1025px]:overflow-visible min-[1590px]:w-full',

  slide: 'w-full shrink-0 snap-start min-[1025px]:w-auto',

  card: 'border border-[var(--border-on-light)] bg-white md:m-4 min-[1590px]:m-0',

  imageWrap: 'block w-full overflow-hidden',

  image: 'h-auto w-full object-cover transition-transform duration-300 hover:scale-110',

  copy: 'w-full p-5',

  title:
    'mb-2 mt-0 block max-w-full break-words text-[21px] font-normal leading-[25.935px] text-[var(--text-on-light-base)] md:text-[24px] md:leading-[29.64px]',

  titleLink: 'text-inherit no-underline hover:text-[var(--surface-brand-cyan)] hover:no-underline',

  body: 'mb-[30px] block min-h-[175px] max-w-full whitespace-pre-line [overflow-wrap:anywhere] text-[20px] font-normal leading-[30px] text-[var(--text-on-light-muted)] min-[1590px]:min-h-[212px]',

  ctaGroup: 'flex justify-center',

  cta: 'md:w-auto',
} as const
