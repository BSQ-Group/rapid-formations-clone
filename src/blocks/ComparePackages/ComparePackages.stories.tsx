import type { Meta, StoryObj } from '@storybook/react'
import { ComparePackagesBlock } from './Component'
import type { ComparePackagesBlock as ComparePackagesBlockProps } from '@/payload-types'

const sampleArgs: ComparePackagesBlockProps = {
  id: 'story-1',
  blockType: 'comparePackages',
  blockName: 'Compare Packages',
  heading: 'Compare features by plan',
  description: 'Easily compare features across all available plans.',
  featuresLabel: 'FEATURES',
  plans: [
    {
      id: 'p1',
      name: 'Basic',
      price: '£1.99',
      subPrice: '+ £100 Companies House fee',
      featured: false,
      button: { type: 'custom', url: '/order/basic', label: 'Order', newTab: false } as any,
    },
    {
      id: 'p2',
      name: 'Privacy',
      price: '£3.99',
      subPrice: '+ £100 Companies House fee',
      featured: false,
      button: { type: 'custom', url: '/order/privacy', label: 'Order', newTab: false } as any,
    },
    {
      id: 'p3',
      name: 'Fully Inclusive',
      price: '£9.99',
      subPrice: '+ £100 Companies House fee',
      featured: true,
      button: { type: 'custom', url: '/order/fully-inclusive', label: 'Order', newTab: false } as any,
    },
  ] as any,
  sections: [
    {
      id: 's1',
      label: 'CORE SERVICES',
      features: [
        {
          id: 'f1',
          name: 'Limited company formation online',
          description: 'Usually formed within 24 hours',
          infoText: null,
          tooltipText: null,
          inPlan1: true,
          inPlan2: true,
          inPlan3: true,
        },
        {
          id: 'f2',
          name: 'Confirmation Statement',
          description: 'Preparation and filing of your first annual statement',
          infoText: null,
          tooltipText: null,
          inPlan1: true,
          inPlan2: true,
          inPlan3: true,
        },
      ],
    },
    {
      id: 's2',
      label: 'PRIVACY & ADDRESS SERVICES',
      features: [
        {
          id: 'f3',
          name: 'Registered Office Address for 12 months',
          description: 'Keeping your home address off the public record',
          infoText: null,
          tooltipText: null,
          inPlan1: false,
          inPlan2: true,
          inPlan3: true,
        },
      ],
    },
  ] as any,
  sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'xl' },
}

const meta: Meta<typeof ComparePackagesBlock> = {
  component: ComparePackagesBlock,
  title: 'Blocks/ComparePackages',
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
type Story = StoryObj<typeof ComparePackagesBlock>

export const Default: Story = { args: sampleArgs }
