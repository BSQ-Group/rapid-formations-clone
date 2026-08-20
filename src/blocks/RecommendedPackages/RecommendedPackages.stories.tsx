import type { Meta, StoryObj } from '@storybook/react'

import { RecommendedPackagesView } from './RecommendedPackagesView'
import type { RecommendedPackage } from './RecommendedPackagesView'

const textNode = (text: string, format = 0) => ({
  type: 'text',
  text,
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  version: 1,
})

const paragraph = (children: unknown[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const listItem = (children: unknown[], value = 1) => ({
  type: 'listitem',
  children,
  value,
  checked: undefined,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const bulletList = (items: string[]) => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  children: items.map((line, i) => listItem([textNode(line)], i + 1)),
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
})

const richText = (children: unknown[]) =>
  ({
    root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 },
  }) as RecommendedPackage['content']

const body = (lead: string, bullets: string[]) =>
  richText([paragraph([textNode(lead, 1)]), bulletList(bullets)])

const card = (over: Partial<RecommendedPackage> = {}): RecommendedPackage =>
  ({
    name: 'Basic',
    priceNote: '+ £100 Companies House Fee',
    recommendedLabel: 'Recommended for:',
    content: body('Basic Formation', ['Ideal for getting started with no extras']),
    cta: { type: 'custom', url: '/package/basic-package', label: 'View Package', newTab: false },
    ...over,
  }) as RecommendedPackage

const entry = (c: RecommendedPackage, price: string) => ({
  card: c,
  href: '/package/basic-package',
  price,
})

const meta: Meta<typeof RecommendedPackagesView> = {
  title: 'Blocks/RecommendedPackages',
  component: RecommendedPackagesView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)] py-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RecommendedPackagesView>

const privacy = card({
  name: 'Privacy',
  content: body('Protecting your privacy', [
    'Keep your home private - register with our Covent Garden address',
  ]),
})

const allInclusive = card({
  name: 'All Inclusive',
  ribbonText: 'Best value',
  content: body('Growth focused founders', [
    'Designed for smart, scalable growth',
    'Combines address privacy with a strong business image',
    'Includes VAT and PAYE registration',
    'Always-on compliance support and instant access to business documents',
  ]),
})

export const ThreePackages: Story = {
  args: {
    heading: 'Our limited company packages',
    subheading: 'Explore more package options to suit your business needs.',
    cards: [entry(card(), '2.99'), entry(privacy, '14.99'), entry(allInclusive, '39.99')],
  },
}

export const TwoPackagesPushedToTheEdges: Story = {
  args: {
    heading: 'Our limited company packages',
    subheading: 'Explore more package options to suit your business needs.',
    cards: [entry(card(), '2.99'), entry(allInclusive, '39.99')],
  },
}

export const SinglePackageNoPriceNoSubheading: Story = {
  args: {
    heading: 'One option',
    cards: [
      {
        card: card({ priceNote: null, recommendedLabel: null }),
        href: '/package/basic-package',
      },
    ],
  },
}

export const LongCopyAndUnbrokenTokens: Story = {
  args: {
    heading:
      'Our limited company formation packages, compared side by side so you can pick the right one',
    subheading:
      'Explore more package options to suit your business needs, whatever stage your company is at.',
    cards: [
      entry(
        card({
          name: 'Non-Residents Plus Formation Package',
          ribbonText: 'Recommended for overseas founders',
          priceNote:
            '+ £100 Companies House Fee, charged separately at checkout by Companies House',
          recommendedLabel: 'Recommended for founders based outside the United Kingdom:',
          content: body('Founders incorporating a UK company from overseas without a UK address', [
            'Rechtsschutzversicherungsgesellschaften',
            'Write to companyformations@rapidformations.co.uk for help with the application',
            'https://www.rapidformations.co.uk/additional-services/london-registered-office',
          ]),
          cta: {
            type: 'custom',
            url: '/package/non-residents-plus-package',
            label: 'View this package and everything it includes',
            newTab: false,
          },
        }) as RecommendedPackage,
        '149.99',
      ),
      entry(card({ name: 'Basic', content: body('Basic', ['Getting started']) }), '2.99'),
      entry(allInclusive, '39.99'),
    ],
  },
}
