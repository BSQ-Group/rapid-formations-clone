const bulletLists =
  '[&_ul]:!mt-2 [&_ul]:!mb-2 [&_ul]:!pl-10 [&_ul]:list-disc [&_li]:!mb-2.5 [&_li]:!pl-2.5 [&_li:has(>ol)]:!mb-0 [&_li:has(>ol)]:!pl-0 [&_ol]:!mt-2 [&_ol]:!mb-0 [&_ol]:!pl-[15px] [&_li_ol]:!pl-8 [&_ol>li]:!my-0 [&_li_ol>li]:!my-2.5 [&_ol>li]:!pb-2.5 [&_ol>li:first-child]:!mt-0 [&_ol>li]:list-[lower-latin]'

export const textContentStyles = {
  section: 'font-legacy-condensed w-full bg-[var(--surface-canvas)]',
} as const

export const richTextShell = {
  text: 'block text-xl leading-[30px] text-[var(--text-on-light-muted)]',

  paragraphs: '[&_p]:!mb-2 [&>*:last-child]:!mb-0',

  headings:
    '[&_h2]:!mt-0 [&_h2]:!mb-4 [&_h2]:text-[28.8px] [&_h2]:font-normal [&_h2]:leading-[43.2px] [&_h2]:text-[var(--text-on-light-base)] [&_h3]:!mt-4 [&_h3]:!mb-3 [&_h3]:text-[20.8px] [&_h3]:font-normal [&_h3]:leading-[31.2px] [&_h3]:text-[var(--text-on-light-base)]',

  links: '[&_a]:!text-[var(--text-on-light-link-hover)] [&_a:hover]:!no-underline',
} as const

const standard = {
  lists: bulletLists,
}

const pageSections = {
  lists: bulletLists,

  spacing: '[&_p]:!mb-4',

  headings:
    '[&_h2]:!mb-2 [&_h2]:text-[36px] [&_h2]:leading-[44.46px] [&_h3]:!mt-0 [&_h3]:!mb-2 [&_h3]:text-[21px] [&_h3]:leading-[25.935px]',
}

const packageCopy = {
  lists:
    '[&_ol]:!mb-0 [&_ol]:!pl-[15px] [&_ol]:list-decimal [&_ol>li]:!mb-[5px] [&_ol>li]:!pl-2 [&_ol>li:last-child]:!mb-0',

  spacing: '[&_p]:!mb-4 [&>p:last-child]:!mb-4',

  headings:
    '[&_h2]:!mb-2 [&_h2]:text-[24px] [&_h2]:leading-[29.64px] [&_h3]:!mt-0 [&_h3]:!mb-2 [&_h3]:text-[18px] [&_h3]:leading-[22.23px] [&_h3_strong]:!text-[color:var(--text-on-light-strong)] [&_h3_b]:!text-[color:var(--text-on-light-strong)]',
}

const policy = {
  lists: bulletLists,

  spacing: '[&_p]:!mb-4 [&_p+h3]:!mt-6 [&_p+h4]:!mt-6',

  headings:
    '[&_h3]:!leading-[25.688px] [&_h4]:!mt-4 [&_h4]:!mb-2 [&_h4]:text-xl [&_h4]:font-normal [&_h4]:leading-[27px] [&_h4]:text-[var(--text-on-light-base)]',

  letteredLists:
    '[&_ul]:!mb-6 [&_ul]:list-[lower-alpha] [&_li]:!my-2.5 [&_li]:!pl-2 [&_li:first-child]:!mt-0',

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
}

const numbered = {
  counters: 'rf-numbered-clauses',

  headings: '[&_h2]:text-[36px] [&_h2]:leading-[44.46px]',
}

const terms = {
  spacing: '[&_p]:!mb-4',

  emphasis: '[&_strong]:mr-2',

  headings:
    '[&_h2]:!my-8 [&_h2]:text-[36px] [&_h2]:leading-[44.46px] [&_h3]:!mt-0 [&_h3]:!mb-6 [&_h3]:text-[28px] [&_h3]:leading-[34.58px]',

  lists: '[&_ul]:!my-0 [&_ul]:list-disc [&_ol]:!my-0 [&_ol]:list-decimal [&_li]:!mb-4',

  table:
    '[&.payload-richtext_table]:!table-auto [&.payload-richtext_table]:!border-collapse [&.payload-richtext_table]:!my-0',

  headerCell:
    '[&.payload-richtext_th]:!p-px [&.payload-richtext_th]:!w-auto [&.payload-richtext_th]:!rounded-none [&.payload-richtext_th]:!border-r [&.payload-richtext_th]:!border-solid [&.payload-richtext_th]:!border-black [&.payload-richtext_th:last-child]:!border-r-0 [&.payload-richtext_th]:!font-bold [&.payload-richtext_th]:!text-center [&.payload-richtext_th]:align-middle [&.payload-richtext_th]:text-lg [&.payload-richtext_th]:leading-[27px]',

  dataCell:
    '[&.payload-richtext_td]:!px-3 [&.payload-richtext_td]:!py-4 [&.payload-richtext_td]:!w-auto [&.payload-richtext_td]:!rounded-none [&.payload-richtext_td]:align-middle [&.payload-richtext_td]:text-lg [&.payload-richtext_td]:leading-[27px]',

  rows: '[&.payload-richtext_tr]:!border-b [&.payload-richtext_tr]:!border-solid [&.payload-richtext_tr]:!border-black [&.payload-richtext_tr:last-child]:!border-b-0 [&.payload-richtext_tr:nth-child(odd)>*]:bg-transparent',

  nestedList:
    '[&.payload-richtext_td_ol]:!list-[lower-latin] [&.payload-richtext_td_ol]:!pl-8 [&.payload-richtext_td_ol>li]:!pl-4 [&.payload-richtext_td_ol>li]:!mb-4 [&.payload-richtext_td_ol>li]:text-xl [&.payload-richtext_td_ol>li]:leading-[30px]',
}

const cookies = {
  lists: bulletLists,

  measure: 'max-w-[936px]',

  paragraphs:
    '[&_p]:text-[22px] [&_p]:leading-[33px] [&_p:has(+h2)]:!mb-8 [&_p:has(+h3)]:!mb-8 [&_h3+p]:!mb-[1.2rem]',

  boxedParagraphs:
    '[&_p:has(strong)]:!mb-[1.2rem] [&_p:has(strong)]:border [&_p:has(strong)]:border-[color:var(--border-on-light)] [&_p:has(strong)]:px-[1em] [&_p:has(strong)]:py-[0.5em] [&_p:has(strong)+h2]:!mt-8',

  headings:
    '[&_h2]:text-[26px] [&_h2]:leading-[39px] [&_h2]:!mb-3 [&_h2+h3]:!mt-0 [&_h3]:inline-block [&_h3]:border-b-2 [&_h3]:border-current [&_h3]:text-[22px] [&_h3]:leading-[33px] [&_h3]:!mb-2 [&_h2_strong]:!text-[color:var(--text-on-light-muted)] [&_h2_b]:!text-[color:var(--text-on-light-muted)] [&_h3_strong]:!text-[color:var(--text-on-light-muted)] [&_h3_b]:!text-[color:var(--text-on-light-muted)]',

  code: '[&_code]:[font-family:inherit]',
}

export const variantStyles = {
  standard,
  pageSections,
  packageCopy,
  policy,
  numbered,
  terms,
  cookies,
}
