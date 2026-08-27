import type { Meta, StoryObj } from '@storybook/react'
import { StaffReviewsBlockComponent } from './Component'

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

const QUOTES = [
  {
    id: '1',
    quote:
      "It's exciting to work with a company which is constantly growing and trying new things. I learn something new every day!",
    person: 'Amelia',
    role: 'Director of Operations',
  },
  {
    id: '2',
    quote:
      'Working at Rapid Formations has really helped me develop skills I never thought I would have. It’s so refreshing to work somewhere that doesn’t make you stick to just one job.',
    person: 'Annalise',
    role: 'Compliance Executive',
  },
  {
    id: '3',
    quote:
      'It’s great to work in an office environment with such a wide range of personalities and skills at hand. There is never a dull moment.',
    person: 'John',
    role: 'Chief of Staff',
  },
]

const LONG_QUOTE =
  'I joined expecting to spend my first year filing confirmation statements and instead found myself rewriting the whole registered-office onboarding flow, sitting in on compliance reviews, learning enough about the Companies Act 2006 to argue with our own solicitors, and being trusted to talk to customers about it on day nine — which is not what anyone warns you about when they say a small company means wearing a lot of hats.'

const meta: Meta<typeof StaffReviewsBlockComponent> = {
  title: 'Blocks/StaffReviews',
  component: StaffReviewsBlockComponent,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-canvas">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof StaffReviewsBlockComponent>

export const Default: Story = {
  args: { title: 'What our people have to say', quotes: QUOTES },
}

export const NoTitle: Story = {
  args: { title: '', quotes: QUOTES },
}

export const ShortTitle: Story = {
  args: { title: 'Our people', quotes: QUOTES },
}

export const LongTitle: Story = {
  args: {
    title: 'What the people who answer the phones, file the forms and keep the office running say',
    quotes: QUOTES,
  },
}

export const OneQuote: Story = {
  args: { title: 'What our people have to say', quotes: [QUOTES[0]] },
}

export const FourQuotes: Story = {
  args: { title: 'What our people have to say', quotes: [...QUOTES, { ...QUOTES[0], id: '4' }] },
}

export const LongQuote: Story = {
  args: {
    title: 'What our people have to say',
    quotes: [{ id: '1', quote: LONG_QUOTE, person: 'Alexandra', role: 'Company Secretarial' }],
  },
}

export const ShortQuote: Story = {
  args: {
    title: 'What our people have to say',
    quotes: [{ id: '1', quote: 'Best job I have had.', person: 'Sam', role: 'Mail Room' }],
  },
}

export const NoRole: Story = {
  args: {
    title: 'What our people have to say',
    quotes: QUOTES.map((entry) => ({ ...entry, role: '' })),
  },
}

export const LongNamesNarrow: Story = {
  ...narrowViewport,
  args: {
    title: 'What our people have to say',
    quotes: [
      {
        id: '1',
        quote: LONG_QUOTE,
        person: 'Alexandra Featherstonehaugh-Whitworth',
        role: 'Deputy Director of Company Secretarial Services and Registered Office Compliance',
      },
    ],
  },
}

export const UnbrokenToken: Story = {
  ...narrowViewport,
  args: {
    title: 'company-secretarial.department@rapidformations-incorporations.co.uk',
    quotes: [
      {
        id: '1',
        quote:
          'Everything lands at company-secretarial.department@rapidformations-incorporations.co.uk within the hour.',
        person: 'https://www.rapidformations.co.uk/about-us/meet-the-team',
        role: 'company-secretarial.department@rapidformations-incorporations.co.uk',
      },
    ],
  },
}
