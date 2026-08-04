import type { Meta, StoryObj } from '@storybook/react'
import { WhyChooseUsBlock } from './Component'
import type { WhyChooseUsBlock as WhyChooseUsBlockProps } from '@/payload-types'

const media = (id: string, alt: string, width: number, height: number) => ({
  id,
  url: `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=${width}&h=${height}&fit=crop`,
  alt,
  filename: `${id}.jpg`,
  mimeType: 'image/jpeg',
  filesize: 100000,
  width,
  height,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
})

const TRUSTPILOT_URL = 'https://uk.trustpilot.com/review/rapidformations.co.uk'

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

const linkNode = (text: string, url: string, newTab = true) => ({
  type: 'link',
  children: [textNode(text)],
  direction: 'ltr',
  fields: { linkType: 'custom', newTab, url },
  format: '',
  indent: 0,
  version: 3,
})

const richText = (paragraphs: unknown[]) =>
  ({
    root: {
      type: 'root',
      children: paragraphs,
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  }) as WhyChooseUsBlockProps['panes'][number]['body']

const plain = (...texts: string[]) => richText(texts.map((t) => paragraph([textNode(t)])))

const sectionLayout = {
  background: 'inverse' as const,
  paddingTop: 'none' as const,
  paddingBottom: 'none' as const,
}

const defaultArgs = {
  id: 'story-1',
  blockType: 'whyChooseUs' as const,
  blockName: 'Why Choose Us',
  heading: 'Why register your company with Rapid Formations',
  panes: [
    {
      id: 'p1',
      title: 'We are highly rated everywhere',
      body: richText([
        paragraph([
          textNode('Thousands of excellent reviews on '),
          linkNode('Trustpilot', TRUSTPILOT_URL),
          textNode(', Google and Feefo from customers who have formed their company with us.'),
        ]),
      ]),
      image: media('p1', 'Customers rating our service.', 439, 400),
    },
    {
      id: 'p2',
      title: 'Over 750,000 companies formed',
      body: plain(
        'We have been incorporating companies at Companies House since 2011 and are a recognised authority on UK company formation.',
      ),
      image: media('p2', 'Team forming companies.', 439, 400),
    },
    {
      id: 'p3',
      title: 'Free business bank account',
      body: plain(
        'Every package includes a referral to a UK business bank account, with no monthly fee for the first year.',
      ),
      image: media('p3', 'Business banking.', 439, 400),
    },
  ],
  sectionLayout,
}

const meta: Meta<typeof WhyChooseUsBlock> = {
  title: 'Blocks/WhyChooseUs',
  component: WhyChooseUsBlock,
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

type Story = StoryObj<typeof WhyChooseUsBlock>

export const Default: Story = { args: defaultArgs }

export const LongCopy: Story = {
  args: {
    ...defaultArgs,
    heading:
      'Why register your company with Rapid Formations rather than\nfiling the paperwork at Companies House yourself',
    panes: [
      {
        id: 'p1',
        title: 'We are highly rated everywhere our customers think to look for an opinion',
        body: richText([
          paragraph([
            textNode('Thousands of excellent reviews on '),
            linkNode('Trustpilot', TRUSTPILOT_URL),
            textNode(
              ', Google and Feefo from customers who have formed their company with us, and who came back to us afterwards for a registered office address, a business bank account referral or ongoing compliance support.',
            ),
          ]),
          paragraph([
            textNode(
              'We answer the phone, we reply to email the same working day, and we do not charge for the advice that helps you pick the right structure in the first place.',
            ),
          ]),
        ]),
        image: media('p1', 'Customers rating our service.', 439, 400),
      },
      ...defaultArgs.panes.slice(1),
    ],
  },
}

export const TerseCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'Why us',
    panes: [
      {
        id: 'p1',
        title: 'Rated well',
        body: plain('People like us.'),
        image: media('p1', 'Happy customer.', 439, 400),
      },
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: 'unternehmensgruendungsberatung@rapidformations.co.uk',
    panes: [
      {
        id: 'p1',
        title: 'Kapitalgesellschaftsgruendungsberatungsgesellschaft',
        body: plain(
          'Read the detail at https://www.rapidformations.co.uk/company-formation-packages/all-inclusive-package/ or write to unternehmensberatungsgesellschaft@rapidformations.co.uk',
        ),
        image: media('p1', 'Documents.', 439, 400),
      },
      ...defaultArgs.panes.slice(1),
    ],
  },
}

export const SinglePane: Story = {
  args: { ...defaultArgs, panes: [defaultArgs.panes[1]] },
}

export const FivePanes: Story = {
  args: {
    ...defaultArgs,
    panes: [
      ...defaultArgs.panes,
      {
        id: 'p4',
        title: 'London registered office address',
        body: plain(
          'Use our central London address as your registered office and keep your home address off the public register.',
        ),
        image: media('p4', 'London office.', 439, 400),
      },
      {
        id: 'p5',
        title: 'Support from company formation experts',
        body: plain(
          'Our team is available by phone, email and live chat, and every enquiry is answered by someone who forms companies daily.',
        ),
        image: media('p5', 'Support team.', 439, 400),
      },
    ],
  },
}

export const PortraitImages: Story = {
  args: {
    ...defaultArgs,
    panes: defaultArgs.panes.map((p) => ({ ...p, image: media(p.id, p.image.alt, 400, 439) })),
  },
}

export const MissingImage: Story = {
  args: {
    ...defaultArgs,
    panes: [
      {
        id: 'p1',
        title: 'We are highly rated everywhere',
        body: plain('Thousands of excellent reviews across Trustpilot, Google and Feefo.'),
        image: null,
      },
      ...defaultArgs.panes.slice(1),
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
      'Why register your company with Rapid Formations rather than\nfiling the paperwork at Companies House yourself',
    panes: [
      {
        id: 'p1',
        title: 'We are highly rated everywhere our customers think to look for an opinion',
        body: richText([
          paragraph([
            textNode('Thousands of excellent reviews on '),
            linkNode('Trustpilot', TRUSTPILOT_URL),
            textNode(
              ', Google and Feefo from customers who have formed their company with us, and who came back to us afterwards for a registered office address, a business bank account referral or ongoing compliance support. We answer the phone, we reply to email the same working day, and we do not charge for the advice that helps you pick the right structure in the first place.',
            ),
          ]),
        ]),
        image: media('p1', 'Customers rating our service.', 439, 400),
      },
      ...defaultArgs.panes.slice(1),
    ],
  },
}
