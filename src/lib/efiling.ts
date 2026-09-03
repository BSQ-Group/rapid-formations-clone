export const CLIENT_BASE = 'https://client.rapidformations.co.uk'

export const AUTH_COOKIE = 'ef_static_rf'

export const LOGIN_HREF = `${CLIENT_BASE}/login/`

export const ACCOUNT_LINKS: ReadonlyArray<{ label: string; href: string }> = [
  { label: 'Dashboard', href: `${CLIENT_BASE}/account/` },
  { label: 'Finances', href: `${CLIENT_BASE}/payments/` },
  { label: 'Services', href: `${CLIENT_BASE}/services/` },
  { label: 'Companies', href: `${CLIENT_BASE}/companies/` },
  { label: 'Orders', href: `${CLIENT_BASE}/order-history/` },
  { label: 'Mail', href: `${CLIENT_BASE}/processed-mail/` },
  { label: 'Log Out', href: `${CLIENT_BASE}/logout` },
]

export function hasEfilingSession(cookie: string): boolean {
  return cookie.split(';').some((entry) => {
    const separator = entry.indexOf('=')
    if (separator === -1) return false
    return (
      entry.slice(0, separator).trim() === AUTH_COOKIE &&
      entry.slice(separator + 1).trim() === 'true'
    )
  })
}

export function isEfilingLoginHref(href: string | null | undefined): boolean {
  return typeof href === 'string' && href.startsWith(LOGIN_HREF)
}
