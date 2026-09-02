export const partnerLogosStyles = {
  grid: 'flex flex-col gap-4 md:grid md:grid-cols-[repeat(3,1fr)] md:gap-6',

  cell: 'relative flex items-center justify-center text-center',

  logo: 'inline-block h-auto w-auto max-w-none max-h-5 !my-0',

  logoTall: 'max-h-10 md:absolute md:-top-[13px]',
} as const
