import type { Meta, StoryObj } from '@storybook/react'
import { FourStepsBlock } from './Component'
import type { FourStepsBlock as FourStepsBlockProps } from '@/payload-types'

const icon = (n: number) =>
  ({
    id: `icon-${n}`,
    url: `https://placehold.co/140x140/2196F3/ffffff?text=${n}`,
    width: 140,
    height: 140,
    alt: `Step ${n}`,
  }) as any

const defaultArgs: FourStepsBlockProps = {
  id: 'story-1',
  blockType: 'fourSteps',
  blockName: 'Four Steps',
  steps: [
    {
      id: 's1',
      image: icon(1),
      title: 'Choose a\ncompany name',
      description: 'Use our company name search tool to check if your company name is available.',
    },
    {
      id: 's2',
      image: icon(2),
      title: 'Select your\npackage',
      description:
        'Choose the right company formation package to register a company that suits your needs.',
    },
    {
      id: 's3',
      image: icon(3),
      title: 'Checkout\nand pay',
      description:
        'Review your chosen package and finalise your purchase by adding optional additional services.',
    },
    {
      id: 's4',
      image: icon(4),
      title: 'Complete\nyour order',
      description:
        'Submit your company details, choose an optional business bank account, and pay securely.',
    },
  ],
} as any

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

const EMAIL_TOKEN = 'company.formations.customer.services@rapidformations-worldwide-group.co.uk'
const URL_TOKEN =
  'https://www.rapidformations.co.uk/company-formation/checkout/confirm?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Unternehmensgründungsbegleitungsdienstleistungsvertrag'

const meta: Meta<typeof FourStepsBlock> = {
  component: FourStepsBlock,
  title: 'Blocks/FourSteps',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FourStepsBlock>

export const Default: Story = { args: defaultArgs }

export const ThreeSteps: Story = {
  args: { ...defaultArgs, steps: defaultArgs.steps!.slice(0, 3) },
}

export const NarrowLongCopy: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading: 'Register your UK limited company in four straightforward steps',
    subheading:
      'Everything Companies House needs, prepared for you and checked by a named company manager before it is filed on your behalf.',
    steps: [
      {
        id: 's1',
        image: icon(1),
        title: 'Choose an available\ncompany name',
        description:
          'Use our free company name search tool to check whether the name you want is available at Companies House, and whether it clashes with an existing registered trade mark.',
      },
      {
        id: 's2',
        image: icon(2),
        title: 'Select the formation\npackage that suits you',
        description:
          'Choose the right company formation package to register a company that suits your needs, from a simple digital package through to a fully-inclusive London address package.',
      },
      {
        id: 's3',
        image: icon(3),
        title: 'Check out and pay\nsecurely online',
        description:
          'Review your chosen package and finalise your purchase by adding any optional additional services, such as a business bank account introduction or a VAT registration.',
      },
      {
        id: 's4',
        image: icon(4),
        title: 'Complete your order\nand verify your identity',
        description:
          'Submit your company details, complete the identity verification that Companies House now requires of every officer, and your company is usually incorporated within 24 hours.',
      },
    ],
    ctaLink: {
      type: 'custom',
      url: '/company-formation',
      label: 'Start your company formation now',
      newTab: false,
    },
  } as any,
}

const EXTREME_HEADING =
  'Register your UK limited company in four straightforward steps, with every document Companies House needs prepared, checked and filed for you'

const EXTREME_SUBHEADING =
  'Everything Companies House needs, prepared for you and checked by a named company manager before it is filed on your behalf, including the memorandum and articles of association, the statement of capital and the register of people with significant control, all of which we store in your online company dashboard.'

const EXTREME_CTA_LABEL =
  'Start your company formation now and have your certificate of incorporation, your share certificates and your full set of statutory registers back from Companies House within 24 hours'

const extremeCopyArgs = {
  ...defaultArgs,
  heading: EXTREME_HEADING,
  subheading: EXTREME_SUBHEADING,
  ctaLink: { type: 'custom', url: '/company-formation', label: EXTREME_CTA_LABEL, newTab: false },
} as any

export const ExtremeCopy: Story = { args: extremeCopyArgs }

export const NarrowExtremeCopy: Story = {
  ...narrowViewport,
  args: extremeCopyArgs,
}

export const NoStepImages: Story = {
  args: {
    ...defaultArgs,
    steps: defaultArgs.steps!.map((step) => ({ ...step, image: null })),
  } as any,
}

export const SomeStepImagesMissing: Story = {
  args: {
    ...defaultArgs,
    steps: defaultArgs.steps!.map((step, i) => (i % 2 ? { ...step, image: null } : step)),
  } as any,
}

export const NarrowUnbrokenTokens: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading: GERMAN_TOKEN,
    subheading: `Questions? ${EMAIL_TOKEN}`,
    steps: [
      {
        id: 's1',
        image: icon(1),
        title: GERMAN_TOKEN,
        description: `Search at ${URL_TOKEN} to check availability.`,
      },
      {
        id: 's2',
        image: icon(2),
        title: `Email ${EMAIL_TOKEN}`,
        description: URL_TOKEN,
      },
      {
        id: 's3',
        image: icon(3),
        title: 'Checkout\nand pay',
        description: `${GERMAN_TOKEN} — ${EMAIL_TOKEN}`,
      },
      {
        id: 's4',
        image: icon(4),
        title: 'Complete\nyour order',
        description: 'Submit your company details and pay securely.',
      },
    ],
    ctaLink: { type: 'custom', url: URL_TOKEN, label: GERMAN_TOKEN, newTab: false },
  } as any,
}
