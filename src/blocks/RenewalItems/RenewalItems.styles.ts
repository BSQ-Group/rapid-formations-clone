export const renewalItemsStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',
  grid: 'grid w-full grid-flow-row-dense grid-cols-[1fr] gap-[30px] pt-[30px] min-[1023px]:grid-cols-[1fr_1fr]',
  item: 'border border-solid border-[var(--border-on-light-tile)] bg-white p-5 shadow-tile-raised [transition-duration:200ms] [transition-property:box-shadow] [transition-timing-function:ease-in-out]',
  header:
    'mb-[15px] flex flex-col items-start justify-between border-b border-solid border-[var(--border-on-light)] pb-2.5 min-[470px]:flex-row',
  title: 'm-0 block text-[26px] font-normal leading-[35.1px] text-[var(--text-brand-cyan)]',
  price:
    'mt-0 block text-left text-[26px] font-semibold leading-[39px] text-[var(--text-on-light-base)]',
  body: 'flex flex-col justify-between min-[470px]:flex-row',
  content:
    'block flex-none basis-4/5 text-[18px] leading-[27px] text-[var(--text-on-light-base)] [&_p]:!mb-4 [&_p]:text-[20px] [&_p]:leading-[30px] [&_a]:text-[var(--text-brand-cyan)] [&_a]:no-underline [&_a:hover]:underline',
  buttons: 'mt-4 min-[470px]:mt-0',
  cta: '[overflow-wrap:normal]',
} as const
