import type { Meta, StoryObj } from '@storybook/react'
import type { BCorpCertificationBlock as BCorpCertificationBlockProps } from '@/payload-types'
import { BCorpCertificationBlock } from './Component'

const mediaStub = (url: string, alt: string, width: number, height: number) =>
  ({ id: url, url, alt, width, height, mimeType: 'image/png' }) as any

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

const EMAIL_TOKEN = 'sustainability.certification.enquiries@rapidformations-worldwide-group.co.uk'
const URL_TOKEN =
  'https://www.bcorporation.net/en-us/find-a-b-corp/company/bsq-group/?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Nachhaltigkeitszertifizierungsüberprüfungsverfahrensverordnung'

const defaultArgs: BCorpCertificationBlockProps = {
  blockType: 'bCorpCertification',
  backgroundImage: mediaStub(
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600',
    'Rapid Formations office interior',
    1600,
    1067,
  ),
  caption: 'Rapid Formations, Covent Garden HQ.',
  badge: mediaStub(
    'https://d2zkzcdiu38fde.cloudfront.net/images/709a0450-ecda-4be3-99b9-e550b1057e0c.png',
    'Rapid Formations is certified B-Corp.',
    3983,
    2001,
  ),
  badgeUrl: 'https://www.bcorporation.net/en-us/find-a-b-corp/company/bsq-group/',
  badgeLinkTitle: 'View Rapid Formations on the B Corporation website',
  sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof BCorpCertificationBlock> = {
  title: 'Blocks/BCorpCertification',
  component: BCorpCertificationBlock,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof BCorpCertificationBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const BadgeOnly: Story = {
  args: {
    ...defaultArgs,
    caption: null,
    badgeUrl: null,
    badgeLinkTitle: null,
  },
}

export const LongCaption: Story = {
  args: {
    ...defaultArgs,
    caption:
      'Rapid Formations, Covent Garden HQ — certified B Corporation since 2023, meeting the highest standards of verified social and environmental performance.',
  },
}

export const NarrowLongCaption: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    caption:
      'Rapid Formations, 71-75 Shelton Street, Covent Garden, London WC2H 9JQ — a certified B Corporation since 2023, meeting the highest verified standards of social and environmental performance, public transparency and legal accountability across every part of the business.',
    badgeLinkTitle:
      'View the full Rapid Formations B Corporation impact assessment, including our verified scores for governance, workers, community, environment and customers, on the B Lab directory',
  },
}

export const NarrowUnbrokenTokens: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    caption: `Certification enquiries: ${EMAIL_TOKEN} — ${GERMAN_TOKEN}`,
    badgeUrl: URL_TOKEN,
    badgeLinkTitle: `Verify at ${URL_TOKEN}`,
  },
}
