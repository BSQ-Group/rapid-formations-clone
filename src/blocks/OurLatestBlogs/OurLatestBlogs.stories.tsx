import type { Meta, StoryObj } from '@storybook/react'
import { OurLatestBlogsBlock } from './Component'

const sampleImage = {
  id: '1',
  url: 'https://images.unsplash.com/photo-1620558499234-aa9d4ec3e5b3?w=700&h=480&fit=crop',
  alt: 'Abstract gradient',
  filename: 'abstract.jpg',
  mimeType: 'image/jpeg',
  filesize: 100000,
  width: 700,
  height: 480,
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
}

const defaultArgs = {
  id: 'story-1',
  blockType: 'ourLatestBlogs' as const,
  blockName: 'Our Latest Blogs',
  heading: 'Our latest blogs',
  viewBlogLink: { type: 'custom' as const, url: '/blog', newTab: false, label: 'View our Blog' },
  cards: [
    {
      id: 'card-1',
      title: 'Dorem ipsum dolor sit amet',
      description:
        'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis libero et velit interdum.',
      readTime: '3m',
      image: sampleImage,
      link: { type: 'custom' as const, url: '/blog/article-1', newTab: false },
    },
    {
      id: 'card-2',
      title: 'Dorem ipsum dolor sit amet',
      description:
        'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis libero et velit interdum.',
      readTime: '3m',
      image: sampleImage,
      link: { type: 'custom' as const, url: '/blog/article-2', newTab: false },
    },
    {
      id: 'card-3',
      title: 'Dorem ipsum dolor sit amet',
      description:
        'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis libero et velit interdum.',
      readTime: '3m',
      image: sampleImage,
      link: { type: 'custom' as const, url: '/blog/article-3', newTab: false },
    },
    {
      id: 'card-4',
      title: 'Dorem ipsum dolor sit amet',
      description:
        'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis libero et velit interdum.',
      readTime: '3m',
      image: sampleImage,
      link: { type: 'custom' as const, url: '/blog/article-4', newTab: false },
    },
  ],
}

const meta: Meta<typeof OurLatestBlogsBlock> = {
  component: OurLatestBlogsBlock,
  title: 'Blocks/OurLatestBlogs',
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
type Story = StoryObj<typeof OurLatestBlogsBlock>

export const Default: Story = { args: defaultArgs }

export const SixCards: Story = {
  args: {
    ...defaultArgs,
    cards: [
      ...defaultArgs.cards,
      {
        id: 'card-5',
        title: 'Dorem ipsum dolor sit amet',
        description:
          'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.',
        readTime: '5m',
        image: sampleImage,
        link: { type: 'custom' as const, url: '/blog/article-5', newTab: false },
      },
      {
        id: 'card-6',
        title: 'Dorem ipsum dolor sit amet',
        description:
          'Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.',
        readTime: '7m',
        image: sampleImage,
        link: { type: 'custom' as const, url: '/blog/article-6', newTab: false },
      },
    ],
  },
}
