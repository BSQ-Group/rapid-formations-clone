import type { Meta, StoryObj } from '@storybook/react'
import { RegisterOverseasBlock } from './Component'
import type { RegisterOverseasBlock as RegisterOverseasBlockProps } from '@/payload-types'

const mockImage = {
  id: 'image-1',
  url: 'https://placehold.co/1128x686/e8f5e9/1c1d24?text=Non-resident+UK+company+formation',
  filename: 'non-residents-package.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  width: 1128,
  height: 686,
  alt: 'Non-resident UK company formation.',
  createdAt: '',
  updatedAt: '',
} as any

const portraitImage = {
  ...mockImage,
  id: 'image-2',
  url: 'https://placehold.co/686x1128/e8f5e9/1c1d24?text=Portrait',
  width: 686,
  height: 1128,
} as any

const ELIGIBILITY_URL =
  'https://www.rapidformations.co.uk/company-formation/non-residents-package/eligible-countries?utm_source=storybook&utm_campaign=overflow'

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

const linkNode = (text: string, url: string) => ({
  type: 'link',
  children: [textNode(text)],
  direction: 'ltr',
  fields: { linkType: 'custom', newTab: false, url },
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
  }) as RegisterOverseasBlockProps['body']

const sourceBody = richText([
  paragraph([
    textNode(
      'We have created specialist packages for customers who want to set up a company and are based outside of the UK.',
    ),
  ]),
  paragraph([
    textNode(
      'They include everything you need to form a UK limited company, plus a London Registered Office Address for 12 months, a Wise UK business account referral, and our Hassle-Free Compliance Service to help you keep your company compliant.',
    ),
  ]),
  paragraph([
    textNode('We can register companies for customers who are residents of most countries. '),
    linkNode('Find out if your country is eligible.', '/company-formation/eligible-countries'),
  ]),
])

const defaultArgs: RegisterOverseasBlockProps = {
  id: 'story-register-overseas',
  blockType: 'registerOverseas',
  blockName: 'Register Overseas',
  sectionHeading: 'Want to register a UK company from abroad?',
  heading: 'Non-resident UK company formation',
  body: sourceBody,
  cta: {
    label: 'Our Non-Resident Packages',
    type: 'custom',
    url: '/compare-packages/non-residents/',
    newTab: false,
    reference: null,
  },
  image: mockImage,
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof RegisterOverseasBlock> = {
  component: RegisterOverseasBlock,
  title: 'Blocks/RegisterOverseas',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="theme-rapidformations bg-[var(--surface-canvas)]">
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

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    sectionHeading: 'Register from abroad',
    heading: 'Non-resident formation',
    body: richText([paragraph([textNode('Set up from anywhere.')])]),
    cta: { ...defaultArgs.cta, label: 'Start' } as RegisterOverseasBlockProps['cta'],
  },
}

export const LongCopy: Story = {
  args: {
    ...defaultArgs,
    sectionHeading:
      'Want to register a UK limited company from abroad, as a non-UK resident, without ever travelling to the United Kingdom?',
    heading:
      'Non-resident UK company formation, including a Central London registered office address and full statutory compliance support',
    body: richText([
      paragraph([
        textNode(
          'We have created specialist packages for customers who want to set up a company and are based outside of the UK, wherever in the world they happen to live and whichever currency they happen to bank in.',
        ),
      ]),
      paragraph([
        textNode(
          'They include everything you need to form a UK limited company, plus a London Registered Office Address for 12 months, a Wise UK business account referral, and our Hassle-Free Compliance Service to help you keep your company compliant year after year.',
        ),
      ]),
      paragraph([
        textNode('We can register companies for customers who are residents of most countries. '),
        linkNode('Find out if your country is eligible.', '/company-formation/eligible-countries'),
      ]),
    ]),
    cta: {
      ...defaultArgs.cta,
      label: 'Compare our non-resident company formation packages',
    } as RegisterOverseasBlockProps['cta'],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    sectionHeading: `Eligibility list: ${ELIGIBILITY_URL}`,
    heading: `non.resident.company.formations@rapidformations-worldwide-group.co.uk`,
    body: richText([
      paragraph([textNode(`Full terms are published at ${ELIGIBILITY_URL}`)]),
      paragraph([
        textNode('Questions go to '),
        linkNode(
          'non.resident.company.formations@rapidformations-worldwide-group.co.uk',
          ELIGIBILITY_URL,
        ),
      ]),
    ]),
    cta: { ...defaultArgs.cta, label: ELIGIBILITY_URL } as RegisterOverseasBlockProps['cta'],
  },
}

export const PortraitImage: Story = {
  args: {
    ...defaultArgs,
    image: portraitImage,
  },
}

export const NoImageNoCta: Story = {
  args: {
    ...defaultArgs,
    image: null as any,
    cta: null as any,
  },
}
