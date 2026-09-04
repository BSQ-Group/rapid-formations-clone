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

  // CORE-7284: the seven /name-check-<pkg>-package/ pages were one template differing
  // only in heading label and checkout path, so the journey now runs through a single
  // /name-check/ page taking the package as a query param. All seven answer 200 on
  // rapidformations.co.uk today, so they 301 rather than 404 — anything already linked,
  // indexed or bookmarked keeps working, and an SEO parity crawl stays clean.
  //
  // 301 not `permanent: true`, which Next emits as a 308.

  // Must precede the catch-all: this is the one package whose name-check URL says
  // "lbg" where the Packages collection slug says "limited-by-guarantee".
  const nameCheckLbgRedirect = {
    source: '/name-check-lbg-package',
    destination: '/name-check/?pkg=limited-by-guarantee-package',
    statusCode: 301,
  }

  const nameCheckRedirect = {
    source: '/name-check-:pkg([a-z0-9-]+-package)',
    destination: '/name-check/?pkg=:pkg',
    statusCode: 301,
  }

  return [internetExplorerRedirect, nameCheckLbgRedirect, nameCheckRedirect]
}
