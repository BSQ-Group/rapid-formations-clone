import type { Meta, StoryObj } from '@storybook/react'
import { AboutUsTabsClient } from './AboutUsTabsClient'
import { aboutUsTabsStyles as s } from './AboutUsTabs.styles'

const panel = (text: string) => (
  <p style={{ fontSize: 20, lineHeight: '30px', color: 'var(--text-on-light-muted)' }}>{text}</p>
)

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: { name: 'Mobile 390', styles: { width: '390px', height: '900px' }, type: 'mobile' },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const EMAIL_TOKEN = 'about.us.team.enquiries@rapid-formations-limited.co.uk'
const URL_TOKEN = 'https://www.rapidformations.co.uk/about-us/join-our-team?utm_source=storybook'
const GERMAN_TOKEN = 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'

const six = [
  { label: 'About Us', title: 'About Us', isPageTitle: true, panel: panel('Our mission, our numbers and our offices.') },
  { label: 'Our Story', title: 'Our Story', isPageTitle: false, panel: panel('Where it all began.') },
  { label: 'Our Values', title: 'Our Values', isPageTitle: false, panel: panel('Simplicity and affordability.') },
  { label: 'Our Services', title: 'Our Services', isPageTitle: false, panel: panel('Company registration and more.') },
  { label: 'Meet The Team', title: 'Meet The Team', isPageTitle: false, panel: panel('The people behind the company.') },
  { label: 'Join Our Team', title: 'Join Our Team', isPageTitle: false, panel: panel('We are always looking for people.') },
]

const meta: Meta<typeof AboutUsTabsClient> = {
  title: 'Blocks/AboutUsTabs',
  component: AboutUsTabsClient,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', width: '100%' }}>
        <div className={s.section}>
          <div className="container">
            <Story />
          </div>
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AboutUsTabsClient>

export const SixTabs: Story = { args: { tabs: six } }

export const SixTabsNarrow: Story = { ...narrowViewport, args: { tabs: six } }

export const SingleTab: Story = {
  args: { tabs: [{ label: 'About Us', title: 'About Us', isPageTitle: true, panel: panel('Only one tab.') }] },
}

export const OddCount: Story = { args: { tabs: six.slice(0, 5) } }

export const SevenTabs: Story = {
  args: {
    tabs: [
      ...six,
      { label: 'Press', title: 'Press', isPageTitle: false, panel: panel('One past the natural two-up row.') },
    ],
  },
}

export const LongLabels: Story = {
  args: {
    tabs: [
      {
        label: 'About Rapid Formations and everything we do',
        title: 'About Rapid Formations, the United Kingdom’s highest rated company formation agent',
        isPageTitle: true,
        panel: panel('Long labels wrap inside the tab.'),
      },
      {
        label: 'Our story so far, from 2011 to today',
        title: 'Our story so far',
        isPageTitle: false,
        panel: panel('Second tab.'),
      },
    ],
  },
}

export const LongLabelsNarrow: Story = { ...narrowViewport, args: LongLabels.args }

export const ShortLabels: Story = {
  args: {
    tabs: [
      { label: 'Us', title: 'Us', isPageTitle: true, panel: panel('Short.') },
      { label: 'Team', title: 'Team', isPageTitle: false, panel: panel('Short.') },
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    tabs: [
      { label: GERMAN_TOKEN, title: GERMAN_TOKEN, isPageTitle: true, panel: panel('German compound label.') },
      { label: EMAIL_TOKEN, title: URL_TOKEN, isPageTitle: false, panel: panel('Email and URL.') },
    ],
  },
}

export const UnbrokenTokensNarrow: Story = { ...narrowViewport, args: UnbrokenTokens.args }

export const NoPageTitleTab: Story = {
  args: { tabs: six.map((t) => ({ ...t, isPageTitle: false })) },
}

export const EmptyPanel: Story = {
  args: {
    tabs: [
      { label: 'About Us', title: 'About Us', isPageTitle: true, panel: null },
      { label: 'Our Story', title: 'Our Story', isPageTitle: false, panel: panel('This one has content.') },
    ],
  },
}
