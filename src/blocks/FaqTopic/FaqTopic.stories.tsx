import type { Meta, StoryObj } from '@storybook/react'

import type { FaqTopicBlock } from '@/payload-types'

import { FaqTopicCards } from './FaqTopicCards'

const image = (seed: string) =>
  ({
    id: `img-${seed}`,
    url: `https://placehold.co/480x365/cccccc/333333?text=${encodeURIComponent(seed)}`,
    filename: `${seed}.jpg`,
    mimeType: 'image/jpeg',
    filesize: 0,
    width: 480,
    height: 365,
    alt: `${seed} illustration.`,
    createdAt: '',
    updatedAt: '',
  }) as any

const topic = (title: string, url: string): NonNullable<FaqTopicBlock['topics']>[number] => ({
  id: url,
  title,
  image: image(title.replace(/\n/g, ' ')),
  url,
})

const topics = [
  topic('Basics', '/faqs/basics'),
  topic('Company Formation Process', '/faqs/the-formation-process'),
  topic('Company Names', '/faqs/company-names'),
  topic('Companies Limited by Shares', '/faqs/limited-by-shares'),
  topic('Directors', '/faqs/directors'),
  topic('People With Significant Control (PSCs)', '/faqs/pscs'),
]

const meta: Meta<typeof FaqTopicCards> = {
  component: FaqTopicCards,
  title: 'Blocks/FaqTopic',
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
type Story = StoryObj<typeof FaqTopicCards>

export const Default: Story = {
  args: { topics },
}

export const WrappedTitles: Story = {
  name: 'Titles with a hard line break',
  args: {
    topics: [
      topic('Company Records\nand Registers', '/faqs/company-records-and-registers'),
      topic('Company Meetings\nand Resolutions', '/faqs/company-meetings-and-resolutions'),
      topic('Paying Yourself Through\na Limited Company', '/faqs/paying-yourself-through-limited-company'),
      topic('Pay As You Earn (PAYE)\nand Payroll', '/faqs/paye-and-payroll'),
    ],
  },
}

export const SingleTopic: Story = {
  name: 'One card',
  args: { topics: [topics[0]] },
}
