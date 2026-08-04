import type { Meta, StoryObj } from '@storybook/react'
import { RequiredInformationBlock } from './Component'
import type { RequiredInformationBlock as RequiredInformationBlockProps } from '@/payload-types'

const squareImage = {
  id: 'image-1',
  url: 'https://placehold.co/600x600/e8f5e9/1c1d24?text=Company+name',
  alt: 'Trendy man on laptop searching for his company name for forming a company.',
  filename: 'company-name.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  width: 600,
  height: 600,
  createdAt: '',
  updatedAt: '',
} as any

const portraitImage = {
  ...squareImage,
  id: 'image-portrait',
  url: 'https://placehold.co/400x800/e8f5e9/1c1d24?text=Portrait',
  alt: 'Portrait photograph of a company director reviewing formation documents.',
  width: 400,
  height: 800,
}

const REPORT_URL =
  'https://www.rapidformations.co.uk/help-centre/required-information/?utm_source=storybook&utm_medium=block&utm_campaign=unbroken-token-check'

const richText = (
  ...children: Array<
    | { text: string }
    | { link: { label: string; url: string } }
  >
) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          textFormat: 0,
          children: children.map((child) =>
            'link' in child
              ? {
                  type: 'link',
                  format: '',
                  indent: 0,
                  version: 3,
                  direction: 'ltr',
                  fields: {
                    linkType: 'custom',
                    newTab: false,
                    url: child.link.url,
                  },
                  children: [
                    {
                      type: 'text',
                      text: child.link.label,
                      format: 0,
                      detail: 0,
                      mode: 'normal',
                      style: '',
                      version: 1,
                    },
                  ],
                }
              : {
                  type: 'text',
                  text: child.text,
                  format: 0,
                  detail: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
          ),
        },
      ],
    },
  }) as any

const twoParagraphsAndList = {
  root: {
    type: 'root',
    format: '',
    indent: 0,
    version: 1,
    direction: 'ltr',
    children: [
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        children: [
          {
            type: 'text',
            text: 'Every UK company must have a registered office where official correspondence from Companies House and HMRC can be sent.',
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
      },
      {
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        textFormat: 0,
        children: [
          {
            type: 'text',
            text: 'If you do not have one, the following packages include a London registered office address:',
            format: 0,
            detail: 0,
            mode: 'normal',
            style: '',
            version: 1,
          },
        ],
      },
      {
        type: 'list',
        listType: 'bullet',
        start: 1,
        tag: 'ul',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'listitem',
            value: 1,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'text',
                text: 'Privacy Package',
                format: 0,
                detail: 0,
                mode: 'normal',
                style: '',
                version: 1,
              },
            ],
          },
          {
            type: 'listitem',
            value: 2,
            format: '',
            indent: 0,
            version: 1,
            direction: 'ltr',
            children: [
              {
                type: 'text',
                text: 'All Inclusive Package',
                format: 0,
                detail: 0,
                mode: 'normal',
                style: '',
                version: 1,
              },
            ],
          },
        ],
      },
    ],
  },
} as any

const sourceItems = [
  {
    id: 'item-1',
    title: 'Company name',
    description: richText({
      text: 'Choose a unique company name that is not already registered with Companies House. You can check availability instantly using our company name checker before you start.',
    }),
    image: squareImage,
  },
  {
    id: 'item-2',
    title: 'Registered office address',
    description: richText(
      {
        text: 'Every UK company must have a registered office where official correspondence from Companies House and HMRC can be sent. If you don’t have one, our ',
      },
      { link: { label: 'Privacy Package', url: '/package/privacy-package/' } },
      { text: ' and ' },
      { link: { label: 'All Inclusive Package', url: '/package/all-inclusive-package/' } },
      { text: ' include a London registered office address.' },
    ),
    image: {
      ...squareImage,
      id: 'image-2',
      url: 'https://placehold.co/600x600/e8f5e9/1c1d24?text=Registered+office',
      alt: 'Outside view of our London HQ office where we provide a registered office address service.',
    },
  },
  {
    id: 'item-3',
    title: 'Director and shareholder details',
    description: richText({
      text: 'You’ll need basic information for your company director(s) and shareholder(s), including full name, residential address, date of birth, nationality, and occupation.',
    }),
    image: {
      ...squareImage,
      id: 'image-3',
      url: 'https://placehold.co/600x600/e8f5e9/1c1d24?text=Directors',
      alt: 'Woman showing man company documents which include director and shareholder information for a company.',
    },
  },
]

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '2400px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const LONG_HEADING =
  'Everything you need to have ready before you register a private company limited by shares with Companies House in the United Kingdom'

const LONG_SUBHEADING =
  'Registering a company in the United Kingdom is quick and straightforward, but Companies House will not accept an incorporation application until every one of the following details has been supplied in full and checked for accuracy.'

const LONG_TITLE =
  'The registered office address that will appear on the public register for correspondence'

const LONG_DESCRIPTION =
  'Every UK company must have a registered office address in the same jurisdiction in which it is incorporated, and that address is where all official correspondence from Companies House, HM Revenue and Customs and any other government body will be delivered. It appears on the public register, so a great many company directors prefer to use a professional service address rather than publish the address of their own home to the whole world.'

const LONG_CTA_LABEL = 'Register your new company online with Rapid Formations today'

const defaultArgs: RequiredInformationBlockProps = {
  id: 'story-required-information',
  blockType: 'requiredInformation',
  blockName: 'Required Information',
  heading: 'Information required for UK company formation',
  subheading:
    'Registering a company in the UK is quick and straightforward. You’ll just need a few key details before you begin.',
  items: sourceItems,
  cta: {
    type: 'custom',
    url: '#home-top',
    newTab: false,
    label: 'Register Now',
  },
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof RequiredInformationBlock> = {
  component: RequiredInformationBlock,
  title: 'Blocks/RequiredInformation',
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
type Story = StoryObj<typeof RequiredInformationBlock>

export const Default: Story = { args: defaultArgs }

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'What we need',
    subheading: 'Three quick things.',
    items: sourceItems.map((item, index) => ({
      ...item,
      id: `short-${index}`,
      title: 'Your name',
      description: richText({ text: 'Just a name.' }),
    })),
    cta: { ...defaultArgs.cta, label: 'Start' },
  },
}

const longCopyArgs: RequiredInformationBlockProps = {
  ...defaultArgs,
  heading: LONG_HEADING,
  subheading: LONG_SUBHEADING,
  items: sourceItems.map((item, index) => ({
    ...item,
    id: `long-${index}`,
    title: LONG_TITLE,
    description: richText({ text: LONG_DESCRIPTION }),
  })),
  cta: { ...defaultArgs.cta, label: LONG_CTA_LABEL },
}

export const LongCopy: Story = { args: longCopyArgs }

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: longCopyArgs,
}

const unbrokenTokenArgs: RequiredInformationBlockProps = {
  ...defaultArgs,
  heading: `Information required: ${REPORT_URL}`,
  subheading: `Questions? formations.support.team@rapidformations-worldwide-group.co.uk`,
  items: sourceItems.map((item, index) => ({
    ...item,
    id: `token-${index}`,
    title: `company.formations.enquiries@rapidformations-worldwide-group.co.uk`,
    description: richText({ text: `Full guidance at ${REPORT_URL}` }),
  })),
  cta: { ...defaultArgs.cta, label: REPORT_URL },
}

export const UnbrokenTokens: Story = { args: unbrokenTokenArgs }

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: unbrokenTokenArgs,
}

export const RichDescription: Story = {
  args: {
    ...defaultArgs,
    items: sourceItems.map((item, index) => ({
      ...item,
      id: `rich-${index}`,
      description: twoParagraphsAndList,
    })),
  },
}

export const SingleItem: Story = {
  args: {
    ...defaultArgs,
    items: [sourceItems[0]],
  },
}

export const FourItems: Story = {
  args: {
    ...defaultArgs,
    items: [
      ...sourceItems,
      {
        ...sourceItems[0],
        id: 'item-4',
        title: 'Share capital and shareholdings',
        description: richText({
          text: 'Decide how many shares to issue, what each is worth, and who holds them. Most new companies start with a single ordinary share of £1.',
        }),
        image: portraitImage,
      },
    ],
  },
}

export const NoSubheadingOrCta: Story = {
  args: {
    ...defaultArgs,
    subheading: null,
    cta: null as any,
  },
}

const imagelessItems = sourceItems.map((item, index) => ({
  ...item,
  id: `no-image-${index}`,
  image: null,
})) as unknown as RequiredInformationBlockProps['items']

export const MissingImages: Story = {
  args: {
    ...defaultArgs,
    items: imagelessItems,
  },
}
