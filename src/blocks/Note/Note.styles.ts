export const noteStyles = {
  section: 'flex flex-col items-center px-4 md:px-8 lg:px-10',
  container: 'flex flex-col gap-6 w-full max-w-[1200px] wide:max-w-[1440px]',
  heading: 'font-bold text-[var(--text-strong)]',
  body: '!mx-0 w-full prose-p:text-[var(--text-muted)] prose-p:my-0 prose-p:mb-3 last:prose-p:mb-0 prose-li:text-[var(--text-muted)] prose-strong:text-[var(--text-strong)] prose-a:text-[var(--text-link)] [&_ul>li]:mt-4 [&_ul>li]:mb-0 [&_ul>li:first-child]:mt-0 [&_ul>li]:leading-6 [&_ul>li]:min-h-7',
} as const
