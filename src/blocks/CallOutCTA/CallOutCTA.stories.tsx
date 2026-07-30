import type { Meta, StoryObj } from '@storybook/react'
import { CallOutCTABlock } from './Component'
import type { CallOutCTABlock as CallOutCTABlockProps } from '@/payload-types'

const mockImage = {
  id: 'image-1',
  url: 'https://placehold.co/1344x896/a5dc77/1c1d24?text=Photo',
  filename: 'cta-image.png',
  mimeType: 'image/png',
  filesize: 0,
  width: 1344,
  height: 896,
  alt: 'A person tending to plants',
  createdAt: '',
  updatedAt: '',
} as any

const defaultArgs: CallOutCTABlockProps = {
  id: 'story-1',
  blockType: 'callOutCTA',
  blockName: 'Call-Out CTA',
  heading: 'Are you ready to set up your company?',
  image: mockImage,
  searchPlaceholder: 'Enter company name',
  sectionLayout: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof CallOutCTABlock> = {
  component: CallOutCTABlock,
  title: 'Blocks/CallOutCTA',
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
type Story = StoryObj<typeof CallOutCTABlock>

export const Default: Story = {
  args: defaultArgs,
}

export const CustomPlaceholder: Story = {
  args: {
    ...defaultArgs,
    searchPlaceholder: 'What will you call your company?',
  },
}

export const NoImage: Story = {
  args: {
    ...defaultArgs,
    image: null as any,
  },
}
