import type { Meta, StoryObj } from '@storybook/react'

import { AutoplayVideo } from './AutoplayVideo'

const SRC =
  'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/case-studies/case_study_-_chalk_and_chilli+(720p).mp4'

const POSTER = 'https://d2zkzcdiu38fde.cloudfront.net/images/4931eecc-8725-4077-aa89-2f76e32810fa.png'

const CAPTIONS =
  'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/case_study_caption_auto-generated.vtt'

const meta: Meta<typeof AutoplayVideo> = {
  component: AutoplayVideo,
  title: 'Base Components/AutoplayVideo',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    src: SRC,
    poster: POSTER,
    title: 'Successful businesses start here video',
  },
}

export default meta
type Story = StoryObj<typeof AutoplayVideo>

export const Default: Story = {}

export const WithCaptions: Story = {
  args: { captionsUrl: CAPTIONS },
}

export const AutoplayDisabled: Story = {
  args: { autoplay: false },
}

export const WithoutPoster: Story = {
  args: { poster: undefined },
}

export const Portrait: Story = {
  args: { videoClassName: 'block aspect-[9/16] w-full max-w-[360px] object-cover' },
}

export const BelowTheFold: Story = {
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', padding: '2rem' }}>
        <div style={{ height: '140vh' }} />
        <Story />
        <div style={{ height: '140vh' }} />
      </div>
    ),
  ],
}
