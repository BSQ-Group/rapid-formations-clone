export const serviceExplainerStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-section-navy)] py-[70px] md:py-[110px]',

  header: 'mb-8 flex w-full flex-col text-center',

  heading:
    'mb-2 block break-words whitespace-pre-line text-[36px] leading-[44.46px] font-normal text-[rgb(var(--white))]',

  subheading:
    'block break-words whitespace-pre-line text-2xl leading-[32.4px] font-normal tracking-normal text-[rgb(var(--white))]',

  videoWrap: 'mt-16 mb-20 md:mx-auto md:max-w-[75%]',

  trigger:
    'block w-full focus-visible:ring-4 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2 focus-visible:outline-none md:mx-auto md:max-w-[85%]',

  playIcon: 'h-16 w-12',

  stillPicture: 'block w-full',

  still: 'block h-auto w-full rounded-lg object-cover',

  stillSizes: '(min-width: 768px) 64vw, 100vw',

  content: 'flex flex-col md:grid md:grid-cols-2 md:items-center md:gap-16',

  imagePicture: 'block w-full',

  image: 'block h-auto w-full',

  imageSizes: '(min-width: 768px) 50vw, 100vw',

  contentTitle:
    'mb-2 block break-words text-[26px] leading-[32.11px] font-normal text-[rgb(var(--white))] md:text-[28px] md:leading-[34.58px]',

  contentBody:
    'block break-words whitespace-pre-line text-xl leading-[30px] font-normal text-[rgb(var(--white))]',

  ctaWrap: 'mt-8 flex flex-col md:inline-flex md:flex-row',

  cta: 'w-full md:w-auto',
} as const
