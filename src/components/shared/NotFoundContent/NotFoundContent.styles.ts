export const notFoundContentStyles = {
  section: 'bg-[var(--surface-on-light-sunken)] py-5',
  container: 'container',
  card:
    'grid grid-cols-1 items-center gap-5 bg-[var(--surface-canvas)] px-5 py-8 md:grid-cols-2 md:px-10 md:py-12',
  title: 'mb-2 block text-[38px] font-normal leading-[1.15] text-[var(--text-info)]',
  subtitle:
    'mb-2 block text-[22px] font-semibold leading-[1.235] text-[var(--text-on-light-muted)] md:text-[30px]',
  paragraph: 'mb-4 block text-base leading-[1.5] text-[var(--text-on-light-base)]',
  link: 'inline-flex items-center gap-2.5 text-base text-[var(--text-on-light-muted)] no-underline hover:underline',
  linkIcon: 'h-5 w-5 shrink-0',
  imageWrap: 'relative w-full overflow-hidden',
  image: 'h-auto w-full object-cover',
} as const
