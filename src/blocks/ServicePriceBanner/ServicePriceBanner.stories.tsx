import type { Meta, StoryObj } from '@storybook/react'

import { ServicePriceBannerBlockComponent } from './Component'
import type { Media, ServicePriceBannerBlock } from '@/payload-types'

const portrait = {
  id: 'banner-portrait',
  filename: 'portrait.png',
  alt: '',
  url: 'https://placehold.co/316x339/1f3aa0/ffffff?text=Portrait',
  width: 316,
  height: 339,
  mimeType: 'image/png',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
} as Media

const landscape = {
  ...portrait,
  id: 'banner-landscape',
  url: 'https://placehold.co/600x300/1f3aa0/ffffff?text=Landscape',
  width: 600,
  height: 300,
} as Media

const cta = {
  type: 'custom' as const,
  url: 'https://example.com/buy',
  label: 'Buy Now',
  newTab: false,
}

const base = {
  blockType: 'servicePriceBanner' as const,
  heading: 'Hassle-Free Compliance Service',
  subheading: 'Access to 400+ business documents, expert support and annual filings',
  price: '149.99',
  priceSuffix: 'per year',
  cta,
  image: portrait,
  quote:
    'Very streamlined process from start to finish. Clear communication and smooth steps made the experience hassle-free.',
  background: 'navy' as const,
}

const meta: Meta<typeof ServicePriceBannerBlockComponent> = {
  component: ServicePriceBannerBlockComponent,
  title: 'Blocks/ServicePriceBanner',
  parameters: { layout: 'fullscreen' },
  args: base,
}

export default meta
type Story = StoryObj<typeof ServicePriceBannerBlockComponent>

export const Default: Story = {}

export const Black: Story = { args: { background: 'inverse' } }

export const Cyan: Story = { args: { background: 'cyan' } }

export const NoQuote: Story = { args: { quote: '' } }

export const NoSubheadingOrSuffix: Story = { args: { subheading: '', priceSuffix: '' } }

export const NoImage: Story = {
  args: { image: null } as unknown as Partial<ServicePriceBannerBlock>,
}

export const LandscapeImage: Story = { args: { image: landscape } }

export const LongCopy: Story = {
  args: {
    heading:
      'The Hassle-Free Compliance Service and Business Document Template Library for Growing UK Limited Companies',
    subheading:
      'Access to more than 400 professionally written business documents covering finance, employment, company policies and data protection, unlimited expert support from our in-house compliance team, and every one of your statutory annual filings prepared and submitted on your behalf',
    price: '1,149,999.99',
    priceSuffix: 'per year, billed annually in advance and renewed automatically each January',
    cta: {
      ...cta,
      label:
        'Buy the Hassle-Free Compliance Service and Business Document Template Library subscription for your UK limited company today and start filing with confidence',
    },
    quote:
      'A very streamlined process from start to finish, with clear communication at every stage and smooth, well-signposted steps that made the whole experience genuinely hassle-free for our small team, even during our busiest trading quarter of the year.',
  },
}

export const UnbrokenTokens: Story = {
  args: {
    heading: 'https://www.rapidformations.co.uk/hassle-free-compliance/',
    subheading: 'Rechtsschutzversicherungsgesellschaftenvertragsvorlagendokumentation',
    price: '1234567890123456789012345',
    priceSuffix: 'compliance-support@rapidformations.co.uk',
    cta: { ...cta, label: 'documents-and-filings@rapidformations.co.uk' },
    quote: 'documents-and-filings@rapidformations.co.uk',
  },
}

export const Narrow: Story = {
  args: {
    heading:
      'The Hassle-Free Compliance Service and Business Document Template Library for Growing UK Limited Companies',
    subheading:
      'Access to more than 400 professionally written business documents covering finance, employment, company policies and data protection, unlimited expert support from our in-house compliance team, and every one of your statutory annual filings prepared and submitted on your behalf',
    price: '1,149,999.99',
    priceSuffix: 'per year, billed annually in advance and renewed automatically each January',
    cta: {
      ...cta,
      label: 'Buy the Hassle-Free Compliance Service and Document Library subscription now',
    },
  },
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '900px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}
