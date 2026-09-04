import type { Meta, StoryObj } from '@storybook/react'
import { PackageGridBlock } from './Component'
import type { PackageGridBlock as PackageGridBlockProps } from '@/payload-types'

type Package = NonNullable<PackageGridBlockProps['packages']>[number]
type Highlight = NonNullable<Package['highlights']>[number]

const highlights = (extra: string[] = []): Highlight[] =>
  [
    'LTD Company Formation with ID Verification & Personal Company Manager',
    'Free Business Bank Account',
    'Full Set of Company Documents',
    'Filing of the First Confirmation Statement',
    ...extra,
  ].map((text, i) => ({ id: `h${i}`, text }))

const londonExtras = [
  'London Registered Office',
  'London Service Address',
  'London Business Address',
]

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '900px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const EMAIL_TOKEN = 'company.formations.customer.services@rapidformations-worldwide-group.co.uk'
const URL_TOKEN =
  'https://www.rapidformations.co.uk/formation-packages/all-inclusive-package/checkout?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Grundstücksverkehrsgenehmigungszuständigkeitsübertragungsverordnung'

const LONG_TOOLTIP =
  'Your registered office is the official address of your company as recorded at Companies House, and it is the address every government body will use when they need to write to you about your company. It appears on the public register, it must be a physical address in the same UK jurisdiction in which the company is incorporated, and it cannot be a PO box on its own. Using our Covent Garden address keeps your home address off the public record, and any statutory mail addressed to your company is scanned and emailed to you on the day it arrives at no additional charge for as long as the service remains active.'

const MULTI_PARAGRAPH_TOOLTIP =
  'A business bank account keeps your company money separate from your personal money, which is a legal expectation for a limited company rather than a nice-to-have.\n\nWe introduce you to our banking partners once your company number is issued. You are never obliged to open an account with any of them, and the introduction costs you nothing.\n\nApproval is at the bank’s discretion. Applications from non-UK residents, or from companies with an overseas registered office, may take longer or be declined.'

const basicHighlights: Highlight[] = [
  {
    id: 'th1',
    text: 'LTD Company Formation with ID Verification & Personal Company Manager',
    tooltipTitle: 'Company Formation',
    tooltip:
      'We file your incorporation with Companies House and verify the identity of every officer and person with significant control, as required from 2025.',
  },
  { id: 'th2', text: 'Free Business Bank Account', tooltipTitle: null, tooltip: null },
  {
    id: 'th3',
    text: 'London Registered Office',
    tooltipTitle: 'London Registered Office',
    tooltip: LONG_TOOLTIP,
  },
  {
    id: 'th4',
    text: 'Full Set of Company Documents',
    tooltipTitle: null,
    tooltip: MULTI_PARAGRAPH_TOOLTIP,
  },
  {
    id: 'th5',
    text: 'Filing of the First Confirmation Statement',
    tooltipTitle: 'Confirmation Statement',
    tooltip: 'Due once every twelve months. We file the first one for you.',
  },
]

const defaultArgs: PackageGridBlockProps = {
  id: 'story-1',
  blockType: 'packageGrid',
  blockName: 'Package Grid',
  heading: 'Find the perfect company formation package',
  subheading: 'Select a company registration package that works for you',
  packages: [
    {
      id: 'p1',
      name: 'Basic',
      price: '£ 2.99',
      priceNote: '+ £100 Companies House Fee',
      description: 'Simple company formation to get started with no extras.',
      highlightsTitle: 'Highlights',
      highlights: highlights(),
      buyLink: { type: 'custom', url: '/name-check/?pkg=basic-package', label: 'Buy Now' },
      readMoreLink: { type: 'custom', url: '/package/basic-package/', label: 'Read More' },
      nameLink: { type: 'custom', url: '/package/basic-package/' },
    },
    {
      id: 'p2',
      name: 'Privacy',
      price: '£ 14.99',
      priceNote: '+ £100 Companies House Fee',
      description: 'Protect your home address with our Covent Garden registered office.',
      highlightsTitle: 'Highlights',
      highlights: highlights(londonExtras),
      buyLink: { type: 'custom', url: '/name-check/?pkg=privacy-package', label: 'Buy Now' },
      readMoreLink: { type: 'custom', url: '/package/privacy-package/', label: 'Read More' },
      nameLink: { type: 'custom', url: '/package/privacy-package/' },
    },
    {
      id: 'p3',
      name: 'All Inclusive',
      price: '£ 39.99',
      priceNote: '+ £100 Companies House Fee',
      description: 'Everything you need to launch and grow, including VAT & PAYE registration.',
      highlightsTitle: 'Highlights',
      highlights: highlights([...londonExtras, 'VAT Registration', 'PAYE Registration']),
      badgeText: 'BEST VALUE',
      buyLink: { type: 'custom', url: '/name-check/?pkg=all-inclusive-package', label: 'Buy Now' },
      readMoreLink: { type: 'custom', url: '/package/all-inclusive-package/', label: 'Read More' },
      nameLink: { type: 'custom', url: '/package/all-inclusive-package/' },
    },
  ],
  compareLink: { type: 'custom', url: '/compare-packages/', label: 'Compare Packages' },
  contactNote: 'Have a question? Use our live chat facility.',
  footerNote: 'The Companies House fee is a government charge and is not subject to VAT.',
}

const packages = defaultArgs.packages as Package[]

const meta: Meta<typeof PackageGridBlock> = {
  component: PackageGridBlock,
  title: 'Blocks/PackageGrid',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PackageGridBlock>

export const Default: Story = { args: defaultArgs }

export const NoBadge: Story = {
  args: {
    ...defaultArgs,
    packages: packages.map((p) => ({ ...p, badgeText: null })),
  },
}

export const LongHeadings: Story = {
  args: {
    ...defaultArgs,
    heading:
      'Find the perfect company formation package for the limited company you are about to register',
    subheading:
      'Select a company registration package that works for you, for your co-founders and for the way you plan to trade during your first year',
  },
}

export const ThreeWordHeadings: Story = {
  args: {
    ...defaultArgs,
    heading: 'Choose your package',
    subheading: 'Formations made simple',
  },
}

export const TerseCopyEverywhere: Story = {
  args: {
    ...defaultArgs,
    heading: 'Choose your package',
    subheading: 'Formations made simple',
    packages: packages.map((p) => ({
      ...p,
      description: 'Just the basics.',
      priceNote: '+ £100 fee',
      highlightsTitle: 'Includes',
    })),
    contactNote: 'Chat to us.',
    footerNote: 'No VAT.',
  },
}

export const NarrowTerseCopy: Story = {
  ...narrowViewport,
  args: TerseCopyEverywhere.args,
}

export const NoOptionalFields: Story = {
  args: {
    id: 'story-no-optional',
    blockType: 'packageGrid',
    heading: 'Find the perfect company formation package',
    subheading: null,
    packages: packages.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      description: p.description,
      priceNote: null,
      highlightsTitle: null,
      highlights: p.highlights,
      badgeText: null,
      nameLink: { type: 'custom' },
      buyLink: { type: 'custom', url: null, label: null },
      readMoreLink: { type: 'custom', url: null, label: null },
    })),
    compareLink: { type: 'custom', url: null, label: null },
    contactNote: null,
    footerNote: null,
  },
}

export const SinglePackage: Story = {
  args: { ...defaultArgs, packages: packages.slice(2) },
}

export const TwoPackages: Story = {
  args: { ...defaultArgs, packages: packages.slice(0, 2) },
}

export const FourPackages: Story = {
  args: {
    ...defaultArgs,
    packages: [
      ...packages,
      {
        ...packages[2],
        id: 'p4',
        name: 'Non-Residents',
        price: '£ 149.99',
        badgeText: 'MOST POPULAR',
        description:
          'For company owners living outside the United Kingdom, including a fully certified document set.',
      },
    ],
  },
}

export const LongCopyEverywhere: Story = {
  args: {
    ...defaultArgs,
    heading:
      'Find the perfect company formation package for the limited company you are about to register',
    subheading:
      'Select a company registration package that works for you, for your co-founders and for the way you plan to trade during your first year',
    packages: packages.map((p, i) => ({
      ...p,
      name: ['Basic Formation Package', 'Privacy Formation Package', 'All Inclusive Package'][i],
      price: '£1,234.56',
      priceNote: '+ £100 Companies House incorporation fee, payable at checkout',
      description:
        'Everything you need to launch, grow and stay compliant, including VAT registration, PAYE registration and a full year of statutory mail forwarding from our Covent Garden address.',
      highlightsTitle: 'Everything included in this formation package',
      buyLink: { type: 'custom', url: '/checkout/', label: 'Buy Now and Register Today' },
      readMoreLink: {
        type: 'custom',
        url: '/package/',
        label: 'Read More About What Is Included',
      },
    })),
    compareLink: {
      type: 'custom',
      url: '/compare-packages/',
      label: 'Compare Every Feature Across All Of Our Formation Packages',
    },
    contactNote:
      'Have a question about which package is right for your new company? Use our live chat facility and one of our London-based company formation agents will answer.',
    footerNote:
      'The Companies House fee is a government charge, it is not subject to VAT, and it is collected by us at checkout and paid to Companies House on your behalf.',
  },
}

export const TooltipVariants: Story = {
  args: {
    ...defaultArgs,
    packages: packages.map((p) => ({ ...p, highlights: basicHighlights })),
  },
}

export const TooltipVariantsNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    packages: packages.map((p) => ({ ...p, highlights: basicHighlights })),
  },
}

export const HighlightCountExtremes: Story = {
  args: {
    ...defaultArgs,
    packages: [
      { ...packages[0], highlights: [{ id: 'one', text: 'Free Business Bank Account' }] },
      { ...packages[1], highlights: highlights(londonExtras) },
      {
        ...packages[2],
        highlights: highlights([
          ...londonExtras,
          'VAT Registration',
          'PAYE Registration',
          'Confirmation Statement Service',
          'Company Register with First Entries',
          'Printed Certificate of Incorporation',
          'Printed Memorandum & Articles of Association',
          'Three Printed Share Certificates',
          'Business Bank Account Introduction',
          'Digital Company Documents',
          'Apostilled Document Set',
          'Same Day Incorporation Upgrade',
          'Dedicated Company Formation Manager',
        ]),
      },
    ],
  },
}

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: LongCopyEverywhere.args,
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: `Questions? Write to ${EMAIL_TOKEN}`,
    subheading: URL_TOKEN,
    packages: packages.map((p, i) => ({
      ...p,
      name: [GERMAN_TOKEN, EMAIL_TOKEN, 'All Inclusive'][i],
      price: '£1,234,567.89',
      priceNote: EMAIL_TOKEN,
      description: `Order at ${URL_TOKEN} or ask us about ${GERMAN_TOKEN}.`,
      highlightsTitle: GERMAN_TOKEN,
      highlights: [
        { id: 'u1', text: EMAIL_TOKEN },
        {
          id: 'u2',
          text: GERMAN_TOKEN,
          tooltipTitle: GERMAN_TOKEN,
          tooltip: `Full terms at ${URL_TOKEN}\n\nOr email ${EMAIL_TOKEN} and quote ${GERMAN_TOKEN}.`,
        },
        { id: 'u3', text: URL_TOKEN },
      ],
      badgeText: [null, null, GERMAN_TOKEN][i],
      buyLink: { type: 'custom', url: '/checkout/', label: EMAIL_TOKEN },
      readMoreLink: { type: 'custom', url: '/package/', label: GERMAN_TOKEN },
    })),
    compareLink: { type: 'custom', url: '/compare-packages/', label: URL_TOKEN },
    contactNote: `Live chat, or email ${EMAIL_TOKEN}`,
    footerNote: URL_TOKEN,
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: UnbrokenTokens.args,
}
