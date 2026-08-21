import type { Meta, StoryObj } from '@storybook/react'

import { ComparePackageTableView } from './ComparePackageTableView'
import type { TableData, TablePackage, TableProduct } from './types'

const pkg = (
  over: Partial<TablePackage> & Pick<TablePackage, 'id' | 'name' | 'slug'>,
): TablePackage => ({
  price: '£2.99',
  priceNote: '+ £100 Companies House Fee',
  buyHref: '/name-check',
  readMoreHref: '/package/basic-package',
  ...over,
})

const product = (id: string, name: string, includedIn: string[]): TableProduct => ({
  id,
  name,
  includedIn,
})

const THREE: TableData = {
  heading: 'Limited Company Packages',
  sameDayHeading: 'Same-Day Incorporation Service',
  packages: [
    pkg({ id: '1', name: 'Basic', slug: 'basic' }),
    pkg({ id: '2', name: 'Privacy', slug: 'privacy', price: '£14.99' }),
    pkg({
      id: '3',
      name: 'All Inclusive',
      slug: 'all-inclusive',
      price: '£39.99',
      ribbonText: 'BEST VALUE',
    }),
  ],
  products: [
    product('p1', 'Limited Company Formation\nwith ID Verification and Personal Code', [
      'basic',
      'privacy',
      'all-inclusive',
    ]),
    product('p2', 'Full Set of Company Documents', ['basic', 'privacy', 'all-inclusive']),
    product('p3', 'London Registered Office Address FREE for 12 months', [
      'privacy',
      'all-inclusive',
    ]),
    product('p4', 'UK GDPR Compliance Package', ['all-inclusive']),
  ],
}

const TWO: TableData = {
  heading: 'Company registration for non-UK residents',
  packages: [
    pkg({
      id: '1',
      name: 'Non-Residents',
      slug: 'non-residents',
      price: '£99.99',
      readMoreHref: null,
    }),
    pkg({
      id: '2',
      name: 'Non-Residents Plus',
      slug: 'non-residents-plus',
      price: '£149.99',
      readMoreHref: null,
    }),
  ],
  products: [
    product('p1', 'Limited Company Formation', ['non-residents', 'non-residents-plus']),
    product('p2', 'UK Business Bank Account', ['non-residents-plus']),
  ],
}

const ONE: TableData = {
  heading: 'Company registration for partnerships requiring limited liability',
  packages: [pkg({ id: '1', name: 'LLP', slug: 'llp', price: '£19.99', readMoreHref: null })],
  products: [
    product('p1', 'LLP Registration', ['llp']),
    product('p2', 'Certificate of Incorporation', ['llp']),
  ],
}

const LONG_NAME: TableData = {
  ...ONE,
  heading:
    'Company registration for partnerships, associations, co-operatives and other member-owned organisations requiring limited liability protection',
  packages: [
    pkg({
      id: '1',
      name: 'Limited Liability Partnership Formation Package',
      slug: 'llp',
      price: '£19.99',
      priceNote: '+ £100 Companies House Fee and VAT where applicable',
      readMoreHref: null,
    }),
  ],
  products: [
    product('p1', 'registrations@rapidformations-incorporation-services.co.uk', ['llp']),
    product(
      'p2',
      'A feature name long enough to wrap onto several lines inside a narrow first column',
      ['llp'],
    ),
  ],
}

const meta: Meta<typeof ComparePackageTableView> = {
  title: 'Blocks/ComparePackageTable',
  component: ComparePackageTableView,
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
type Story = StoryObj<typeof ComparePackageTableView>

export const ThreePackages: Story = { args: { data: THREE, cardHeight: 'tall' } }
export const TwoPackages: Story = { args: { data: TWO, cardHeight: 'taller' } }
export const OnePackage: Story = { args: { data: ONE, cardHeight: 'auto' } }
export const LongCopy: Story = { args: { data: LONG_NAME, cardHeight: 'auto' } }

export const ThreePackagesMobile: Story = {
  args: { data: THREE, cardHeight: 'tall' },
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

export const LongCopyMobile: Story = {
  args: { data: LONG_NAME, cardHeight: 'auto' },
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
