export const registeredOfficeAddressStyles = {
  section: [
    'flex flex-col items-center w-full',
    'px-4 gap-14',
    'md:px-8',
    'lg:px-10 lg:gap-10',
    'xl:px-0 xl:gap-14',
  ].join(' '),
  header: [
    'flex flex-col items-start w-full gap-3',
    'lg:w-[792px] lg:max-w-full',
  ].join(' '),
  heading: [
    'text-[var(--text-strong)] text-center w-full font-bold tracking-[-0.25px]',
    'text-[30px] leading-[36px]',
    'md:text-[36px] md:leading-[40px] md:tracking-[-1px]',
    'lg:text-[48px] lg:leading-[56px] lg:font-extrabold',
  ].join(' '),
  card: [
    'bg-white w-full max-w-[1200px] flex flex-col p-3 rounded-2xl',
    'md:flex-row md:items-center',
    'lg:p-4 lg:rounded-3xl',
  ].join(' '),
  imageWrap: [
    'relative w-full aspect-[304/182] rounded-lg overflow-hidden',
    'md:flex-1 md:min-w-0 md:w-auto md:aspect-[802.68/481.37]',
    'xl:flex-none xl:w-[733.7px] xl:h-[440px] xl:aspect-auto',
  ].join(' '),
  image: 'object-cover',
  textCol: [
    'flex flex-col items-start w-full gap-6 pt-5 pb-3 px-0',
    'md:gap-8 md:px-8 md:pt-0 md:pb-0 md:self-stretch md:justify-center md:shrink-0 md:w-auto',
    'lg:gap-16 lg:px-12',
    'xl:flex-1 xl:min-w-0 xl:px-[56px]',
  ].join(' '),
  addressRow: 'flex flex-row gap-3 items-start w-full',
  address: [
    'text-[var(--text-strong)] flex-1 whitespace-pre-line font-semibold',
    'text-[14px] leading-[20px]',
    'md:flex-none md:w-[179px]',
    'lg:w-full',
    'lg:text-[16px] lg:leading-[24px]',
    'xl:text-[24px] xl:leading-[32px] xl:tracking-[-0.25px]',
  ].join(' '),
  pricingMobile: 'flex flex-col items-end gap-0 whitespace-nowrap shrink-0 md:hidden',
  pricingInline: [
    'hidden whitespace-nowrap',
    'md:flex md:flex-row md:items-baseline md:gap-0 md:shrink-0',
  ].join(' '),
  priceMobile: 'text-[var(--text-strong)] text-[18px] leading-[28px] font-semibold',
  priceInline: [
    'text-[var(--text-strong)] font-semibold',
    'text-[18px] leading-[28px]',
    'lg:text-[20px]',
    'xl:text-[24px] xl:leading-[32px] xl:tracking-[-0.25px]',
  ].join(' '),
  priceSuffix: 'text-[var(--text-subtle)] text-[12px] leading-[16px] font-normal',
  ctaGroup: [
    'flex flex-col w-full',
    'md:flex-col-reverse md:gap-3 md:items-start md:justify-center',
    'xl:flex-row xl:items-center xl:gap-5',
  ].join(' '),
  ctaButton: 'w-full md:w-auto',
} as const
