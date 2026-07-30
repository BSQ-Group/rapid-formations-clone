import type { Meta, StoryObj } from '@storybook/react'
import { SupportBlock } from './Component'
import type { SupportBlock as SupportBlockProps } from '@/payload-types'

const mockImage = {
  id: 'img-1',
  url: 'https://placehold.co/1064x356/e0e0e0/555555?text=Support+image',
  filename: 'support.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  width: 1064,
  height: 356,
  alt: 'Support agent',
  createdAt: '',
  updatedAt: '',
} as any

const defaultArgs: SupportBlockProps = {
  id: 'story-1',
  blockType: 'support',
  blockName: 'Support',
  heading: "We're here to help",
  description:
    "If you're unsure about any part of the process, our friendly team is here to help.",
  phone: '020 3908 0044',
  image: mockImage,
  stats: [
    { id: '1', label: 'UK companies formed by QCF', value: '350k+' },
    { id: '2', label: 'Informative blog posts', value: '250+' },
    { id: '3', label: 'QCF Team Members', value: '70+' },
    { id: '4', label: 'Years of combined experience', value: '550+' },
  ],
  sectionLayout: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof SupportBlock> = {
  component: SupportBlock,
  title: 'Blocks/Support',
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
type Story = StoryObj<typeof SupportBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const NoImage: Story = {
  args: {
    ...defaultArgs,
    image: null,
  },
}

export const NoStats: Story = {
  args: {
    ...defaultArgs,
    stats: null,
  },
}

