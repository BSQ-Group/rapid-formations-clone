import type { Meta, StoryObj } from '@storybook/react'
import { BankingPartnersBlock } from './Component'
import type { BankingPartnersBlock as BankingPartnersBlockProps, Media } from '@/payload-types'

type Bank = NonNullable<BankingPartnersBlockProps['banks']>[number]

const mediaStub = (id: string, url: string, alt: string, width: number, height: number): Media => ({
  id,
  url,
  alt,
  width,
  height,
  filename: `${id}.png`,
  mimeType: 'image/png',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
})

type BankDescription = Bank['description']

const textNode = (text: string) => ({
  type: 'text',
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const paragraphNode = (text: string) => ({
  type: 'paragraph',
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  textFormat: 0,
  children: [textNode(text)],
})

const listNode = (items: string[]) => ({
  type: 'list',
  listType: 'bullet',
  tag: 'ul',
  start: 1,
  format: '',
  indent: 0,
  version: 1,
  direction: 'ltr',
  children: items.map((item, i) => ({
    type: 'listitem',
    value: i + 1,
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [textNode(item)],
  })),
})

const richText = (...children: object[]): BankDescription =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children,
    },
  }) as unknown as BankDescription

const paragraphs = (...texts: string[]): BankDescription => richText(...texts.map(paragraphNode))

const squarePattern = mediaStub(
  'bank-card-pattern',
  'https://placehold.co/240x240/f0f0f0/cccccc?text=pattern',
  'Tile background pattern.',
  240,
  240,
)

const portraitPattern = mediaStub(
  'bank-card-pattern-portrait',
  'https://placehold.co/160x420/f0f0f0/cccccc?text=pattern',
  'Tile background pattern, portrait crop.',
  160,
  420,
)

const portraitLogo = mediaStub(
  'logo-portrait',
  'https://placehold.co/80x220/ffffff/1c1d24?text=Tall',
  'Portrait partner logo.',
  80,
  220,
)

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '1400px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const BANKS: Bank[] = [
  {
    id: 'barclays',
    name: 'Barclays',
    brandColour: '#4DAFEA',
    logo: mediaStub(
      'logo-barclays',
      'https://placehold.co/116x116/ffffff/1c1d24?text=Barclays',
      'Barclays banking logo.',
      116,
      116,
    ),
    infoTitle: 'Barclays business bank account',
    description: paragraphs(
      'No monthly account fees for the first 12 months from this high street bank. Manage your business account online using the Barclays App.',
      'Barclays’ average account opening time is 7 working days. You will receive your business debit card within 5 days of opening your account.',
    ),
  },
  {
    id: 'natwest',
    name: 'NatWest',
    brandColour: '#401664',
    logo: mediaStub(
      'logo-natwest',
      'https://placehold.co/116x116/ffffff/1c1d24?text=NatWest',
      'NatWest banking logo.',
      116,
      116,
    ),
    infoTitle: 'NatWest start-up business account',
    description: paragraphs(
      'The NatWest application process can take as little as 10 minutes—zero transaction fees for your first 18 months.',
      "NatWest will email you within 24 hours of your company's formation with instructions on opening your account.",
    ),
  },
  {
    id: 'starling',
    name: 'Starling',
    brandColour: '#321E37',
    logo: mediaStub(
      'logo-starling',
      'https://placehold.co/116x116/ffffff/1c1d24?text=Starling',
      'Starling banking logo.',
      116,
      116,
    ),
    infoTitle: 'Starling business account',
    description: paragraphs(
      'Bank on the move with Starling, the multi-award-winning digital bank, with no monthly account fees and easy integrations with Xero and QuickBooks. Enjoy fast, secure UK and international transfers, 24/7 UK-based support, and FSCS protection up to £120,000.',
      'Once your company has been formed, download the Starling app to apply.',
    ),
  },
  {
    id: 'monzo',
    name: 'Monzo',
    brandColour: '#FF4D56',
    logo: mediaStub(
      'logo-monzo',
      'https://placehold.co/116x116/ffffff/1c1d24?text=Monzo',
      'Monzo banking logo.',
      116,
      116,
    ),
    infoTitle: 'Monzo business bank account',
    description: paragraphs(
      'Get free, instant UK bank transfers, FSCS protection, instant spending notifications, Pots for separating your money, and much more.',
      'Monzo will email you within 24 hours of your company being formed. This will enable you to start the online account opening process.',
    ),
  },
  {
    id: 'zempler',
    name: 'Zempler',
    brandColour: '#80D9FF',
    logo: mediaStub(
      'logo-zempler',
      'https://placehold.co/116x116/ffffff/1c1d24?text=Zempler',
      'Zempler banking logo.',
      116,
      116,
    ),
    infoTitle: 'Zempler business current account',
    description: paragraphs(
      'This online bank account comes with a business Mastercard, business expense cards and App.',
      'With no credit checks, complete a simple online application form once your company has been formed, and your UK bank account and sort code will be sent to you within 5 minutes.',
    ),
  },
  {
    id: 'anna',
    name: 'Anna',
    brandColour: '#4E4E4E',
    logo: mediaStub(
      'logo-anna',
      'https://placehold.co/116x116/ffffff/1c1d24?text=Anna',
      'Anna banking logo.',
      116,
      116,
    ),
    infoTitle: 'ANNA business bank account',
    description: paragraphs(
      'An online banking solution which allows you to provide your co-workers with their own debit cards and spending limits.',
      'Once your company has been formed, you can start your online application and have your account open in as little as 3 minutes. Your business debit card will arrive within 5 working days.',
    ),
  },
  {
    id: 'wise',
    name: 'Wise',
    brandColour: '#9FE870',
    logo: mediaStub(
      'logo-wise',
      'https://placehold.co/116x116/ffffff/1c1d24?text=Wise',
      'Wise banking logo.',
      116,
      116,
    ),
    infoTitle: 'Wise Business account – for non-UK residents',
    description: paragraphs(
      'Wise Business is designed for companies that operate across borders. With no monthly fee, you can hold and convert 40+ currencies, receive local account details in GBP, EUR, USD, AUD, CAD, and more, and send low-cost international payments to 80+ countries.',
      "Once your company is formed, you'll receive an email with everything you need to get started – including a link to apply for a Wise Business account. If your application is approved, you'll be set up with a UK sort code and account number shortly after.",
    ),
  },
  {
    id: 'lloyds',
    name: 'Lloyds',
    brandColour: '#11B67A',
    logo: mediaStub(
      'logo-lloyds',
      'https://placehold.co/116x116/ffffff/1c1d24?text=Lloyds',
      'Lloyds logo',
      116,
      116,
    ),
    infoTitle: 'Lloyds business account',
    description: paragraphs(
      'Access a variety of valuable benefits, such as free accounting software with no hidden fees, no monthly account fee for the first 12 months, and 24/7 mobile banking so you can manage your finances whenever and wherever it suits you.',
      'After setting up your company, you’ll receive an invitation to apply for a Lloyds Business Account through their user-friendly mobile app. Most applications are completed in minutes, and you could receive an instant decision on a credit limit of up to £5,000 (subject to status).',
    ),
  },
]

const LONG_NAME_BANK: Bank = {
  id: 'longest',
  name: 'The Co-operative Bank for Business Banking',
  brandColour: '#4DAFEA',
  logo: portraitLogo,
  infoTitle:
    'The Co-operative Bank for Business Banking — the everyday business current account for newly incorporated United Kingdom limited companies',
  description: richText(
    paragraphNode(
      'Thirty months of free everyday business banking for newly incorporated limited companies, with no monthly account fee, no charge on electronic payments in or out, and no minimum monthly deposit required to keep the account open once the introductory period has ended.',
    ),
    paragraphNode(
      'Applications are handled entirely online and the great majority are decided within two working days of your certificate of incorporation being issued by Companies House.',
    ),
    listNode([
      'Free everyday banking for the first thirty months, then a flat monthly fee.',
      'Integrations with Xero, QuickBooks, FreeAgent and Sage Business Cloud Accounting.',
      'Twenty-four hour telephone support from a United Kingdom based service team.',
    ]),
  ),
}

const SHORT_INFO_BANK: Bank = {
  id: 'short-info',
  name: 'Tide',
  brandColour: '#4050E0',
  logo: portraitLogo,
  infoTitle: 'Tide business account',
  description: paragraphs('Free to open. No monthly fee.'),
}

const TOKEN_BANK: Bank = {
  id: 'token',
  name: 'business.banking.partnerships@rapidformations-worldwide-group.co.uk',
  brandColour: '#401664',
  logo: BANKS[1].logo,
  infoTitle: 'business.banking.partnerships@rapidformations-worldwide-group.co.uk',
  description: paragraphs(
    'Write to business.banking.partnerships@rapidformations-worldwide-group.co.uk with any questions about this partner.',
    'Full terms are published at https://www.rapidformations.co.uk/additional-services/business-banking/compare-free-business-bank-accounts?utm_source=storybook&utm_campaign=overflow',
  ),
}

const NO_INFO_BANK: Bank = {
  id: 'no-info',
  name: 'Metro Bank',
  brandColour: '#11B67A',
  logo: BANKS[0].logo,
}

const TITLE_ONLY_BANK: Bank = {
  id: 'title-only',
  name: 'Revolut',
  brandColour: '#4E4E4E',
  logo: BANKS[1].logo,
  infoTitle: 'Revolut business account',
}

const NO_LOGO_BANK = {
  id: 'no-logo',
  name: 'Handelsbanken',
  brandColour: '#321E37',
  logo: null,
} as unknown as Bank

const LONG_COLOUR_BANK: Bank = {
  id: 'long-colour',
  name: 'Cumberland Building Society',
  brandColour: 'light-dark(rgb(77,175,234),rgb(64,22,100))',
  logo: BANKS[0].logo,
}

const BANKS_WITHOUT_INFO: Bank[] = [
  NO_INFO_BANK,
  {
    id: 'no-info-natwest',
    name: 'NatWest',
    brandColour: '#401664',
    logo: portraitLogo,
  },
  {
    id: 'no-info-starling',
    name: 'Starling',
    brandColour: '#321E37',
    logo: portraitLogo,
  },
  {
    id: 'no-info-monzo',
    name: 'Monzo',
    brandColour: '#FF4D56',
    logo: portraitLogo,
  },
]

const BANKING_URL =
  'https://www.rapidformations.co.uk/additional-services/business-banking/compare-free-business-bank-accounts?utm_source=storybook&utm_campaign=overflow'

const LONG_HEADING =
  'Our business banking partners, hand-picked to give every new limited company a free UK business bank account from the day it is incorporated'

const LONG_SUBHEADING =
  'We’ve partnered with leading financial providers across the United Kingdom to offer your newly incorporated company a free business bank account, with no monthly fees for the first twelve months and no minimum deposit required to open one.'

const LONG_CTA_LABEL = 'Compare every free business bank account we offer'

const defaultArgs: BankingPartnersBlockProps = {
  blockType: 'bankingPartners',
  heading: 'Our business banking partners',
  subheading:
    'We’ve partnered with leading financial providers to offer your new company a free business bank account.',
  backgroundPattern: squarePattern,
  banks: BANKS,
  cta: {
    type: 'custom',
    label: 'Learn More',
    url: '/business-banking/',
    newTab: null,
    reference: null,
  },
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof BankingPartnersBlock> = {
  component: BankingPartnersBlock,
  title: 'Blocks/BankingPartners',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="theme-rapidformations bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BankingPartnersBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'Our banking partners',
    subheading: 'Free business banking.',
    banks: [SHORT_INFO_BANK, ...BANKS.slice(1)],
    cta: { ...defaultArgs.cta, label: 'Learn' } as BankingPartnersBlockProps['cta'],
  },
}

export const LongCopy: Story = {
  args: {
    ...defaultArgs,
    heading: LONG_HEADING,
    subheading: LONG_SUBHEADING,
    banks: [LONG_NAME_BANK, ...BANKS.slice(1)],
    cta: { ...defaultArgs.cta, label: LONG_CTA_LABEL } as BankingPartnersBlockProps['cta'],
  },
}

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading: LONG_HEADING,
    subheading: LONG_SUBHEADING,
    banks: [LONG_NAME_BANK, ...BANKS.slice(1)],
    cta: { ...defaultArgs.cta, label: LONG_CTA_LABEL } as BankingPartnersBlockProps['cta'],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: `Compare accounts at ${BANKING_URL}`,
    subheading: `Questions go to business.banking.partnerships@rapidformations-worldwide-group.co.uk or read ${BANKING_URL}`,
    banks: [TOKEN_BANK, ...BANKS.slice(1)],
    cta: { ...defaultArgs.cta, label: BANKING_URL } as BankingPartnersBlockProps['cta'],
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading: `Compare accounts at ${BANKING_URL}`,
    subheading: `Questions go to business.banking.partnerships@rapidformations-worldwide-group.co.uk or read ${BANKING_URL}`,
    banks: [TOKEN_BANK, ...BANKS.slice(1)],
    cta: { ...defaultArgs.cta, label: BANKING_URL } as BankingPartnersBlockProps['cta'],
  },
}

export const SingleBank: Story = {
  args: {
    ...defaultArgs,
    banks: [BANKS[0]],
  },
}

export const NineBanks: Story = {
  args: {
    ...defaultArgs,
    banks: [
      ...BANKS,
      {
        id: 'tide',
        name: 'Tide',
        brandColour: '#4050E0',
        logo: mediaStub(
          'logo-tide',
          'https://placehold.co/116x116/ffffff/1c1d24?text=Tide',
          'Tide banking logo.',
          116,
          116,
        ),
      },
    ],
  },
}

export const PortraitMedia: Story = {
  args: {
    ...defaultArgs,
    backgroundPattern: portraitPattern,
    banks: [LONG_NAME_BANK, ...BANKS.slice(1)],
  },
}

export const MissingLogo: Story = {
  args: {
    ...defaultArgs,
    banks: [NO_LOGO_BANK, ...BANKS.slice(1)],
  },
}

export const LongBrandColourValue: Story = {
  args: {
    ...defaultArgs,
    banks: [LONG_COLOUR_BANK, ...BANKS.slice(1)],
  },
}

export const NoSubheadingNoCta: Story = {
  args: {
    ...defaultArgs,
    subheading: null,
    cta: null as unknown as BankingPartnersBlockProps['cta'],
  },
}

export const NoBackgroundPattern: Story = {
  args: {
    ...defaultArgs,
    backgroundPattern: null,
  },
}

export const NoTileInfo: Story = {
  args: {
    ...defaultArgs,
    banks: BANKS_WITHOUT_INFO,
  },
}

export const MixedTileInfo: Story = {
  args: {
    ...defaultArgs,
    banks: [NO_INFO_BANK, TITLE_ONLY_BANK, SHORT_INFO_BANK, ...BANKS.slice(3)],
  },
}

export const RichTileInfo: Story = {
  args: {
    ...defaultArgs,
    banks: [LONG_NAME_BANK, ...BANKS.slice(1)],
  },
}

export const RichTileInfoNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    banks: [LONG_NAME_BANK, ...BANKS.slice(1)],
  },
}
