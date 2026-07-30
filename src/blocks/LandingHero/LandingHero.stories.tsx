import type { Meta, StoryObj } from '@storybook/react'
import { LandingHeroBlock } from './Component'
import type { LandingHeroBlock as LandingHeroBlockProps } from '@/payload-types'

const defaultArgs: LandingHeroBlockProps = {
  id: 'story-1',
  blockType: 'landingHero',
  blockName: 'Landing Hero',
  eyebrow: 'COMPANY FORMATION',
  heading: 'Your business journey starts here',
  benefits: [
    { id: 'b1', text: 'Register a UK limited company and start trading within 24 hours' },
    { id: 'b2', text: 'Check the availability of your company name and apply in minutes' },
    { id: 'b3', text: 'A choice of 8 free business bank accounts' },
  ],
  searchPlaceholder: 'What will you call your company?',
  searchLink: {
    type: 'custom',
    url: '/company-name-search',
    newTab: false,
  },
  pricingLink: {
    type: 'custom',
    url: '/pricing',
    label: 'View pricing',
    newTab: false,
  },
  packagesLink: {
    type: 'custom',
    url: '/compare-packages',
    label: 'Choose a Package',
    newTab: false,
  },
  backgroundImage: '' as any,
  google: {
    logo: '' as any,
    rating: '4.9',
    reviewCount: '462',
  },
}

const meta: Meta<typeof LandingHeroBlock> = {
  component: LandingHeroBlock,
  title: 'Blocks/LandingHero',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LandingHeroBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const WithoutBenefits: Story = {
  args: {
    ...defaultArgs,
    benefits: [],
  },
}

export const MinimalContent: Story = {
  args: {
    ...defaultArgs,
    eyebrow: null,
    benefits: [{ id: 'b1', text: 'Fast and simple company formation' }],
    google: undefined,
  } as any,
}
