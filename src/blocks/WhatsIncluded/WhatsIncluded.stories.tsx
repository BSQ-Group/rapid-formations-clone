import type { Meta, StoryObj } from '@storybook/react'
import { WhatsIncludedBlock } from './Component'
import type { WhatsIncludedBlock as WhatsIncludedBlockProps } from '@/payload-types'

const buildParagraph = (text: string) => ({
  type: 'paragraph',
  children: [{ type: 'text', text, version: 1 }],
  version: 1,
})

const buildRichText = (paragraphs: string[]) => ({
  root: {
    type: 'root',
    children: paragraphs.map(buildParagraph),
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const defaultArgs: WhatsIncludedBlockProps = {
  blockType: 'whatsIncluded',
  layout: 'side-by-side',
  heading: "What's included",
  contentSections: [
    {
      id: 's1',
      title: 'Protect a company name',
      content: buildRichText([
        'Currently reduced to £1.99, this package offers exceptional value for money. It is perfect if you want to set up a ltd company, but you are not quite sure when you want to begin trading, or you simply wish to protect or reserve a company name to use at a later date.',
        'This package provides a ready-to-trade company limited by shares, a certificate of incorporation, share certificates, the memorandum and articles of association and set of company registers with first entries.',
        'This package also includes filing the first confirmation statement; however, it does not include the Companies House filing fee of £100.00.',
      ]) as any,
    },
    {
      id: 's2',
      title: 'If you are not ready to start trading',
      content: buildRichText([
        'Many clients purchase the Basic Package simply to reserve a company name for a future project. If this applies to your company, please remember to inform HMRC your company is dormant, and they will not expect you to file a Company Tax Return or pay corporation tax.',
      ]) as any,
    },
  ],
  packageCard: {
    name: 'Basic',
    price: '£1.99',
    priceSuffix: '+ £100 Companies House fee',
    orderLink: {
      type: 'custom',
      url: '#',
      label: 'Order',
      newTab: false,
    },
    benefitsLabel: 'Package Features',
    benefits: [
      { id: 'b1', benefit: 'Limited Company Formation Online' },
      { id: 'b2', benefit: 'Free Business Bank Account (Optional)' },
      { id: 'b3', benefit: 'Free Online Portal to Manage your Company' },
      { id: 'b4', benefit: 'Free .com or .co.uk Domain Name' },
      { id: 'b5', benefit: 'Certificate of Incorporation' },
      { id: 'b6', benefit: 'Memorandum & Articles of Association' },
      { id: 'b7', benefit: 'Share Certificate(s)' },
      { id: 'b8', benefit: 'Company Registers with First Entries' },
      { id: 'b9', benefit: 'Filing of the First Confirmation Statement' },
      { id: 'b10', benefit: 'Business Telephone Number' },
    ],
  },
  sectionLayout: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof WhatsIncludedBlock> = {
  component: WhatsIncludedBlock,
  title: 'Blocks/WhatsIncluded',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof WhatsIncludedBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const SingleSection: Story = {
  args: {
    ...defaultArgs,
    contentSections: [defaultArgs.contentSections[0]],
  },
}

export const WithoutPriceSuffix: Story = {
  args: {
    ...defaultArgs,
    packageCard: {
      ...defaultArgs.packageCard,
      priceSuffix: null,
    },
  },
}

const stackedArgs: WhatsIncludedBlockProps = {
  blockType: 'whatsIncluded',
  layout: 'stacked',
  heading: "What's included",
  contentSections: [
    {
      id: 's1',
      title: 'Provides privacy, HMRC registrations, and our premium Hassle-Free Compliance Service',
      content: buildRichText([
        'Our signature package includes the formation of a limited company and everything you will need to give your company the best possible chance of success.',
        'We have included our Hassle-Free Compliance Service, Business Document Template Library, HMRC registrations, statutory addresses to protect the privacy of your home, a Central London business address to give your new company a professional and established image, a GDPR Compliance Package, and more.',
      ]) as any,
    },
  ],
  packageCard: {
    name: 'Fully Inclusive Package',
    price: '£9.99',
    priceSuffix: '+ £100 Companies House fee',
    orderLink: {
      type: 'custom',
      url: '#',
      label: 'Order',
      newTab: false,
    },
    benefitsLabel: 'Package Features',
    benefits: [
      { id: 'b1', benefit: 'Limited Company Formation Online' },
      { id: 'b2', benefit: 'Free Business Bank Account (Optional)' },
      { id: 'b3', benefit: 'Free Online Portal to Manage your Company' },
      { id: 'b4', benefit: 'Free .com or .co.uk Domain Name' },
      { id: 'b5', benefit: 'Certificate of Incorporation' },
      { id: 'b6', benefit: 'Memorandum & Articles of Association' },
      { id: 'b7', benefit: 'Share Certificate(s)' },
      { id: 'b8', benefit: 'Company Registers with First Entries' },
      { id: 'b9', benefit: 'GDPR Compliance Package' },
      { id: 'b10', benefit: 'Filing of the First Confirmation Statement' },
      { id: 'b11', benefit: 'VAT and PAYE Registration' },
      { id: 'b12', benefit: 'Registered Office Address, London WC2' },
      { id: 'b13', benefit: '1 x Service Address, London WC2' },
      { id: 'b14', benefit: 'Business Address Service, London WC2' },
      { id: 'b15', benefit: 'Hassle-Free Compliance Service for 12 months' },
      { id: 'b16', benefit: 'Business Document Template Library access' },
      { id: 'b17', benefit: 'Business Telephone Number' },
    ],
  },
  sectionLayout: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
}

export const Stacked: Story = {
  args: stackedArgs,
}
