import type { Meta, StoryObj } from '@storybook/react'
import { RegisterOverseasBlock } from './Component'
import type { RegisterOverseasBlock as RegisterOverseasBlockProps } from '@/payload-types'

const mockImage = {
  id: 'image-1',
  url: 'https://placehold.co/1128x686/e8f5e9/1c1d24?text=Register+Overseas',
  filename: 'register-overseas.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  width: 1128,
  height: 686,
  alt: 'Business owner working in a boutique clothing shop',
  createdAt: '',
  updatedAt: '',
} as any

const defaultArgs: RegisterOverseasBlockProps = {
  id: 'story-register-overseas',
  blockType: 'registerOverseas',
  blockName: 'Register Overseas',
  heading: 'Register a company in the UK from overseas',
  body: 'Quality Company Formations enable non-UK residents to register a company with a prestigious Central London office address which includes same-day digital mail service and business address service with international mail forwarding of all your business correspondence.',
  cta: {
    label: 'Start now',
    type: 'custom',
    url: '/register-overseas',
    newTab: false,
    reference: null,
  },
  image: mockImage,
  sectionLayout: { background: 'light', paddingTop: 'm', paddingBottom: 'm' },
}

const meta: Meta<typeof RegisterOverseasBlock> = {
  component: RegisterOverseasBlock,
  title: 'Blocks/RegisterOverseas',
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
type Story = StoryObj<typeof RegisterOverseasBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const NoImage: Story = {
  args: {
    ...defaultArgs,
    image: null as any,
  },
}

export const DarkBackground: Story = {
  args: {
    ...defaultArgs,
    sectionLayout: { background: 'dark', paddingTop: 'm', paddingBottom: 'm' },
  },
}
