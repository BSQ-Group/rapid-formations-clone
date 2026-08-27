export const reviewHighlightRowsStyles = {
  section: 'font-legacy-condensed block w-full py-[50px] text-lg leading-[27px]',

  background: {
    plain: 'bg-[var(--surface-canvas)]',
    tinted: 'bg-[var(--surface-on-light-canvas)]',
  },

  wrapperPad: 'pt-10 min-[1023px]:py-5',

  row: 'block md:flex md:gap-5 min-[1023px]:grid min-[1023px]:grid-cols-2',

  rowTextOnly: 'min-[1023px]:grid-cols-1',

  imageColumn: 'flex md:w-[400px] md:flex-none min-[1023px]:w-auto',

  imageColumnRight: 'md:order-2',

  imagePicture: 'block w-full md:m-auto md:w-[400px]',

  image: 'block h-[400px] w-full object-cover md:max-w-full',

  content: 'flex flex-1 flex-col md:py-[15px]',

  title:
    'mb-[15px] block break-words whitespace-pre-line text-[36px] leading-[1.25] font-bold text-[var(--text-on-light-base)]',

  body: 'mb-4 block break-words whitespace-pre-line text-xl leading-[30px] font-normal text-[var(--text-on-light-muted)]',

  quote:
    'mt-[50px] grid grid-cols-[75px_auto] rounded-lg border border-solid p-5 text-left shadow-tile-raised transition-shadow duration-200 ease-in-out',

  quoteStars: 'h-[41px]',

  avatar: 'mr-[15px] flex h-[45px] w-[45px] items-center justify-center rounded-full',

  avatarText: 'font-bold text-[rgb(var(--white))]',

  quoteText: 'block text-xl leading-[30px] text-[var(--text-on-light-base)]',

  user: 'mt-[5px] flex flex-col justify-center text-lg leading-[1.35] font-bold',
} as const
