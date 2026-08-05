import type { Meta, StoryObj } from '@storybook/react'
import type { CustomerQuoteBlock as CustomerQuoteBlockProps, Media } from '@/payload-types'
import { CustomerQuoteBlock } from './Component'

const mediaStub = (url: string, alt: string, width: number, height: number): Media => ({
  id: url,
  url,
  alt,
  width,
  height,
  filename: 'author.webp',
  mimeType: 'image/webp',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
})

const square = mediaStub(
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=646&h=646&fit=crop',
  'Image of John Warbuton - CEO of Konsileo',
  646,
  646,
)

const portrait = mediaStub(
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=430&h=860&fit=crop',
  'Image of John Warbuton - CEO of Konsileo, portrait crop',
  430,
  860,
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

const VIMEO_URL = 'https://player.vimeo.com/video/1030834360?&autoplay=1&muted=0'

const EMAIL_TOKEN = 'john.warbuton.chief.executive@konsileo-insurance-brokers-limited.co.uk'
const URL_TOKEN =
  'https://www.rapidformations.co.uk/case-studies/konsileo-insurance-broker?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'

const defaultArgs: CustomerQuoteBlockProps = {
  blockType: 'customerQuote',
  quote:
    '"I found the company formation process straightforward. Rapid Formations are there to guide you through it."',
  authorName: 'John Warbuton',
  authorRole: 'CEO of Konsileo',
  image: square,
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof CustomerQuoteBlock> = {
  title: 'Blocks/CustomerQuote',
  component: CustomerQuoteBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="theme-rapidformations bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CustomerQuoteBlock>

export const Default: Story = { args: defaultArgs }

export const WithVideo: Story = { args: { ...defaultArgs, videoUrl: VIMEO_URL } }

export const WithVideoNarrow: Story = {
  ...narrowViewport,
  args: { ...defaultArgs, videoUrl: VIMEO_URL },
}

export const WithVideoNoImage: Story = {
  args: { ...defaultArgs, image: '', videoUrl: VIMEO_URL },
}

export const LongQuote: Story = {
  args: {
    ...defaultArgs,
    quote:
      '"I found the company formation process straightforward from beginning to end, and the team answered every question I had within the hour. Rapid Formations are there to guide you through it, whichever package you pick."',
  },
}

export const VeryLongQuote: Story = {
  args: {
    ...defaultArgs,
    quote:
      '"I found the company formation process straightforward from beginning to end, and the team answered every question I had within the hour, including the ones I only thought to ask after the company had already been incorporated. Rapid Formations are there to guide you through it, whichever package you pick, and the registered office service has quietly paid for itself several times over in the years since we started trading."',
  },
}

export const ThreeWordQuote: Story = {
  args: { ...defaultArgs, quote: '"Genuinely painless."', authorName: 'Jo Ray', authorRole: 'CEO' },
}

export const LongAuthorNameAndRole: Story = {
  args: {
    ...defaultArgs,
    authorName: 'John Warbuton-Fitzgerald and the Konsileo Founding Team',
    authorRole: 'Chief Executive Officer and Co-Founder of Konsileo Insurance Brokers Limited',
  },
}

export const PortraitImage: Story = {
  args: { ...defaultArgs, image: portrait },
}

export const NoImage: Story = {
  args: { ...defaultArgs, image: '' },
}

export const UnpopulatedImageId: Story = {
  args: { ...defaultArgs, image: '68b2c1f0a3d4e5f60718293a' },
}

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    quote: VeryLongQuote.args!.quote,
    authorName: LongAuthorNameAndRole.args!.authorName,
    authorRole: LongAuthorNameAndRole.args!.authorRole,
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    quote: `"Everything we needed was at ${URL_TOKEN} — and ${GERMAN_TOKEN} was never a problem."`,
    authorName: EMAIL_TOKEN,
    authorRole: GERMAN_TOKEN,
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: UnbrokenTokens.args,
}
