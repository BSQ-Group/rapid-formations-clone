export const footerStyles = {
  // Outer section — full-bleed at every breakpoint
  section: 'w-full',

  // Black container — full-width, no rounding
  container:
    'bg-black flex flex-col gap-14 items-center overflow-hidden px-4 py-14 lg:gap-10 lg:p-14',

  // Inner content constraint
  inner: 'w-full max-w-[1200px] flex flex-col gap-14 lg:gap-10',

  // ============ DESKTOP LAYOUT (≥1024px) ============
  desktopLayout: 'hidden lg:flex flex-col gap-10 w-full',

  // Desktop top half
  desktopTop: 'flex items-start justify-between w-full',

  // Logo + details + links group
  desktopLogoAndLinks: 'flex gap-20 items-start',

  // Desktop link columns wrapper
  desktopLinkColumns: 'flex lg:gap-3 xl:gap-20 items-start self-stretch',

  // Desktop bottom half
  desktopBottom: 'flex gap-8 items-end w-full',

  // ============ MOBILE LAYOUT (<1024px) ============
  mobileLayout: 'flex lg:hidden flex-col gap-10 w-full',

  // Mobile link columns container
  mobileLinkColumns: 'flex gap-10 w-full',

  // Mobile policy links (underlined at bottom)
  mobilePolicyLinks: 'flex flex-wrap gap-x-3 gap-y-2',
  policyLink: 'font-normal text-[var(--text-inverse-muted)] underline',

  // ============ SHARED STYLES ============

  // Logo + company details — tablet: row layout, mobile: column
  logoSection:
    'flex flex-col gap-6 w-full md:flex-row md:flex-wrap md:gap-x-10 lg:flex-col lg:w-60',
  logo: 'relative w-[180px] h-[98px] shrink-0',
  companyDetails: 'flex flex-col gap-4 text-[var(--text-inverse-muted)]',

  // Link column
  linkColumn: 'flex flex-col gap-3 flex-1 lg:flex-initial',
  linkColumnHeading: 'font-medium text-[var(--text-inverse-muted)]',
  linkList: 'flex flex-col gap-2',
  linkItem:
    'font-medium text-[var(--text-inverse)] hover:opacity-80 transition-opacity',

  // Social links
  socialLinks: 'flex gap-4 items-center',
  socialIcon: 'relative w-6 h-6',

  // Small print / copyright
  smallPrint: 'flex flex-col gap-1 lg:flex-1 text-[var(--text-inverse-muted)]',
  mobileSmallPrint: 'flex flex-col gap-4 text-[var(--text-inverse-muted)]',

  // Logos + bank cards (desktop right side)
  logosAndCards: 'flex flex-col gap-3 items-end',

  // Bank cards + social row (tablet: same line)
  bankCardsAndSocial:
    'flex flex-col gap-10 md:flex-row md:items-center md:justify-between lg:hidden',
  bankCards: 'flex items-center gap-1.5',
  bankCard: 'relative w-9 h-6',

  // Certification logos — tablet: 4 cols, mobile: 3 cols
  certLogos: 'flex gap-4 items-center h-[76px]',
  mobileCertLogos: 'grid grid-cols-3 md:grid-cols-4 gap-4',
  mobileCertLogoCell: 'flex items-center justify-center h-[140px]',
  certLogoWrapper: 'relative flex items-center justify-center',
} as const
