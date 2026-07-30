import type { Meta, StoryObj } from '@storybook/react'
import type { BCorpCertificationBlock as BCorpCertificationBlockProps } from '@/payload-types'
import { BCorpCertificationBlock } from './Component'

const defaultArgs: BCorpCertificationBlockProps = {
  blockType: 'bCorpCertification',
  backgroundImage: '' as any,
  badge: '' as any,
  sectionLayout: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof BCorpCertificationBlock> = {
  title: 'Blocks/BCorpCertification',
  component: BCorpCertificationBlock,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BCorpCertificationBlock>

export const Default: Story = {
  args: defaultArgs,
}
