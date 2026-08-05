import type { Meta, StoryObj } from '@storybook/react'
import { TestimonialsBlock } from './Component'
import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'

const REVIEW_URL =
  'https://uk.trustpilot.com/review/www.rapidformations.co.uk?utm_source=storybook&utm_medium=block&utm_campaign=unbroken-token-check'

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '1200px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const LONG_HEADING =
  'Read what more than seven hundred and fifty thousand company directors have said about forming a limited company with Rapid Formations'

const LONG_SUBHEADING =
  'Every review below is collected and verified independently by Trustpilot, so you can see exactly what our customers thought of the incorporation process, the support they received afterwards, and the addresses and compliance services they went on to use.'

const LONG_CTA_LABEL = 'Read every verified customer review of our company formation service'

const defaultArgs: TestimonialsBlockProps = {
  id: 'story-testimonials',
  blockType: 'testimonials',
  blockName: 'Testimonials',
  heading: "Rapid Formations' customer reviews",
  subheading: 'Here’s what our customers think about our company formation services.',
  cta: {
    type: 'custom',
    url: '/customer-reviews/',
    newTab: false,
    label: 'Our Customer Reviews',
  },
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof TestimonialsBlock> = {
  component: TestimonialsBlock,
  title: 'Blocks/Testimonials',
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
type Story = StoryObj<typeof TestimonialsBlock>

export const Default: Story = { args: defaultArgs }

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'Our reviews',
    subheading: 'See for yourself.',
    cta: { ...defaultArgs.cta, label: 'Read more' },
  },
}

const longCopyArgs: TestimonialsBlockProps = {
  ...defaultArgs,
  heading: LONG_HEADING,
  subheading: LONG_SUBHEADING,
  cta: { ...defaultArgs.cta, label: LONG_CTA_LABEL },
}

export const LongCopy: Story = { args: longCopyArgs }

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: longCopyArgs,
}

const unbrokenTokenArgs: TestimonialsBlockProps = {
  ...defaultArgs,
  heading: `Customer reviews: ${REVIEW_URL}`,
  subheading: 'Questions? customer.reviews.team@rapidformations-worldwide-group.co.uk',
  cta: { ...defaultArgs.cta, label: REVIEW_URL },
}

export const UnbrokenTokens: Story = { args: unbrokenTokenArgs }

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: unbrokenTokenArgs,
}

export const NoSubheadingOrCta: Story = {
  args: {
    ...defaultArgs,
    subheading: null,
    cta: null as any,
  },
}

export const NoCta: Story = {
  args: {
    ...defaultArgs,
    cta: null as any,
  },
}

export const LightBackground: Story = {
  args: {
    ...defaultArgs,
    sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
  },
}
