import type { Meta, StoryObj } from '@storybook/react'
import type { RegisterCtaPanelBlock as RegisterCtaPanelBlockProps } from '@/payload-types'
import { RegisterCtaPanelBlock } from './Component'

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
  'https://www.rapidformations.co.uk/formation-packages/all-inclusive-package/checkout?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Grundstücksverkehrsgenehmigungszuständigkeitsübertragungsverordnung'

const defaultArgs: RegisterCtaPanelBlockProps = {
  blockType: 'registerCtaPanel',
  heading: 'Are you ready to\nregister your company today?',
  description: 'Order online or if you have any questions, please call',
  descriptionSuffix: '.',
  phone: { type: 'custom', url: 'tel:+442078719990', label: '020 7871 9990', newTab: false },
  cta: { type: 'custom', url: '/packages', label: 'Register Now', newTab: false },
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof RegisterCtaPanelBlock> = {
  title: 'Blocks/RegisterCtaPanel',
  component: RegisterCtaPanelBlock,
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
type Story = StoryObj<typeof RegisterCtaPanelBlock>

export const Default: Story = { args: defaultArgs }

export const SingleLineHeading: Story = {
  args: { ...defaultArgs, heading: 'Ready to register your company?' },
}

export const ThreeWordHeading: Story = {
  args: { ...defaultArgs, heading: 'Register your company' },
}

export const LongHeading: Story = {
  args: {
    ...defaultArgs,
    heading:
      'Are you ready to register your company today, or would you rather talk it through with one of our London-based company formation agents first?',
  },
}

export const FiveLineHeading: Story = {
  args: {
    ...defaultArgs,
    heading: 'Are you ready\nto register\nyour company\nwith Companies House\ntoday?',
  },
}

export const LongDescription: Story = {
  args: {
    ...defaultArgs,
    description:
      'Order online in under ten minutes, or if you have any questions at all about which package suits the company you are about to register, please call our Covent Garden office on',
    descriptionSuffix: ' and ask for the formations team.',
  },
}

export const NoDescriptionSuffix: Story = {
  args: { ...defaultArgs, descriptionSuffix: null },
}

export const TerseDescription: Story = {
  args: { ...defaultArgs, description: 'Call us now', descriptionSuffix: '.' },
}

export const NoPhoneLabel: Story = {
  args: {
    ...defaultArgs,
    description: 'Order online — no phone number is published for this campaign',
    phone: { type: 'custom', url: 'tel:+442078719990', label: '', newTab: false },
  },
}

export const LongCtaLabel: Story = {
  args: {
    ...defaultArgs,
    cta: {
      type: 'custom',
      url: '/packages',
      label: 'Register My Limited Company With Companies House Right Now',
      newTab: false,
    },
  },
}

export const LongCopyEverywhere: Story = {
  args: {
    ...defaultArgs,
    heading:
      'Are you ready to register your company today, or would you rather talk it through with one of our London-based company formation agents first?',
    description:
      'Order online in under ten minutes, or if you have any questions at all about which package suits the company you are about to register, please call our Covent Garden office on',
    descriptionSuffix: ' and ask for the formations team.',
    phone: {
      type: 'custom',
      url: 'tel:+442078719990',
      label: '+44 (0)20 7871 9990 extension 1204',
      newTab: false,
    },
    cta: {
      type: 'custom',
      url: '/packages',
      label: 'Register My Limited Company With Companies House Right Now',
      newTab: false,
    },
  },
}

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: LongCopyEverywhere.args,
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: `Ready to register?\n${GERMAN_TOKEN}`,
    description: `Order at ${URL_TOKEN} or email`,
    descriptionSuffix: ` — quote ${GERMAN_TOKEN}.`,
    phone: { type: 'custom', url: `mailto:${EMAIL_TOKEN}`, label: EMAIL_TOKEN, newTab: false },
    cta: { type: 'custom', url: '/packages', label: URL_TOKEN, newTab: false },
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: UnbrokenTokens.args,
}
