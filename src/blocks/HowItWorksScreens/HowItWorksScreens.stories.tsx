import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { HowItWorksScreensBlockComponent } from './Component'
import type { HowItWorksScreensBlock, Media } from '@/payload-types'

const meta: Meta<typeof HowItWorksScreensBlockComponent> = {
  title: 'Blocks/HowItWorksScreens',
  component: HowItWorksScreensBlockComponent,
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
type Story = StoryObj<typeof HowItWorksScreensBlockComponent>

const shot = (label: string, width = 900, height = 540) =>
  ({
    id: `screen-${label}`,
    filename: `${label}.png`,
    alt: '',
    url: `https://placehold.co/${width}x${height}/f1f1f1/595959?text=${encodeURIComponent(label)}`,
    width,
    height,
    mimeType: 'image/png',
    filesize: 0,
    createdAt: '',
    updatedAt: '',
  }) as Media

const three = [
  {
    id: '1',
    image: shot('Browse'),
    caption: 'Explore over 400 expertly crafted document templates.',
  },
  {
    id: '2',
    image: shot('Choose'),
    caption: 'Choose the templates you need. Full descriptions and previews available.',
  },
  {
    id: '3',
    image: shot('Download'),
    caption: 'The fully customisable templates download directly to your device.',
  },
]

export const Default: Story = {
  args: { blockType: 'howItWorksScreens', heading: 'How it works', chrome: true, screens: three },
}

export const NoChrome: Story = {
  args: { blockType: 'howItWorksScreens', heading: 'How it works', chrome: false, screens: three },
}

export const OneScreen: Story = {
  args: {
    blockType: 'howItWorksScreens',
    heading: 'How it works',
    chrome: true,
    screens: [three[0]],
  },
}

export const FourScreens: Story = {
  args: {
    blockType: 'howItWorksScreens',
    heading: 'How it works',
    chrome: true,
    screens: [...three, { id: '4', image: shot('Share'), caption: 'Share them with your team.' }],
  },
}

export const LongCopy: Story = {
  args: {
    blockType: 'howItWorksScreens',
    heading:
      'How the Business Document Template Library works, from first browse to final download',
    chrome: true,
    screens: three.map((screen, index) => ({
      ...screen,
      caption:
        index === 0
          ? 'Explore over 400 expertly crafted document templates covering finance, employment, company policies, non-disclosure agreements, commercial contracts and data protection, all reviewed by legal experts and kept current with changing legislation.'
          : screen.caption,
    })),
  },
}

export const UnbrokenTokens: Story = {
  args: {
    blockType: 'howItWorksScreens',
    heading: 'https://www.rapidformations.co.uk/business-templates/how-it-works',
    chrome: true,
    screens: [
      {
        id: '1',
        image: shot('Tokens'),
        caption: 'templates-and-documents@rapidformations.co.uk',
      },
      {
        id: '2',
        image: shot('German'),
        caption: 'Rechtsschutzversicherungsgesellschaftenvertragsvorlagendokumentation',
      },
      { id: '3', image: shot('Short'), caption: 'Download it.' },
    ],
  },
}

export const PortraitScreens: Story = {
  args: {
    blockType: 'howItWorksScreens',
    heading: 'How it works',
    chrome: true,
    screens: three.map((screen, index) => ({
      ...screen,
      image: shot(`Tall-${index + 1}`, 600, 900),
    })),
  },
}

export const Narrow: Story = {
  args: {
    blockType: 'howItWorksScreens',
    heading: 'How the Business Document Template Library works, start to finish',
    chrome: true,
    screens: [
      {
        id: '1',
        image: shot('Browse'),
        caption:
          'Explore over 400 expertly crafted document templates covering finance, employment, company policies, non-disclosure agreements, commercial contracts and data protection.',
      },
      {
        id: '2',
        image: shot('Tokens'),
        caption: 'templates-and-documents@rapidformations.co.uk',
      },
      { id: '3', image: shot('Short'), caption: 'Download it.' },
    ],
  },
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '1400px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}

export const MissingImage: Story = {
  args: {
    blockType: 'howItWorksScreens',
    heading: 'How it works',
    chrome: true,
    screens: [
      three[0],
      {
        id: '2',
        image: null,
        caption: 'This screen lost its media and drops out of the row.',
      },
      three[2],
    ] as unknown as HowItWorksScreensBlock['screens'],
  },
}
