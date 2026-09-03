export const sameDayIncorporationStyles = {
  section:
    'font-legacy-condensed w-full bg-[var(--surface-canvas)] md:flex md:h-0 md:overflow-hidden',
  card: 'relative grid min-h-[100px] grid-cols-[auto_100px] items-start gap-4 overflow-hidden rounded-lg bg-[var(--surface-brand-cyan)] p-4 animate-[same-day-pulse_1.5s_infinite] motion-reduce:animate-none',
  content: 'text-white',
  heading: 'mb-0 block text-[21.6px] font-semibold leading-[1.235] text-white',
  body: 'block text-base font-light leading-normal text-white [&_p]:!mb-0',
  iconWrap: 'z-[2] mt-4 flex items-center justify-end',
  icon: 'h-14 w-auto text-white',
  bubble: 'absolute -right-8 -top-8 z-[1] size-[155px] rounded-full bg-black/20',
} as const
