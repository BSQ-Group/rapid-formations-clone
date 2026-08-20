import type { Meta, StoryObj } from '@storybook/react'

import type { AdBannerBlock } from '@/payload-types'
import { AdBannerBlock as AdBanner } from './Component'

const textNode = (text: string) => ({
  type: 'text',
  text,
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  version: 1,
})

const paragraph = (children: unknown[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const richText = (children: unknown[]) =>
  ({
    root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 },
  }) as AdBannerBlock['body']

const meta: Meta<typeof AdBanner> = {
  title: 'Blocks/AdBanner',
  component: AdBanner,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)] py-10">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AdBanner>

export const TelephoneOrder: Story = {
  args: {
    blockType: 'adBanner',
    heading: 'Need help forming your company?',
    body: richText([
      paragraph([
        textNode('Our friendly team are available by phone to answer any questions you may have.'),
      ]),
    ]),
    cta: { type: 'custom', url: 'tel:+442078719990', label: '020 7871 9990', newTab: false },
  } as AdBannerBlock,
}

export const ShortCopy: Story = {
  args: {
    blockType: 'adBanner',
    heading: 'Call us',
    body: richText([paragraph([textNode('We are here.')])]),
    cta: { type: 'custom', url: 'tel:+442078719990', label: '020 7871 9990', newTab: false },
  } as AdBannerBlock,
}

export const LongCopyAndUnbrokenToken: Story = {
  args: {
    blockType: 'adBanner',
    heading:
      'Need help forming your company, choosing the right package, or understanding what Companies House requires from you?',
    body: richText([
      paragraph([
        textNode(
          'Our friendly team are available by phone, email and live webchat to answer any questions you may have before, during and after the incorporation process.',
        ),
      ]),
      paragraph([
        textNode(
          'Or write to companyformations@rapidformations.co.uk and we will reply the same day.',
        ),
      ]),
    ]),
    cta: {
      type: 'custom',
      url: 'tel:+442078719990',
      label: '020 7871 9990 (Mon-Fri, 9am-6pm)',
      newTab: false,
    },
  } as AdBannerBlock,
}

export const NoCta: Story = {
  args: {
    blockType: 'adBanner',
    heading: 'Need help forming your company?',
    body: richText([
      paragraph([
        textNode('Our friendly team are available by phone to answer any questions you may have.'),
      ]),
    ]),
  } as AdBannerBlock,
}
