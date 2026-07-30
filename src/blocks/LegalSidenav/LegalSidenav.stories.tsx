import type { Meta, StoryObj } from '@storybook/react'
import { LegalSidenavClient } from './LegalSidenavClient'
import type { LegalNavLink } from './fetchLegalNavLinks'

const mockLinks: LegalNavLink[] = [
  { slug: 'id-requirements', label: 'ID Requirements' },
  { slug: 'complaints', label: 'Complaints' },
  { slug: 'terms-and-conditions', label: 'Terms & Conditions' },
  { slug: 'refund-cancellation-policy', label: 'Refund & Cancellation' },
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'cookies-policy', label: 'Cookies Policy' },
  { slug: 'environmental-policy', label: 'Environmental Policy' },
  { slug: 'whistleblowing-and-grievance', label: 'Whistleblowing & Grievance Mechanism Policies' },
]

const DummyContent = () => (
  <div className="prose max-w-none">
    <h1 className="text-4xl font-bold mb-4">ID Requirements for Company Formation</h1>
    <h2 className="text-2xl font-semibold mt-8 mb-3">Why do we require proof of ID and address?</h2>
    <p className="mb-4 text-[var(--text-subtle)]">
      We are regulated by the Money Laundering, Terrorist Financing and Transfer of Funds
      Regulations 2017, London Local Authorities Act 2007, Economic Crime and Corporate
      Transparency Act 2023 and Know Your Customer (KYC) guidelines, which means we must verify
      the ID and address of all customers, directors and PSCs.
    </p>
  </div>
)

const meta: Meta<typeof LegalSidenavClient> = {
  title: 'Blocks/LegalSidenav',
  component: LegalSidenavClient,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="theme-qualitycompanyformations bg-[var(--surface-canvas)] py-10 lg:py-14">
        <div className="lg:max-w-7xl lg:mx-auto lg:px-8">
          <div className="lg:grid lg:grid-cols-[180px_1fr] lg:gap-12 xl:gap-16">
            <Story />
            <div className="min-w-0 px-4 md:px-8 lg:px-0 pt-8 lg:pt-0">
              <DummyContent />
            </div>
          </div>
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LegalSidenavClient>

export const Default: Story = {
  args: { links: mockLinks },
}

export const ActiveItem: Story = {
  args: { links: mockLinks },
  parameters: {
    nextjs: { navigation: { pathname: '/id-requirements' } },
  },
}
