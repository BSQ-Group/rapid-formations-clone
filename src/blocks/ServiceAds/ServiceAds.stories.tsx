import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import type { ServiceAd } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { ServiceAdCard } from './ServiceAdCard'
import { serviceAdsStyles as s } from './ServiceAds.styles'

const icon = {
  id: 'icon',
  url: 'https://d2zkzcdiu38fde.cloudfront.net/images/1681963f-62cf-4407-91e5-e437a2ae8ffb.png',
  alt: '',
  updatedAt: '',
  createdAt: '',
} as unknown as ServiceAd['icon']

const ad = (overrides: Partial<ServiceAd> = {}): ServiceAd =>
  ({
    id: overrides.name ?? 'ad',
    name: 'Ad',
    title: 'Hassle-Free\nCompliance Service',
    body: 'Always-on compliance support and instant access to business documents',
    variant: 'blue-green',
    icon,
    cta: { type: 'custom', url: '/hassle-free-compliance/', label: 'Learn More' },
    pricing: {},
    updatedAt: '',
    createdAt: '',
    ...overrides,
  }) as ServiceAd

const Grid: React.FC<{ ads: ServiceAd[]; wide?: boolean }> = ({ ads, wide = false }) => (
  <div className={cn(s.grid, wide && s.gridWide)}>
    {ads.map((item, idx) => (
      <ServiceAdCard key={idx} ad={item} wide={wide} />
    ))}
  </div>
)

const meta: Meta<typeof Grid> = {
  title: 'Blocks/ServiceAds',
  component: Grid,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed mx-auto w-full max-w-[1230px] bg-[var(--surface-canvas)] px-5 py-10 min-[1023px]:px-[30px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Grid>

export const Paired: Story = {
  args: {
    ads: [
      ad({ name: 'a' }),
      ad({
        name: 'b',
        title: 'Company Name\nChange Service',
        body: 'Easily change the name of your limited company at any time after incorporation.',
        variant: 'default',
        cta: { type: 'custom', url: '/company-name-change/', label: 'Learn More' },
      }),
    ],
  },
}

export const AllFourColours: Story = {
  args: {
    ads: (['default', 'blue-green', 'blue-purple', 'pink-purple'] as const).map((variant, idx) =>
      ad({ name: `v${idx}`, variant, title: `${variant}\ntile` }),
    ),
  },
}

export const SingleTile: Story = {
  args: { ads: [ad({ name: 'solo' })] },
}

export const Wide: Story = {
  args: {
    wide: true,
    ads: [
      ad({
        name: 'wide',
        title: 'Our Company\nFormation Packages',
        body: 'Everything you need to register a limited company, filed the same working day.',
        variant: 'pink-purple',
        pricing: {
          price: '2.99',
          prefix: 'from',
          postPrice: '+ £100 Companies House Fee',
        },
      }),
    ],
  },
}

export const WidePerYear: Story = {
  args: {
    wide: true,
    ads: [
      ad({
        name: 'wide-suffix',
        title: 'London Registered\nOffice Service',
        variant: 'blue-purple',
        pricing: { price: '39.00', suffix: 'per year' },
      }),
    ],
  },
}

export const ShortCopy: Story = {
  args: {
    ads: [
      ad({ name: 'short-a', title: 'VAT Registration', body: 'Fast and simple.' }),
      ad({
        name: 'short-b',
        title: 'PSC Filing',
        body: 'Done for you.',
        variant: 'pink-purple',
      }),
    ],
  },
}

export const LongCopy: Story = {
  args: {
    ads: [
      ad({
        name: 'long-a',
        title: 'Comprehensive Confirmation Statement\nand Annual Compliance Filing Service',
        body: 'We prepare, check and file your annual confirmation statement with Companies House on your behalf, chase you well before the deadline, and keep a full audit trail of every submission so you never risk a late-filing penalty or a strike-off notice against your company.',
        cta: {
          type: 'custom',
          url: '/confirmation-statement-service/',
          label: 'Learn more about this service',
        },
      }),
      ad({
        name: 'long-b',
        variant: 'blue-purple',
        title: 'Director Appointment and\nResignation Filing Service',
        body: 'Appoint or remove a director in minutes, with every Companies House form prepared, reviewed and submitted for you.',
        cta: {
          type: 'custom',
          url: '/director-appointment-resignation/',
          label: 'Get started now',
        },
      }),
    ],
  },
}

export const UnbrokenToken: Story = {
  args: {
    ads: [
      ad({
        name: 'token-a',
        title: 'Geschäftsführerbestellungsservice',
        body: 'Questions? compliance.department@rapidformations-support.co.uk or read https://www.rapidformations.co.uk/additional-services/london-registered-office/',
        cta: { type: 'custom', url: '/contact/', label: 'Kundenbetreuungskontakt' },
      }),
      ad({
        name: 'token-b',
        variant: 'pink-purple',
        title: 'Unternehmensauflösungsdienstleistung',
        body: 'supercalifragilisticexpialidocious@verylongdomainnameindeed.example.co.uk',
      }),
    ],
  },
}

export const NoIcon: Story = {
  args: {
    ads: [ad({ name: 'no-icon', icon: null as unknown as ServiceAd['icon'] })],
  },
}

export const NarrowColumn: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    ads: [
      ad({
        name: 'narrow',
        title: 'Comprehensive Confirmation Statement\nand Annual Compliance Filing Service',
        body: 'We prepare, check and file your annual confirmation statement with Companies House on your behalf, chase you well before the deadline, and keep a full audit trail of every submission.',
        cta: {
          type: 'custom',
          url: '/confirmation-statement-service/',
          label: 'Learn more about this service',
        },
      }),
    ],
  },
}
