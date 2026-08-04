import type { Meta, StoryObj } from '@storybook/react'
import { ChooseCompanyStructureBlock } from './Component'

const media = (id: string, alt: string, width: number, height: number) => ({
  id,
  url: `https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=${width}&h=${height}&fit=crop`,
  alt,
  filename: `${id}.jpg`,
  mimeType: 'image/jpeg',
  filesize: 100000,
  width,
  height,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
})

const card = (
  id: string,
  title: string,
  body: string,
  label: string,
  width = 297,
  height = 167,
) => ({
  id,
  title,
  body,
  image: media(id, `Photo representing a ${title} company.`, width, height),
  link: { type: 'custom' as const, url: `/${id}`, newTab: false, label },
})

const defaultArgs = {
  id: 'story-1',
  blockType: 'chooseCompanyStructure' as const,
  blockName: 'Choose Company Structure',
  heading: 'Choose a company structure\nthat suits your needs',
  cards: [
    card(
      'private-limited-company',
      'Private Limited Company',
      'The most popular company structure in the UK. Limited by shares, owned by shareholders and run by directors.',
      'Privacy Package',
    ),
    card(
      'llp',
      'LLP',
      'Limited liability partnerships (LLPs) are increasing in popularity and combine the flexibility of a partnership with limited liability.',
      'LLP Package',
    ),
    card(
      'guarantee-company',
      'Guarantee Company',
      'Limited by guarantee rather than shares. Commonly used by charities, clubs and not-for-profit organisations.',
      'Guarantee Package',
    ),
  ],
  sectionLayout: {
    background: 'inverse' as const,
    paddingTop: 'none' as const,
    paddingBottom: 'none' as const,
  },
}

const meta: Meta<typeof ChooseCompanyStructureBlock> = {
  title: 'Blocks/ChooseCompanyStructure',
  component: ChooseCompanyStructureBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-canvas">
        <Story />
      </div>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof ChooseCompanyStructureBlock>

export const Default: Story = { args: defaultArgs }

export const LongCopy: Story = {
  args: {
    ...defaultArgs,
    heading:
      'Choose a company structure that suits the way you intend to trade,\nraise capital and distribute any profit to the people involved',
    cards: [
      card(
        'private-limited-company',
        'Private Company Limited by Shares (Incorporated in England and Wales)',
        'The most popular company structure in the United Kingdom by a considerable margin. It is limited by shares, owned by its shareholders and run by its appointed directors, and it remains the default recommendation for the overwhelming majority of people who intend to trade commercially and retain any resulting profit.',
        'Privacy and Protection Package',
      ),
      ...defaultArgs.cards.slice(1),
    ],
  },
}

export const TerseCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'Pick a structure',
    cards: [card('llp', 'LLP', 'For partners.', 'Buy')],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: 'unternehmensrechtsformwahl@rapidformations.co.uk',
    cards: [
      {
        id: 'llp',
        title: 'Kapitalgesellschaftsgruendungsberatung',
        body: 'Full details at https://www.rapidformations.co.uk/company-formation-packages/limited-liability-partnership-package/ or email unternehmensberatungsgesellschaft@rapidformations.co.uk',
        image: media('llp', 'Photo representing an LLP.', 297, 167),
        link: {
          type: 'custom' as const,
          url: '/llp',
          newTab: false,
          label: 'Kapitalgesellschaftsgruendungspaket',
        },
      },
      ...defaultArgs.cards.slice(1),
    ],
  },
}

export const LongestCopy: Story = {
  args: {
    ...defaultArgs,
    cards: [
      {
        id: 'private-limited-company',
        title: 'Private Company Limited by Shares',
        body: 'The most popular company structure in the United Kingdom by a considerable margin. It is limited by shares, owned by its shareholders and run by its appointed directors, and it remains the default recommendation for the overwhelming majority of people who intend to trade commercially and retain any resulting profit. It suits sole traders incorporating for the first time, established partnerships restructuring for limited liability, and overseas founders who need a recognised UK entity in order to open a business bank account, invoice British customers and hold intellectual property in this jurisdiction.',
        image: media('private-limited-company', 'Photo representing a limited company.', 297, 167),
        link: {
          type: 'custom' as const,
          url: '/private-limited-company',
          newTab: false,
          label: 'Privacy, Protection and Full Compliance Package for Non-Residents',
        },
      },
      ...defaultArgs.cards.slice(1),
    ],
  },
}

export const SingleCard: Story = {
  args: { ...defaultArgs, cards: [defaultArgs.cards[1]] },
}

export const FourCardsPastTheRow: Story = {
  args: {
    ...defaultArgs,
    cards: [
      ...defaultArgs.cards,
      card(
        'plc',
        'Public Limited Company',
        'Able to offer its shares to the general public and, subject to meeting the requirements, to seek a listing on a stock exchange.',
        'PLC Package',
      ),
    ],
  },
}

export const PortraitImages: Story = {
  args: {
    ...defaultArgs,
    cards: defaultArgs.cards.map((c) => ({
      ...c,
      image: media(c.id, c.image.alt, 167, 297),
    })),
  },
}

export const MissingImage: Story = {
  args: {
    ...defaultArgs,
    cards: [
      {
        id: 'llp',
        title: 'LLP',
        body: 'Limited liability partnerships combine the flexibility of a partnership with limited liability.',
        image: null,
        link: { type: 'custom' as const, url: '/llp', newTab: false, label: 'LLP Package' },
      },
      ...defaultArgs.cards.slice(1),
    ],
  } as never,
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

export const NarrowLongCopy: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading:
      'Choose a company structure that suits the way you intend to trade,\nraise capital and distribute any profit to the people involved',
    cards: [
      {
        id: 'private-limited-company',
        title: 'Private Company Limited by Shares (Incorporated in England and Wales)',
        body: 'The most popular company structure in the United Kingdom by a considerable margin. It is limited by shares, owned by its shareholders and run by its appointed directors, and it remains the default recommendation for the overwhelming majority of people who intend to trade commercially and retain any resulting profit.',
        image: media('private-limited-company', 'Photo representing a limited company.', 297, 167),
        link: {
          type: 'custom' as const,
          url: '/private-limited-company',
          newTab: false,
          label: 'Privacy and Protection Package',
        },
      },
      ...defaultArgs.cards.slice(1),
    ],
  },
}
