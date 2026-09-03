export const infoTooltipStyles = {
  triggerDefault:
    'flex-shrink-0 rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',
  triggerDefaultDark: 'text-[var(--text-inverse-muted)]',
  triggerDefaultLight: 'text-[var(--text-muted)]',
  triggerCustom:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2',

  bodyText: 'text-[18px] leading-[21.6px] text-[var(--tooltip-text-body)]',
  paragraph: 'mb-2 whitespace-pre-line [overflow-wrap:anywhere]',

  overlay: 'fixed inset-0 z-50 bg-black/60',
  dialog:
    'portal-legacy-condensed fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-sm flex-col rounded-2xl border border-[var(--border-subtle)] bg-[var(--tooltip-surface)] shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  dialogSrDescription: 'sr-only',
  dialogHeader: 'flex-shrink-0 px-6 pb-3 pt-6',
  dialogHeaderRow: 'flex items-start gap-3',
  dialogTitle:
    'min-w-0 flex-1 text-[21.6px] font-semibold leading-[21.6px] text-[var(--tooltip-text-title)] [overflow-wrap:anywhere]',
  dialogClose: 'flex-shrink-0 text-[var(--icon-map-marker)] hover:opacity-80',
  dialogBody: 'overflow-y-auto px-6 pb-6',

  dialogLegacy:
    'w-[calc(100%-30px)] max-w-none rounded-none border-[5px] border-[var(--border-on-light-strong)] md:w-[calc(75%-22.5px)]',
  dialogHeaderLegacy: 'px-[30px] pb-2 pt-[30px]',
  dialogTitleLegacy: 'text-[26px] font-normal leading-[1.235] md:text-[28px]',
  dialogBodyLegacy: 'px-[30px] pb-[30px]',
  dialogBodyTextLegacy: 'text-[20px] leading-[30px]',

  tooltipContent:
    'portal-legacy-condensed group relative z-50 max-w-[550px] rounded-none border-[5px] border-[var(--border-on-light-strong)] p-4 text-left bg-[var(--tooltip-surface)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2',
  tooltipArrow:
    'pointer-events-none absolute h-4 w-4 rotate-45 border-solid border-[var(--border-on-light-strong)] bg-[var(--tooltip-surface)] group-data-[side=right]:top-1/2 group-data-[side=right]:-mt-2 group-data-[side=right]:-left-[13px] group-data-[side=right]:border-b-[5px] group-data-[side=right]:border-l-[5px] group-data-[side=left]:top-1/2 group-data-[side=left]:-mt-2 group-data-[side=left]:-right-[13px] group-data-[side=left]:border-t-[5px] group-data-[side=left]:border-r-[5px] group-data-[side=top]:left-1/2 group-data-[side=top]:-ml-2 group-data-[side=top]:-bottom-[13px] group-data-[side=top]:border-b-[5px] group-data-[side=top]:border-r-[5px] group-data-[side=bottom]:left-1/2 group-data-[side=bottom]:-ml-2 group-data-[side=bottom]:-top-[13px] group-data-[side=bottom]:border-t-[5px] group-data-[side=bottom]:border-l-[5px]',
  tooltipTitle:
    'mb-2 text-[21.6px] font-semibold leading-[21.6px] text-[var(--tooltip-text-title)] [overflow-wrap:anywhere]',
} as const
