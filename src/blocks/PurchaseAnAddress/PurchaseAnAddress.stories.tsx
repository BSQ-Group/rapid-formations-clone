import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import type { PurchaseAnAddressBlock } from '@/payload-types'

import Text from '@/components/shared/Text'
import { PurchaseAnAddressCard } from './PurchaseAnAddressCard'
import { purchaseAnAddressStyles as s } from './PurchaseAnAddress.styles'

type Method = NonNullable<PurchaseAnAddressBlock['methods']>[number]

const method = (over: Partial<Method> = {}): Method =>
  ({
    icon: 'share',
    iconColour: 'cyan',
    title: 'When you are\nregistering your company',
    body: 'If you are setting up a new limited company, you should choose a company registration package that includes our Service Address.',
    cta: { type: 'custom', url: '/compare-packages/', label: 'View Packages' },
    ...over,
  }) as Method

const Section: React.FC<{ heading: string; methods: Method[] }> = ({ heading, methods }) => (
  <>
    <div className={s.headingWrap}>
      <Text as="h2" textStyle="span" text={heading} className={s.heading} />
    </div>
    <div className={s.grid}>
      {methods.map((m, i) => (
        <PurchaseAnAddressCard key={i} method={m} />
      ))}
    </div>
  </>
)

const meta: Meta<typeof Section> = {
  title: 'Blocks/PurchaseAnAddress',
  component: Section,
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
type Story = StoryObj<typeof Section>

export const ServiceAddress: Story = {
  args: {
    heading: 'Other ways to buy a service address',
    methods: [
      method(),
      method({
        icon: 'userPlus',
        iconColour: 'green',
        title: 'Import your\nexisting ltd company',
        body: 'If you wish to buy a service address for your existing company, you can create an account and import the company to our admin area. You can then purchase a service address and we will notify Companies House of the changes.',
        cta: {
          type: 'custom',
          url: 'https://client.rapidformations.co.uk/register/',
          label: 'Create Account',
          newTab: true,
        },
      }),
    ],
  },
}

export const BusinessAddress: Story = {
  args: {
    heading: 'Other ways to purchase a business address',
    methods: [
      method({ cta: { type: 'custom', url: '/compare-packages/', label: 'View All Packages' } }),
      method({
        icon: 'userPlus',
        iconColour: 'green',
        title: 'Create an account',
        body: 'Create an account and import your company to our admin area.',
        cta: { type: 'custom', url: '#', label: 'Create Account' },
      }),
    ],
  },
}

export const SingleCard: Story = {
  args: { heading: 'One way to buy', methods: [method()] },
}

export const ThreeCards: Story = {
  args: {
    heading: 'Three ways to buy a service address',
    methods: [method(), method({ icon: 'userPlus', iconColour: 'green' }), method()],
  },
}

export const ShortCopy: Story = {
  args: {
    heading: 'Other ways to buy',
    methods: [
      method({ title: 'Register', body: 'Pick a package.' }),
      method({
        icon: 'userPlus',
        iconColour: 'green',
        title: 'Import',
        body: 'Bring your company.',
      }),
    ],
  },
}

export const LongCopy: Story = {
  args: {
    heading:
      'Other ways to purchase a registered office address for your newly incorporated limited company',
    methods: [
      method({
        title: 'When you are registering a brand new limited company with Companies House',
        body: 'If you are setting up a new limited company, you should choose a company registration package that includes our Service Address. Packages that include this service are: Privacy, All Inclusive, and Non-Residents. Each of those packages also bundles a full year of our Registered Office Service at no extra cost, and can be upgraded at any point during the year.',
        cta: {
          type: 'custom',
          url: '/compare-packages/',
          label: 'View all of our formation packages',
        },
      }),
      method({
        icon: 'userPlus',
        iconColour: 'green',
        title: 'Import your existing limited company into our admin area',
        body: 'If you wish to buy a service address for your existing company, you can create an account and import the company to our admin area.',
        cta: { type: 'custom', url: '#', label: 'Create an account now' },
      }),
    ],
  },
}

export const UnbrokenToken: Story = {
  args: {
    heading: 'Geschäftsführerbestellungsservice',
    methods: [
      method({
        title: 'Unternehmensauflösungsdienstleistung',
        body: 'compliance.department@rapidformations-support.co.uk — https://www.rapidformations.co.uk/additional-services/london-registered-office/',
        cta: { type: 'custom', url: '#', label: 'Kundenbetreuungskontakt' },
      }),
      method({ icon: 'userPlus', iconColour: 'green' }),
    ],
  },
}

export const NoCta: Story = {
  args: {
    heading: 'Other ways to buy a service address',
    methods: [
      method({ cta: undefined as never }),
      method({ icon: 'userPlus', iconColour: 'green' }),
    ],
  },
}

export const NarrowColumn: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    heading: 'Other ways to buy a service address',
    methods: [
      method({
        title: 'When you are registering a brand new limited company',
        body: 'If you are setting up a new limited company, you should choose a company registration package that includes our Service Address.',
        cta: { type: 'custom', url: '#', label: 'View all of our formation packages' },
      }),
    ],
  },
}
