export const bankingPartnersStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  header: 'mb-10 text-center',

  grid: 'grid w-full list-none grid-cols-2 auto-rows-fr gap-2.5 p-0 min-[470px]:gap-10 min-[1023px]:grid-cols-4 min-[1023px]:min-h-[380px]',

  tileWrap: 'flex min-w-0',

  tile: 'flex h-full w-full min-w-0 flex-col items-start overflow-hidden rounded-[15px] bg-auto bg-repeat p-5 text-left shadow-[0_2px_7px_1px_rgba(0,0,0,0.2)] [background-blend-mode:overlay] [background-position:50%_-250px] min-[470px]:p-[30px]',

  logoTile:
    'mb-2.5 flex size-[58px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[rgb(var(--white))]',

  logo: 'size-[58px] object-contain',

  name: 'block break-words text-[26px] font-normal leading-[32.11px] text-[rgb(var(--white))] md:text-[28px] md:leading-[34.58px]',

  ctaWrap: 'mt-[50px] flex justify-center',

  cta: 'w-full md:w-auto',
} as const
