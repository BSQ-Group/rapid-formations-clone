export const comparePackagesHeaderStyles = {
  section: 'flex justify-center w-full px-4 md:px-8 lg:px-10',

  inner: [
    'flex flex-col items-center text-center w-full',
    'gap-2',
    'lg:gap-6',
  ].join(' '),

  title: [
    'text-[var(--text-strong)] whitespace-pre-line',
    'font-bold text-[30px] leading-[36px] tracking-[-0.25px]',
    'md:text-[36px] md:leading-[40px] md:tracking-[-1px]',
    'lg:font-extrabold lg:text-[48px] lg:leading-[56px]',
    '2xl:text-[60px] 2xl:leading-[68px] 2xl:tracking-[-2px]',
  ].join(' '),

  description: [
    'text-[var(--text-subtle)] w-full',
    'text-[14px] leading-[20px]',
    'lg:w-[600px] lg:text-[16px] lg:leading-[24px]',
    '2xl:w-[812px] 2xl:text-[18px] 2xl:leading-[28px]',
  ].join(' '),

  descriptionPrimary: 'mb-3',

  descriptionLink: 'underline decoration-solid underline-offset-2',
} as const
