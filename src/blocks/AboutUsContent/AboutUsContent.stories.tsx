import type { Meta, StoryObj } from '@storybook/react'
import type { Media } from '@/payload-types'
import { AboutUsContentBlock } from './Component'

const image = (seed: string, width: number, height: number): Media => ({
  id: seed,
  url: `https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=${width}&h=${height}&fit=crop`,
  alt: seed,
  width,
  height,
  filename: `${seed}.jpg`,
  mimeType: 'image/jpeg',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
})

const landscape = image('landscape', 480, 234)
const portrait = image('portrait', 300, 600)

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '1400px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const EMAIL_TOKEN = 'about.us.enquiries@rapid-formations-limited.co.uk'
const URL_TOKEN = 'https://www.rapidformations.co.uk/about-us/our-story-so-far?utm_source=storybook'
const GERMAN_TOKEN = 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'

const rich = (texts: string[], list?: string[]) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: [
        ...texts.map((text) => ({
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr' as const,
          textFormat: 0,
          textStyle: '',
          children: [
            { type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 },
          ],
        })),
        ...(list
          ? [
              {
                type: 'list',
                listType: 'bullet',
                start: 1,
                tag: 'ul',
                format: '',
                indent: 0,
                version: 1,
                direction: 'ltr' as const,
                children: list.map((text, i) => ({
                  type: 'listitem',
                  value: i + 1,
                  format: '',
                  indent: 0,
                  version: 1,
                  direction: 'ltr' as const,
                  children: [
                    {
                      type: 'text',
                      text,
                      format: 0,
                      style: '',
                      mode: 'normal',
                      detail: 0,
                      version: 1,
                    },
                  ],
                })),
              },
            ]
          : []),
      ],
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

const SHORT = rich(['We help people start companies.'])
const LONG = rich([
  'To remove the barriers to starting a business, by making it easy and affordable for anyone to set up a limited company in the UK. With over 36,000 business owners per year using Rapid Formations to register their company, we are one of the largest company formation agents in the country.',
])

const meta: Meta<typeof AboutUsContentBlock> = {
  title: 'Blocks/AboutUsContent',
  component: AboutUsContentBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AboutUsContentBlock>

const layout = {
  background: 'light',
  paddingTop: 'none',
  paddingBottom: 'none',
  gap: 'section',
} as const

export const ImageRows: Story = {
  args: {
    blockType: 'aboutUsContent',
    variant: 'imageRows',
    items: [
      {
        id: 'i1',
        width: 'full',
        panel: false,
        title: 'Our Mission',
        image: landscape,
        body: LONG,
        panelGroups: [],
      },
      {
        id: 'i2',
        width: 'full',
        panel: false,
        title: 'Our Services',
        image: landscape,
        body: LONG,
        panelGroups: [],
      },
    ],
    sectionLayout: layout,
  },
}

export const ImageRowsNarrow: Story = { ...narrowViewport, args: ImageRows.args }

export const TwoColumn: Story = {
  args: {
    blockType: 'aboutUsContent',
    variant: 'twoColumn',
    items: [
      {
        id: 'i1',
        width: 'full',
        panel: false,
        title: 'Rapid Formations has expanded by leaps and bounds',
        image: null,
        body: LONG,
        panelGroups: [],
      },
      {
        id: 'i2',
        width: 'left',
        panel: false,
        title: 'Where it all began',
        image: landscape,
        body: LONG,
        panelGroups: [],
      },
      {
        id: 'i3',
        width: 'right',
        panel: false,
        title: 'Leading the pack',
        image: landscape,
        body: LONG,
        panelGroups: [],
      },
    ],
    sectionLayout: layout,
  },
}

export const TwoColumnNarrow: Story = { ...narrowViewport, args: TwoColumn.args }

export const WithPanel: Story = {
  args: {
    blockType: 'aboutUsContent',
    variant: 'twoColumn',
    items: [
      {
        id: 'i1',
        width: 'left',
        panel: false,
        title: 'Customer Service Team',
        image: landscape,
        body: LONG,
        panelGroups: [],
      },
      {
        id: 'i2',
        width: 'right',
        panel: true,
        title: null,
        image: null,
        body: null,
        panelGroups: [
          {
            id: 'g1',
            icon: 'user',
            heading: 'The Role',
            body: rich(
              [],
              [
                'Provide excellent telephone, live chat and email support',
                'Develop a strong understanding of limited company procedures',
              ],
            ),
          },
          {
            id: 'g2',
            icon: 'heart',
            heading: 'Attributes we love',
            body: rich([], ['A positive attitude', 'A willingness to learn']),
          },
        ],
      },
    ],
    sectionLayout: layout,
  },
}

export const WithPanelNarrow: Story = { ...narrowViewport, args: WithPanel.args }

export const ShortCopy: Story = {
  args: {
    blockType: 'aboutUsContent',
    variant: 'twoColumn',
    items: [
      {
        id: 'i1',
        width: 'left',
        panel: false,
        title: 'Us',
        image: landscape,
        body: SHORT,
        panelGroups: [],
      },
    ],
    sectionLayout: layout,
  },
}

export const UnbrokenTokens: Story = {
  args: {
    blockType: 'aboutUsContent',
    variant: 'twoColumn',
    items: [
      {
        id: 'i1',
        width: 'left',
        panel: false,
        title: GERMAN_TOKEN,
        image: landscape,
        body: rich([`${EMAIL_TOKEN} ${URL_TOKEN}`]),
        panelGroups: [],
      },
      {
        id: 'i2',
        width: 'right',
        panel: true,
        title: null,
        image: null,
        body: null,
        panelGroups: [{ id: 'g1', icon: 'heart', heading: GERMAN_TOKEN, body: rich([URL_TOKEN]) }],
      },
    ],
    sectionLayout: layout,
  },
}

export const UnbrokenTokensNarrow: Story = { ...narrowViewport, args: UnbrokenTokens.args }

export const OptionalsAbsent: Story = {
  args: {
    blockType: 'aboutUsContent',
    variant: 'twoColumn',
    items: [
      {
        id: 'i1',
        width: 'left',
        panel: false,
        title: null,
        image: null,
        body: LONG,
        panelGroups: [],
      },
    ],
    sectionLayout: layout,
  },
}

export const ImageAbsent: Story = {
  args: {
    blockType: 'aboutUsContent',
    variant: 'imageRows',
    items: [
      {
        id: 'i1',
        width: 'full',
        panel: false,
        title: 'Our Mission',
        image: null,
        body: LONG,
        panelGroups: [],
      },
    ],
    sectionLayout: layout,
  },
}

export const PortraitImage: Story = {
  args: {
    blockType: 'aboutUsContent',
    variant: 'twoColumn',
    items: [
      {
        id: 'i1',
        width: 'left',
        panel: false,
        title: 'Tall photo',
        image: portrait,
        body: LONG,
        panelGroups: [],
      },
    ],
    sectionLayout: layout,
  },
}

export const PastNaturalRow: Story = {
  args: {
    blockType: 'aboutUsContent',
    variant: 'twoColumn',
    items: [
      {
        id: 'i1',
        width: 'left',
        panel: false,
        title: 'One',
        image: landscape,
        body: SHORT,
        panelGroups: [],
      },
      {
        id: 'i2',
        width: 'right',
        panel: false,
        title: 'Two',
        image: landscape,
        body: SHORT,
        panelGroups: [],
      },
      {
        id: 'i3',
        width: 'left',
        panel: false,
        title: 'Three',
        image: landscape,
        body: SHORT,
        panelGroups: [],
      },
      {
        id: 'i4',
        width: 'right',
        panel: false,
        title: 'Four',
        image: landscape,
        body: SHORT,
        panelGroups: [],
      },
      {
        id: 'i5',
        width: 'full',
        panel: false,
        title: 'Five spans both',
        image: landscape,
        body: SHORT,
        panelGroups: [],
      },
    ],
    sectionLayout: layout,
  },
}
