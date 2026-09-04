export const titleBannerStyles = {
  section: 'font-legacy-condensed relative h-[300px] max-h-[300px] w-full overflow-hidden',

  image: 'absolute inset-0 h-full w-full object-cover object-center',

  flex: 'relative flex h-full w-full flex-col justify-center',

  content: 'pt-10 min-[1023px]:py-5',

  title:
    'mb-2 block whitespace-pre-line text-[40px] font-normal leading-[1.15] text-[rgb(var(--white))] [text-shadow:var(--shadow-banner-title)]',

  subtitle:
    'mb-2 block whitespace-pre-line text-2xl font-normal leading-[1.235] text-[rgb(var(--white))]',

  badgeWrap: 'mb-4 block',

  badge:
    'inline-block rounded bg-[var(--border-brand-cyan)] px-2.5 py-[3px] text-[21px] font-normal leading-[31.5px] text-[rgb(var(--white))]',

  textOnDesktopOnly: 'hidden min-[769px]:flex',

  imageSection: 'font-legacy-condensed w-full',

  imageSectionContained: 'pb-0 min-[1023px]:pb-5',

  backdrop: {
    none: '',
    dark: 'bg-[var(--surface-banner-backdrop)]',
    mist: 'bg-[var(--surface-banner-backdrop-mist)]',
    pale: 'bg-[var(--surface-banner-backdrop-pale)]',
    grey: 'bg-[var(--surface-banner-backdrop-grey)]',
  },

  imageFrame: 'mx-auto w-full',

  bannerImage: 'block h-auto w-full object-cover',

  bannerImageCapped: 'max-h-[260px]',
} as const
