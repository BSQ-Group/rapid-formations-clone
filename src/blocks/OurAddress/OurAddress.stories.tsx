import type { Meta, StoryObj } from '@storybook/react'
import { OurAddressSection } from './Component'
import type { Media } from '@/payload-types'

const photo: Media = {
  id: 'office-photo',
  url: 'https://d2zkzcdiu38fde.cloudfront.net/images/d42b0ca7-6ff8-4c3d-a51f-cf7224710bef.jpg',
  alt: 'View of Garden Studios, Covent Garden in London.',
  width: 3251,
  height: 2486,
  filename: 'office-photo.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
}

const portrait: Media = { ...photo, id: 'office-portrait', width: 1200, height: 1800 }

const meta: Meta<typeof OurAddressSection> = {
  title: 'Blocks/OurAddress',
  component: OurAddressSection,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-canvas">
        <Story />
      </div>
    ),
  ],
  args: {
    variant: 'compact',
    heading: 'Our London Service Address',
    image: photo,
    address: "Officer's Name\n71–75 Shelton Street\nCovent Garden\nLondon\nWC2H 9JQ",
    price: '26.00',
    postText: 'per year',
    ctaLabel: 'Buy Now',
    ctaHref: 'https://client.rapidformations.co.uk/login?re=/companies/',
    ctaNewTab: true,
  },
}

export default meta
type Story = StoryObj<typeof OurAddressSection>

export const ServiceAddress: Story = {}

export const BusinessAddress: Story = {
  args: {
    heading: 'Our London Business Address',
    address: "Your Company's Name\n71–75 Shelton Street\nCovent Garden\nLondon\nWC2H 9JQ",
    price: '89.00',
  },
}

export const RegisteredOffice: Story = {
  args: {
    variant: 'feature',
    heading: 'Our London registered office address',
    label: 'London',
    address: "Your Company's Name\n71–75 Shelton Street\nCovent Garden\nLondon\nWC2H 9JQ",
    price: '39.00',
  },
}

export const LongHeadingAndAddress: Story = {
  args: {
    heading:
      'Our London Service Address, Covent Garden — available to every company we register in England and Wales',
    address:
      'The Full Registered Name of Your Limited Company\nUnit 4, Garden Studios Building\n71–75 Shelton Street\nCovent Garden\nLondon\nGreater London\nWC2H 9JQ\nUnited Kingdom',
    ctaLabel: 'Buy this service address now',
  },
}

export const LongHeadingAndAddressFeature: Story = {
  args: {
    ...LongHeadingAndAddress.args,
    variant: 'feature',
    label: 'London, Covent Garden — Greater London',
    price: '39.00',
  },
}

export const ShortCopy: Story = {
  args: {
    heading: 'Our address',
    address: 'London\nWC2H 9JQ',
    price: '9.99',
    postText: null,
    ctaLabel: 'Buy',
  },
}

export const UnbrokenToken: Story = {
  args: {
    heading: 'servicecentre@rapidformations-covent-garden-london.co.uk',
    label: 'Betriebshaftpflichtversicherungsgesellschaft',
    address:
      'servicecentre@rapidformations-covent-garden-london.co.uk\nhttps://www.rapidformations.co.uk/additional-services/service-address/\nWC2H9JQWC2H9JQWC2H9JQ',
    ctaLabel: 'Betriebshaftpflichtversicherung',
  },
}

export const UnbrokenTokenFeature: Story = {
  args: { ...UnbrokenToken.args, variant: 'feature', price: '39.00' },
}

export const NoCta: Story = {
  args: { ctaLabel: null },
}

export const NoLabelOnFeature: Story = {
  args: { variant: 'feature', label: null, price: '39.00' },
}

export const PortraitPhoto: Story = {
  args: { image: portrait },
}

export const PortraitPhotoFeature: Story = {
  args: { variant: 'feature', label: 'London', image: portrait, price: '39.00' },
}

export const FreeText: Story = {
  args: { price: '0.00', postText: 'for the first year' },
}

export const NarrowColumn: Story = {
  args: { ...LongHeadingAndAddress.args },
  parameters: { viewport: { defaultViewport: 'mobile1' } },
}
