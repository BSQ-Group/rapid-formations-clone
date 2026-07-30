import type { Meta, StoryObj } from '@storybook/react'
import { RegisteredOfficePurposeBlock } from './Component'

const meta: Meta<typeof RegisteredOfficePurposeBlock> = {
  title: 'Blocks/RegisteredOfficePurpose',
  component: RegisteredOfficePurposeBlock,
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
type Story = StoryObj<typeof RegisteredOfficePurposeBlock>

export const Default: Story = {
  args: {
    blockType: 'registeredOfficePurpose',
    title: 'The purpose of a registered office',
    items: [
      { id: '1', icon: 'scale', body: 'UK company law requires all limited companies and LLPs to have a registered office in their country of incorporation — England and Wales, Scotland or Northern Ireland.' },
      { id: '2', icon: 'mailCheck', body: 'All official government mail is sent to your registered office.' },
      { id: '3', icon: 'eye', body: 'Companies House will disclose your registered office on the official companies register. This creates corporate transparency for the benefit of the public.' },
      { id: '4', icon: 'eyeOff', body: 'A professional registered office address will enable you to keep your home address off the public record.' },
      { id: '5', icon: 'shieldCheck', body: 'A registered office service prevents unsolicited mail and visitors from arriving at your private residence.' },
      { id: '6', icon: 'fileText', body: 'Companies must display their registered office details on all forms of business stationery, websites and promotional material.' },
    ],
  },
}
