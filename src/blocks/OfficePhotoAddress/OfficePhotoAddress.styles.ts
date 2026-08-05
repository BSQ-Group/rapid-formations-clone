export const officePhotoAddressStyles = {
  section: 'flex flex-col items-center w-full',
  content:
    'flex flex-col w-full md:flex-row md:items-stretch md:h-[393px] lg:h-[510px] lg:max-w-[1440px] xl:h-[526px] xl:max-w-[1200px]',
  imageWrap: 'relative w-full h-[232px] shrink-0 md:h-auto md:flex-1 md:min-w-0',
  image: 'object-cover',
  textCol:
    'bg-[var(--surface-canvas-inverse)] flex flex-col items-start w-full gap-2 px-6 py-8 md:w-[256px] md:shrink-0 md:p-8 md:gap-3 lg:w-[347px] lg:items-center lg:justify-center lg:px-10 lg:py-0 lg:gap-3 xl:w-[509px] xl:px-20 xl:gap-5',
  eyebrow:
    'text-[var(--text-inverse-subtle)] w-full font-medium text-[12px] leading-[16px] lg:text-[14px] lg:leading-[20px]',
  address:
    'text-[var(--text-inverse)] w-full whitespace-pre-line text-[16px] leading-[24px] font-medium lg:text-[20px] lg:leading-[28px] lg:font-semibold xl:text-[24px] xl:leading-[32px] xl:tracking-[-0.25px]',
} as const
