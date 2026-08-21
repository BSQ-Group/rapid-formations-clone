import type { Meta, StoryObj } from '@storybook/react'

import { ComparePackagesHero } from './index'

const lexical = (...paragraphs: string[]) =>
  ({
    root: {
      type: 'root',
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
        children: [
          { type: 'text', text, detail: 0, format: 0, mode: 'normal', style: '', version: 1 },
        ],
      })),
    },
  }) as never

const meta: Meta<typeof ComparePackagesHero> = {
  component: ComparePackagesHero,
  title: 'Base Components/ComparePackagesHero',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ComparePackagesHero>

export const Default: Story = {
  args: {
    blockType: 'comparePackagesHero',
    title: 'Select a package',
    body: lexical(
      'Need help to register your company? Use our live chat facility.',
      'We can register companies for customers who are residents in most countries.',
    ),
  },
}

export const TitleOnly: Story = {
  args: { blockType: 'comparePackagesHero', title: 'LLP Package' },
}

export const LongTitleAndUnbrokenToken: Story = {
  args: {
    blockType: 'comparePackagesHero',
    title: 'Company registration for partnerships requiring limited liability protection',
    body: lexical(
      'Questions about eligibility? Email compliance.department@rapidformations.co.uk or read https://www.rapidformations.co.uk/help-centre/required-information/ before ordering.',
    ),
  },
}
