import type { Meta, StoryObj } from '@storybook/react'
import { MemberCard } from './MemberCard'
import { meetTheTeamStyles as s } from './MeetTheTeam.styles'

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

const photo = {
  id: 'staff-photo',
  alt: 'Cut-out portrait',
  url: 'https://d2zkzcdiu38fde.cloudfront.net/images/a648bace-5e85-4e98-b836-2d9eeb67455f.png',
  width: 370,
  height: 320,
  updatedAt: '2026-01-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any

const portraitPhoto = { ...photo, width: 320, height: 460 }

const FACTS = [
  { id: '1', label: 'Favourite Drink', value: 'Gin and Tonic.' },
  { id: '2', label: 'Favourite TV Series', value: 'Homeland and Hannibal.' },
  {
    id: '3',
    label: "Three Things You Can't Live Without",
    value: 'Music, Keeping Fit and Dining with Friends.',
  },
]

const meta: Meta<typeof MemberCard> = {
  title: 'Blocks/MeetTheTeam',
  component: MemberCard,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-canvas font-legacy-condensed p-8">
        <div className={s.grid}>
          <Story />
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MemberCard>

export const Default: Story = {
  args: {
    fullName: 'Peter',
    jobTitle: 'People & Communications Director',
    photo,
    facts: FACTS,
  },
}

export const ShortJobTitle: Story = {
  args: { fullName: 'Nick', jobTitle: 'Director', photo, facts: FACTS },
}

export const LongJobTitle: Story = {
  args: {
    fullName: 'Alexandra Featherstonehaugh-Whitworth',
    jobTitle:
      'Deputy Director of Operations, Company Secretarial Services and Registered Office Compliance',
    photo,
    facts: FACTS,
  },
}

export const LongJobTitleNarrow: Story = {
  ...narrowViewport,
  args: LongJobTitle.args,
}

export const UnbrokenToken: Story = {
  ...narrowViewport,
  args: {
    fullName: 'company-secretarial.department@rapidformations-incorporations.co.uk',
    jobTitle: 'https://www.rapidformations.co.uk/about-us/meet-the-team/compliance-department',
    photo,
    facts: [
      {
        id: '1',
        label: 'company-secretarial.department@rapidformations-incorporations.co.uk',
        value: 'https://www.rapidformations.co.uk/about-us/meet-the-team/compliance-department',
      },
    ],
  },
}

export const NoFacts: Story = {
  args: { fullName: 'Lauren', jobTitle: 'Head of People & Culture', photo, facts: [] },
}

export const OneFact: Story = {
  args: {
    fullName: 'Robert',
    jobTitle: 'Deputy Director of Operations',
    photo,
    facts: [FACTS[0]],
  },
}

export const ManyFacts: Story = {
  args: {
    fullName: 'Sian',
    jobTitle: 'Customer Service Advisor',
    photo,
    facts: [
      ...FACTS,
      { id: '4', label: 'Favourite Holiday Destination', value: 'Kefalonia.' },
      { id: '5', label: 'Favourite Book', value: 'The Secret History.' },
      { id: '6', label: 'Hidden Talent', value: 'Can name every UK motorway junction.' },
    ],
  },
}

export const PortraitPhoto: Story = {
  args: {
    fullName: 'Charlotte',
    jobTitle: 'Compliance Officer',
    photo: portraitPhoto,
    facts: FACTS,
  },
}

export const NoPhoto: Story = {
  args: { fullName: 'Tom', jobTitle: 'Web Developer', photo: null, facts: FACTS },
}
