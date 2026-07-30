import type { Meta, StoryObj } from '@storybook/react'
import { SearchCTABlock } from './Component'

const meta: Meta<typeof SearchCTABlock> = {
  title: 'Blocks/SearchCTA',
  component: SearchCTABlock,
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
type Story = StoryObj<typeof SearchCTABlock>

const baseArgs = {
  blockType: 'packagesCTA' as const,
  trustPillText: '350,000+ UK companies formed · Rated Excellent on Trustpilot',
  trustPillTextMobile: '350,000+ UK companies formed',
  heading: 'Form your UK company with specialist support at every step',
  subtitle: 'Check your name and apply in minutes.',
  inputPlaceholder: 'Enter company name',
  submitButtonText: 'Check availability',
  searchActionUrl: '/search',
  footerNote: 'Free name check  ·  Certified B Corp',
  image: {
    id: 1,
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=600&fit=crop',
    alt: 'Green forest background',
    width: 1200,
    height: 600,
    filename: 'packages-cta-bg.jpg',
    mimeType: 'image/jpeg',
    filesize: 0,
    createdAt: '',
    updatedAt: '',
  } as any,
}

export const LightText: Story = {
  args: { ...baseArgs, textTheme: 'light' },
}

export const DarkText: Story = {
  args: {
    ...baseArgs,
    textTheme: 'dark',
    heading: 'Are you ready to set up your company?',
  },
}
