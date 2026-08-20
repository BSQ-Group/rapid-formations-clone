import type { Meta, StoryObj } from '@storybook/react'

import type { Media } from '@/payload-types'
import { OurOfficesView } from './OurOfficesView'

const photo = (url: string, alt: string): Media => ({
  id: url,
  url,
  alt,
  width: 3251,
  height: 2486,
  filename: 'office.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
})

const london = photo(
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=676&h=600&fit=crop',
  'Photograph of the London office',
)

const portrait = photo(
  'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=900&fit=crop',
  'Photograph of the London office, portrait crop',
)

const office = (over: Partial<Parameters<typeof OurOfficesView>[0]['offices'][number]> = {}) => ({
  id: '1',
  image: london,
  focalX: 8,
  address: '71-75 Shelton Street\nCovent Garden\nLondon\nWC2H 9JQ',
  mapHref: 'https://www.google.com/maps/',
  mapLabel: 'View on Google maps',
  mapNewTab: true,
  ...over,
})

const narrow = {
  parameters: {
    viewport: {
      options: {
        mobile360: {
          name: 'Mobile 360',
          styles: { width: '360px', height: '900px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile360' } },
}

const meta: Meta<typeof OurOfficesView> = {
  title: 'Blocks/OurOffices',
  component: OurOfficesView,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="surface-canvas font-legacy-condensed p-5">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof OurOfficesView>

export const Default: Story = {
  args: { heading: 'Our London Office', offices: [office()] },
}

export const TwoOffices: Story = {
  args: {
    heading: 'Our Offices',
    offices: [
      office(),
      office({
        id: '2',
        focalX: 50,
        address: '18 Kings Park Road\nSouthampton\nHampshire\nSO15 2AT',
      }),
    ],
  },
}

export const ThreeOffices: Story = {
  args: {
    heading: 'Our Offices',
    offices: [
      office(),
      office({ id: '2', address: '18 Kings Park Road\nSouthampton\nSO15 2AT' }),
      office({ id: '3', address: '2 Hardman Street\nManchester\nM3 3HF' }),
    ],
  },
}

export const ShortAddress: Story = {
  args: { heading: 'Head Office', offices: [office({ address: 'London' })] },
}

export const LongCopy: Story = {
  args: {
    heading:
      'Our London Office, Registered Office Address and Company Secretarial Correspondence Address',
    offices: [
      office({
        address:
          'Rapid Formations Limited\nSuite 4, Second Floor, The Shelton Street Building\n71-75 Shelton Street\nCovent Garden\nLondon\nGreater London\nWC2H 9JQ\nUnited Kingdom',
        mapLabel: 'View this office on Google maps and plan your route',
      }),
    ],
  },
}

export const UnbrokenToken: Story = {
  args: {
    heading: 'corporate-services.enquiries@rapidformations-incorporation.co.uk',
    offices: [
      office({
        address:
          'https://www.google.com/maps/place/71-75+Shelton+Street+Covent+Garden+London\nWC2H 9JQ',
        mapLabel: 'corporate-services.enquiries@rapidformations-incorporation.co.uk',
      }),
    ],
  },
}

export const PortraitPhoto: Story = {
  args: { heading: 'Our London Office', offices: [office({ image: portrait })] },
}

export const NoMapLink: Story = {
  args: { heading: 'Our London Office', offices: [office({ mapLabel: null })] },
}

export const DefaultNarrow: Story = { ...Default, ...narrow }
export const LongCopyNarrow: Story = { ...LongCopy, ...narrow }
export const UnbrokenTokenNarrow: Story = { ...UnbrokenToken, ...narrow }
