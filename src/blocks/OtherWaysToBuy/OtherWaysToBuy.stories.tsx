import type { Meta, StoryObj } from '@storybook/react'
import { OtherWaysToBuyBlock } from './Component'

const richText = (...lines: string[]) => ({
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: lines.map((text) => ({
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      textFormat: 0,
      textStyle: '',
      direction: 'ltr',
      children: [
        { type: 'text', detail: 0, format: 0, mode: 'normal', style: '', text, version: 1 },
      ],
    })),
  },
}) as any

const meta: Meta<typeof OtherWaysToBuyBlock> = {
  title: 'Blocks/OtherWaysToBuy',
  component: OtherWaysToBuyBlock,
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
type Story = StoryObj<typeof OtherWaysToBuyBlock>

export const Default: Story = {
  args: {
    blockType: 'otherWaysToBuy',
    heading: 'Other ways to buy a\nRegistered Office Service',
    separator: 'or',
    ways: [
      {
        id: '1',
        title: 'Buy it when you set up a company',
        description: richText(
          'Quality Company Formations customers can choose a company formation package which includes a registered office during the application process. Simply choose your package, and proceed to the checkout to submit your registration form online to Companies House.',
          "Your registered office will be recorded at Companies House, and displayed on public record when your company is approved. That's it!",
        ),
        cta: {
          type: 'custom',
          url: '/packages',
          label: 'View packages',
          newTab: false,
        },
      },
      {
        id: '2',
        title: 'Add it to an existing company',
        description: richText(
          'Our Registered Office Service in London can be purchased for any existing company incorporated in England and Wales.',
          "To do so, click 'Buy Service', to log in or create an account. Once logged in, you can purchase the service from the 'Shop' tab.",
          "If you do not have an account, import your existing company on to our system, then proceed with purchasing the service from the 'Shop' tab.",
          'Companies House will be notified of your new registered office, and it will be updated on public record within a few hours.',
        ),
        cta: {
          type: 'custom',
          url: '/buy-service',
          label: 'Buy a service',
          newTab: false,
        },
      },
    ],
  },
}
