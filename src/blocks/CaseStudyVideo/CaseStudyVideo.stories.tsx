import type { Meta, StoryObj } from '@storybook/react'
import { CaseStudyVideoBlock } from './Component'
import type { CaseStudyVideoBlock as CaseStudyVideoBlockProps } from '@/payload-types'

const VIDEO_URL =
  'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/case-studies/case_study_-_chalk_and_chilli+(720p).mp4'
const CAPTIONS_URL =
  'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/case_study_caption_auto-generated.vtt'
const LONG_URL = `${VIDEO_URL}?utm_source=storybook&utm_medium=block&utm_campaign=unbroken-token-check`

const poster = {
  id: 'poster-1',
  url: 'https://placehold.co/1280x720/e8f5e9/1c1d24?text=Chalk+%2B+Chilli',
  alt: 'Chalk + Chilli founders in their studio.',
  filename: 'case-study-poster.png',
  mimeType: 'image/png',
  filesize: 0,
  width: 1280,
  height: 720,
  createdAt: '',
  updatedAt: '',
} as any

const portraitPoster = {
  ...poster,
  id: 'poster-portrait',
  url: 'https://placehold.co/720x1280/e8f5e9/1c1d24?text=Portrait+poster',
  width: 720,
  height: 1280,
}

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

const LONG_HEADING =
  'Successful businesses start here, and every one of them began with a single company registration filed at Companies House'

const LONG_SUBHEADING =
  'Chalk + Chilli transformed a kitchen-table idea into a thriving business with the help of Rapid Formations, and they were trading within a fortnight of first checking whether their chosen company name was even available.'

const defaultArgs: CaseStudyVideoBlockProps = {
  id: 'story-case-study-video',
  blockType: 'caseStudyVideo',
  blockName: 'Case Study Video',
  heading: 'Successful businesses start here',
  subheading:
    'Chalk + Chilli transformed their idea into a thriving business with the help of Rapid Formations',
  posterImage: poster,
  videoUrl: VIDEO_URL,
  captionsUrl: CAPTIONS_URL,
  autoplayInView: true,
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof CaseStudyVideoBlock> = {
  component: CaseStudyVideoBlock,
  title: 'Blocks/CaseStudyVideo',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CaseStudyVideoBlock>

export const Default: Story = { args: defaultArgs }

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'Their story',
    subheading: 'Two years in.',
  },
}

const longCopyArgs: CaseStudyVideoBlockProps = {
  ...defaultArgs,
  heading: LONG_HEADING,
  subheading: LONG_SUBHEADING,
}

export const LongCopy: Story = { args: longCopyArgs }

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: longCopyArgs,
}

const unbrokenTokenArgs: CaseStudyVideoBlockProps = {
  ...defaultArgs,
  heading:
    'Case study: https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/case-studies/case_study_-_chalk_and_chilli+(720p).mp4?utm_campaign=unbroken-token-check',
  subheading: 'Questions? case.studies.team@rapidformations-worldwide-group.co.uk',
  videoUrl: LONG_URL,
  captionsUrl: LONG_URL,
}

export const UnbrokenTokens: Story = { args: unbrokenTokenArgs }

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: unbrokenTokenArgs,
}

export const NoSubheading: Story = {
  args: {
    ...defaultArgs,
    subheading: null,
  },
}

export const NoPoster: Story = {
  args: {
    ...defaultArgs,
    posterImage: null,
  },
}

export const NoCaptions: Story = {
  args: {
    ...defaultArgs,
    captionsUrl: null,
  },
}

export const PortraitPoster: Story = {
  args: {
    ...defaultArgs,
    posterImage: portraitPoster,
  },
}

export const AutoplayOff: Story = {
  args: {
    ...defaultArgs,
    autoplayInView: false,
  },
}

export const LightBackground: Story = {
  args: {
    ...defaultArgs,
    sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
  },
}
