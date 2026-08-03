export const stepCardOverlayStyles = {
  nc_root: 'absolute inset-0 flex flex-col items-center justify-end pb-7',
  nc_widget: 'flex flex-col items-center gap-3',
  nc_input:
    'flex items-center justify-between bg-[var(--surface-primary)] rounded-xl pl-4 pr-1.5 py-1.5 shadow-lg w-[245px]',
  nc_inputText: 'text-xs font-medium text-[var(--text-strong)] truncate flex-1 mr-2',
  nc_searchBtn:
    'bg-[var(--surface-accent)] rounded-md flex items-center justify-center w-9 h-9 shrink-0',
  nc_badge: 'flex items-center gap-1.5 bg-[var(--icon-background-accent)] rounded-full px-3 py-1',
  nc_badgeText: 'text-[10px] font-medium text-[var(--text-strong)]',

  pkg_root: 'absolute inset-0 overflow-hidden',
  pkg_card: 'bg-[var(--surface-primary)] rounded-2xl p-4 w-[212px] shadow-xl flex flex-col gap-3',
  pkg_title: 'text-[13px] font-semibold text-[var(--text-strong)] shrink-0',
  pkg_valueBadge: 'bg-[var(--surface-accent)] rounded px-1.5 py-1 shrink-0 flex items-center',
  pkg_valueBadgeText: 'text-[7px] leading-none font-semibold text-[var(--text-strong)]',
  pkg_skeleton: 'bg-[var(--surface-tertiary)] rounded h-2',
  pkg_price: 'text-xl font-bold text-[var(--text-strong)] shrink-0',
  pkg_priceAccent: 'bg-[var(--surface-accent-subtle)] rounded h-2 w-10 shrink-0',
  pkg_orderBtn: 'bg-[var(--surface-accent)] rounded flex items-center justify-center py-2 w-full',
  pkg_orderBtnText: 'text-[10px] font-semibold text-[var(--text-strong)]',
  pkg_divider: 'h-px bg-[var(--border-muted)] w-full shrink-0',
  pkg_checkCircle:
    'bg-[var(--surface-accent-subtle)] rounded-full flex items-center justify-center shrink-0 w-[17.6px] h-[17.6px]',
  pkg_footerSkeleton: 'h-2 bg-[var(--surface-tertiary)] rounded w-20 mx-auto',

  bsk_root: 'absolute inset-0 flex items-end justify-center px-6 pb-5',
  bsk_card: 'bg-[var(--surface-primary)] rounded-xl shadow-xl flex flex-col gap-2 p-3 w-full',
  bsk_header: 'flex items-center gap-1.5',
  bsk_headerText: 'flex-1 text-[8px] font-medium text-[var(--text-muted)]',
  bsk_divider: 'h-px bg-[var(--border-muted)]',
  bsk_pkgRow: 'flex items-center gap-2',
  bsk_pkgName: 'flex-1 text-[9.5px] font-semibold text-[var(--text-strong)] min-w-0',
  bsk_pill:
    'bg-[var(--surface-tertiary)] rounded-full flex items-center gap-1 pl-0.5 pr-2 py-0.5 shrink-0',
  bsk_pillCheck: 'bg-white rounded-full flex items-center justify-center w-3 h-3',
  bsk_pillText: 'text-[8px] font-medium text-[var(--text-muted)]',
  bsk_skeletonRow: 'flex items-center justify-between',
  bsk_skeleton: 'bg-[var(--surface-tertiary)] rounded h-2.5',
  bsk_checkoutBtn:
    'bg-[var(--surface-accent)] rounded flex items-center justify-center py-2 w-full',
  bsk_checkoutBtnText: 'text-xs font-semibold text-[var(--text-strong)]',

  dtl_root: 'absolute inset-0 flex items-end justify-center px-5 pb-5',
  dtl_container: 'relative w-[241px] h-[108px]',
  dtl_card1:
    'absolute z-10 top-0 left-0 bg-[var(--surface-primary)] rounded-lg shadow-lg flex gap-2 items-center py-2 pl-2 pr-3',
  dtl_card2:
    'absolute top-11 left-12 bg-[var(--surface-primary)] rounded-lg shadow-lg flex flex-col gap-2 py-2 pl-2 pr-3',
  dtl_iconBg:
    'bg-[var(--icon-background-accent)] rounded flex items-center justify-center w-9 h-9 shrink-0',
  dtl_cardContent: 'flex items-center gap-2',
  dtl_title: 'text-[9px] font-semibold text-[var(--text-strong)] whitespace-nowrap',
  dtl_subtitle: 'text-[7.8px] font-normal text-[var(--text-muted)] whitespace-nowrap',
  dtl_progressTrack: 'bg-[var(--surface-subtle)] rounded-full h-1 w-[174px]',
  dtl_progressFill: 'bg-[var(--surface-accent)] rounded-full h-full w-[60%]',
} as const
