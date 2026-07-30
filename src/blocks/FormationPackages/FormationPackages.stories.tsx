import type { Meta, StoryObj } from '@storybook/react'
import { FormationPackagesBlock } from './Component'
import type { FormationPackagesBlock as FormationPackagesBlockProps } from '@/payload-types'

const basicPackage: FormationPackagesBlockProps['packages'][number] = {
  id: '1',
  name: 'Basic',
  description: 'Ideal for quick, affordable company setup with digital documents only',
  price: '£1.99',
  priceSuffix: '+ £100 Companies House fee',
  isHighlighted: false,
  badgeText: null,
  orderLink: {
    type: 'custom',
    url: '#',
    label: 'Order',
    newTab: false,
  },
  prefixText: null,
  benefits: [
    { id: 'b1', benefit: 'Limited Company Formation' },
    { id: 'b2', benefit: 'Free Business Bank Account' },
    { id: 'b3', benefit: 'Digital & Printed Company Documents' },
    { id: 'b4', benefit: 'First Confirmation Statement Filing' },
    { id: 'b5', benefit: 'Registered Office & Service Address' },
    { id: 'b6', benefit: 'Business Address' },
    { id: 'b7', benefit: 'VAT & PAYE Registration' },
  ],
  findOutMoreLink: {
    type: 'custom',
    url: '#',
    label: 'Find out more',
    newTab: false,
  },
}

const privacyPackage: FormationPackagesBlockProps['packages'][number] = {
  id: '2',
  name: 'Privacy',
  description:
    'Perfect for building a credible brand, protecting personal privacy, and Covent Garden address services.',
  price: '£3.99',
  priceSuffix: '+ £100 Companies House fee',
  isHighlighted: false,
  badgeText: null,
  orderLink: {
    type: 'custom',
    url: '#',
    label: 'Order',
    newTab: false,
  },
  prefixText: 'Everything in Basic, plus:',
  benefits: [
    { id: 'p1', benefit: 'First Confirmation Statement Filing' },
    { id: 'p2', benefit: 'Registered Office & Service Address' },
    { id: 'p3', benefit: 'Business Address' },
  ],
  findOutMoreLink: {
    type: 'custom',
    url: '#',
    label: 'Find out more',
    newTab: false,
  },
}

const fullyInclusivePackage: FormationPackagesBlockProps['packages'][number] = {
  id: '3',
  name: 'Fully Inclusive',
  description:
    'The complete package for entrepreneurs who want everything taken care of from day one.',
  price: '£9.99',
  priceSuffix: '+ £100 Companies House Fee',
  isHighlighted: true,
  badgeText: 'Best value',
  orderLink: {
    type: 'custom',
    url: '#',
    label: 'Order',
    newTab: false,
  },
  prefixText: 'Everything in Privacy, plus:',
  benefits: [
    { id: 'f1', benefit: 'VAT & PAYE Registration' },
    { id: 'f2', benefit: 'Full Company Secretary Service' },
    { id: 'f3', benefit: 'Business Document Template Library' },
  ],
  findOutMoreLink: {
    type: 'custom',
    url: '#',
    label: 'Find out more',
    newTab: false,
  },
}

const defaultArgs: FormationPackagesBlockProps = {
  id: 'story-1',
  blockType: 'formationPackages',
  blockName: 'Formation Packages',
  title: 'Our company formation packages',
  subtitle:
    'Choose a company registration package that suits your needs and start your new business today.\nWe have a range of packages to suit most budgets and business structures.',
  packages: [basicPackage, privacyPackage, fullyInclusivePackage],
  footerTitle: 'Need help choosing a package?',
  footerDescription: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Give our friendly team a call at ',
              version: 1,
            },
            {
              type: 'text',
              text: '020 3908 0044',
              format: 1, // bold
              version: 1,
            },
            {
              type: 'text',
              text: ". We're here to help you choose the right package and answer any questions you may have.",
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  } as any,
  footerLink: {
    type: 'custom',
    url: '#',
    label: 'Compare packages',
    newTab: false,
  },
  sectionLayout: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof FormationPackagesBlock> = {
  component: FormationPackagesBlock,
  title: 'Blocks/FormationPackages',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="py-16" style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormationPackagesBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const TwoPackages: Story = {
  args: {
    ...defaultArgs,
    packages: [basicPackage, fullyInclusivePackage],
  },
}

export const SinglePackage: Story = {
  args: {
    ...defaultArgs,
    packages: [basicPackage],
  },
}

export const AllHighlighted: Story = {
  args: {
    ...defaultArgs,
    packages: [
      { ...basicPackage, isHighlighted: true, badgeText: 'Popular' },
      { ...privacyPackage, isHighlighted: true, badgeText: 'Recommended' },
      { ...fullyInclusivePackage },
    ],
  },
}

export const WithoutFooter: Story = {
  args: {
    ...defaultArgs,
    footerTitle: '',
    footerDescription: undefined,
    footerLink: undefined,
  } as any,
}

export const FooterCtaOnly: Story = {
  args: {
    ...defaultArgs,
    footerTitle: '',
    footerDescription: undefined,
  } as any,
}
