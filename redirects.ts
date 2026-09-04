import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // CORE-7284. All seven legacy URLs answer 200 on rapidformations.co.uk, so they 301
  // rather than 404. statusCode over `permanent`, which Next emits as a 308.

  // Must precede the catch-all — the only package whose URL slug isn't its package slug.
  const nameCheckLbgRedirect = {
    source: '/name-check-lbg-package',
    destination: '/name-check/limited-by-guarantee-package/',
    statusCode: 301,
  }

  const nameCheckRedirect = {
    source: '/name-check-:pkg([a-z0-9-]+-package)',
    destination: '/name-check/:pkg/',
    statusCode: 301,
  }

  // Bare /name-check/ has no package to sell against; the [pkg] route can't answer it.
  const nameCheckIndexRedirect = {
    source: '/name-check',
    destination: '/compare-packages/',
    statusCode: 301,
  }

  return [
    internetExplorerRedirect,
    nameCheckLbgRedirect,
    nameCheckRedirect,
    nameCheckIndexRedirect,
  ]
}
