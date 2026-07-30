import type { Meta, StoryObj } from '@storybook/react'
import { HowItWorksListBlock } from './Component'

const meta: Meta<typeof HowItWorksListBlock> = {
  title: 'Blocks/HowItWorksList',
  component: HowItWorksListBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="theme-qualitycompanyformations bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof HowItWorksListBlock>

export const Default: Story = {
  args: {
    blockType: 'howItWorksList',
    stepsHeading: 'How it works:',
    steps: [
      { id: '1', text: "Select 'Order'" },
      { id: '2', text: 'Log in or create an account' },
      {
        id: '3',
        text:
          "Once logged in, go to 'Shop' to complete your purchase by selecting either the Standard or Express Confirmation Statement",
      },
      { id: '4', text: 'We will send you a questionnaire on your company by email' },
      { id: '5', text: 'We will complete and file the CS01 form (confirmation statement)' },
      {
        id: '6',
        text: 'We will confirm the acceptance of your confirmation statement by email',
      },
      {
        id: '7',
        text: 'This service is renewable on an annual basis at a cost of £75.99 +VAT',
      },
    ],
    includedHeading: 'What is included in our price?',
    includedItems: [
      { id: '1', text: 'Companies House fee of £50.00' },
      { id: '2', text: 'Completion and filing of the CS01 form' },
      {
        id: '3',
        text:
          'Reporting changes to SIC codes, shareholder information, and statement of capital',
      },
    ],
    sectionLayout: {
      background: 'light',
      paddingTop: 's',
      paddingBottom: 's',
    },
  },
}
