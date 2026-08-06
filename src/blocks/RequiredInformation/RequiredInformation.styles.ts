export const requiredInformationStyles = {
  section: 'font-legacy-condensed w-full mb-[70px] md:mb-[140px]',

  header: 'mb-10 text-center',

  grid: 'flex list-none flex-col gap-6 p-0 md:grid md:grid-cols-3',

  card: 'min-w-0 border border-[var(--border-on-light)] bg-[var(--surface-canvas-inverse)]',

  cardImage: 'h-auto w-full',

  cardBody: 'p-5',

  cardTitle:
    'mb-2 block break-words text-[21px] font-normal leading-[1.235] text-[var(--text-on-light-base)] md:text-[24px]',

  cardCopy:
    'break-words text-[20px] font-normal leading-[1.5] text-[var(--text-on-light-muted)] [&_p]:mb-4 [&_p:last-child]:mb-0 [&_a]:text-[var(--surface-brand-cyan)] [&_a]:no-underline hover:[&_a]:underline',

  ctaWrap: 'mt-12 flex items-center justify-center',
} as const
