import type { Meta, StoryObj } from '@storybook/react'
import { WhyUseAgentBlock } from './Component'
import type { WhyUseAgentBlock as WhyUseAgentBlockProps } from '@/payload-types'

const HELP_URL =
  'https://www.rapidformations.co.uk/help-centre/why-use-a-formation-agent/?utm_source=storybook&utm_medium=block&utm_campaign=unbroken-token-check'

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '3200px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const sourceItems = [
  {
    id: 'item-1',
    icon: 'thumbs-up',
    title: 'Easy incorporations',
    description:
      "We are constantly improving our company formation process to make sure it's as quick and simple as possible.",
  },
  {
    id: 'item-2',
    icon: 'phone',
    title: 'Expert guidance',
    description:
      'Our friendly team are ready to answer any questions you may have about starting your company.',
  },
  {
    id: 'item-3',
    icon: 'clipboard-list-check',
    title: 'Pre-submission review',
    description:
      'We will review your company order before sending to Companies House. 10% of applications are rejected. Not yours!',
  },
  {
    id: 'item-4',
    icon: 'building-shield',
    title: 'Registered office service',
    description:
      'Protect your home address from the public register by using our address as your company’s registered office.',
  },
  {
    id: 'item-5',
    icon: 'chart-pie',
    title: 'Share advice',
    description:
      'Issuing shares need not be complex. We offer the best guidance when it comes to your share capital.',
  },
  {
    id: 'item-6',
    icon: 'piggy-bank',
    title: 'Banking introductions',
    description:
      'Pick from a host of business bank accounts during the order process, all with hassle-free online applications.',
  },
  {
    id: 'item-7',
    icon: 'sliders-up',
    title: 'Online company manager',
    description:
      'Use our state-of-the-art system to manage and make changes to your company. All from one secure login.',
  },
  {
    id: 'item-8',
    icon: 'globe',
    title: 'Free domain name',
    description:
      'Take the first steps in giving your business an online presence by claiming a free .co.uk or .com domain name.',
  },
  {
    id: 'item-9',
    icon: 'hand-holding-hand',
    title: 'Lifetime support',
    description:
      'We’ll be here to help for the duration of your company’s lifetime. Once a client, always a client.',
  },
]

const LONG_HEADING =
  'Why use a professional company formation agent to incorporate your private limited company rather than filing the application yourself directly with Companies House?'

const LONG_SUBHEADING =
  'Company formation agents, like us, provide a great many useful services that you simply will not receive if you choose to register your new business directly with Companies House, and most of them continue long after the incorporation itself is complete.'

const LONG_TITLE = 'Registered office and service address provision for every company officer'

const LONG_DESCRIPTION =
  'Every UK company must have a registered office address in the jurisdiction in which it is incorporated, and that address is published on the public register where anyone at all can look it up. Using our central London address instead of your own home keeps your residential address off the register entirely, and we scan and forward all statutory mail to you on the day it arrives.'

const LONG_CTA_LABEL = 'Get started and register your new company with Rapid Formations today'

const defaultArgs: WhyUseAgentBlockProps = {
  id: 'story-why-use-agent',
  blockType: 'whyUseAgent',
  blockName: 'Why Use An Agent',
  heading: 'Why use a company formation agent to set up your company?',
  subheading:
    'Company formation agents, like us, provide many useful services\nthat you will not receive if you register directly with Companies House.',
  items: sourceItems,
  cta: {
    type: 'custom',
    url: '#home-top',
    newTab: false,
    label: 'Get Started',
  },
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof WhyUseAgentBlock> = {
  component: WhyUseAgentBlock,
  title: 'Blocks/WhyUseAgent',
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
type Story = StoryObj<typeof WhyUseAgentBlock>

export const Default: Story = { args: defaultArgs }

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'Why use us?',
    subheading: 'Three good reasons.',
    items: sourceItems.slice(0, 3).map((item, index) => ({
      ...item,
      id: `short-${index}`,
      title: 'Fast setup',
      description: 'It is quick.',
    })),
    cta: { ...defaultArgs.cta, label: 'Start' },
  },
}

const longCopyArgs: WhyUseAgentBlockProps = {
  ...defaultArgs,
  heading: LONG_HEADING,
  subheading: LONG_SUBHEADING,
  items: sourceItems.map((item, index) => ({
    ...item,
    id: `long-${index}`,
    title: LONG_TITLE,
    description: LONG_DESCRIPTION,
  })),
  cta: { ...defaultArgs.cta, label: LONG_CTA_LABEL },
}

export const LongCopy: Story = { args: longCopyArgs }

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: longCopyArgs,
}

const unbrokenTokenArgs: WhyUseAgentBlockProps = {
  ...defaultArgs,
  heading: `Why use an agent: ${HELP_URL}`,
  subheading: 'Questions? company.formations.enquiries@rapidformations-worldwide-group.co.uk',
  items: sourceItems.map((item, index) => ({
    ...item,
    id: `token-${index}`,
    icon: 'rechtsschutzversicherungsgesellschaft-icon-name',
    title: 'formations.support.team@rapidformations-worldwide-group.co.uk',
    description: `Full guidance at ${HELP_URL}`,
  })),
  cta: { ...defaultArgs.cta, label: HELP_URL },
}

export const UnbrokenTokens: Story = { args: unbrokenTokenArgs }

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: unbrokenTokenArgs,
}

export const SingleItem: Story = {
  args: {
    ...defaultArgs,
    items: [sourceItems[0]],
  },
}

export const FourItems: Story = {
  args: {
    ...defaultArgs,
    items: sourceItems.slice(0, 4),
  },
}

export const TenItems: Story = {
  args: {
    ...defaultArgs,
    items: [
      ...sourceItems,
      {
        id: 'item-10',
        icon: 'clipboard-list-check',
        title: 'Confirmation statement',
        description:
          'We file your first confirmation statement for you, so your company stays compliant from day one.',
      },
    ],
  },
}

export const NoSubheadingOrCta: Story = {
  args: {
    ...defaultArgs,
    subheading: null,
    cta: null as any,
  },
}

export const UnknownIcon: Story = {
  args: {
    ...defaultArgs,
    items: sourceItems.map((item, index) => ({
      ...item,
      id: `unknown-icon-${index}`,
      icon: 'not-a-real-fontawesome-icon',
    })),
  },
}

export const LightBackground: Story = {
  args: {
    ...defaultArgs,
    sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
  },
}
