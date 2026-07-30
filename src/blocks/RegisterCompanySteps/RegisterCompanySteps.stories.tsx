import type { Meta, StoryObj } from '@storybook/react'
import { RegisterCompanyStepsBlock } from './Component'
import type { RegisterCompanyStepsBlock as RegisterCompanyStepsBlockProps } from '@/payload-types'

const mockImage = (id: string) =>
  ({
    id,
    alt: 'Step image',
    url: `https://placehold.co/282x340/e0e0e0/555555?text=Step+${id}`,
    width: 282,
    height: 340,
    createdAt: '',
    updatedAt: '',
  }) as any

const defaultArgs: RegisterCompanyStepsBlockProps = {
  id: 'story-1',
  blockType: 'registerCompanySteps',
  blockName: 'Register Company Steps',
  title: 'Register a company in 4 simple steps',
  subtitle:
    'Our continuous improvement strategy has allowed us to successfully develop our company formation process into the market leader it is today.',
  steps: [
    {
      id: 's1',
      image: mockImage('1'),
      title: 'Company name',
      description:
        'Enter your preferred company name into our company namechecker to find out if it is available to use.',
    },
    {
      id: 's2',
      image: mockImage('2'),
      title: 'Choose a package',
      description:
        'Select a company registration package that suits your business needs from our wide range.',
    },
    {
      id: 's3',
      image: mockImage('3'),
      title: 'Checkout and pay',
      description:
        'Proceed to the checkout page and pick up any additional services and free offers you require.',
    },
    {
      id: 's4',
      image: mockImage('4'),
      title: 'Complete details',
      description:
        'Enter your company details, including your registered office address, directors and share holdings.',
    },
  ],
  sectionLayout: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof RegisterCompanyStepsBlock> = {
  component: RegisterCompanyStepsBlock,
  title: 'Blocks/RegisterCompanySteps',
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
type Story = StoryObj<typeof RegisterCompanyStepsBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const TwoSteps: Story = {
  args: {
    ...defaultArgs,
    steps: defaultArgs.steps!.slice(0, 2),
  },
}

export const SixSteps: Story = {
  args: {
    ...defaultArgs,
    title: 'Register a company in 6 simple steps',
    steps: [
      ...defaultArgs.steps!,
      {
        id: 's5',
        image: mockImage('5'),
        title: 'Verify identity',
        description: 'Upload proof of identity and address for all directors and shareholders.',
      },
      {
        id: 's6',
        image: mockImage('6'),
        title: 'Receive documents',
        description:
          'Your company documents will be sent to you digitally and by post within 24 hours.',
      },
    ],
  },
}
