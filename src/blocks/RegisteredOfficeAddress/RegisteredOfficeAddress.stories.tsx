import type { Meta, StoryObj } from '@storybook/react'
import type {
  Media,
  RegisteredOfficeAddressBlock as RegisteredOfficeAddressBlockProps,
} from '@/payload-types'
import { RegisteredOfficeAddressBlock } from './Component'

const mediaStub = (url: string, alt: string, width: number, height: number): Media => ({
  id: url,
  url,
  alt,
  width,
  height,
  filename: 'illustration.webp',
  mimeType: 'image/webp',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
})

const landscape = mediaStub(
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=830&h=398&fit=crop',
  'London landmarks illustration',
  830,
  398,
)

const portrait = mediaStub(
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=398&h=830&fit=crop',
  'London landmarks illustration, portrait crop',
  398,
  830,
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

const EMAIL_TOKEN = 'registered.office.mail.forwarding@rapidformations-worldwide-group.co.uk'
const URL_TOKEN =
  'https://www.rapidformations.co.uk/address-services/london-registered-office/order?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Grundstücksverkehrsgenehmigungszuständigkeitsübertragungsverordnung'

const defaultArgs: RegisteredOfficeAddressBlockProps = {
  blockType: 'registeredOfficeAddress',
  heading: "Use our impressive address as your company's registered office",
  serviceTitle: 'London Registered Office',
  description:
    'A Covent Garden registered office address for your company, with all government mail scanned and emailed to you, free of charge.',
  price: '£39.00',
  priceSuffix: ' per year',
  cta: { type: 'custom', url: '#', label: 'Learn More', newTab: false },
  image: landscape,
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof RegisteredOfficeAddressBlock> = {
  title: 'Blocks/RegisteredOfficeAddress',
  component: RegisteredOfficeAddressBlock,
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
type Story = StoryObj<typeof RegisteredOfficeAddressBlock>

export const Default: Story = { args: defaultArgs }

export const LongDescription: Story = {
  args: {
    ...defaultArgs,
    serviceTitle: 'London Registered Office and Director Service Address',
    description:
      'A Covent Garden registered office address for your company, with all government mail scanned and emailed to you free of charge, plus a director service address for every appointed officer and a same-day forwarding option for statutory post.',
  },
}

export const LongCopyEverywhere: Story = {
  args: {
    ...defaultArgs,
    heading:
      "Use our impressive Covent Garden address as your company's registered office and keep your own home address off the public register at Companies House",
    serviceTitle: 'London Registered Office, Service Address and Business Address Bundle',
    description:
      'A Covent Garden registered office address for your company, with all government mail scanned and emailed to you free of charge, plus a director service address for every appointed officer, a business trading address for your bank and your customers, and a same-day forwarding option for any statutory post that has to reach you on paper.',
    price: '£1,234.56',
    priceSuffix: ' per year including VAT and unlimited mail forwarding',
    cta: {
      type: 'custom',
      url: '#',
      label: 'Learn More About Our London Registered Office Service',
      newTab: false,
    },
  },
}

export const ThreeWordCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'Our London address',
    serviceTitle: 'Registered Office',
    description: 'Covent Garden address.',
    price: '£39',
    priceSuffix: ' a year',
    cta: { type: 'custom', url: '#', label: 'Order Now', newTab: false },
  },
}

export const MultiLineHeading: Story = {
  args: {
    ...defaultArgs,
    heading: "Use our impressive address\nas your company's registered office",
  },
}

export const WidestPrice: Story = {
  args: { ...defaultArgs, price: '£1,234.56', priceSuffix: ' per year (inc. VAT)' },
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

export const NoCtaLabel: Story = {
  args: {
    ...defaultArgs,
    cta: { type: 'custom', url: '#', label: '', newTab: false },
  },
}

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: LongCopyEverywhere.args,
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: `Write to ${EMAIL_TOKEN} to move your registered office`,
    serviceTitle: GERMAN_TOKEN,
    description: `Order at ${URL_TOKEN} or email ${EMAIL_TOKEN} and quote ${GERMAN_TOKEN}.`,
    price: '£1,234,567.89',
    priceSuffix: ` per year — ${EMAIL_TOKEN}`,
    cta: { type: 'custom', url: '#', label: URL_TOKEN, newTab: false },
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: UnbrokenTokens.args,
}
