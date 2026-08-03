import type { Meta, StoryObj } from '@storybook/react'
import { WhyChooseUsBlock } from './Component'
import type { WhyChooseUsBlock as WhyChooseUsBlockProps } from '@/payload-types'

const mockIcon = {
  id: 'icon-1',
  url: 'https://placehold.co/156x156/f5f5f5/1c1d24?text=💡',
  filename: 'lightbulb.png',
  mimeType: 'image/png',
  filesize: 0,
  width: 156,
  height: 156,
  alt: 'Feature icon',
  createdAt: '',
  updatedAt: '',
} as any

const features: WhyChooseUsBlockProps['features'] = [
  {
    id: '1',
    icon: mockIcon,
    title: 'Expert help',
    description:
      'If you have any questions about forming your company, our friendly team are just a phone call away.',
  },
  {
    id: '2',
    icon: mockIcon,
    title: 'Home address privacy',
    description:
      'Protect your home address from the public register with our registered office service.',
  },
  {
    id: '3',
    icon: mockIcon,
    title: 'Multiple share classes',
    description:
      'Our tailored company formation packages allow you to define voting rights and privileges.',
  },
  {
    id: '4',
    icon: mockIcon,
    title: 'Quick and easy set-up',
    description:
      'After completing our simple 20 minute application, most companies are formed within one business day.',
  },
  {
    id: '5',
    icon: mockIcon,
    title: 'Company management portal',
    description:
      'Change company and officer details, and file confirmation statements - all from your online account.',
  },
  {
    id: '6',
    icon: mockIcon,
    title: 'Lifetime Support',
    description:
      'Our team of experts will be on hand to assist you throughout the lifetime of your company.',
  },
]

const defaultArgs: WhyChooseUsBlockProps = {
  id: 'story-1',
  blockType: 'whyChooseUs',
  blockName: 'Why Choose Us',
  heading: 'Why use Quality Company Formations as your company formation agent',
  description:
    'A company formation agent can provide you with many additional services that Companies House just do not offer.',
  features,
  sectionLayout: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof WhyChooseUsBlock> = {
  component: WhyChooseUsBlock,
  title: 'Blocks/WhyChooseUs',
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
type Story = StoryObj<typeof WhyChooseUsBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const NoIcons: Story = {
  args: {
    ...defaultArgs,
    features: features.map((f) => ({ ...f, icon: null })),
  },
}

export const FourFeatures: Story = {
  args: {
    ...defaultArgs,
    features: features.slice(0, 4),
  },
}

export const NoDescription: Story = {
  args: {
    ...defaultArgs,
    description: null,
  },
}

export const LinkedFeatures: Story = {
  args: {
    ...defaultArgs,
    features: features.map((f, i) =>
      i % 2 === 0
        ? { ...f, link: { type: 'custom' as const, url: '/company-formation', newTab: false } }
        : f,
    ),
  },
}
