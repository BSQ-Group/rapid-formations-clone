import type { Meta, StoryObj } from '@storybook/react'
import { BusinessBankAccountsCarousel } from './BusinessBankAccountsCarousel'
import type { BusinessBankAccount } from '@/payload-types'

const banks: NonNullable<BusinessBankAccount['banks']> = [
  {
    id: '1',
    name: 'Lloyds',
    cardImage: { id: 'm1', url: 'https://placehold.co/480x314/004f4b/ffffff?text=Lloyds', filename: 'lloyds.png', mimeType: 'image/png', filesize: 0, width: 480, height: 314, createdAt: '', updatedAt: '' } as any,
    logo: { id: 'l1', url: 'https://placehold.co/125x31/004f4b/ffffff?text=Lloyds', filename: 'lloyds-logo.png', mimeType: 'image/png', filesize: 0, width: 125, height: 31, createdAt: '', updatedAt: '' } as any,
    subtext: 'Online application.\nAccount open in 3 minutes.',
  },
  {
    id: '2',
    name: 'Barclays',
    cardImage: { id: 'm2', url: 'https://placehold.co/480x314/00aeef/ffffff?text=Barclays', filename: 'barclays.png', mimeType: 'image/png', filesize: 0, width: 480, height: 314, createdAt: '', updatedAt: '' } as any,
    logo: { id: 'l2', url: 'https://placehold.co/125x31/00aeef/ffffff?text=Barclays', filename: 'barclays-logo.png', mimeType: 'image/png', filesize: 0, width: 125, height: 31, createdAt: '', updatedAt: '' } as any,
    subtext: 'Free account for the first year.\nNo monthly fees.',
  },
  {
    id: '3',
    name: 'ANNA',
    cardImage: { id: 'm3', url: 'https://placehold.co/480x314/f4a8a1/ffffff?text=ANNA', filename: 'anna.png', mimeType: 'image/png', filesize: 0, width: 480, height: 314, createdAt: '', updatedAt: '' } as any,
    logo: { id: 'l3', url: 'https://placehold.co/125x31/f4a8a1/333333?text=ANNA', filename: 'anna-logo.png', mimeType: 'image/png', filesize: 0, width: 125, height: 31, createdAt: '', updatedAt: '' } as any,
    subtext: 'Invoicing and tax reminders included.\nBuilt for sole traders.',
  },
  {
    id: '4',
    name: 'Monzo',
    cardImage: { id: 'm4', url: 'https://placehold.co/480x314/ff4f30/ffffff?text=Monzo', filename: 'monzo.png', mimeType: 'image/png', filesize: 0, width: 480, height: 314, createdAt: '', updatedAt: '' } as any,
    logo: { id: 'l4', url: 'https://placehold.co/125x31/ff4f30/ffffff?text=Monzo', filename: 'monzo-logo.png', mimeType: 'image/png', filesize: 0, width: 125, height: 31, createdAt: '', updatedAt: '' } as any,
    subtext: 'Instant notifications on every payment.\nManage money on the go.',
  },
  {
    id: '5',
    name: 'Tide',
    cardImage: { id: 'm5', url: 'https://placehold.co/480x314/2c3de0/ffffff?text=Tide', filename: 'tide.png', mimeType: 'image/png', filesize: 0, width: 480, height: 314, createdAt: '', updatedAt: '' } as any,
    logo: { id: 'l5', url: 'https://placehold.co/125x31/2c3de0/ffffff?text=Tide', filename: 'tide-logo.png', mimeType: 'image/png', filesize: 0, width: 125, height: 31, createdAt: '', updatedAt: '' } as any,
    subtext: 'Cashback on card spending.\nFree transfers between Tide accounts.',
  },
]

const defaultArgs: Pick<BusinessBankAccount, 'heading' | 'banks'> = {
  heading: 'Pick up a free business bank account with your order',
  banks,
}

const meta: Meta<typeof BusinessBankAccountsCarousel> = {
  component: BusinessBankAccountsCarousel,
  title: 'Blocks/BusinessBankAccounts',
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
type Story = StoryObj<typeof BusinessBankAccountsCarousel>

export const Default: Story = {
  args: defaultArgs,
}

export const NoSubtext: Story = {
  args: {
    ...defaultArgs,
    banks: banks.map((b) => ({ ...b, subtext: null })),
  },
}

export const ThreeBanks: Story = {
  args: {
    ...defaultArgs,
    banks: banks.slice(0, 3),
  },
}
