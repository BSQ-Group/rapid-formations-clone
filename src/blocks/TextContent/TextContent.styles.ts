export const textContentStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  body: 'block text-[20px] leading-[30px] text-[var(--text-on-light-muted)] [&_p]:!mb-2 [&_h2]:!mt-0 [&_h2]:!mb-4 [&_h2]:text-[28.8px] [&_h2]:font-normal [&_h2]:leading-[43.2px] [&_h2]:text-[var(--text-on-light-base)] [&_h3]:!mt-4 [&_h3]:!mb-3 [&_h3]:text-[20.8px] [&_h3]:font-normal [&_h3]:leading-[31.2px] [&_h3]:text-[var(--text-on-light-base)] [&_a]:!text-[var(--text-on-light-link-hover)] [&_a:hover]:!no-underline [&>*:last-child]:!mb-0',

  lists:
    '[&_ul]:!mt-2 [&_ul]:!mb-2 [&_ul]:!pl-10 [&_ul]:list-disc [&_li]:!mb-2.5 [&_li]:!pl-2.5 [&_li:has(>ol)]:!mb-0 [&_li:has(>ol)]:!pl-0 [&_ol]:!mt-2 [&_ol]:!mb-0 [&_ol]:!pl-[15px] [&_li_ol]:!pl-8 [&_ol>li]:!my-0 [&_li_ol>li]:!my-2.5 [&_ol>li]:!pb-2.5 [&_ol>li:first-child]:!mt-0 [&_ol>li]:list-[lower-latin]',

  policy:
    '[&_p]:!mb-4 [&_h3]:!leading-[25.688px] [&_p+h3]:!mt-6 [&_h4]:!mt-4 [&_h4]:!mb-2 [&_h4]:text-[20px] [&_h4]:font-normal [&_h4]:leading-[27px] [&_h4]:text-[var(--text-on-light-base)] [&_p+h4]:!mt-6 [&_ul]:!mb-6 [&_ul]:list-[lower-alpha] [&_li]:!my-2.5 [&_li]:!pl-2 [&_li:first-child]:!mt-0',

  numbered: 'rf-numbered-clauses',
} as const
