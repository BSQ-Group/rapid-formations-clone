import type { Meta, StoryObj } from '@storybook/react'
import { TestimonialsBlock } from './Component'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

const defaultArgs: TestimonialsBlockProps = {
  id: 'story-1',
  blockType: 'testimonials',
  blockName: 'Testimonials',
  heading: 'Thousands of excellent customer reviews',
  description:
    'We have formed over 350,000 companies with a 98% positive customer service rating. Read our verified company formation reviews.',
  sectionLayout: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof TestimonialsBlock> = {
  component: TestimonialsBlock,
  title: 'Blocks/Testimonials',
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
type Story = StoryObj<typeof TestimonialsBlock>

export const Dark: Story = {
  args: defaultArgs,
}

export const Light: Story = {
  args: {
    ...defaultArgs,
    sectionLayout: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
  },
}

export const NoDescription: Story = {
  args: {
    ...defaultArgs,
    description: null,
  },
}
