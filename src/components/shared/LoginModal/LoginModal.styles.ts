export const loginModalStyles = {
  content: 'md:min-w-[400px]',
  title: 'text-center text-[var(--text-strong)]',
  description: 'text-center text-[var(--text-muted)]',
  methods: 'flex flex-col gap-3 mt-2',
  methodButton:
    'flex items-center gap-3 w-full h-12 px-4 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] text-[var(--text-strong)] text-sm font-medium transition-colors hover:bg-[var(--surface-subtle)] cursor-pointer',
  methodIcon: 'flex-shrink-0 w-5 h-5',
  dividerRow: 'flex items-center gap-3 my-1',
  dividerLine: 'flex-1 h-px bg-[var(--border-default)]',
  dividerText: 'text-[var(--text-muted)]',
  error: 'text-[var(--status-error)] text-center',
  emailForm: 'flex flex-col gap-4 mt-2',
  emailInput:
    'h-12 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] px-4 text-sm text-[var(--text-strong)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]',
  pinRow: 'flex justify-center gap-2',
  pinInput:
    'w-11 h-14 rounded-lg border border-[var(--border-default)] bg-[var(--surface-primary)] text-center text-lg font-semibold text-[var(--text-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]',
  backButton:
    'flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-[var(--text-strong)] cursor-pointer transition-colors',
  resendRow: 'flex justify-center',
  resendButton:
    'text-sm text-[var(--text-muted)] hover:text-[var(--text-strong)] cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  resendTimer: 'text-[var(--text-muted)]',
} as const
