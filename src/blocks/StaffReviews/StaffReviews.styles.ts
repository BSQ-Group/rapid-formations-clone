export const staffReviewsStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',
  title:
    'my-[30px] block text-center text-[36px] leading-[44.46px] font-normal text-[var(--text-on-light-base)]',
  quotes: 'grid w-full grid-cols-1 min-[1023px]:grid-cols-3 min-[1023px]:gap-2.5',
  quote:
    "mb-5 flex flex-col rounded-md bg-[color:var(--surface-staff-quote)] bg-[url('/images/staff-quote-mark.png')] bg-auto bg-left-top bg-no-repeat p-[25px] min-[1023px]:mb-0",
  body: 'm-0 block text-[21px] leading-[31.5px] font-normal text-[rgb(var(--white))]',
  footer: 'mt-auto block pt-[30px] text-lg leading-[27px] text-[rgb(var(--white))]',
  cite: 'block text-lg leading-[27px] not-italic text-[var(--text-staff-quote-cite)]',
} as const
