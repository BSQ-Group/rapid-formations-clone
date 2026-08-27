import type { Meta, StoryObj } from '@storybook/react'

import { ReviewCentreIntro } from './index'

const image = {
  id: 'review-centre-hero',
  url: 'https://placehold.co/1920x400/d9d2c6/595959?text=+',
  filename: 'review-centre-hero.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  width: 1920,
  height: 400,
  alt: 'Man looking at a laptop and smiling.',
  createdAt: '',
  updatedAt: '',
} as any

const portraitImage = {
  ...image,
  url: 'https://placehold.co/600x1200/d9d2c6/595959?text=+',
  width: 600,
  height: 1200,
}

const body =
  'With over 13,000 excellent customer reviews from 5 different review platforms,\nwe are confident Rapid Formations is the highest rated company formation\nagent in the UK today.'

const meta: Meta<typeof ReviewCentreIntro> = {
  component: ReviewCentreIntro,
  title: 'Base Components/ReviewCentreIntro',
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
type Story = StoryObj<typeof ReviewCentreIntro>

export const Default: Story = {
  args: {
    blockType: 'reviewCentreIntro',
    image,
    title: 'Review Centre',
    isPageTitle: true,
    subtitle: 'We are highly rated everywhere',
    body,
  },
}

export const TitleOnly: Story = {
  args: { ...Default.args, subtitle: null, body: null },
}

export const NoSubtitle: Story = {
  args: { ...Default.args, subtitle: null },
}

export const NoBody: Story = {
  args: { ...Default.args, body: null },
}

export const NotPageTitle: Story = {
  args: { ...Default.args, isPageTitle: false },
}

export const ShortCopy: Story = {
  args: { ...Default.args, title: 'Reviews', subtitle: 'Rated well', body: 'Read them all.' },
}

export const LongCopy: Story = {
  args: {
    ...Default.args,
    title: 'The Rapid Formations Customer Review Centre and Independent Ratings Summary',
    subtitle:
      'We are highly rated everywhere our customers are able to leave us a review, across every independent platform we appear on',
    body: 'With well over thirteen thousand excellent customer reviews collected from five different independent review platforms, each of them verified and published exactly as it was written, we are confident that Rapid Formations is the highest rated company formation agent operating in the United Kingdom today, and we would encourage you to read them for yourself before deciding who to incorporate your company with.',
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...Default.args,
    title: 'https://www.rapidformations.co.uk/customer-reviews/review-centre',
    subtitle: 'Kundenbewertungszentrumsübersichtsseitenüberschrift',
    body: 'customer-review-centre@rapidformations.co.uk\nUnternehmensgründungsdienstleistungsbewertungsplattformvergleich',
  },
}

export const PortraitImage: Story = {
  args: { ...Default.args, image: portraitImage },
}

export const Narrow: Story = {
  ...LongCopy,
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '900px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}
