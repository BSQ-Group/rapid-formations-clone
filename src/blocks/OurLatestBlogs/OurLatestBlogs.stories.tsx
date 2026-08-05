import type { Meta, StoryObj } from '@storybook/react'
import { OurLatestBlogsBlock } from './Component'
import type { OurLatestBlogsBlock as OurLatestBlogsBlockProps } from '@/payload-types'

const sampleImage = {
  id: 'image-1',
  url: 'https://placehold.co/520x260/e8f5e9/1c1d24?text=Blog+post',
  alt: 'Blog post illustration',
  filename: 'blog-post.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  width: 520,
  height: 260,
  createdAt: '',
  updatedAt: '',
} as any

const portraitImage = {
  ...sampleImage,
  id: 'image-2',
  url: 'https://placehold.co/260x520/e8f5e9/1c1d24?text=Portrait',
  width: 260,
  height: 520,
} as any

const POST_URL =
  'https://www.rapidformations.co.uk/blog/multiple-businesses-under-one-limited-company-trading-names?utm_source=storybook&utm_campaign=overflow'

const sourceCards = [
  {
    id: 'card-1',
    title: 'What is company registration?',
    description:
      'An active company is one that has been incorporated and is engaged in trading activities, such as buying and selling goods or services, managing investments, or generating income. For Corporation Tax purposes, it must register with HMRC and fulfill tax obligations once it commences these activities.',
    image: sampleImage,
    link: {
      type: 'custom' as const,
      url: 'https://www.rapidformations.co.uk/blog/what-is-company-registration/',
      newTab: true,
    },
  },
  {
    id: 'card-2',
    title: 'Why expertise matters in company formation',
    description:
      'Choosing a reputable company formation service, like Rapid Formations, ensures your business is set up correctly and remains compliant. Their qualified team, holding certifications like the CCSP, provides comprehensive support in company registration, statutory filings, and ongoing compliance, protecting your business from potential pitfalls.',
    image: sampleImage,
    link: {
      type: 'custom' as const,
      url: 'https://www.rapidformations.co.uk/blog/expertise-company-formation/',
      newTab: true,
    },
  },
  {
    id: 'card-3',
    title: 'Can I run multiple businesses under one limited company?',
    description:
      'You can run multiple businesses under one limited company by using different trading names. Each business shares the same legal entity, but all finances, taxes, and filings are managed collectively under one company.',
    image: sampleImage,
    link: {
      type: 'custom' as const,
      url: 'https://www.rapidformations.co.uk/blog/multiple-businesses-under-one-company/',
      newTab: true,
    },
  },
]

const defaultArgs: OurLatestBlogsBlockProps = {
  id: 'story-our-latest-blogs',
  blockType: 'ourLatestBlogs',
  blockName: 'Our Latest Blogs',
  heading: 'Helpful guides, advice and\nbusiness tips from our team of industry experts',
  cardCtaLabel: 'Read Post',
  cards: sourceCards,
  viewBlogLink: {
    type: 'custom',
    url: '/blog/',
    newTab: false,
    label: 'View our Blog',
  },
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const meta: Meta<typeof OurLatestBlogsBlock> = {
  component: OurLatestBlogsBlock,
  title: 'Blocks/OurLatestBlogs',
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div className="theme-rapidformations bg-[var(--surface-canvas)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof OurLatestBlogsBlock>

export const Default: Story = { args: defaultArgs }

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    heading: 'From our blog',
    cardCtaLabel: 'Read',
    cards: sourceCards.map((c, i) => ({
      ...c,
      id: `short-${i}`,
      title: 'Tax basics',
      description: 'A short one.',
    })),
    viewBlogLink: { ...defaultArgs.viewBlogLink, label: 'Blog' },
  },
}

export const LongCopy: Story = {
  args: {
    ...defaultArgs,
    heading:
      'Helpful guides, advice, checklists and practical business tips written and reviewed by our in-house team of company formation and compliance experts',
    cardCtaLabel: 'Read the whole post now',
    cards: sourceCards.map((c, i) => ({
      ...c,
      id: `long-${i}`,
      title:
        'Can I run several completely unrelated businesses under one single UK limited company using different registered trading names?',
      description:
        'You can run multiple businesses under one limited company by using different trading names. Each business shares the same legal entity, but all finances, taxes, and filings are managed collectively under one company, which means one set of annual accounts, one confirmation statement and one Corporation Tax return covering everything you do, no matter how many trading names sit underneath it, and no matter how different those trading activities look to your customers on the high street or online. Companies House and HMRC only ever see the single registered legal entity behind every one of those trading names.',
    })),
    viewBlogLink: {
      ...defaultArgs.viewBlogLink,
      label: 'View every guide, checklist and business tip on our blog',
    },
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: `Latest posts: ${POST_URL}`,
    cardCtaLabel: POST_URL,
    cards: sourceCards.map((c, i) => ({
      ...c,
      id: `token-${i}`,
      title: `blog.editorial.team@rapidformations-worldwide-group.co.uk`,
      description: `Full archive at ${POST_URL}`,
    })),
    viewBlogLink: { ...defaultArgs.viewBlogLink, label: POST_URL },
  },
}

export const SingleCard: Story = {
  args: {
    ...defaultArgs,
    cards: [sourceCards[0]],
  },
}

export const FourCards: Story = {
  args: {
    ...defaultArgs,
    cards: [
      ...sourceCards,
      {
        ...sourceCards[0],
        id: 'card-4',
        title: 'How to appoint a company director',
        image: portraitImage,
      },
    ],
  },
}

export const NoViewBlogLink: Story = {
  args: {
    ...defaultArgs,
    viewBlogLink: null as any,
    cardCtaLabel: null,
  },
}

export const CardWithoutImage: Story = {
  args: {
    ...defaultArgs,
    cards: [{ ...sourceCards[0], id: 'no-image', image: null }, sourceCards[1], sourceCards[2]],
  } as any,
}

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '900px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

export const NarrowUnbrokenTokens: Story = {
  ...narrowViewport,
  args: UnbrokenTokens.args,
}
