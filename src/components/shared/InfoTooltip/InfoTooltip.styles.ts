export const infoTooltipStyles = {
  triggerDefault:
    'flex-shrink-0 rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',
  triggerDefaultDark: 'text-[var(--text-inverse-muted)]',
  triggerDefaultLight: 'text-[var(--text-muted)]',
  triggerCustom:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2',

  bodyText: 'text-sm leading-5 text-[var(--text-inverse-subtle)]',
  paragraph: 'whitespace-pre-line [overflow-wrap:anywhere]',
  paragraphSpaced: 'mt-3',

  overlay: 'fixed inset-0 z-50 bg-black/60',
  dialog:
    'fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-sm flex-col rounded-2xl bg-[var(--surface-canvas-inverse)] shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  dialogSrDescription: 'sr-only',
  dialogHeader: 'flex-shrink-0 px-6 pb-3 pt-6',
  dialogHeaderRow: 'flex items-start gap-3',
  dialogTitle:
    'min-w-0 flex-1 text-base font-semibold leading-6 text-[var(--text-inverse)] [overflow-wrap:anywhere]',
  dialogClose: 'flex-shrink-0 text-[var(--text-inverse-subtle)] hover:text-[var(--text-inverse)]',
  dialogBody: 'overflow-y-auto px-6 pb-6',

  tooltipContent:
    'relative z-50 rounded-2xl border border-[var(--border-on-light)] p-6 text-left shadow-xl transition-[width] duration-150 bg-[var(--surface-canvas-inverse)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2',
  tooltipArrow: 'fill-[var(--surface-canvas-inverse)]',
  tooltipTitle:
    'mb-3 text-base font-semibold leading-6 text-[var(--text-inverse)] [overflow-wrap:anywhere]',
} as const
