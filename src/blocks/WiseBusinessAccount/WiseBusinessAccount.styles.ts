export const wiseBusinessAccountStyles = {
  section: 'w-full max-md:bg-[var(--surface-tertiary)] px-4 md:px-0',

  outerCard:
    'bg-[var(--surface-tertiary)] rounded-3xl w-full mx-auto p-0 md:p-6 md:max-w-[702px] lg:max-w-[792px] 2xl:max-w-[950px]',

  innerCard: 'bg-[var(--surface-primary)] w-full px-6 py-7 md:p-7 rounded-2xl md:rounded-xl',

  content: 'flex flex-col gap-4 w-full',

  title: 'text-4xl leading-10 font-bold tracking-[-1px] text-[var(--text-strong)]',

  body: '!mx-0 w-full text-[var(--text-subtle)] prose-p:text-[var(--text-subtle)] prose-p:my-0 prose-p:mb-3 last:prose-p:mb-0 prose-p:text-base prose-p:leading-6 prose-strong:text-[var(--text-strong)] prose-li:text-[var(--text-subtle)] prose-a:text-[var(--text-strong)] prose-a:underline',
} as const
