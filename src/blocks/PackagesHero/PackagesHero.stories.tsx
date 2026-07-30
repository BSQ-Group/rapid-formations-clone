import type { Meta, StoryObj } from '@storybook/react'
import { PackagesHeroBlock } from './Component'

const meta: Meta<typeof PackagesHeroBlock> = {
  title: 'Blocks/PackagesHero',
  component: PackagesHeroBlock,
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
type Story = StoryObj<typeof PackagesHeroBlock>

const heroImage = {
  id: 1,
  url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1408&h=768&fit=crop',
  alt: 'Modern office environment',
  width: 1408,
  height: 768,
  filename: 'packages-hero.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
} as any

export const Basic: Story = {
  args: {
    blockType: 'packagesHero',
    heading: 'Basic Package',
    subtitle:
      'Everything you need to register your company quickly and compliantly, handled by our expert team.',
    benefits: [
      { id: '1', text: 'Same-day company formation' },
      { id: '2', text: 'Registered office address included' },
      { id: '3', text: 'Digital certificate of incorporation' },
      { id: '4', text: 'Free business bank account' },
    ],
    heroImage,
    topCard: {
      iconName: 'FileText',
      title: 'Preparing... Documents',
      detail: '2/4',
      progressValue: 50,
    },
    bottomCard: {
      iconName: 'CircleCheckBig',
      title: 'Bramble & Wick Ltd',
      subtitle: 'Reserved at Companies House',
    },
  },
}

export const FullyInclusive: Story = {
  args: {
    blockType: 'packagesHero',
    heading: 'Fully Inclusive Package',
    subtitle: 'An outstanding package with everything you need to get started in business',
    benefits: [
      { id: '1', text: 'Start your company fully compliant from day one' },
      { id: '2', text: 'Trusted by thousands of UK founders' },
      { id: '3', text: 'Build instant credibility with a London business presence' },
      { id: '4', text: 'Get your company up and running fast' },
    ],
    heroImage,
    topCard: {
      iconName: 'ShieldCheck',
      title: 'Confirmation statement filed',
      subtitle: 'Hassle-Free Compliance',
    },
    bottomCard: {
      iconName: 'MapPin',
      title: 'Covent Garden, London',
      subtitle: 'Registered office active',
    },
  },
}

export const Privacy: Story = {
  args: {
    blockType: 'packagesHero',
    heading: 'Privacy Package',
    subtitle: 'Ideal for home address privacy and enhancing your corporate image.',
    benefits: [
      { id: '1', text: 'Keep your home address private' },
      { id: '2', text: 'Prestigious Covent Garden business address' },
      { id: '3', text: 'Mail forwarded to you/straight to you' },
      { id: '4', text: 'Quick and easy setup' },
    ],
    heroImage,
    topCard: {
      iconName: 'EyeOff',
      title: 'Home address hidden',
      showRedactedLines: true,
    },
    topCardExtra: {
      iconName: 'Mails',
      title: 'Forwarding… 2 letters today',
      progressValue: 65,
    },
    bottomCardExtra: {
      iconName: 'CircleCheckBig',
      title: 'Mill Lane Bakery Ltd',
      subtitle: 'Reserved at Companies House',
    },
    bottomCard: {
      iconName: 'MapPin',
      title: 'Covent Garden, London',
      subtitle: 'Registered office active',
    },
  },
}
