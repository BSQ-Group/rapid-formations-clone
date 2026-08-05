export const caseStudyMosaicStyles = {
  section: 'font-legacy-condensed flex w-full flex-col mb-[70px] md:mb-[140px]',

  title: 'flex flex-col items-center text-center mb-8',

  mosaic: 'grid justify-center gap-8 overflow-hidden grid-cols-1',

  mosaicComposed:
    'md:grid-cols-[repeat(12,34px)] md:grid-rows-[repeat(8,34px)] min-[1023px]:grid-cols-[repeat(12,50px)] min-[1023px]:grid-rows-[repeat(8,50px)] min-[1590px]:grid-cols-[repeat(12,68px)] min-[1590px]:grid-rows-[repeat(8,68px)]',

  mosaicFlow:
    'md:grid-cols-[repeat(auto-fit,232px)] min-[1023px]:grid-cols-[repeat(auto-fit,296px)] min-[1590px]:grid-cols-[repeat(auto-fit,368px)]',

  item: 'relative aspect-square',

  itemVideo:
    'block text-left focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-canvas-inverse)]',

  playIcon:
    'h-16 w-12 opacity-0 transition-all duration-300 [transition-timing-function:ease] group-hover:opacity-75',

  mediaWrap: 'h-full w-full overflow-hidden',

  mediaPicture: 'block h-full w-full',

  imageSizes: '(max-width: 767px) 100vw, 420px',

  itemPlacement: [
    'md:col-start-5 md:col-span-4 md:row-start-5 md:row-span-4',
    'md:col-start-5 md:col-span-4 md:row-start-1 md:row-span-4',
    'md:col-start-2 md:col-span-3 md:row-start-1 md:row-span-3',
    'md:col-start-9 md:col-span-4 md:row-start-2 md:row-span-4',
    'md:col-start-9 md:col-span-3 md:row-start-6 md:row-span-3',
    'md:col-start-1 md:col-span-4 md:row-start-4 md:row-span-4',
  ],

  image: 'h-full w-full object-cover',

  imageZoom: [
    '',
    '',
    'md:scale-150 md:object-[20px_40px]',
    '',
    'md:scale-150 md:object-[-10px_40px]',
    '',
  ],

  caption:
    'absolute inset-x-0 bottom-0 max-h-full overflow-hidden bg-[var(--scrim-caption-grey)] backdrop-blur-[5px] backdrop-saturate-100 px-3 py-1 min-[1023px]:px-1 min-[1023px]:py-2 min-[1590px]:p-3',
  captionCompany:
    'line-clamp-2 break-words text-[20px] leading-[30px] font-semibold text-[var(--text-strong)] md:text-[16px] md:leading-[24px] min-[1023px]:text-[20px] min-[1023px]:leading-[30px]',
  captionCategory:
    'line-clamp-2 break-words text-[16px] text-[var(--text-strong)] md:hidden min-[1023px]:line-clamp-2',
} as const
