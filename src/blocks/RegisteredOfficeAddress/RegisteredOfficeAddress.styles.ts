export const registeredOfficeAddressStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  heading:
    'mb-2 block whitespace-pre-line break-words text-center text-[36px] font-normal leading-[44.46px] text-[var(--text-on-light-base)]',

  card: 'mx-auto flex w-full flex-col items-center text-center md:w-1/2',

  cardLink: 'group flex w-full flex-col items-center hover:underline',

  imageWrap: 'relative mt-6 w-full aspect-[585/281]',
  image: 'object-contain',

  serviceTitle:
    'mt-5 block w-full break-words md:mt-2.5 text-[21px] font-normal leading-[25.935px] text-[var(--text-on-light-base)] group-hover:text-[var(--text-on-light-link-hover)] md:text-[24px] md:leading-[29.64px]',

  price:
    'mb-4 block w-full break-words text-[21px] font-normal leading-[31.5px] text-[var(--text-on-light-base)] group-hover:text-[var(--text-on-light-link-hover)] md:text-[24px] md:leading-9',

  description:
    'mb-5 block w-full break-words text-[20px] font-normal leading-[30px] text-[var(--text-on-light-muted)]',

  ctaButton:
    'inline-flex w-full items-center md:w-auto justify-center rounded border border-[var(--surface-brand-cyan)] bg-[var(--surface-brand-cyan)] px-8 py-3 text-center text-[19px] font-semibold leading-[28.5px] text-[rgb(var(--white))] transition-colors duration-150 [overflow-wrap:anywhere] hover:border-[var(--surface-brand-cyan-hover)] hover:bg-[var(--surface-brand-cyan-hover)]',
} as const
