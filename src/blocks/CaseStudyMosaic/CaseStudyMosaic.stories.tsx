import type { Meta, StoryObj } from '@storybook/react'
import type { CaseStudyMosaicBlock as CaseStudyMosaicBlockProps, Media } from '@/payload-types'
import { CaseStudyMosaicBlock } from './Component'

type Item = CaseStudyMosaicBlockProps['items'][number]

const mediaStub = (url: string, alt: string, width: number, height: number): Media => ({
  id: url,
  url,
  alt,
  width,
  height,
  filename: 'founder.jpg',
  mimeType: 'image/jpeg',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
})

const portrait = (seed: string, alt: string) =>
  mediaStub(`https://images.unsplash.com/${seed}?w=700&h=700&fit=crop`, alt, 700, 700)

const tallPortrait = mediaStub(
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=420&h=1120&fit=crop',
  'Jon Byrne, founder of Riderr, tall portrait crop.',
  420,
  1120,
)

const wideLandscape = mediaStub(
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1400&h=420&fit=crop',
  'Jon Byrne, founder of Riderr, wide landscape crop.',
  1400,
  420,
)

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

const EMAIL_TOKEN = 'sarah.louise.ryan.founder@the-love-collective-global-matchmaking.co.uk'
const URL_TOKEN =
  'https://www.rapidformations.co.uk/case-studies/the-love-collective-global?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'

const defaultArgs: CaseStudyMosaicBlockProps = {
  blockType: 'caseStudyMosaic',
  heading: 'Made By Rapid Formations',
  subheading: 'See how our customers turned their company formation journeys into lasting success',
  items: [
    {
      id: '1',
      image: portrait('photo-1500648767791-00dcc994a43e', 'Jon Byrne, founder of Riderr.'),
      company: 'Riderr',
      category: 'Health and Fitness: Ride Sports',
    },
    {
      id: '2',
      image: portrait(
        'photo-1507003211169-0a1dd7228f2d',
        'Kaweh Tajadod, founder of William & Watson.',
      ),
      company: 'William & Watson',
      category: 'Interior Design: Bespoke Lighting',
    },
    {
      id: '3',
      image: portrait(
        'photo-1494790108377-be9c29b29330',
        'Marie Goret, founder of Arcturus Stones.',
      ),
      company: 'Arcturus Stones',
      category: 'Construction: Natural Limestones',
    },
    {
      id: '4',
      image: portrait(
        'photo-1506794778202-cad84cf45f1d',
        'Mark Wilson, founder of Walk The Storm.',
      ),
      company: 'Walk The Storm',
      category: 'e-Commerce: Rainwear Boutique',
    },
    {
      id: '5',
      image: portrait('photo-1519085360753-af0119f7cbe7', 'John Warbuton, founder of Konsileo.'),
      company: 'Konsileo',
      category: 'Professional Services: Insurance Broker',
    },
    {
      id: '6',
      image: portrait(
        'photo-1438761681033-6461ffad8d80',
        'Sarah Louise Ryan, founder of The Love Collective Global.',
      ),
      company: 'The Love Collective Global',
      category: 'Personal Services: Matchmaking Agency',
    },
  ],
  sectionLayout: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
}

const items = defaultArgs.items

const VIDEO_BASE = 'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/case-studies'

const VIDEO_URLS = [
  `${VIDEO_BASE}/case_study_-_riderr+(720p).mp4`,
  `${VIDEO_BASE}/case_study_-_william_%26_watson+(720p).mp4`,
  `${VIDEO_BASE}/arcturus_stones+(720p).mp4`,
  `${VIDEO_BASE}/case_study_-_walk_the_storm+(720p).mp4`,
  `${VIDEO_BASE}/case_study_-_konsileo+(720p).mp4`,
  `${VIDEO_BASE}/case_study_-_the_love_collective_global+(720p).mp4`,
]

const VIMEO_URL = 'https://player.vimeo.com/video/1030834360?&autoplay=1&muted=0'

const meta: Meta<typeof CaseStudyMosaicBlock> = {
  title: 'Blocks/CaseStudyMosaic',
  component: CaseStudyMosaicBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div
        style={{ background: 'var(--surface-canvas-inverse)', width: '100%', padding: '2rem 0' }}
      >
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CaseStudyMosaicBlock>

export const Default: Story = { args: defaultArgs }

export const WithVideos: Story = {
  args: {
    ...defaultArgs,
    items: items.map((item, i) => ({ ...item, videoUrl: VIDEO_URLS[i] })),
  },
}

export const WithVideosNarrow: Story = {
  ...narrowViewport,
  args: WithVideos.args,
}

export const SomeWithVideos: Story = {
  args: {
    ...defaultArgs,
    items: items.map((item, i) => (i % 2 === 0 ? { ...item, videoUrl: VIDEO_URLS[i] } : item)),
  },
}

export const WithEmbedVideo: Story = {
  args: {
    ...defaultArgs,
    items: items.map((item, i) => (i === 0 ? { ...item, videoUrl: VIMEO_URL } : item)),
  },
}

export const FourItems: Story = {
  args: { ...defaultArgs, items: items.slice(0, 4) },
}

export const LongNamesNoCategory: Story = {
  args: {
    ...defaultArgs,
    items: items.map((i) => ({
      ...i,
      company: `${i.company} & Partners International`,
      category: null,
    })),
  },
}

export const OneItem: Story = {
  args: { ...defaultArgs, items: items.slice(0, 1) },
}

export const TwoItems: Story = {
  args: { ...defaultArgs, items: items.slice(0, 2) },
}

export const FiveItems: Story = {
  args: { ...defaultArgs, items: items.slice(0, 5) },
}

export const SevenItems: Story = {
  args: {
    ...defaultArgs,
    items: [
      ...items,
      {
        id: '7',
        image: portrait('photo-1531123897727-8f129e1688ce', 'Ade Okafor, founder of Northbound.'),
        company: 'Northbound',
        category: 'Logistics: Regional Freight',
      },
    ],
  },
}

export const LongHeadings: Story = {
  args: {
    ...defaultArgs,
    heading: 'Made By Rapid Formations — the companies our customers built after incorporating',
    subheading:
      'See how our customers turned their company formation journeys into lasting success, from the first name check right through to their tenth year of trading',
  },
}

export const ThreeWordHeadings: Story = {
  args: { ...defaultArgs, heading: 'Made By Us', subheading: 'Real customer stories' },
}

export const NoSubheading: Story = {
  args: { ...defaultArgs, subheading: null },
}

export const LongCompanyAndCategory: Story = {
  args: {
    ...defaultArgs,
    items: items.map((i) => ({
      ...i,
      company: `${i.company} International Holdings Limited`,
      category: `${i.category} — trading across the United Kingdom and the Republic of Ireland`,
    })),
  },
}

export const MixedImageShapes: Story = {
  args: {
    ...defaultArgs,
    items: items.map((item, i) =>
      i === 0
        ? { ...item, image: tallPortrait }
        : i === 3
          ? { ...item, image: wideLandscape }
          : item,
    ),
  },
}

export const MissingImages: Story = {
  args: {
    ...defaultArgs,
    items: items.map((item, i) => (i % 2 === 0 ? { ...item, image: '' } : item)) as Item[],
  },
}

export const UnpopulatedImageIds: Story = {
  args: {
    ...defaultArgs,
    items: items.map((item, i) => ({ ...item, image: `68b2c1f0a3d4e5f607182${930 + i}` })),
  },
}

export const NarrowColumnLongCopy: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    heading: LongHeadings.args!.heading,
    subheading: LongHeadings.args!.subheading,
    items: LongCompanyAndCategory.args!.items,
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    heading: `Made By Rapid Formations — ${GERMAN_TOKEN}`,
    subheading: URL_TOKEN,
    items: items.map((item, i) => ({
      ...item,
      company: [GERMAN_TOKEN, EMAIL_TOKEN, URL_TOKEN, GERMAN_TOKEN, EMAIL_TOKEN, URL_TOKEN][i],
      category: [URL_TOKEN, GERMAN_TOKEN, EMAIL_TOKEN, URL_TOKEN, GERMAN_TOKEN, EMAIL_TOKEN][i],
    })),
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: UnbrokenTokens.args,
}
