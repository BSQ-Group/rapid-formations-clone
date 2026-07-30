import type { Meta, StoryObj } from '@storybook/react'
import { CombinedPlansCarousel } from './CombinedPlansCarousel'
import type { Section } from './ComparePackagesClient'

const order = (url: string) => ({ type: 'custom', url, label: 'Order', newTab: false }) as any
const readMore = (url: string) =>
  ({ type: 'custom', url, label: 'Read more', newTab: false }) as any

const plans = [
  {
    name: 'Basic',
    card: {
      name: 'Basic',
      description: 'Ideal for quick, affordable company setup with a full set of company documents.',
      price: '£1.99',
      priceSuffix: '+ £100 Companies House fee',
      orderLink: order('/order/basic'),
      prefixText: 'Ideal for:',
      benefits: [{ benefit: 'Quick, affordable company setup' }],
      findOutMoreLink: readMore('/basic-package'),
      showFindOutMoreLink: true,
    },
  },
  {
    name: 'Privacy',
    card: {
      name: 'Privacy',
      description:
        'Perfect for building a credible brand, protecting personal privacy, and Covent Garden address services.',
      price: '£3.99',
      priceSuffix: '+ £100 Companies House fee',
      orderLink: order('/order/privacy'),
      prefixText: 'Ideal for:',
      benefits: [
        { benefit: 'Building a credible brand' },
        { benefit: 'Keeping your personal address private' },
        { benefit: 'Covent Garden address services' },
      ],
      findOutMoreLink: readMore('/privacy-package'),
      showFindOutMoreLink: true,
    },
  },
  {
    name: 'Fully Inclusive',
    card: {
      name: 'Fully Inclusive',
      description: 'Designed for privacy, PAYE, and full support.',
      price: '£9.99',
      priceSuffix: '+ £100 Companies House fee',
      orderLink: order('/order/fully-inclusive'),
      prefixText: 'Ideal for:',
      benefits: [
        { benefit: 'Hassle-free compliance' },
        { benefit: 'Business telephone number' },
      ],
      findOutMoreLink: readMore('/fully-inclusive-package'),
      isHighlighted: true,
badgeText: 'Most popular',
      showFindOutMoreLink: true,
    },
  },
]

const sections: Section[] = [
  {
    label: 'CORE SERVICES',
    features: [
      {
        name: 'Limited company formation online',
        description: 'Usually formed within 24 hours',
        inPlans: [true, true, true],
      },
      {
        name: 'Confirmation Statement',
        description: 'Preparation and filing of your first annual statement',
        inPlans: [true, true, true],
      },
      {
        name: 'Free Business Bank Account (Optional)',
        description: 'Choose an account from up to 7 banking partners',
        inPlans: [true, true, true],
      },
    ],
  },
  {
    label: 'PRIVACY & ADDRESS SERVICES',
    features: [
      {
        name: 'Registered Office Address for 12 months',
        description: 'Keeping your home address off the public record',
        inPlans: [false, true, true],
      },
      {
        name: 'Service Address for 12 months',
        description: "Protecting the privacy of an officer's home address",
        inPlans: [false, true, true],
      },
    ],
  },
  {
    label: 'COMPLIANCE & REGISTRATION',
    features: [
      {
        name: 'VAT Registration',
        description: 'Our experts will register your company for VAT',
        inPlans: [false, false, true],
      },
      {
        name: 'PAYE Registration',
        description: 'Our experts will register your company for PAYE',
        inPlans: [false, false, true],
      },
    ],
  },
]

const meta: Meta<typeof CombinedPlansCarousel> = {
  component: CombinedPlansCarousel,
  title: 'Blocks/ComparePackages/CombinedPlansCarousel',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', paddingTop: 24, paddingBottom: 24 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CombinedPlansCarousel>

export const Default: Story = { args: { plans, sections } }
