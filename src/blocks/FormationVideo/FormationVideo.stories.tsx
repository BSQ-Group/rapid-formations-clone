import type { Meta, StoryObj } from '@storybook/react'
import type { FormationVideoBlock as FormationVideoBlockProps, Media } from '@/payload-types'
import { FormationVideoBlock } from './Component'

const mediaStub = (url: string, alt: string, width: number, height: number): Media => ({
  id: url,
  url,
  alt,
  width,
  height,
  filename: 'formation-video-still.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
})

const landscapeStill = mediaStub(
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&h=1080&fit=crop',
  'Forming a limited company - what you need to know.',
  1920,
  1080,
)

const portraitStill = mediaStub(
  'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=720&h=1280&fit=crop',
  'Forming a limited company, filmed vertically for social.',
  720,
  1280,
)

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

const VIMEO_URL = 'https://player.vimeo.com/video/1119340122?&autoplay=1&muted=0'
const MP4_URL =
  'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/case-studies/case_study_-_riderr+(720p).mp4'

const EMAIL_TOKEN = 'company.formation.beginners.enquiries@rapid-formations-limited.co.uk'
const URL_TOKEN =
  'https://www.rapidformations.co.uk/company-formation-for-beginners/how-to-form-a-limited-company?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'

const LONG_HEADING =
  'Company formation for beginners, explained end to end by our in-house company formation specialists'
const LONG_SUBHEADING =
  'Find out how to form a limited company in our 6 minute video, covering the paperwork, the people you need to name, the share structure you have to pick and everything Companies House will ask you for.'

const defaultArgs: FormationVideoBlockProps = {
  blockType: 'formationVideo',
  heading: 'Company formation for beginners',
  subheading: 'Find out how to form a limited company in our 6 minute video.',
  image: landscapeStill,
  videoUrl: VIMEO_URL,
  videoTitle: null,
  stillWidth: 'capped',
  showPlayIcon: false,
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof FormationVideoBlock> = {
  title: 'Blocks/FormationVideo',
  component: FormationVideoBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{ background: 'var(--surface-canvas-inverse)', width: '100%', padding: '2rem 0' }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FormationVideoBlock>

export const Default: Story = { args: defaultArgs }

export const WithPlayIcon: Story = {
  args: { ...defaultArgs, showPlayIcon: true },
}

export const NativeVideoFile: Story = {
  args: { ...defaultArgs, videoUrl: MP4_URL },
}

export const LongCopy: Story = {
  args: { ...defaultArgs, heading: LONG_HEADING, subheading: LONG_SUBHEADING },
}

export const LongCopyNarrow: Story = {
  ...narrowViewport,
  args: { ...defaultArgs, heading: LONG_HEADING, subheading: LONG_SUBHEADING },
}

export const ShortCopy: Story = {
  args: { ...defaultArgs, heading: 'Watch the video', subheading: 'Six minutes, start to finish' },
}

export const OptionalsAbsent: Story = {
  args: { ...defaultArgs, subheading: null, showPlayIcon: null },
}

export const BareStill: Story = {
  args: {
    ...defaultArgs,
    heading: null,
    subheading: null,
    videoTitle: 'Hassle-Free Compliance Service Explained',
    stillWidth: 'inset',
    showPlayIcon: true,
    sectionLayout: {
      background: 'light',
      paddingTop: 'none',
      paddingBottom: 'none',
      gap: 'section',
    },
  },
}

export const BareStillNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading: null,
    subheading: null,
    videoTitle: GERMAN_TOKEN,
    stillWidth: 'inset',
    showPlayIcon: true,
    sectionLayout: {
      background: 'light',
      paddingTop: 'none',
      paddingBottom: 'none',
      gap: 'section',
    },
  },
}

export const SubheadingOnly: Story = {
  args: { ...defaultArgs, heading: null, videoTitle: 'Watch the video' },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: GERMAN_TOKEN,
    subheading: `${EMAIL_TOKEN} ${URL_TOKEN}`,
    videoTitle: URL_TOKEN,
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading: GERMAN_TOKEN,
    subheading: `${EMAIL_TOKEN} ${URL_TOKEN}`,
  },
}

export const PortraitImage: Story = {
  args: { ...defaultArgs, image: portraitStill },
}

export const InsetStill: Story = {
  args: { ...defaultArgs, stillWidth: 'inset', showPlayIcon: true },
}

export const ImageAbsent: Story = {
  args: { ...defaultArgs, image: null },
}
