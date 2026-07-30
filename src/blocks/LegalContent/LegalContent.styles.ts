export const legalContentStyles = {
  section: 'w-full pt-0',

  inner: 'max-w-7xl mx-auto lg:px-8',

  layout: 'lg:grid lg:grid-cols-[180px_1fr] lg:gap-12 xl:gap-16',

  contentArea: 'min-w-0 flex flex-col gap-6 px-4 md:px-6 lg:px-0 pt-6 md:pt-8',

  pageTitle: 'text-[var(--text-strong)]',

  sectionsList: 'flex flex-col gap-8 lg:gap-10',

  sectionItem: 'flex flex-col gap-3',

  sectionHeading: 'text-[var(--text-strong)]',

  intro:
    '!mx-0 w-full text-[var(--text-subtle)] prose-p:text-[var(--text-subtle)] prose-p:my-3 prose-strong:text-[var(--text-strong)] prose-li:text-[var(--text-subtle)] prose-a:text-[var(--text-strong)]',

  subsectionsList: 'flex flex-col gap-6 mt-2',

  subsectionItem: 'flex flex-col gap-2',

  subsectionHeading: 'text-[var(--text-strong)]',

  subsectionBody:
    '!mx-0 w-full text-[var(--text-subtle)] prose-p:text-[var(--text-subtle)] prose-p:my-3 prose-strong:text-[var(--text-strong)] prose-li:text-[var(--text-subtle)] prose-a:text-[var(--text-strong)]',
} as const
