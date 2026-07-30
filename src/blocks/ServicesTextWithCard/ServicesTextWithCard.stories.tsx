import type { Meta, StoryObj } from '@storybook/react'
import { ServicesTextWithCardBlock } from './Component'

const meta: Meta<typeof ServicesTextWithCardBlock> = {
  title: 'Blocks/ServicesTextWithCard',
  component: ServicesTextWithCardBlock,
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
type Story = StoryObj<typeof ServicesTextWithCardBlock>

export const Default: Story = {
  args: {
    blockType: 'servicesTextWithCard',
    title: 'Confirmation Statement',
    paragraphs: [
      {
        id: '1',
        text: 'Every limited company or LLP in the UK must file a confirmation statement at Companies House on an annual basis.',
      },
      {
        id: '2',
        text: "The confirmation statement provides Companies House with up-to-date information on a company's registered address, officers, SIC codes, share capital, shareholders and people with significant control (PSC).",
      },
      {
        id: '3',
        text: 'Quality Company Formations provide a confirmation statement filing service, which will ensure you keep your company legal and compliant. There are no late filing penalties for a confirmation statement, however, your company will be struck from the company register if it is not filed.',
      },
    ],
    card: {
      price: 'from £75.99 +VAT',
      subtitle: 'Standard or Express service',
      serviceLabel: 'Confirmation Statement Service',
      cta: {
        type: 'custom',
        label: 'Order now',
        url: '/order',
      },
    },
    sectionLayout: {
      background: 'light',
      paddingTop: 'l',
      paddingBottom: 'l',
    },
  },
}
