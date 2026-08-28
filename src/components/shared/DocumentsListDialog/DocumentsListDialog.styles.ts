export const styles = {
  overlay: 'bg-black/50',

  panel:
    'font-legacy-condensed inset-x-0 mx-auto block h-auto max-h-[calc(100dvh-30px)] w-fit max-w-[calc(100vw-30px)] translate-x-0 gap-0 overflow-y-auto rounded-none border-[5px] border-solid border-[color:var(--border-on-light-strong)] bg-[var(--surface-canvas)] p-[30px] shadow-none sm:rounded-none md:max-w-[calc((100vw-30px)*0.75)] min-[1023px]:max-h-[100dvh] min-[1023px]:max-w-[50vw]',

  closeWrap: 'absolute top-[15px] right-[15px] z-10',

  close: 'block cursor-pointer text-[var(--icon-dialog-close)]',

  closeIcon: 'h-7 w-auto',

  flow: 'text-xl leading-[30px] text-[var(--text-on-light-muted)] [&_h3+h4]:-mt-2 [&_ul:last-child]:mb-0',

  sectionTitle:
    'mb-2 block text-[21.6px] leading-[26.676px] font-semibold text-[var(--text-on-light-base)]',

  groupTitle: 'mb-2 block text-lg leading-[24.3px] font-semibold text-[var(--text-on-light-base)]',

  list: 'mb-4 list-disc pl-10',

  item: 'text-lg leading-[27px] font-normal text-[var(--text-on-light-muted)]',
} as const
