import type { Meta, StoryObj } from '@storybook/react'

import type { ReviewStat } from '@/payload-types'

import { ReviewRatingsTrack } from './ReviewRatingsTrack'

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

const platforms: NonNullable<ReviewStat['platforms']> = [
  {
    id: '1',
    provider: 'Trustpilot',
    logo: logo('Trustpilot', '5eb27c'),
    score: 4.8,
    maxScore: 5,
    totalReviews: '11,974',
    starTone: 'trustpilot',
    url: 'https://uk.trustpilot.com/review/rapidformations.co.uk',
    show: true,
  },
  {
    id: '2',
    provider: 'Google',
    logo: logo('Google', 'f0ac00'),
    score: 4.9,
    maxScore: 5,
    totalReviews: '1429',
    starTone: 'google',
    url: 'https://www.google.com/search?q=Rapid+Formations+Reviews',
    show: true,
  },
]

const meta: Meta<typeof ReviewRatingsTrack> = {
  component: ReviewRatingsTrack,
  title: 'Blocks/ReviewRatings',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed bg-[var(--surface-canvas)] px-5 py-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ReviewRatingsTrack>

export const Default: Story = {
  name: 'Trustpilot and Google',
  args: { platforms },
}

export const SinglePlatform: Story = {
  name: 'One platform',
  args: { platforms: [platforms[0]] },
}

export const ManyPlatforms: Story = {
  name: 'Carousels past two',
  args: {
    platforms: [
      ...platforms,
      {
        id: '3',
        provider: 'Facebook',
        logo: logo('Facebook', '415999'),
        score: 4.7,
        maxScore: 5,
        totalReviews: '91',
        starTone: 'facebook',
        url: 'https://www.facebook.com/rapidformations/reviews/',
        show: true,
      },
      {
        id: '4',
        provider: 'Yell',
        logo: logo('Yell', 'fddb00'),
        score: 5,
        maxScore: 5,
        totalReviews: '136',
        starTone: 'yell',
        url: 'https://www.yell.com/biz/rapid-formations-london-8353622/',
        show: true,
      },
    ],
  },
}
