import type { Meta, StoryObj } from '@storybook/react'

import type { ReviewHighlightRowsBlock } from '@/payload-types'

import { ReviewHighlightRowsBlockComponent } from './Component'

const image = (label: string, colour: string) =>
  ({
    id: `img-${label}`,
    url: `https://placehold.co/600x600/${colour}/ffffff?text=${label}`,
    filename: `${label}.jpg`,
    mimeType: 'image/jpeg',
    filesize: 0,
    width: 600,
    height: 600,
    alt: `${label} illustration.`,
    createdAt: '',
    updatedAt: '',
  }) as any

const blue = { accentColour: '#3575A2', backgroundColour: '#D8F6FF', borderColour: '#53B7D3' }
const orange = { accentColour: '#FC8200', backgroundColour: '#FFEFDF', borderColour: '#D9B997' }

type Row = ReviewHighlightRowsBlock['rows'][number]

const rowOne: Row = {
  id: '1',
  image: image('Reviews', '3575A2'),
  imagePosition: 'right',
  title: "We didn't get over 13,000\nexcellent reviews by accident",
  body: 'Customer service excellence is something we are passionate about, and that passion, hard work and dedication has been rewarded and recognised by the people that matter - our customers. Thank you.',
  quote: {
    ...blue,
    text: 'Excellent service, meticulous attention to detail, expedited matters with alacrity and accuracy. All round very good service, thank you.',
    authorName: 'Geoffrey Connor',
  },
}

const rowTwo: Row = {
  id: '2',
  image: image('Support', 'FC8200'),
  imagePosition: 'left',
  title: 'Our customer support is with\nyou every step of the way',
  body: 'Our friendly Customer Service Team are available 8:30am-5:30pm, Monday-Friday, to assist you. Whether you have a tentative initial enquiry or a question regarding your order - we are here to help.',
  quote: {
    ...orange,
    text: 'Fantastic communication at every stage. Rapid Formations gave me the confidence on what I thought could be insurmountable. They are so efficient, all documents pertaining to my new have been received within the time frame they had indicated.',
    authorName: 'Alex Mudzikati',
  },
}

const meta: Meta<typeof ReviewHighlightRowsBlockComponent> = {
  component: ReviewHighlightRowsBlockComponent,
  title: 'Blocks/ReviewHighlightRows',
  parameters: { layout: 'fullscreen' },
  args: { blockType: 'reviewHighlightRows', rows: [rowOne, rowTwo] },
}

export default meta
type Story = StoryObj<typeof ReviewHighlightRowsBlockComponent>

export const Default: Story = {
  args: { rows: [rowOne, rowTwo] },
}

export const OneRow: Story = {
  args: { rows: [rowOne] },
}

export const FiveRows: Story = {
  args: {
    rows: [
      rowOne,
      rowTwo,
      { ...rowOne, id: '3', title: 'Our support doesn’t end\nonce you make a purchase' },
      { ...rowTwo, id: '4', title: 'We take full ownership of any\nproblems that may arise' },
      { ...rowOne, id: '5', title: 'A fifth row, past the natural four' },
    ],
  },
}

export const ImageAlwaysLeft: Story = {
  args: {
    rows: [
      { ...rowOne, imagePosition: 'left' },
      { ...rowTwo, imagePosition: 'left' },
    ],
  },
}

export const ShortCopy: Story = {
  args: {
    rows: [
      {
        ...rowOne,
        title: 'Rated well',
        body: 'Read them all.',
        quote: { ...blue, text: 'Great job.', authorName: 'Jo' },
      },
    ],
  },
}

export const LongCopy: Story = {
  args: {
    rows: [
      {
        ...rowOne,
        title:
          'We did not gather over thirteen thousand independently verified excellent customer reviews across five separate platforms by accident, and we do not intend to stop now',
        body: 'Customer service excellence is something we are passionate about, and that passion, hard work and dedication has been rewarded and recognised by the people that matter — our customers. Every review published on this page was written by somebody who incorporated a company through us, and every one of them is reproduced exactly as it was submitted, unedited and unfiltered, because we would rather you formed your own view than took ours.',
        quote: {
          ...blue,
          text: 'Excellent service, meticulous attention to detail, expedited matters with alacrity and accuracy, and every question I raised over the course of a fortnight was answered the same working day, often within the hour. All round very good service, thank you.',
          authorName: 'Geoffrey Alexander Connor-Whitfield-Fotheringay',
        },
      },
    ],
  },
}

export const NoImage: Story = {
  args: { rows: [{ ...rowOne, image: null } as unknown as Row] },
}

export const PortraitImage: Story = {
  args: {
    rows: [
      {
        ...rowOne,
        image: {
          ...image('Tall', '3575A2'),
          url: 'https://placehold.co/600x1400/3575A2/ffffff?text=Tall',
          width: 600,
          height: 1400,
        },
      },
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    rows: [
      {
        ...rowOne,
        title: 'https://www.rapidformations.co.uk/customer-reviews/#overview',
        body: 'Kundenbewertungszentrumsübersichtsseitenüberschrift customer-reviews@rapidformations.co.uk',
        quote: {
          ...blue,
          text: 'Unternehmensgründungsdienstleistungsbewertungsplattformvergleich',
          authorName: 'reviewer-with-a-very-long-handle@rapidformations.co.uk',
        },
      },
    ],
  },
}

export const Narrow: Story = {
  ...LongCopy,
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '1600px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}
