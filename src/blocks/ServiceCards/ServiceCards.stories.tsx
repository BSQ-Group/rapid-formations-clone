import type { Meta, StoryObj } from '@storybook/react'

import { ServiceCardsBlock } from './Component'
import type { ServiceCardsBlock as ServiceCardsBlockProps } from '@/payload-types'

const makeLink = (url: string, label: string) => ({
  type: 'custom' as const,
  url,
  label,
  newTab: false,
  reference: null,
})

const baseSectionLayout: ServiceCardsBlockProps['sectionLayout'] = {
  background: 'light',
  paddingTop: 's',
  paddingBottom: 's',
}

const meta: Meta<typeof ServiceCardsBlock> = {
  title: 'Blocks/ServiceCards',
  component: ServiceCardsBlock,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof ServiceCardsBlock>

type GroupCards = NonNullable<NonNullable<ServiceCardsBlockProps['groups']>[number]['cards']>

const standardCards: GroupCards = [
  {
    id: '1',
    icon: 'badge-check',
    title: 'Standard Service',
    description:
      'Your confirmation statement will be filed within 3 working days of receiving the required information. Our price also includes the Companies House filing fee.',
    price: '£75.99 +VAT',
    orderLink: makeLink('/order/standard', 'Order'),
  },
  {
    id: '2',
    icon: 'file-text',
    title: 'Express Service',
    description:
      'Your confirmation statement will be filed within 24 hours (1 working day) of receiving the required information. Our price also includes the Companies House filing fee.',
    price: '£85.99 +VAT',
    orderLink: makeLink('/order/express', 'Order'),
  },
]

const addressServicesCards: GroupCards = [
  {
    id: 'a1',
    icon: 'building-2',
    title: 'Registered Office Address',
    description:
      'Renew your Registered Office Address and continue to protect the privacy of your home address for another 12 months.',
    price: '£39.00 +VAT',
    orderLink: makeLink('/order/registered-office', 'Order'),
  },
  {
    id: 'a2',
    icon: 'mail',
    title: 'Service Address',
    description: 'Maintain the privacy provided with our Service Address for another year.',
    price: '£26.00 +VAT',
    orderLink: makeLink('/order/service-address', 'Order'),
  },
  {
    id: 'a3',
    icon: 'briefcase',
    title: 'Business Address Service',
    description:
      'Renew your Business Address Service and maintain your excellent corporate image with our Covent Garden address.',
    price: '£96.00 +VAT',
    orderLink: makeLink('/order/business-address', 'Order'),
  },
]

const companyServicesCards: GroupCards = [
  {
    id: 'c1',
    icon: 'headphones',
    title: 'Hassle-Free Compliance Service',
    description:
      'Renew your service and retain access to the Business Document Template Library, support with statutory filings and expert compliance support.',
    price: '£149.99 +VAT',
    orderLink: makeLink('/order/compliance', 'Order'),
  },
  {
    id: 'c2',
    icon: 'file-check',
    title: 'Confirmation Statement Service',
    description:
      'Extend your Confirmation Statement Service and make sure you stay compliant with Companies House.',
    price: '£75.99 +VAT',
    orderLink: makeLink('/order/confirmation-statement', 'Order'),
  },
  {
    id: 'c3',
    icon: 'files',
    title: 'Dormant Company Accounts Service',
    description:
      'You can renew our Dormant Company Accounts Service here, and we will prepare and file your accounts for another year.',
    price: '£49.99 +VAT',
    orderLink: makeLink('/order/dormant-accounts', 'Order'),
  },
  {
    id: 'c4',
    icon: 'library',
    title: 'Business Document Template Library',
    description:
      'Retain access for another year to our library, and ensure you have the business documents you need, when you need them.',
    price: '£139.99 +VAT',
    orderLink: makeLink('/order/template-library', 'Order'),
  },
]

export const TwoCardsNoSubtitle: Story = {
  args: {
    id: 'service-cards-two',
    blockType: 'serviceCards',
    title: 'Order a confirmation statement',
    groups: [{ id: 'g1', cards: standardCards }],
    sectionLayout: baseSectionLayout,
  },
}

export const SingleCardNoSubtitle: Story = {
  args: {
    id: 'service-cards-single',
    blockType: 'serviceCards',
    title: 'Order a confirmation statement',
    groups: [{ id: 'g1', cards: [standardCards[0]!] }],
    sectionLayout: baseSectionLayout,
  },
}

export const ThreeCardsNoSubtitle: Story = {
  args: {
    id: 'service-cards-three',
    blockType: 'serviceCards',
    title: 'Choose your service',
    groups: [
      {
        id: 'g1',
        cards: [
          ...standardCards,
          {
            id: '3',
            icon: 'zap',
            title: 'Priority Service',
            description:
              'Your confirmation statement will be filed within 2 hours of receiving the required information. Our price also includes the Companies House filing fee.',
            price: '£99.99 +VAT',
            orderLink: makeLink('/order/priority', 'Order'),
          },
        ],
      },
    ],
    sectionLayout: baseSectionLayout,
  },
}

export const TwoGroupsWithSubtitles: Story = {
  args: {
    id: 'service-cards-two-groups',
    blockType: 'serviceCards',
    title: 'Renew your services',
    groups: [
      { id: 'g1', subtitle: 'Address Services', cards: addressServicesCards },
      { id: 'g2', subtitle: 'Company Services', cards: companyServicesCards },
    ],
    sectionLayout: baseSectionLayout,
  },
}
