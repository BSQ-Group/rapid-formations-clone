import { RAPID_ORG } from '@/lib/rapid-org'

// The data-driven builders (FAQPage/HowTo/Product) take already-extracted inputs
// so they stay independent of the CMS block schema (see extractors.ts).
type Json = Record<string, unknown>
const CTX = 'https://schema.org'

function postalAddress(): Json {
  return { '@type': 'PostalAddress', ...RAPID_ORG.address }
}

export function buildOrganization(opts: {
  url: string
  logo: string
  variant: 'home' | 'about'
}): Json {
  const org: Json = {
    '@context': CTX,
    '@type': 'Organization',
    name: RAPID_ORG.name,
    url: opts.url,
    logo: opts.logo,
    foundingDate: RAPID_ORG.foundingDate,
    ...(opts.variant === 'about'
      ? { founders: RAPID_ORG.founders.map((name) => ({ '@type': 'Person', name })) }
      : {}),
    address: postalAddress(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: RAPID_ORG.telephone,
      ...(opts.variant === 'about' ? { email: RAPID_ORG.email } : {}),
      contactType: 'Customer Support',
      areaServed: 'GB',
      availableLanguage: ['English'],
    },
    sameAs: RAPID_ORG.sameAs,
    knowsAbout: RAPID_ORG.knowsAbout,
  }
  // Legacy emits the B-Corp award/credential on the home Organization only.
  if (opts.variant === 'home') {
    org.award = RAPID_ORG.award
    org.hasCredential = {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Certification',
      name: RAPID_ORG.bCorp.name,
      description: RAPID_ORG.bCorp.description,
      url: RAPID_ORG.bCorp.url,
    }
  }
  return org
}

export function buildLocalBusiness(opts: { url: string; image: string }): Json {
  return {
    '@context': CTX,
    '@type': 'LocalBusiness',
    name: RAPID_ORG.name,
    url: opts.url,
    image: opts.image,
    description: RAPID_ORG.localBusinessDescription,
    address: postalAddress(),
  }
}

export function buildWebSite(opts: { url: string }): Json {
  return { '@context': CTX, '@type': 'WebSite', url: opts.url, name: RAPID_ORG.name }
}

export function buildWebPage(): Json {
  return {
    '@context': CTX,
    '@type': 'WebPage',
    headline: RAPID_ORG.homeHeadline,
    about: [
      {
        '@type': 'Thing',
        name: 'company formation',
        sameAs: 'https://en.wikipedia.org/wiki/Company_formation',
      },
    ],
  }
}

export function buildProfessionalService(opts: { url: string }): Json {
  return {
    '@context': CTX,
    '@type': 'ProfessionalService',
    name: RAPID_ORG.name,
    url: opts.url,
    telephone: RAPID_ORG.telephone,
    address: postalAddress(),
  }
}

export interface FaqItem {
  question: string
  answer: string
}
export function buildFAQPage(items: FaqItem[]): Json | null {
  const mainEntity = items
    .filter((i) => i.question && i.answer)
    .map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    }))
  if (!mainEntity.length) return null
  // Flat mainEntity array (the legacy home page has a nested-array bug we do not reproduce).
  return { '@context': CTX, '@type': 'FAQPage', mainEntity }
}

export interface HowToStepInput {
  name: string
  text: string
  image?: string
}
export function buildHowTo(opts: {
  name: string
  description?: string
  image?: string
  steps: HowToStepInput[]
  url: string
}): Json | null {
  const steps = opts.steps.filter((s) => s.name || s.text)
  if (steps.length < 2) return null
  return {
    '@context': CTX,
    '@type': 'HowTo',
    name: opts.name,
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.image ? { image: opts.image } : {}),
    step: steps.map((s) => ({
      '@type': 'HowToStep',
      ...(s.image ? { image: s.image } : {}),
      text: s.text || s.name,
      name: s.name || s.text,
      url: opts.url,
    })),
  }
}

export interface ProductInput {
  name: string
  description?: string
  image?: string
  /** Price as a decimal string, e.g. "2.99". */
  price?: string
}
export function buildProduct(p: ProductInput): Json | null {
  if (!p.name) return null
  const product: Json = {
    '@context': CTX,
    '@type': 'Product',
    brand: { '@type': 'Brand', name: RAPID_ORG.name },
    name: p.name,
    ...(p.description ? { description: p.description } : {}),
    ...(p.image ? { image: p.image } : {}),
  }
  if (p.price) {
    product.offers = [
      {
        '@type': 'Offer',
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          price: p.price,
          priceCurrency: 'GBP',
        },
      },
    ]
  }
  return product
}
