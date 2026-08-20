export const adBannerStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  banner: 'relative block overflow-hidden rounded-[13.5px] bg-[image:var(--surface-ad-banner)]',

  inner:
    'relative flex flex-col justify-between bg-[url(/images/ad-banner-pattern.svg)] bg-cover p-[30px] text-center min-[1023px]:flex-row min-[1023px]:items-center min-[1023px]:gap-10 min-[1023px]:text-left',

  left: 'mb-5 block min-[1023px]:mb-0',

  heading:
    'mb-[5px] block text-[26px] font-semibold leading-[1.235] tracking-normal text-white md:text-[28px]',

  body: 'block text-xl font-normal leading-normal text-white [&_p]:!mb-4 [&_p:last-child]:!mb-0',

  right: 'flex-none min-[1023px]:text-right',

  cta: 'w-full gap-2.5 border-4 border-white/40 bg-[var(--button-ad-banner-idle)] px-4 py-2 text-[30px] font-normal leading-normal hover:border-white/55 hover:bg-[var(--button-ad-banner-hover)] [&>span:last-of-type]:relative [&>span:last-of-type]:-top-0.5',

  ctaIcon: 'mr-1 size-[0.875em]',
} as const
