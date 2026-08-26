import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { VideoLibraryView, type LibraryCategory } from './VideoLibraryView'

const video = (
  id: string,
  vimeoId: string,
  title: string,
  duration: string | null = '3 mins',
  publishedDate: string | null = '10 December 2025',
) => ({ id, vimeoId, title, duration, publishedDate })

const meta: Meta<typeof VideoLibraryView> = {
  component: VideoLibraryView,
  title: 'Blocks/VideoLibrary',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="font-legacy-condensed bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof VideoLibraryView>

const asSource: LibraryCategory[] = [
  {
    name: 'Company Formation',
    videos: [
      video('1', '1145232700', 'Can I form a company with just one person?'),
      video('2', '1117029505', 'The best way to form a limited company in the UK', '5 mins'),
      video('3', '1119337678', 'What is a limited company?', '1 min', '9 September 2025'),
      video('4', '1119340122', 'Forming a limited company - what you need to know', '8 mins'),
    ],
  },
  {
    name: 'Business Structures',
    videos: [
      video('5', '1119347642', 'Different types of business structures for your startup'),
      video('6', '1119337678', 'Can anyone register a business in the UK?', '2 mins'),
      video('7', '1117029505', 'Can a non-UK resident form a UK limited company?'),
    ],
  },
]

/** The shape the /videos page actually renders: 8 categories, uneven counts. */
export const Default: Story = {
  args: { categories: asSource },
}

/**
 * Four categories is the button grid's natural row. Five wraps it — the case a
 * four-column grid is most likely to break.
 */
export const NavWrapsPastOneRow: Story = {
  args: {
    categories: [
      ...asSource,
      { name: 'Shares & Shareholders', videos: [video('8', '1145232700', 'Issuing shares')] },
      { name: 'Company Directors', videos: [video('9', '1119340122', 'Director duties')] },
      { name: 'Records & Compliance', videos: [video('10', '1119347642', 'Filing deadlines')] },
    ],
  },
}

/** One category, one video — the grid at its smallest. */
export const SingleVideo: Story = {
  args: {
    categories: [{ name: 'Finance & Tax', videos: [video('1', '1145232700', 'VAT explained')] }],
  },
}

/**
 * MANDATORY per the story rules: the longest plausible string in the narrowest
 * column, plus an unbroken token in every field an editor can type into. The
 * title has a min-height of 70px from 768 — this is what overflows it.
 */
export const LongCopyAndUnbrokenTokens: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    categories: [
      {
        name: 'Paying Yourself Through A Limited Company And Other Long Category Names',
        videos: [
          video(
            '1',
            '1145232700',
            'How and when do I file my first set of annual accounts with Companies House, and what happens if I miss the deadline?',
            '125 mins',
            '31 December 2025',
          ),
          video(
            '2',
            '1117029505',
            'Unternehmensgruendungsberatungsgesellschaft — questions@rapidformations.co.uk',
          ),
          video(
            '3',
            '1119337678',
            'https://www.rapidformations.co.uk/faqs/paying-yourself-through-limited-company',
          ),
        ],
      },
    ],
  },
}

/**
 * Duration and published date are both optional on the collection. The meta row
 * uses space-between, so a missing value must not strand the other one.
 */
export const MissingMetadata: Story = {
  args: {
    categories: [
      {
        name: 'Business Advice',
        videos: [
          video('1', '1145232700', 'No duration recorded', null),
          video('2', '1117029505', 'No published date recorded', '4 mins', null),
          video('3', '1119337678', 'Neither recorded', null, null),
        ],
      },
    ],
  },
}

/** Nothing to show — the block renders null upstream, the view guards too. */
export const Empty: Story = {
  args: { categories: [] },
}
