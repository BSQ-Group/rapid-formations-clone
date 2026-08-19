export const serviceAdsStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)] mb-[50px]',

  grid: 'flex flex-col min-[1023px]:grid min-[1023px]:grid-cols-2 min-[1023px]:gap-5',

  gridWide: 'flex justify-center min-[1023px]:flex min-[1023px]:grid-cols-none min-[1023px]:gap-0',

  service: 'py-[15px]',

  serviceWide: 'flex-1 py-[30px] md:max-w-[80%]',

  inner:
    'relative flex min-h-[150px] flex-col justify-center overflow-hidden rounded-[5px] p-[21px]',

  content: 'relative z-10 flex flex-col md:flex-row md:items-end md:justify-between',

  left: 'block',

  title:
    'mb-0 block whitespace-pre-line text-[26px] font-normal leading-[1.235] md:text-[28px] text-[var(--text-strong)] [text-shadow:1px_2px_2px_rgb(0_0_0_/_0.25)]',

  body: 'mt-2 mb-0 block whitespace-pre-line text-xl font-normal leading-normal text-[var(--text-strong)] [text-shadow:1px_2px_2px_rgb(0_0_0_/_0.25)]',

  right: 'mt-5 md:mt-0',

  price:
    'block pb-4 text-center text-[28px] text-[var(--text-strong)] [text-shadow:1px_2px_2px_rgb(0_0_0_/_0.25)]',

  postPrice: 'block text-center text-md',

  cta: 'block w-full md:w-auto',

  icon: 'pointer-events-none absolute top-1/2 right-0 h-[235px] w-[260px] -translate-y-1/2 bg-cover opacity-70 mix-blend-overlay',
} as const

export const serviceAdVariants = {
  default:
    'bg-[image:var(--surface-promo-default)] [--button-promo-idle:var(--button-promo-default-idle)] [--button-promo-hover:var(--button-promo-default-hover)]',

  'blue-green':
    'bg-[image:var(--surface-promo-blue-green)] [--button-promo-idle:var(--button-promo-blue-green-idle)] [--button-promo-hover:var(--button-promo-blue-green-hover)]',

  'blue-purple':
    'bg-[image:var(--surface-promo-blue-purple)] [--button-promo-idle:var(--button-promo-blue-purple-idle)] [--button-promo-hover:var(--button-promo-blue-purple-hover)]',

  'pink-purple':
    'bg-[image:var(--surface-promo-pink-purple)] [--button-promo-idle:var(--button-promo-pink-purple-idle)] [--button-promo-hover:var(--button-promo-pink-purple-hover)]',
} as const
