import type { Meta, StoryObj } from '@storybook/react'
import type { MagicNumbersBlock as MagicNumbersBlockProps } from '@/payload-types'
import { MagicNumbersBlock } from './Component'

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: { name: 'Mobile 390', styles: { width: '390px', height: '1400px' }, type: 'mobile' },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const EMAIL_TOKEN = 'company.formation.statistics@rapid-formations-limited.co.uk'
const URL_TOKEN = 'https://www.rapidformations.co.uk/about-us/our-magic-numbers?utm_source=storybook'
const GERMAN_TOKEN = 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'

const conn = (width: number, inset: number, top: number, height: number, side: 'left' | 'right' = 'left') => ({
  width,
  side,
  inset,
  top,
  height,
})

const defaultArgs: MagicNumbersBlockProps = {
  blockType: 'magicNumbers',
  heading: "Rapid Formations' magic numbers",
  subheading: null,
  numbers: [
    { id: 'n1', icon: 'comments', colour: '#00BCED', heading: '9,481 Customer Reviews', body: 'published on Trustpilot to date', placement: { left: 0, top: 0, bottom: null }, connector: conn(4, 23, -175, 175) },
    { id: 'n2', icon: 'mapMarker', colour: '#00547F', heading: 'London HQ', body: 'in Covent Garden', placement: { left: 50, top: null, bottom: 95 }, connector: conn(8, 30, 0, 85) },
    { id: 'n3', icon: 'file', colour: '#4CA3B9', heading: '36,000 Companies', body: 'formed every year', placement: { left: 150, top: 110, bottom: null }, connector: conn(12, 33, -65, 65) },
    { id: 'n4', icon: 'graduationCap', colour: '#65D5F2', heading: '22 Scholarships', body: 'given to business\nstudents every year', placement: { left: 275, top: null, bottom: 70 }, connector: conn(13, 20, 0, 85) },
    { id: 'n5', icon: 'shield', colour: '#00A8D4', heading: '30 Years', body: 'The average age of our\ncustomer service staff', placement: { left: 450, top: 0, bottom: null }, connector: conn(10, 40, -175, 175) },
    { id: 'n6', icon: 'clock', colour: '#0082A5', heading: 'Under 24 Hours', body: 'to register a company\nusing Rapid Formations', placement: { left: 550, top: null, bottom: 70 }, connector: conn(5, 25, 0, 85) },
    { id: 'n7', icon: 'phone', colour: '#00547F', heading: '7.6 Seconds', body: 'Our average telephone\nresponse time', placement: { left: 620, top: 110, bottom: null }, connector: conn(10, 33, -65, 65) },
    { id: 'n8', icon: 'university', colour: '#2E9DB9', heading: 'Up to 25 Months', body: 'of free banking', placement: { left: 800, top: null, bottom: 95 }, connector: conn(12, 40, 0, 85, 'right') },
    { id: 'n9', icon: 'thumbsUp', colour: '#0076AF', heading: "We're the UK's #1 rated", body: 'company formation agent\non Trustpilot', placement: { left: 880, top: 0, bottom: null }, connector: conn(26, 40, -175, 175) },
  ],
  sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'lg' },
}

const meta: Meta<typeof MagicNumbersBlock> = {
  title: 'Blocks/MagicNumbers',
  component: MagicNumbersBlock,
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
type Story = StoryObj<typeof MagicNumbersBlock>

export const Default: Story = { args: defaultArgs }

export const DefaultNarrow: Story = { ...narrowViewport, args: defaultArgs }

export const WithSubheading: Story = {
  args: { ...defaultArgs, subheading: 'You can select a business bank account during the order process' },
}

export const LongCopy: Story = {
  args: {
    ...defaultArgs,
    heading:
      "Rapid Formations' magic numbers, the statistics behind the United Kingdom's highest rated company formation agent",
    subheading:
      'Every figure below is refreshed each quarter from our own order records and from our published Trustpilot profile, and each one is checked by the customer service team in Covent Garden before it goes live on this page',
    numbers: [
      {
        id: 'n1',
        icon: 'comments',
        colour: '#00BCED',
        heading: '9,481 verified customer reviews and counting',
        body: 'published on Trustpilot to date by business owners who registered a limited company with us',
        placement: { left: 0, top: 0, bottom: null },
        connector: conn(4, 23, -175, 175),
      },
      {
        id: 'n2',
        icon: 'mapMarker',
        colour: '#00547F',
        heading: 'London headquarters',
        body: 'in Covent Garden',
        placement: { left: 450, top: 0, bottom: null },
        connector: conn(10, 40, -175, 175),
      },
    ],
  },
}

export const LongCopyNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading:
      "Rapid Formations' magic numbers, the statistics behind the United Kingdom's highest rated company formation agent",
    numbers: [
      {
        id: 'n1',
        icon: 'comments',
        colour: '#00BCED',
        heading: '9,481 verified customer reviews and counting',
        body: 'published on Trustpilot to date by business owners who registered a limited company with us',
        placement: { left: 0, top: 0, bottom: null },
        connector: conn(4, 23, -175, 175),
      },
    ],
  },
}

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'By the numbers',
    numbers: [
      { id: 'n1', icon: 'clock', colour: '#0082A5', heading: '24h', body: 'to file', placement: { left: 0, top: 0, bottom: null }, connector: conn(50, 20, -175, 175) },
      { id: 'n2', icon: 'phone', colour: '#00547F', heading: '7.6s', body: 'to answer', placement: { left: 450, top: 0, bottom: null }, connector: conn(50, 20, -175, 175) },
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: GERMAN_TOKEN,
    subheading: URL_TOKEN,
    numbers: [
      {
        id: 'n1',
        icon: 'comments',
        colour: '#00BCED',
        heading: GERMAN_TOKEN,
        body: EMAIL_TOKEN,
        placement: { left: 0, top: 0, bottom: null },
        connector: conn(50, 23, -175, 175),
      },
      {
        id: 'n2',
        icon: 'thumbsUp',
        colour: '#0076AF',
        heading: EMAIL_TOKEN,
        body: URL_TOKEN,
        placement: { left: 450, top: 0, bottom: null },
        connector: conn(50, 40, -175, 175),
      },
    ],
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading: GERMAN_TOKEN,
    numbers: [
      {
        id: 'n1',
        icon: 'comments',
        colour: '#00BCED',
        heading: GERMAN_TOKEN,
        body: URL_TOKEN,
        placement: { left: 0, top: 0, bottom: null },
        connector: conn(50, 23, -175, 175),
      },
    ],
  },
}

export const OptionalsAbsent: Story = {
  args: {
    ...defaultArgs,
    subheading: null,
    numbers: [
      {
        id: 'n1',
        icon: 'comments',
        colour: '#00BCED',
        heading: '9,481 Customer Reviews',
        body: null,
        placement: { left: 0, top: 0, bottom: null },
        connector: conn(100, 23, -175, 175),
      },
    ],
  },
}

export const SingleNumber: Story = {
  args: {
    ...defaultArgs,
    numbers: [
      {
        id: 'n1',
        icon: 'mapMarker',
        colour: '#00547F',
        heading: 'London HQ',
        body: 'in Covent Garden',
        placement: { left: 0, top: 0, bottom: null },
        connector: conn(100, 30, -175, 175),
      },
    ],
  },
}

export const OddCount: Story = {
  args: { ...defaultArgs, numbers: defaultArgs.numbers!.slice(0, 5) },
}
