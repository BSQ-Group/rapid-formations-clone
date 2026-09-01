import { beforeAll, describe, expect, it } from 'vitest'

import { getPagePath } from '@/utilities/getPagePath'
import { generateMeta } from '@/utilities/generateMeta'
import { buildPageJsonLd } from '@/components/StructuredData'
import {
  buildFAQPage,
  buildHowTo,
  buildProduct,
} from '@/components/StructuredData/builders'

const ORIGIN = 'https://www.rapidformations.co.uk'

beforeAll(() => {
  process.env.NEXT_PUBLIC_SERVER_URL = ORIGIN
})

// Minimal Lexical richtext with a single paragraph of text.
const rt = (text: string) => ({ root: { children: [{ type: 'paragraph', children: [{ text }] }] } })

const lexPara = rt

const typesOf = (items: Array<Record<string, unknown>>) => items.map((i) => String(i['@type']))

describe('getPagePath — nested fullPath + trailing slash', () => {
  it('uses the nested fullPath, not the flat slug', () => {
    expect(getPagePath({ slug: 'business-address', fullPath: '/additional-services/business-address' })).toBe(
      '/additional-services/business-address/',
    )
  })
  it('maps the home page to /', () => {
    expect(getPagePath({ slug: 'home', fullPath: '/home' })).toBe('/')
    expect(getPagePath({ slug: '' })).toBe('/')
  })
  it('falls back to the slug when there is no fullPath', () => {
    expect(getPagePath({ slug: 'about-us' })).toBe('/about-us/')
  })
})

describe('generateMeta — parity fixes', () => {
  it('emits meta.title verbatim (no brand-suffix append)', async () => {
    const m = await generateMeta({ doc: { slug: 'about-us', meta: { title: 'About Us | Rapid Formations' } } })
    expect(m.title).toBe('About Us | Rapid Formations')
  })
  it('derives canonical from the nested fullPath with a trailing slash', async () => {
    const m = await generateMeta({
      doc: { slug: 'business-address', fullPath: '/additional-services/business-address' },
    })
    expect(m.alternates?.canonical).toBe('/additional-services/business-address/')
  })
  it('sets the Rapid Formations twitter handle and en_GB locale', async () => {
    const m = await generateMeta({ doc: { slug: 'about-us' } })
    expect((m.twitter as { site?: string }).site).toBe('@rapidukofficial')
    expect((m.twitter as { creator?: string }).creator).toBe('@rapidukofficial')
    expect((m.openGraph as { locale?: string }).locale).toBe('en_GB')
  })
  it('noindexes port-preview-* pages', async () => {
    const m = await generateMeta({ doc: { slug: 'port-preview-about-us-tabs' } })
    expect(m.robots).toEqual({ index: false, follow: false })
  })
  it('keeps normal pages indexable', async () => {
    const m = await generateMeta({ doc: { slug: 'about-us' } })
    expect(m.robots).toEqual({ index: true, follow: true })
  })
})

describe('JSON-LD builders', () => {
  it('buildFAQPage emits a FLAT mainEntity array', () => {
    const faq = buildFAQPage([{ question: 'Q1', answer: 'A1' }, { question: 'Q2', answer: 'A2' }]) as {
      '@type': string
      mainEntity: unknown[]
    }
    expect(faq['@type']).toBe('FAQPage')
    expect(faq.mainEntity).toHaveLength(2)
    expect(Array.isArray(faq.mainEntity[0])).toBe(false) // not the legacy nested-array bug
    expect((faq.mainEntity[0] as { name: string }).name).toBe('Q1')
  })
  it('buildProduct emits brand + GBP UnitPriceSpecification', () => {
    const p = buildProduct({ name: 'Basic Package', price: '2.99' }) as {
      '@type': string
      brand: { name: string }
      offers: { priceSpecification: { price: string; priceCurrency: string } }[]
    }
    expect(p['@type']).toBe('Product')
    expect(p.brand.name).toBe('Rapid Formations')
    expect(p.offers[0].priceSpecification).toMatchObject({ price: '2.99', priceCurrency: 'GBP' })
  })
  it('buildHowTo requires at least two steps', () => {
    expect(buildHowTo({ name: 'x', steps: [{ name: 'only', text: 'one' }], url: ORIGIN })).toBeNull()
    const h = buildHowTo({
      name: 'Steps',
      steps: [
        { name: 'a', text: '1' },
        { name: 'b', text: '2' },
      ],
      url: ORIGIN,
    }) as { step: unknown[] }
    expect(h.step).toHaveLength(2)
  })
})

describe('buildPageJsonLd — per-page composition (from mock blocks)', () => {
  it('home emits the full graph in legacy order', () => {
    const doc = {
      slug: 'home',
      title: 'Home',
      layout: [
        {
          blockType: 'fourSteps',
          heading: 'Register in 4 steps',
          subheading: 'Fast and simple',
          steps: [
            { title: 'Step 1', description: 'Choose a name' },
            { title: 'Step 2', description: 'Pick a package' },
          ],
        },
        {
          blockType: 'faqs',
          faqs: [
            { title: 'What is company formation?', description: lexPara('Registering a company.') },
          ],
        },
      ],
    }
    const types = typesOf(buildPageJsonLd(doc as never))
    expect(types).toEqual(['Organization', 'LocalBusiness', 'WebSite', 'WebPage', 'HowTo', 'FAQPage'])
  })

  it('about-us emits Organization with founders', () => {
    const items = buildPageJsonLd({ slug: 'about-us', fullPath: '/about-us' } as never)
    const org = items.find((i) => i['@type'] === 'Organization') as { founders?: { name: string }[] }
    expect(org).toBeTruthy()
    expect(org.founders?.[0]?.name).toBe('Graeme Donnelly')
  })

  it('contact-us emits ProfessionalService', () => {
    const types = typesOf(buildPageJsonLd({ slug: 'contact-us', fullPath: '/contact-us' } as never))
    expect(types).toContain('ProfessionalService')
  })

  it('a package page emits Product from the harvested map', () => {
    const types = typesOf(buildPageJsonLd({ slug: 'basic-package', fullPath: '/package/basic-package' } as never))
    expect(types).toContain('Product')
  })

  it('iterates every faqs block (homepage has two)', () => {
    const doc = {
      slug: 'x',
      layout: [
        { blockType: 'faqs', faqs: [{ title: 'Q1', description: lexPara('A1') }] },
        { blockType: 'faqs', faqs: [{ title: 'Q2', description: lexPara('A2') }] },
      ],
    }
    const items = buildPageJsonLd(doc as never)
    const faq = items.find((i) => i['@type'] === 'FAQPage') as { mainEntity: unknown[] }
    expect(faq.mainEntity).toHaveLength(2)
  })
})
