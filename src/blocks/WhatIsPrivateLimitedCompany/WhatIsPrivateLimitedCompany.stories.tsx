import type { Meta, StoryObj } from '@storybook/react'
import { WhatIsPrivateLimitedCompanyBlock } from './Component'
import type { WhatIsPrivateLimitedCompanyBlock as WhatIsPrivateLimitedCompanyBlockProps } from '@/payload-types'

const defaultArgs: WhatIsPrivateLimitedCompanyBlockProps = {
  id: 'story-1',
  blockType: 'whatIsPrivateLimitedCompany',
  blockName: 'What is a private limited company',
  title: 'What is a private limited company?',
  paragraphs: [
    {
      id: 'p1',
      text: 'A private limited company is a type of corporate entity that can be formed in the UK. It is the most popular vehicle for running a business with over 99% of registered companies being incorporated with this structure.',
    },
    {
      id: 'p2',
      text: 'A private limited company has a separate legal personality. This means it can do a lot of things natural persons can do. For example, enter into contracts, and own assets. It is owned by its shareholders with day-to-day management being undertaken by the directors (although these can be the same people).',
    },
    {
      id: 'p3',
      text: 'One of its key features is the concept of limited liability. The owners of the company are liable only to a restricted level, which means their personal assets are protected if the company runs into financial difficult. This is one of the key benefits of private limited companies, along with other things, such as tax efficiency, company name protection, and prestige.',
    },
    {
      id: 'p4',
      text: 'The ‘private’ aspect refers to the fact companies registered in this form may not offer their shares for sale to the public, for example through a stock exchange.',
    },
  ],
  image: {
    id: 'img-1',
    alt: 'Woman screen-printing at a studio window',
    url: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=1000&fit=crop',
    width: 800,
    height: 1000,
    createdAt: '',
    updatedAt: '',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
  sectionLayout: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof WhatIsPrivateLimitedCompanyBlock> = {
  component: WhatIsPrivateLimitedCompanyBlock,
  title: 'Blocks/WhatIsPrivateLimitedCompany',
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
type Story = StoryObj<typeof WhatIsPrivateLimitedCompanyBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const TwoParagraphs: Story = {
  args: {
    ...defaultArgs,
    paragraphs: defaultArgs.paragraphs!.slice(0, 2),
  },
}
