export const legalSidenavStyles = {
  section: 'w-full',
  inner: 'lg:max-w-7xl lg:mx-auto lg:px-8',
  layout: 'lg:grid lg:grid-cols-[180px_1fr] lg:gap-12 xl:gap-16',

  // ── Desktop sidenav (lg+) ────────────────────────────────────────────────
  sidenavWrapper: 'hidden lg:block self-start sticky top-24',
  navContainer: 'flex flex-col items-start w-[180px] bg-[var(--surface-primary)] rounded-xl py-3',
  navGroup: 'flex flex-col gap-1 w-full',
  navLink:
    'flex items-center w-full px-3 py-2 rounded-md text-sm leading-5 font-medium transition-colors',
  navLinkActive: 'bg-[var(--surface-tertiary)] text-[var(--text-strong)]',
  navLinkInactive: 'text-[var(--text-subtle)] hover:bg-[var(--surface-secondary)]',

  // ── Mobile / tablet dropdown (<lg) ───────────────────────────────────────
  dropdownWrapper: 'lg:hidden sticky top-[calc(var(--header-height)-8px)] z-40 w-full relative',
  dropdownTrigger:
    'flex items-center justify-between w-full px-4 py-4 md:px-8 border-t border-b border-[var(--border-muted)] text-base leading-6 font-semibold text-[var(--text-strong)] bg-[var(--surface-primary)]',
  dropdownTriggerOpen: 'bg-[var(--surface-tertiary)]',
  dropdownPanel:
    'absolute top-full left-0 right-0 flex flex-col w-full bg-[var(--surface-tertiary)] pb-4 border-b border-[var(--border-muted)]',
  dropdownItem:
    'flex items-center justify-between w-full px-4 md:px-8 py-3 text-base leading-6 font-medium transition-colors text-[var(--text-subtle)]',
  dropdownItemActive: 'bg-[var(--surface-primary)] border-l-2 border-[var(--border-focus)]',
  dropdownCurrentLabel: 'text-[var(--text-muted)] text-xs leading-4 font-medium',

  // ── Content area ─────────────────────────────────────────────────────────
  contentArea: 'min-w-0 px-4 md:px-8 lg:px-0 pt-8 lg:pt-0',
} as const
