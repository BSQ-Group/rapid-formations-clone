import type { Meta, StoryObj } from '@storybook/react'
import { HeroServicesBannerBlock } from './Component'

const meta: Meta<typeof HeroServicesBannerBlock> = {
  title: 'Blocks/HeroServicesBanner',
  component: HeroServicesBannerBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="theme-qualitycompanyformations bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof HeroServicesBannerBlock>

const mockImage = (url: string, alt: string) =>
  ({
    id: 1,
    url,
    alt,
    width: 1200,
    height: 800,
    filename: 'hero.jpg',
    mimeType: 'image/jpeg',
    filesize: 0,
    createdAt: '',
    updatedAt: '',
  }) as any

const sharedArgs = {
  blockType: 'heroServicesBanner' as const,
  title: 'Annual Service Renewals',
  description: 'Manually renew your services here, at any time.',
  priceText: 'from £26.00 +VAT',
  cta: {
    type: 'custom' as const,
    url: '/order',
    label: 'Order',
  },
  showTrustpilot: true,
  image: mockImage(
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop',
    'Small business owner with phone',
  ),
  widgets: [
    {
      id: '1',
      icon: 'BadgeCheck',
      title: 'Service Address',
      subtitle: 'Renewal in progress...',
      showProgress: true,
      progressPercent: 60,
    },
    {
      id: '2',
      icon: 'Building2',
      title: 'Registered Office Address',
      subtitle: 'Renewed for 12 months ✓',
      showProgress: false,
    },
  ],
  sectionLayout: {
    background: 'dark' as const,
    paddingTop: 'xl' as const,
    paddingBottom: 'xl' as const,
  },
}

export const Default: Story = { args: sharedArgs }

export const SingleWidget: Story = {
  args: {
    ...sharedArgs,
    widgets: [sharedArgs.widgets[0]],
  },
}

export const NoTrustpilot: Story = {
  args: {
    ...sharedArgs,
    showTrustpilot: false,
  },
}

export const NoCta: Story = {
  args: {
    ...sharedArgs,
    cta: undefined,
  },
}

export const ThreeWidgets: Story = {
  args: {
    ...sharedArgs,
    title: 'Confirmation Statement Service',
    description: 'Previously called the annual return',
    priceText: 'from £75.99 +VAT',
    cta: {
      type: 'custom' as const,
      url: '/buy',
      label: 'Buy now',
    },
    image: mockImage(
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1200&h=800&fit=crop',
      'Person in library',
    ),
    widgets: [
      {
        id: '1',
        icon: 'BadgeCheck',
        title: 'Confirmation statement filed',
        subtitle: 'Submitted to Companies House',
        showProgress: false,
      },
      {
        id: '2',
        icon: 'FileText',
        title: 'Preparing CS01 form',
        subtitle: 'In progress...',
        showProgress: true,
        progressPercent: 50,
      },
      {
        id: '3',
        icon: 'FolderPen',
        title: 'Annual return due',
        subtitle: 'Filing with Companies House',
        showProgress: true,
        progressPercent: 50,
      },
    ],
  },
}

export const ConfirmationStatements: Story = {
  args: {
    ...sharedArgs,
    title: 'Confirmation Statements',
    description: 'File your annual confirmation statement quickly and easily.',
    priceText: 'from £35.00 +VAT',
  },
}
