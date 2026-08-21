export const titleBannerStyles = {
  section: 'font-legacy-condensed relative h-[300px] max-h-[300px] w-full overflow-hidden',

  image: 'absolute inset-0 h-full w-full object-cover object-center',

  flex: 'relative flex h-full w-full flex-col justify-center',

  content: 'pt-10 min-[1023px]:py-5',

  title:
    'mb-2 block whitespace-pre-line text-[40px] font-normal leading-[1.15] text-[rgb(var(--white))] [text-shadow:var(--shadow-banner-title)]',

  imageSection: 'font-legacy-condensed w-full',

  backdrop: {
    none: '',
    dark: 'bg-[var(--surface-banner-backdrop)]',
    mist: 'bg-[var(--surface-banner-backdrop-mist)]',
  },

  imageFrame: 'mx-auto w-full',

  bannerImage: 'block h-auto w-full object-cover',

  bannerImageCapped: 'max-h-[260px]',
} as const
