export const headerStyles = {
  header: 'group sticky top-0 z-20 bg-transparent border-b border-transparent',

  // ─── Desktop nav ───
  desktopNav: 'hidden lg:block',
  desktopContainer: 'py-4 px-8',
  navBar: 'flex items-center justify-between',
  leftGroup: 'flex items-center gap-6',
  logo: 'flex-shrink-0',
  // Idle logo fill is driven by `--header-logo-fill` so the per-page value
  // wins over the `fill` SVG attribute on <Logo>. CSS class beats SVG
  // presentation-attribute specificity. See CORE-3269.
  logoIdle: 'fill-[var(--header-logo-fill)]',
  mainNav: 'flex items-center gap-2',
  // Idle nav-link color comes from `--header-link-color` so the route-aware
  // value is set by each page (via globals.css default + an inline <style>
  // override on the homepage) rather than computed from usePathname() in JS.
  navLink:
    'px-3 py-2 rounded-md text-sm font-medium text-[var(--header-link-color)] hover:text-[var(--text-inverse)] transition-colors cursor-pointer whitespace-nowrap',
  navLinkWithBg:
    'px-3 py-2 rounded-md text-sm font-medium text-[var(--header-link-color)] hover:text-[var(--header-link-hover-color)] transition-colors cursor-pointer whitespace-nowrap',
  navLinkActive: 'bg-[var(--surface-tertiary)] text-[var(--text-strong)]',
  rightGroup: 'flex items-center gap-6',
  secondaryNav: 'flex items-center gap-2',

  // ─── Desktop mega menu ───
  megaMenuDropdown:
    'absolute top-full left-0 right-0 bg-[var(--surface-primary)] border-b border-[var(--border-strong)]',
  megaMenu: 'px-20 py-7 mx-auto max-w-[1280px]',
  megaMenuLinks: 'flex gap-16 items-start',
  megaMenuCategory: 'flex flex-col gap-4',
  megaMenuCategoryTitle: 'text-[var(--text-strong)] font-medium',
  megaMenuLinkList: 'flex gap-16 items-start',
  megaMenuColumn: 'flex flex-col',
  megaMenuLink:
    'text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-strong)] hover:bg-[var(--surface-tertiary)] transition-colors h-9 px-3 -mx-3 rounded flex items-center',
  megaMenuDivider: 'w-px self-stretch bg-[var(--border-subtle)]',

  // ─── Account dropdown (desktop) ───
  accountMenuWrapper: 'relative',
  accountDropdown: 'absolute -right-5 top-full pt-7 z-10',
  accountDropdownPanel: 'bg-[var(--surface-primary)] rounded-3xl shadow-lg py-4 px-5 min-w-[180px]',
  accountDropdownLinks: 'flex flex-col -mx-2',
  accountDropdownLink:
    'flex items-center text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-strong)] rounded-md px-2 py-1.5 hover:bg-[var(--surface-tertiary)] transition-colors',
  accountDropdownDivider: 'h-px bg-[var(--border-subtle)] my-3',
  accountDropdownLogout:
    'text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text-strong)] transition-colors cursor-pointer',

  // ─── Mobile nav ───
  mobileScrollNav: 'lg:hidden',
  mobileActions: 'flex items-center gap-4',
  mobileScrollBar: 'flex items-center justify-between px-4 py-3',
  mobileScrollHamburger: 'text-[var(--header-logo-fill)]',

  // ─── Mobile overlay ───
  mobileOverlay: 'fixed inset-0 z-50 lg:hidden backdrop-blur-[2px] bg-[var(--text-strong)]/40',
  mobileContainer:
    'bg-[var(--surface-primary)] pl-4 pr-4 py-3 flex flex-col max-h-[calc(100dvh-24px)] overflow-hidden',
  mobileHeader: 'flex items-center justify-between shrink-0',
  mobileCloseButton: 'text-[var(--text-strong)] cursor-pointer',

  // ─── Mobile main menu ───
  mobileMenuContent: 'flex flex-col gap-5 pt-7 pb-2',
  mobileMenuItem: 'flex items-center justify-between cursor-pointer',
  mobileMenuItemLabel: 'font-medium text-[var(--text-strong)]',
  mobileMenuDivider: 'h-px bg-[var(--border-subtle)]',
  mobileSecondaryItem: 'flex items-center h-5',
  mobileSecondaryLabel: 'font-medium text-[var(--text-muted)]',

  // ─── Mobile sub-menu ───
  mobileSubMenuContent: 'flex-1 overflow-y-auto flex flex-col gap-5 pt-7 pb-2',
  mobileBackButton: 'flex justify-start gap-1 cursor-pointer',
  mobileBackLabel: 'font-medium text-[var(--text-muted)]',
  mobileSubCategory: 'flex flex-col gap-4',
  mobileSubCategoryTitle: 'text-[var(--text-strong)] font-medium',
  mobileSubLinks: 'flex flex-col gap-5',
  mobileSubLink: 'text-sm font-medium text-[var(--text-muted)] h-5 flex items-center',
} as const
