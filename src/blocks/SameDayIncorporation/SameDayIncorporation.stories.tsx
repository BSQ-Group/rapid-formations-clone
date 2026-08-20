import type { Meta, StoryObj } from '@storybook/react'

import { SameDayIncorporationCard } from './SameDayIncorporationCard'
import { sameDayIncorporationStyles as s } from './SameDayIncorporation.styles'

const body = (text: string) => <p className={s.body}>{text}</p>

const SOURCE_BODY =
  'Choose our same-day company incorporation service for £79.99 at checkout with any package. Orders must be submitted by 12pm GMT, Monday-Friday.'

const LONG_BODY =
  'Choose our same-day company incorporation service for £79.99 at checkout with any package, and your documents are filed with Companies House the moment your payment clears, provided the order reaches us before the midday cut-off on a working day; anything submitted after that point, at a weekend, or on a public holiday is queued and filed on the next working morning instead.'

const meta: Meta<typeof SameDayIncorporationCard> = {
  title: 'Blocks/SameDayIncorporation',
  component: SameDayIncorporationCard,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      options: {
        mobile360: {
          name: 'Mobile 360',
          styles: { width: '360px', height: '900px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile360' } },
  decorators: [
    (Story) => (
      <div className="surface-canvas font-legacy-condensed p-5">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SameDayIncorporationCard>

export const Default: Story = {
  args: { heading: 'Same-Day Incorporation', body: body(SOURCE_BODY) },
}

export const ShortCopy: Story = {
  args: { heading: 'Same-Day Filing', body: body('Filed today.') },
}

export const LongCopy: Story = {
  args: { heading: 'Same-Day Incorporation Service Available', body: body(LONG_BODY) },
}

export const UnbrokenToken: Story = {
  args: {
    heading: 'Same-Day Incorporation',
    body: body(
      'Email same-day-incorporation.enquiries@rapidformations-incorporation-services.co.uk before 12pm.',
    ),
  },
}
