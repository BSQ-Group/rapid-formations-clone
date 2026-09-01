import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Page } from '@/payload-types'

export type LegalNavLink = {
  slug: string
  label: string
}

function linkFromPage(page: Page): LegalNavLink | null {
  const slug = page.slug
  const label = page.navigationLabel || page.title || slug
  if (!slug || !label) return null
  return { slug, label }
}

// The legal sidebar lists every published legal page, ordered by title. (This
// used to read a manual order/hide list from the `legalSidenav` global; that
// global was removed and the nav now derives straight from the Pages collection.)
export async function fetchLegalNavLinks(): Promise<LegalNavLink[]> {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [{ isLegalPage: { equals: true } }, { _status: { equals: 'published' } }],
    },
    select: { slug: true, title: true, navigationLabel: true },
    sort: 'title',
    limit: 100,
    overrideAccess: true,
  })

  return result.docs
    .map((page) => linkFromPage(page as Page))
    .filter((link): link is LegalNavLink => link !== null)
}
