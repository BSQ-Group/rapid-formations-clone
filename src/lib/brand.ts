// Rapid Formations-only site configuration.
//
// This repo clones rapidformations.co.uk only. The former multi-brand
// abstraction (1st Formations / Quality Company Formations, selected at build
// time via NEXT_PUBLIC_BRAND) has been removed — there is no brand switch any
// more. NEXT_PUBLIC_BRAND was never set, so the other two entries were
// unreachable.

export interface DomainConfig {
  alt: string
  logoPath: string
  logoOnDarkPath: string
  siteName: string
  tenantId: string
  blogUrl: string
  themeColor: string
}

export const RF_CONFIG: DomainConfig = {
  alt: 'Rapid Formations Ltd Logo',
  logoPath: '/images/RF-logo.png',
  logoOnDarkPath: '/images/RF-logo-on-dark.png',
  siteName: 'Rapid Formations',
  tenantId: 'rapid-90xzd',
  blogUrl: 'https://www.rapidformationsblog.co.uk',
  themeColor: '#00b1e3',
}

/** The theme class applied to <html>; pairs with .theme-rapidformations in globals.css. */
export const THEME_CLASS = 'theme-rapidformations'

/** The site's domain configuration. Rapid Formations-only. */
export function getDomainConfig(): DomainConfig {
  return RF_CONFIG
}

export function getLogoPath(onDark: boolean): string {
  return onDark ? RF_CONFIG.logoOnDarkPath : RF_CONFIG.logoPath
}
