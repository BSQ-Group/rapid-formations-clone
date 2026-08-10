export const textContentStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',

  body: 'block text-[20px] leading-[30px] text-[var(--text-on-light-muted)] [&_p]:!mb-2 [&_h2]:!mt-0 [&_h2]:!mb-4 [&_h2]:text-[28.8px] [&_h2]:font-normal [&_h2]:leading-[43.2px] [&_h2]:text-[var(--text-on-light-base)] [&_h3]:!mt-4 [&_h3]:!mb-3 [&_h3]:text-[20.8px] [&_h3]:font-normal [&_h3]:leading-[31.2px] [&_h3]:text-[var(--text-on-light-base)] [&_a]:!text-[var(--text-on-light-link-hover)] [&_a:hover]:!no-underline [&>*:last-child]:!mb-0',

  lists:
    '[&_ul]:!mt-2 [&_ul]:!mb-2 [&_ul]:!pl-10 [&_ul]:list-disc [&_li]:!mb-2.5 [&_li]:!pl-2.5 [&_li:has(>ol)]:!mb-0 [&_li:has(>ol)]:!pl-0 [&_ol]:!mt-2 [&_ol]:!mb-0 [&_ol]:!pl-[15px] [&_li_ol]:!pl-8 [&_ol>li]:!my-0 [&_li_ol>li]:!my-2.5 [&_ol>li]:!pb-2.5 [&_ol>li:first-child]:!mt-0 [&_ol>li]:list-[lower-latin]',

  policy:
    '[&_p]:!mb-4 [&_h3]:!leading-[25.688px] [&_p+h3]:!mt-6 [&_h4]:!mt-4 [&_h4]:!mb-2 [&_h4]:text-[20px] [&_h4]:font-normal [&_h4]:leading-[27px] [&_h4]:text-[var(--text-on-light-base)] [&_p+h4]:!mt-6 [&_ul]:!mb-6 [&_ul]:list-[lower-alpha] [&_li]:!my-2.5 [&_li]:!pl-2 [&_li:first-child]:!mt-0',

  numbered: 'rf-numbered-clauses',
} as const

export const policyTableStyles = {
  table:
    '[&.payload-richtext_table]:!table-auto [&.payload-richtext_table]:!border-collapse [&.payload-richtext_table]:!border [&.payload-richtext_table]:!border-solid [&.payload-richtext_table]:!border-[color:var(--border-on-light)] [&.payload-richtext_table]:!my-6',

  headerCell:
    '[&.payload-richtext_th]:!border [&.payload-richtext_th]:!border-solid [&.payload-richtext_th]:!border-[color:var(--border-on-light)] [&.payload-richtext_th]:!px-3 [&.payload-richtext_th]:!py-[5.6px] [&.payload-richtext_th]:!w-auto [&.payload-richtext_th]:align-middle [&.payload-richtext_th]:!font-bold',

  dataCell:
    '[&.payload-richtext_td]:!border [&.payload-richtext_td]:!border-solid [&.payload-richtext_td]:!border-[color:var(--border-on-light)] [&.payload-richtext_td]:!px-3 [&.payload-richtext_td]:!py-[5.6px] [&.payload-richtext_td]:!w-auto [&.payload-richtext_td]:align-top',

  rows: '[&.payload-richtext_tr>*:first-child]:!rounded-none [&.payload-richtext_tr>*:last-child]:!rounded-none [&.payload-richtext_tr:nth-child(odd)>*]:bg-transparent [&.payload-richtext_tr>th]:!bg-[var(--surface-table-header)]',

  nestedList: '[&.payload-richtext_td_ul]:list-disc [&.payload-richtext_td_ul]:!pl-6',

  scroll:
    'max-md:[&.payload-richtext_th]:!min-w-[200px] max-md:[&.payload-richtext_td]:!min-w-[200px]',
} as const
