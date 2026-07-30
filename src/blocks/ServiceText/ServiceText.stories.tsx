import type { Meta, StoryObj } from '@storybook/react'
import { ServiceTextBlock } from './Component'
import type { ServiceTextBlock as ServiceTextBlockProps } from '@/payload-types'

const defaultArgs: ServiceTextBlockProps = {
  id: 'story-1',
  blockType: 'serviceText',
  blockName: 'Service Text',
  title: 'Renew your services quickly and easily.',
  description:
    'Our services are set up to renew automatically on an annual basis, however, if you prefer to manually renew them, you can do so here.',
  listTitle: 'How it works:',
  items: [
    { id: 'i1', text: 'Click the Order button and log in to your account.' },
    {
      id: 'i2',
      text: 'Go to your Active Services page to extend your service for another year.',
    },
    {
      id: 'i3',
      text:
        'Select the Services tab and click Renew Expired Services if your service expired within the last 35 days.',
    },
    {
      id: 'i4',
      text: 'Purchase the service again in the Shop section if it expired over 35 days ago.',
    },
  ],
  sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof ServiceTextBlock> = {
  component: ServiceTextBlock,
  title: 'Blocks/ServiceText',
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
type Story = StoryObj<typeof ServiceTextBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const ThreeItems: Story = {
  args: {
    ...defaultArgs,
    items: defaultArgs.items!.slice(0, 3),
  },
}

export const SixItems: Story = {
  args: {
    ...defaultArgs,
    items: [
      ...defaultArgs.items!,
      { id: 'i5', text: 'Check the renewal date in your account dashboard.' },
      { id: 'i6', text: 'Reach out to support if you need help with renewal.' },
    ],
  },
}
