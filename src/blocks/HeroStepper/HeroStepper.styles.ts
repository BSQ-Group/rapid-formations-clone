export const heroStepperStyles = {
  wrapper: 'w-full',

  inner: 'mx-auto max-w-[1200px] px-4 md:px-8 lg:px-10',

  compact: 'flex flex-col gap-2 lg:hidden',

  compactHeader: 'flex items-center justify-between',
  compactEyebrow: 'text-xs font-semibold leading-4 text-[var(--text-inverse-muted)]',
  compactLabel: 'text-sm font-semibold leading-5 text-[var(--text-strong)]',

  progressTrack: 'flex gap-1 h-1 w-full rounded overflow-hidden',
  progressSegmentFilled: 'flex-1 rounded bg-[var(--surface-accent)]',
  progressSegmentEmpty: 'flex-1 rounded bg-[var(--border-strong)]',

  full: 'hidden lg:flex items-center w-full',

  stepSlot: 'flex flex-1 items-center gap-2 min-w-0',

  lineFilled: 'flex-1 h-0.5 bg-[var(--surface-accent)] min-w-0',
  lineEmpty: 'flex-1 h-0.5 bg-[var(--qcf-grey-400)] min-w-0',

  nodeOuter: 'w-10 h-10 shrink-0 flex items-center justify-center',

  nodeComplete:
    'w-8 h-8 rounded-full bg-[var(--surface-accent)] flex items-center justify-center bg-[var(--surface-accent)] flex items-center justify-center',

  nodeActive:
    'w-8 h-8 rounded-full bg-[var(--stepper-node-active)] flex items-center justify-center shadow-[0_0_0_4px_color-mix(in_srgb,var(--stepper-node-active)_20%,transparent)]',

  nodeInactive:
    'w-8 h-8 rounded-full bg-[var(--border-strong)] border border-[var(--qcf-grey-400)] flex items-center justify-center',

  nodeNumber: 'text-xs font-semibold leading-none text-[var(--text-strong)]',
  nodeNumberInactive: 'text-xs font-semibold leading-none text-[var(--text-inverse-muted)]',
  nodeIcon: 'text-[var(--text-strong)]',

  labelComplete: 'text-sm font-semibold leading-5 text-[var(--text-strong)] whitespace-nowrap',
  labelActive: 'text-sm font-semibold leading-5 text-[var(--text-strong)] whitespace-nowrap',
  labelInactive:
    'text-sm font-semibold leading-5 text-[var(--text-inverse-muted)] whitespace-nowrap',
} as const
