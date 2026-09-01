import type { Page } from '@/payload-types'

import { getBrand, getDomainConfig } from '@/lib/brand'
import { RAPID_PRODUCTS } from '@/lib/rapid-products'
import { getPagePath } from '@/utilities/getPagePath'
import { getServerSideURL } from '@/utilities/getURL'

import {
  buildFAQPage,
  buildHowTo,
  buildLocalBusiness,
  buildOrganization,
  buildProduct,
  buildProfessionalService,
  buildWebPage,
  buildWebSite,
} from './builders'
import { extractFaqs, extractHowTo } from './extractors'

export { JsonLd } from './JsonLd'

// Per-page JSON-LD in the same @type set + order the legacy site emits. One
// script per block (not an @graph) to mirror legacy; never re-crawled.
export function buildPageJsonLd(
  doc: Partial<Page> | null | undefined,
): Array<Record<string, unknown>> {
  if (!doc) return []

  const origin = getServerSideURL()
  const { logoPath } = getDomainConfig(getBrand())
  const logo = `${origin}${logoPath}`
  const path = getPagePath(doc)
  const url = `${origin}${path}`
  const slug = Array.isArray(doc.slug) ? doc.slug.join('/') : doc.slug
  const isHome = !slug || slug === 'home'

  const out: Array<Record<string, unknown>> = []

  if (isHome) {
    out.push(buildOrganization({ url: `${origin}/`, logo, variant: 'home' }))
    out.push(buildLocalBusiness({ url: `${origin}/`, image: logo }))
    out.push(buildWebSite({ url: `${origin}/` }))
    out.push(buildWebPage())
  }
  if (slug === 'about-us') {
    out.push(buildOrganization({ url, logo, variant: 'about' }))
  }
  if (slug === 'contact-us') {
    out.push(buildProfessionalService({ url }))
  }

  const howTo = extractHowTo(doc, origin)
  if (howTo) {
    const built = buildHowTo({ ...howTo, url })
    if (built) out.push(built)
  }

  const faq = buildFAQPage(extractFaqs(doc.layout))
  if (faq) out.push(faq)

  if (slug && RAPID_PRODUCTS[slug]) {
    const product = buildProduct(RAPID_PRODUCTS[slug])
    if (product) out.push(product)
  }

  return out
}
