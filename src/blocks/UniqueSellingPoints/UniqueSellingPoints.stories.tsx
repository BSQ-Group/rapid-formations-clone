import type { Meta, StoryObj } from '@storybook/react'
import { UniqueSellingPointsBlock } from './Component'
import type { UniqueSellingPointsBlock as UniqueSellingPointsBlockProps } from '@/payload-types'

const icon = (label: string) =>
  ({
    id: `icon-${label}`,
    url: `https://placehold.co/90x90/ffffff/275ee2?text=${encodeURIComponent(label)}`,
    width: 90,
    height: 90,
    alt: label,
  }) as any

const points: UniqueSellingPointsBlockProps['points'] = [
  {
    id: '1',
    icon: icon('1'),
    title: 'Top Rated in the UK',
    description: 'Over 750,000 companies formed with thousands of excellent reviews',
  },
  {
    id: '2',
    icon: icon('2'),
    title: 'Non-Residents Packages',
    description: 'Ideal for overseas clients who want to register a UK limited company',
  },
  {
    id: '3',
    icon: icon('3'),
    title: 'Expert Customer Support',
    description: 'We are available for you by telephone, online chat or email',
  },
  {
    id: '4',
    icon: icon('4'),
    title: 'Carbon Neutral',
    description: 'Proud to be a certified Carbon Neutral Business 2025',
  },
]

const defaultArgs: UniqueSellingPointsBlockProps = {
  id: 'story-1',
  blockType: 'uniqueSellingPoints',
  blockName: 'Unique Selling Points',
  points,
}

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
  'https://www.rapidformations.co.uk/company-formation/non-residents-package/?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Gesellschaftsgründungsbegleitungsdienstleistungsunternehmen'

const meta: Meta<typeof UniqueSellingPointsBlock> = {
  component: UniqueSellingPointsBlock,
  title: 'Blocks/UniqueSellingPoints',
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
type Story = StoryObj<typeof UniqueSellingPointsBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const ThreePoints: Story = {
  args: { ...defaultArgs, points: points!.slice(0, 3) },
}

export const Linked: Story = {
  args: {
    ...defaultArgs,
    points: points!.map((p) => ({
      ...p,
      link: { type: 'custom' as const, url: '/company-formation', newTab: false },
    })),
  },
}

export const NarrowLongCopy: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    points: [
      {
        id: '1',
        icon: icon('1'),
        title: 'The highest rated company formation agent in the United Kingdom',
        description:
          'Over 750,000 limited companies formed since 2010, with thousands of excellent independent reviews on Google and Trustpilot from founders who came back to us for their second and third company.',
      },
      {
        id: '2',
        icon: icon('2'),
        title: 'Specialist packages for non-resident and overseas founders',
        description:
          'Ideal for overseas clients who want to register a UK limited company without a UK address, including a London registered office, a service address and full identity verification.',
      },
      {
        id: '3',
        icon: icon('3'),
        title: 'Expert customer support from a named company manager',
        description:
          'We are available by telephone, online chat or email seven days a week, and every order is assigned a personal company manager who stays with you after incorporation.',
      },
      {
        id: '4',
        icon: icon('4'),
        title: 'A certified Carbon Neutral and B Corporation business',
        description:
          'Proud to be a certified Carbon Neutral Business 2025 and a certified B Corporation, meeting verified standards for social and environmental performance across the whole group.',
      },
    ],
  },
}

export const NarrowUnbrokenTokens: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    points: [
      {
        id: '1',
        icon: icon('1'),
        title: GERMAN_TOKEN,
        description: `Write to ${EMAIL_TOKEN} and we will reply the same working day.`,
      },
      {
        id: '2',
        icon: icon('2'),
        title: `Compare at ${URL_TOKEN}`,
        description: URL_TOKEN,
      },
      {
        id: '3',
        icon: icon('3'),
        title: 'Expert Customer Support',
        description: `${GERMAN_TOKEN} — ${EMAIL_TOKEN}`,
      },
      {
        id: '4',
        icon: icon('4'),
        title: 'Carbon Neutral',
        description: 'Proud to be a certified Carbon Neutral Business 2025',
      },
    ],
  },
}
