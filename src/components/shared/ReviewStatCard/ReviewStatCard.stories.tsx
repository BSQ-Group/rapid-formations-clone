import type { Meta, StoryObj } from '@storybook/react'

import { ReviewStatCard } from './index'

const logo = (name: string, colour: string) =>
  ({
    id: `logo-${name}`,
    url: `https://placehold.co/200x50/ffffff/${colour}?text=${name}`,
    filename: `${name}.png`,
    mimeType: 'image/png',
    filesize: 0,
    width: 200,
    height: 50,
    createdAt: '',
    updatedAt: '',
  }) as any

const meta: Meta<typeof ReviewStatCard> = {
  component: ReviewStatCard,
  title: 'Base Components/ReviewStatCard',
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed w-[300px] bg-[var(--surface-canvas)] p-6">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ReviewStatCard>

export const Trustpilot: Story = {
  args: {
    provider: 'Trustpilot',
    logo: logo('Trustpilot', '5eb27c'),
    score: 4.8,
    maxScore: 5,
    totalReviews: '11,974',
    url: 'https://uk.trustpilot.com/review/rapidformations.co.uk',
    tone: 'trustpilot',
  },
}

export const Google: Story = {
  args: {
    provider: 'Google',
    logo: logo('Google', 'f0ac00'),
    score: 4.9,
    maxScore: 5,
    totalReviews: '1429',
    url: 'https://www.google.com/search?q=Rapid+Formations+Reviews',
    tone: 'google',
  },
}

export const NotLinked: Story = {
  name: 'Without a link',
  args: { ...Trustpilot.args, url: undefined },
}

export const NoLogo: Story = {
  name: 'Without a logo',
  args: { ...Trustpilot.args, logo: undefined },
}

export const LargerStars: Story = {
  name: 'Larger stars',
  args: { ...Trustpilot.args, starSize: 'xl' },
}
