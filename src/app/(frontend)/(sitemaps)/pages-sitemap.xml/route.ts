import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

import { getServerSideURL } from '@/utilities/getURL'
import { getPagePath } from '@/utilities/getPagePath'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL = getServerSideURL()

    const results = await payload.find({
      collection: 'pages',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        _status: {
          equals: 'published',
        },
      },
      select: {
        slug: true,
        fullPath: true,
        meta: true,
        updatedAt: true,
      },
    })

    const dateFallback = new Date().toISOString()

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/search/`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/posts/`,
        lastmod: dateFallback,
      },
    ]

    const sitemap = results.docs
      ? results.docs
          .filter(
            (page) =>
              // Exclude the port-preview-* internal dev pages and any noindex funnel page.
              Boolean(page?.slug) &&
              !page.slug!.startsWith('port-preview-') &&
              !page?.meta?.noindex,
          )
          .map((page) => {
            // Emit the nested fullPath with a trailing slash (matches canonical + legacy).
            return {
              loc: `${SITE_URL}${getPagePath(page)}`,
              lastmod: page.updatedAt || dateFallback,
            }
          })
      : []

    return [...defaultSitemap, ...sitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
