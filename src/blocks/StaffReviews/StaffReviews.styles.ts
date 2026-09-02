export const staffReviewsStyles = {
  section: 'flex w-full flex-col bg-[var(--surface-canvas)] font-legacy-condensed',
  title:
    'my-[30px] block text-center text-[36px] leading-[44.46px] font-normal text-[var(--text-on-light-base)]',
  quotes: 'grid w-full grid-cols-1 min-[1023px]:grid-cols-3 min-[1023px]:gap-2.5',
  quote:
    "mb-5 flex flex-col rounded-md bg-[color:var(--surface-quote-card)] bg-[url('/images/quote-mark.png')] bg-auto bg-left-top bg-no-repeat p-[25px] min-[1023px]:mb-0",
  body: 'm-0 block text-[21px] leading-[31.5px] font-normal text-[rgb(var(--white))]',
  footer: 'mt-auto block pt-[30px] text-lg leading-[27px] text-[rgb(var(--white))]',
  cite: 'block text-lg leading-[27px] not-italic text-[var(--text-quote-card-cite)]',
} as const
