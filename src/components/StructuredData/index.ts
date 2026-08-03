import type { Footer as FooterType, Page } from '@/payload-types'

import { getBrand, getDomainConfig } from '@/lib/brand'
import { getServerSideURL } from '@/utilities/getURL'

type PageLike = {
  slug?: string | string[] | null
  title?: string | null
  meta?: { title?: string | null; description?: string | null } | null
  layout?: Page['layout']
}

function postalAddress(address?: string | null) {
  if (!address) return null
  const parts = address
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
  if (parts.length < 3) return { '@type': 'PostalAddress', streetAddress: address }
  const postalCode = parts[parts.length - 1]
  const addressLocality = parts[parts.length - 2]
  const addressRegion = parts[parts.length - 3]
  return {
    '@type': 'PostalAddress',
    streetAddress: parts.slice(0, -3).join(', '),
    addressRegion,
    addressLocality,
    postalCode,
  }
}

function howTo(doc: PageLike | null, origin: string) {
  const block = doc?.layout?.find((entry) => (entry.blockType as string) === 'fourSteps') as
    | {
        heading?: string | null
        subheading?: string | null
        steps?: { title?: string | null; description?: string | null }[] | null
      }
    | undefined
  if (!block) return null
  const steps = block.steps ?? []
  if (steps.length < 2) return null
  const flatten = (value?: string | null) => (value || '').replace(/\s*\n\s*/g, ' ').trim()

  return {
    '@type': 'HowTo',
    name: flatten(block?.heading),
    ...(block?.subheading ? { description: flatten(block.subheading) } : {}),
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      name: flatten(step.title),
      text: flatten(step.description),
      url: origin,
    })),
  }
}

export function pagePath(slug?: string | string[] | null): string {
  const value = Array.isArray(slug) ? slug.join('/') : slug
  return !value || value === 'home' ? '/' : `/${value}`
}

export function buildSiteGraph(doc: PageLike | null, footer?: FooterType | null) {
  const origin = getServerSideURL()
  const { siteName, logoPath } = getDomainConfig(getBrand())
  const path = pagePath(doc?.slug)
  const url = origin + path
  const orgId = `${origin}/#organization`
  const siteId = `${origin}/#website`

  const social = (footer?.socialLinks ?? [])
    .map((link) => link.url)
    .filter((value): value is string => Boolean(value))

  const organization: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': orgId,
    name: footer?.companyName || siteName,
    url: origin,
    logo: origin + logoPath,
  }
  if (social.length) organization.sameAs = social
  if (footer?.address) {
    organization.address = { '@type': 'PostalAddress', streetAddress: footer.address }
  }
  if (footer?.vatNumber) organization.vatID = footer.vatNumber
  if (footer?.companyNumber) {
    organization.identifier = {
      '@type': 'PropertyValue',
      name: 'Company Number',
      value: footer.companyNumber,
    }
  }

  const address = postalAddress(footer?.address)
  const localBusiness: Record<string, unknown> | null = address
    ? {
        '@type': 'LocalBusiness',
        '@id': `${origin}/#localbusiness`,
        name: footer?.companyName || siteName,
        url: origin,
        image: origin + logoPath,
        ...(doc?.meta?.description ? { description: doc.meta.description } : {}),
        address,
        parentOrganization: { '@id': orgId },
      }
    : null

  const steps = howTo(doc, origin)

  return [
    organization,
    ...(localBusiness ? [localBusiness] : []),
    ...(steps ? [steps] : []),
    {
      '@type': 'WebSite',
      '@id': siteId,
      name: siteName,
      url: origin,
      publisher: { '@id': orgId },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: doc?.meta?.title || doc?.title || siteName,
      ...(doc?.meta?.description ? { description: doc.meta.description } : {}),
      isPartOf: { '@id': siteId },
      about: { '@id': orgId },
    },
  ]
}

export { JsonLd } from './JsonLd'
