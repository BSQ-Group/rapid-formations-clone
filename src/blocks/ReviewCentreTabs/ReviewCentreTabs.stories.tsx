import type { Meta, StoryObj } from '@storybook/react'

import type { ReviewStat } from '@/payload-types'

import { ProviderPanel } from './ProviderPanel'
import { RatingsBanner } from './RatingsBanner'
import { ReviewCard, type ReviewCardProps } from './ReviewCard'
import { ReviewCentreTabsClient, type TabDefinition } from './ReviewCentreTabsClient'

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

const trustpilot: NonNullable<ReviewStat['platforms']>[number] = {
  id: '1',
  provider: 'Trustpilot',
  logo: logo('Trustpilot', '5eb27c'),
  score: 4.8,
  maxScore: 5,
  totalReviews: '11,974',
  starTone: 'trustpilot',
  url: 'https://uk.trustpilot.com/review/rapidformations.co.uk',
  show: true,
}

const google: NonNullable<ReviewStat['platforms']>[number] = {
  ...trustpilot,
  id: '2',
  provider: 'Google',
  logo: logo('Google', '4285f4'),
  score: 4.9,
  totalReviews: '1,238',
  starTone: 'google',
  url: 'https://www.google.com/',
}

let seq = 0
const review = (over: Partial<ReviewCardProps> = {}): ReviewCardProps => ({
  id: `review-${(seq += 1)}`,
  authorName: 'Harry Wilkinson',
  initials: 'HW',
  score: 5,
  age: '4 months ago',
  body: 'very transparent, simple to follow and the support team answered every question I had within the hour, which made the whole incorporation far less daunting than I expected it to be.',
  provider: 'Trustpilot',
  tone: 'trustpilot',
  ...over,
})

const reviews = [
  review(),
  review({ authorName: 'Ama Osei', initials: 'AO', age: '2 weeks ago', score: 4 }),
  review({ authorName: 'Tom', initials: 'T', age: 'yesterday', body: 'Quick and easy.' }),
  review({ authorName: 'Priya Raghunathan', initials: 'PR', age: '1 year ago', score: 5 }),
  review({ authorName: 'Jan Kowalski', initials: 'JK', age: '3 days ago', score: 3 }),
]

const panel = (platform: typeof trustpilot, items: ReviewCardProps[] = reviews): TabDefinition => ({
  id: platform.provider.toLowerCase(),
  label: platform.provider,
  content: (
    <ProviderPanel
      platform={platform}
      reviews={items}
      reviewsHeading="Our last five reviews...."
      readAllLabel="Read All Reviews"
      readAllTileLabel="Read all reviews"
    />
  ),
})

const overview = (platforms: (typeof trustpilot)[]): TabDefinition => ({
  id: 'overview',
  label: 'Overview',
  content: <RatingsBanner heading="How we are rated" platforms={platforms} />,
})

const meta: Meta<typeof ReviewCentreTabsClient> = {
  component: ReviewCentreTabsClient,
  title: 'Blocks/ReviewCentreTabs',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ReviewCentreTabsClient>

export const Default: Story = {
  args: { tabs: [panel(trustpilot), panel(google)] },
}

export const WithOverview: Story = {
  name: 'Overview tab first',
  args: { tabs: [overview([trustpilot, google]), panel(trustpilot), panel(google)] },
}

export const OverviewFullSet: Story = {
  name: 'Overview with every platform',
  args: {
    tabs: [
      overview([
        trustpilot,
        google,
        { ...google, id: '3', provider: 'Facebook', starTone: 'facebook', score: 4.7 },
        { ...google, id: '4', provider: 'Yell', starTone: 'yell', score: 5 },
        { ...google, id: '5', provider: 'FreeIndex', starTone: 'freeindex', score: 4.6 },
      ]),
    ],
  },
}

export const OverviewNarrow: Story = {
  name: 'Overview on a narrow screen',
  args: { tabs: [overview([trustpilot, google])] },
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '900px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}

export const OneTab: Story = {
  args: { tabs: [panel(trustpilot)] },
}

export const FiveTabs: Story = {
  args: {
    tabs: [
      panel(trustpilot),
      panel(google),
      panel({ ...google, provider: 'Facebook', starTone: 'facebook', id: '3' }),
      panel({ ...google, provider: 'Yell', starTone: 'yell', id: '4' }),
      panel({ ...google, provider: 'FreeIndex', starTone: 'freeindex', id: '5' }),
    ],
  },
}

export const NoReviews: Story = {
  args: { tabs: [panel(trustpilot, [])] },
}

export const LongLabels: Story = {
  args: {
    tabs: [
      { ...panel(trustpilot), label: 'Trustpilot verified customer reviews' },
      { ...panel(google), label: 'Google Business Profile reviews' },
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    tabs: [
      {
        ...panel(
          {
            ...trustpilot,
            provider: 'Kundenbewertungsplattform',
            totalReviews: '11,974',
          },
          [
            review({
              authorName: 'reviewer-with-a-very-long-handle@rapidformations.co.uk',
              initials: 'RE',
              body: 'Handelsregistereintragungsbestätigungsschreiben https://www.rapidformations.co.uk/customer-reviews/#trustpilot Betriebsvereinbarungsentwurfsdokumentationsvorlagenverzeichnis',
            }),
          ],
        ),
        label: 'Kundenbewertungsplattform',
      },
    ],
  },
}

export const Narrow: Story = {
  args: { tabs: [panel(trustpilot), panel(google)] },
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '1600px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}

export const Card: StoryObj<typeof ReviewCard> = {
  render: () => (
    <div className="mx-auto grid max-w-[575px] gap-5 p-5">
      <ReviewCard {...review()} />
      <ReviewCard {...review({ body: 'Quick and easy.', authorName: 'Tom', initials: 'T' })} />
      <ReviewCard
        {...review({
          authorName: 'Priya Raghunathan',
          initials: 'PR',
          body: 'A'.repeat(400),
        })}
      />
    </div>
  ),
}
