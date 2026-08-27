import type { Meta, StoryObj } from '@storybook/react'
import type { BusinessBankingTableBlock as BusinessBankingTableBlockProps, Media } from '@/payload-types'
import { BusinessBankingTableBlock } from './Component'

const logo = (seed: string, width: number, height: number): Media => ({
  id: seed,
  url: `https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?w=${width}&h=${height}&fit=crop`,
  alt: `${seed} logo`,
  width,
  height,
  filename: `${seed}.png`,
  mimeType: 'image/png',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
})

const squareLogo = logo('square-bank', 199, 199)
const wideLogo = logo('wide-bank', 500, 320)
const portraitLogo = logo('portrait-bank', 200, 400)

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: { name: 'Mobile 390', styles: { width: '390px', height: '1200px' }, type: 'mobile' },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const EMAIL_TOKEN = 'business.banking.partnerships@rapid-formations-limited.co.uk'
const URL_TOKEN = 'https://www.rapidformations.co.uk/business-banking/compare-partner-accounts?utm_source=storybook'
const GERMAN_TOKEN = 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'

const paragraphs = (texts: string[]) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: texts.map((text) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        textFormat: 0,
        textStyle: '',
        children: [{ type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 }],
      })),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

const INTRO = paragraphs([
  'Below is a side-by-side comparison of our UK business banking partners, covering both established high-street banks and modern digital accounts.',
  'The table outlines free banking periods, overdraft availability, accounting software integrations (Xero, QuickBooks, FreeAgent, Sage), and key features such as invoicing, expense management, multi-currency support, branch access, and relationship management.',
])

const FOOTNOTES = paragraphs([
  'Availability, eligibility, and pricing may change, so please check each provider’s terms before applying.',
  '1. Starling Business Bank accounts are available exclusively to companies operating in select industries.',
])

const headings = {
  bank: 'Bank Name',
  type: 'Type',
  freeBankingPeriod: 'Free Banking Period',
  overdraft: 'Overdraft',
  accountingIntegration: 'Accounting Integration',
  keyFeatures: 'Key Features',
}

const defaultArgs: BusinessBankingTableBlockProps = {
  blockType: 'businessBankingTable',
  heading: 'Compare business banking partners for UK residents',
  intro: INTRO,
  columnHeadings: headings,
  rows: [
    {
      id: 'r1',
      bankName: 'Barclays',
      footnoteMarker: null,
      logo: wideLogo,
      type: 'Traditional Bank',
      overdraft: true,
      freeBankingPeriod: '12 months free\n(terms apply)',
      accountingIntegration: 'Yes - Xero, FreeAgent, Sage',
      keyFeatures: 'Face-to-face banking, business loans,\noverdrafts, digital dashboard',
    },
    {
      id: 'r2',
      bankName: 'Zempler',
      footnoteMarker: null,
      logo: squareLogo,
      type: 'Digital Account',
      overdraft: false,
      freeBankingPeriod: '12 months free\n(Go account)',
      accountingIntegration: 'Yes - Xero, QuickBooks',
      keyFeatures: 'Fast online setup, no credit checks,\ninvoicing tools',
    },
    {
      id: 'r3',
      bankName: 'Starling',
      footnoteMarker: '1',
      logo: squareLogo,
      type: 'Digital Account',
      overdraft: true,
      freeBankingPeriod: 'Free everyday banking',
      accountingIntegration: 'Yes - Xero, FreeAgent, QuickBooks',
      keyFeatures: 'Mobile-first, spaces, multi-currency',
    },
  ],
  footnotes: FOOTNOTES,
  sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'xs' },
}

const meta: Meta<typeof BusinessBankingTableBlock> = {
  title: 'Blocks/BusinessBankingTable',
  component: BusinessBankingTableBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BusinessBankingTableBlock>

export const Default: Story = { args: defaultArgs }

export const DefaultNarrow: Story = { ...narrowViewport, args: defaultArgs }

export const LongCopy: Story = {
  args: {
    ...defaultArgs,
    heading:
      'Compare business banking partners for UK residents, including high-street banks and digital-only accounts',
    columnHeadings: {
      bank: 'Business banking partner name',
      type: 'Type of account offered',
      freeBankingPeriod: 'Introductory free banking period',
      overdraft: 'Arranged overdraft available',
      accountingIntegration:
        'Accounting software integrations supported by this business banking partner',
      keyFeatures:
        'Key features of the business current account offered to newly incorporated companies',
    },
    rows: [
      {
        id: 'r1',
        bankName: 'The Royal Bank of Scotland Commercial Banking Division',
        footnoteMarker: '12',
        logo: wideLogo,
        type: 'Traditional high-street relationship bank',
        overdraft: true,
        freeBankingPeriod:
          'Twenty-four months of completely free everyday business banking for newly incorporated companies',
        accountingIntegration:
          'Yes - Xero, QuickBooks, FreeAgent, Sage, Zoho Books, KashFlow and several other providers',
        keyFeatures:
          'Face-to-face relationship management, secured and unsecured business lending, arranged overdrafts, invoice finance and a digital dashboard',
      },
    ],
  },
}

export const LongCopyNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading:
      'Compare business banking partners for UK residents, including high-street banks and digital-only accounts',
    rows: [
      {
        id: 'r1',
        bankName: 'The Royal Bank of Scotland Commercial Banking Division',
        footnoteMarker: '12',
        logo: wideLogo,
        type: 'Traditional high-street relationship bank',
        overdraft: true,
        freeBankingPeriod:
          'Twenty-four months of completely free everyday business banking for newly incorporated companies',
        accountingIntegration: 'Yes - Xero, QuickBooks, FreeAgent, Sage, Zoho Books and KashFlow',
        keyFeatures:
          'Face-to-face relationship management, secured and unsecured business lending, arranged overdrafts and invoice finance',
      },
    ],
  },
}

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'Compare banks',
    columnHeadings: {
      bank: 'Bank',
      type: 'Type',
      freeBankingPeriod: 'Free',
      overdraft: 'OD',
      accountingIntegration: 'Sync',
      keyFeatures: 'Perks',
    },
    rows: [
      {
        id: 'r1',
        bankName: 'Monzo',
        footnoteMarker: null,
        logo: squareLogo,
        type: 'Digital',
        overdraft: false,
        freeBankingPeriod: 'Free',
        accountingIntegration: 'Yes',
        keyFeatures: 'App only',
      },
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: GERMAN_TOKEN,
    columnHeadings: { ...headings, keyFeatures: URL_TOKEN },
    rows: [
      {
        id: 'r1',
        bankName: GERMAN_TOKEN,
        footnoteMarker: '1',
        logo: squareLogo,
        type: GERMAN_TOKEN,
        overdraft: true,
        freeBankingPeriod: EMAIL_TOKEN,
        accountingIntegration: URL_TOKEN,
        keyFeatures: GERMAN_TOKEN,
      },
    ],
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading: GERMAN_TOKEN,
    rows: [
      {
        id: 'r1',
        bankName: GERMAN_TOKEN,
        footnoteMarker: '1',
        logo: squareLogo,
        type: GERMAN_TOKEN,
        overdraft: false,
        freeBankingPeriod: EMAIL_TOKEN,
        accountingIntegration: URL_TOKEN,
        keyFeatures: GERMAN_TOKEN,
      },
    ],
  },
}

export const OptionalsAbsent: Story = {
  args: {
    ...defaultArgs,
    intro: null,
    footnotes: null,
    rows: [
      {
        id: 'r1',
        bankName: 'Barclays',
        footnoteMarker: null,
        logo: wideLogo,
        type: 'Traditional Bank',
        overdraft: true,
        freeBankingPeriod: null,
        accountingIntegration: null,
        keyFeatures: null,
      },
    ],
  },
}

export const SingleRow: Story = {
  args: {
    ...defaultArgs,
    rows: [
      {
        id: 'r1',
        bankName: 'Barclays',
        footnoteMarker: null,
        logo: wideLogo,
        type: 'Traditional Bank',
        overdraft: true,
        freeBankingPeriod: '12 months free\n(terms apply)',
        accountingIntegration: 'Yes - Xero, FreeAgent, Sage',
        keyFeatures: 'Face-to-face banking, business loans',
      },
    ],
  },
}

export const AllSeven: Story = {
  args: {
    ...defaultArgs,
    rows: [
      { id: 'r1', bankName: 'Barclays', footnoteMarker: null, logo: wideLogo, type: 'Traditional Bank', overdraft: true, freeBankingPeriod: '12 months free\n(terms apply)', accountingIntegration: 'Yes - Xero, FreeAgent, Sage', keyFeatures: 'Face-to-face banking, business loans,\noverdrafts, digital dashboard' },
      { id: 'r2', bankName: 'Zempler', footnoteMarker: null, logo: squareLogo, type: 'Digital Account', overdraft: false, freeBankingPeriod: '12 months free\n(Go account)', accountingIntegration: 'Yes - Xero, QuickBooks', keyFeatures: 'Fast online setup, no credit checks' },
      { id: 'r3', bankName: 'ANNA Money', footnoteMarker: null, logo: wideLogo, type: 'Digital Account', overdraft: false, freeBankingPeriod: '3 months free', accountingIntegration: 'Yes - Xero, QuickBooks, Sage', keyFeatures: 'Invoicing, expense tags, tax pots' },
      { id: 'r4', bankName: 'NatWest', footnoteMarker: null, logo: squareLogo, type: 'Traditional Bank', overdraft: true, freeBankingPeriod: '24 months free', accountingIntegration: 'Yes - FreeAgent included', keyFeatures: 'Branch access, relationship manager' },
      { id: 'r5', bankName: 'Monzo Business', footnoteMarker: null, logo: squareLogo, type: 'Digital Account', overdraft: false, freeBankingPeriod: 'Free Lite plan', accountingIntegration: 'Yes - Xero, QuickBooks, FreeAgent', keyFeatures: 'Pots, integrations, instant notifications' },
      { id: 'r6', bankName: 'Lloyds', footnoteMarker: null, logo: wideLogo, type: 'Traditional Bank', overdraft: true, freeBankingPeriod: '12 months free', accountingIntegration: 'Yes - Xero, Sage', keyFeatures: 'Branch network, lending, card readers' },
      { id: 'r7', bankName: 'Starling', footnoteMarker: '1', logo: squareLogo, type: 'Digital Account', overdraft: true, freeBankingPeriod: 'Free everyday banking', accountingIntegration: 'Yes - Xero, FreeAgent, QuickBooks', keyFeatures: 'Mobile-first, spaces, multi-currency' },
    ],
  },
}

export const HeadingTokens: Story = {
  args: {
    ...defaultArgs,
    columnHeadings: {
      bank: GERMAN_TOKEN,
      type: EMAIL_TOKEN,
      freeBankingPeriod: URL_TOKEN,
      overdraft: URL_TOKEN,
      accountingIntegration: GERMAN_TOKEN,
      keyFeatures: EMAIL_TOKEN,
    },
  },
}

export const LogoAbsent: Story = {
  args: {
    ...defaultArgs,
    rows: [
      {
        id: 'r1',
        bankName: 'Barclays',
        footnoteMarker: null,
        logo: 'media-id-not-populated',
        type: 'Traditional Bank',
        overdraft: true,
        freeBankingPeriod: '12 months free',
        accountingIntegration: 'Yes - Xero',
        keyFeatures: 'Branch access',
      },
    ],
  },
}

export const PortraitLogo: Story = {
  args: {
    ...defaultArgs,
    rows: [
      {
        id: 'r1',
        bankName: 'Tall Crest Bank',
        footnoteMarker: null,
        logo: portraitLogo,
        type: 'Traditional Bank',
        overdraft: true,
        freeBankingPeriod: '12 months free',
        accountingIntegration: 'Yes - Xero',
        keyFeatures: 'Branch access',
      },
    ],
  },
}
