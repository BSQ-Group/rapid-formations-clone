export const registeredOfficeAddressStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  heading:
    'mb-8 block whitespace-pre-line break-words text-center text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  card: 'mx-auto flex w-full flex-col items-center text-center md:w-1/2',

  cardLink: 'flex w-full flex-col items-center hover:underline',

  imageWrap: 'relative aspect-[585/281] w-full',
  image: 'object-cover',

  serviceTitle:
    'mt-5 block w-full break-words text-[21px] font-normal leading-[25.935px] text-[var(--text-on-light-base)] md:mt-2.5 md:text-[24px] md:leading-[29.64px]',

  price:
    'mb-4 block w-full break-words text-[21px] font-normal leading-[31.5px] text-[var(--text-on-light-base)] md:text-[24px] md:leading-9',

  description:
    'mb-5 block w-full break-words text-[20px] font-normal leading-[30px] text-[var(--text-on-light-muted)]',

  ctaButton: 'w-full md:w-auto',
} as const
