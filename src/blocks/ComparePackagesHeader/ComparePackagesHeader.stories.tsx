import type { Meta, StoryObj } from '@storybook/react'
import { ComparePackagesHeaderBlock } from './Component'
import type { ComparePackagesHeaderBlock as ComparePackagesHeaderBlockProps } from '@/payload-types'

const defaultArgs: ComparePackagesHeaderBlockProps = {
  id: 'story-1',
  blockType: 'comparePackagesHeader',
  blockName: 'Compare Packages Header',
  title: 'Compare our Limited\nCompany Formation Packages',
  descriptionPrimary:
    'If you would like help in choosing the right company formation package or ordering your company, call our specialist team and they will happily assist you.',
  descriptionSecondaryBefore: 'We can form companies for residents of countries listed ',
  descriptionLink: {
    type: 'custom',
    url: '/countries',
    label: 'here',
    newTab: false,
  } as any,
  descriptionSecondaryAfter: '.',
  sectionLayout: { background: 'light', paddingTop: 's', paddingBottom: 'none' },
}

const meta: Meta<typeof ComparePackagesHeaderBlock> = {
  component: ComparePackagesHeaderBlock,
  title: 'Blocks/ComparePackagesHeader',
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
type Story = StoryObj<typeof ComparePackagesHeaderBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const NoInlineLink: Story = {
  args: {
    ...defaultArgs,
    descriptionLink: { type: 'custom', url: '', label: '', newTab: false } as any,
    descriptionSecondaryBefore:
      'We can form companies for residents of countries on our supported list.',
    descriptionSecondaryAfter: '',
  },
}
