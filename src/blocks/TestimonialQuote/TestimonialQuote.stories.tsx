import type { Meta, StoryObj } from '@storybook/react'
import { TestimonialQuoteCard } from './TestimonialQuoteCard'

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '900px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const LONG_QUOTE =
  'I had spent weeks trying to work out which company structure suited a business with two overseas shareholders, and every accountant I spoke to gave me a different answer, so finding a formation agent that explained the difference between a company limited by shares and one limited by guarantee in plain English, then filed the incorporation, the registered office and the confirmation statement without a single follow-up email, was genuinely the difference between starting this year and giving up on it altogether.'

const SHORT_QUOTE = 'Fast, clear, faultless.'

const UNBROKEN_TOKEN_QUOTE =
  'Everything arrived at company-formations.support@rapidformations-incorporation-services.co.uk within the hour.'

const meta: Meta<typeof TestimonialQuoteCard> = {
  title: 'Blocks/TestimonialQuote',
  component: TestimonialQuoteCard,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-canvas font-legacy-condensed p-8">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TestimonialQuoteCard>

export const Default: Story = {
  args: {
    quote:
      'I owe a huge thanks to Rapid Formations and its fantastic customer service team for making the beginning of my company so easy.',
    customerName: 'Ryan Waring',
  },
}

export const LongQuote: Story = {
  args: { quote: LONG_QUOTE, customerName: 'David St Clare Jones' },
}

export const ShortQuote: Story = {
  args: { quote: SHORT_QUOTE, customerName: 'Ben Griffiths' },
}

export const UnbrokenToken: Story = {
  args: { quote: UNBROKEN_TOKEN_QUOTE, customerName: 'Delyan Svacina' },
}

export const LongQuoteNarrow: Story = {
  args: { quote: LONG_QUOTE, customerName: 'Alexandre Die' },
  ...narrowViewport,
}

export const UnbrokenTokenNarrow: Story = {
  args: { quote: UNBROKEN_TOKEN_QUOTE, customerName: 'Ahmed Adrissi' },
  ...narrowViewport,
}
