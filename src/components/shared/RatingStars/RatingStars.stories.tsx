import type { Meta, StoryObj } from '@storybook/react'

import { RatingStars, RATING_STAR_SIZES, RATING_STAR_TONES } from './index'

const meta: Meta<typeof RatingStars> = {
  component: RatingStars,
  title: 'Base Components/RatingStars',
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: RATING_STAR_SIZES },
    tone: { control: 'select', options: RATING_STAR_TONES },
  },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)] p-6">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RatingStars>

export const Default: Story = {
  args: { score: 4.8, maxScore: 5, provider: 'Trustpilot' },
}

export const AllSizes: Story = {
  name: 'Every size',
  render: () => (
    <div className="flex flex-col gap-4">
      {RATING_STAR_SIZES.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <span className="w-24 text-sm text-[var(--text-on-light-muted)]">{size}</span>
          <RatingStars score={4.8} maxScore={5} provider="Trustpilot" size={size} />
        </div>
      ))}
    </div>
  ),
}

export const AllTones: Story = {
  name: 'Every tone',
  render: () => (
    <div className="flex flex-col gap-4">
      {RATING_STAR_TONES.map((tone) => (
        <div key={tone} className="flex items-center gap-4">
          <span className="w-24 text-sm text-[var(--text-on-light-muted)]">{tone}</span>
          <RatingStars score={4.8} maxScore={5} provider={tone} tone={tone} />
        </div>
      ))}
    </div>
  ),
}

export const PartialScores: Story = {
  name: 'Partial fills',
  render: () => (
    <div className="flex flex-col gap-4">
      {[5, 4.8, 4.5, 3.2, 1, 0].map((score) => (
        <div key={score} className="flex items-center gap-4">
          <span className="w-24 text-sm text-[var(--text-on-light-muted)]">{score}</span>
          <RatingStars score={score} maxScore={5} provider="Trustpilot" tone="trustpilot" />
        </div>
      ))}
    </div>
  ),
}
