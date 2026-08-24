export const faqQuickNavStyles = {
  root: 'relative mb-[6.4px] flex h-full w-full flex-col overflow-visible bg-[var(--surface-canvas)]',

  button:
    'flex w-[200px] cursor-pointer justify-center rounded border border-[var(--text-on-light-muted)] bg-[var(--surface-canvas)] p-[6.66667px] text-center hover:border-[var(--surface-brand-orange)] hover:bg-[var(--surface-brand-orange)] focus:border-[var(--surface-brand-orange)] focus:bg-[var(--surface-brand-orange)]',
  buttonOpen: 'border-[var(--surface-brand-orange)] bg-[var(--surface-brand-orange)]',

  title:
    'block w-full select-none text-center text-[19px] font-medium leading-[1.35] text-[var(--text-on-light-base)]',
  titleOpen: 'text-[rgb(var(--white))]',

  list: 'absolute left-0 right-0 top-full z-[9000] mt-[47px] flex-col rounded border border-[var(--border-on-light)] bg-[var(--surface-canvas)] p-2.5 text-left min-[470px]:left-auto min-[470px]:right-auto min-[470px]:w-[380px] md:-ml-[157px]',
  listOpen: 'flex',
  listClosed: 'hidden',

  item: 'mx-1 block',
  link: 'block py-2 pl-2 pr-5 text-[20px] font-normal leading-[30px] text-[var(--text-on-light-muted)] no-underline hover:text-[var(--text-on-light-link-hover-orange)] hover:underline',
} as const
