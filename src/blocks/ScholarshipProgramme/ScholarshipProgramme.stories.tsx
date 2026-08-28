import type { Meta, StoryObj } from '@storybook/react'
import type {
  Media,
  ScholarshipProgrammeBlock as ScholarshipProgrammeBlockProps,
} from '@/payload-types'
import { ScholarshipProgrammeBlock } from './Component'

const logo = (seed: string, width: number, height: number): Media => ({
  id: seed,
  url: `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=${width}&h=${height}&fit=crop`,
  alt: `${seed} logo`,
  width,
  height,
  filename: `${seed}.png`,
  mimeType: 'image/png',
  filesize: 0,
  createdAt: '',
  updatedAt: '',
})

const wideLogo = logo('wide-university', 320, 76)
const portraitLogo = logo('portrait-university', 200, 320)

const narrowViewport = {
  parameters: {
    viewport: {
      options: {
        mobile390: {
          name: 'Mobile 390',
          styles: { width: '390px', height: '1400px' },
          type: 'mobile',
        },
      },
    },
  },
  globals: { viewport: { value: 'mobile390' } },
}

const EMAIL_TOKEN = 'entrepreneur.scholarship.programme.applications@rapid-formations-limited.co.uk'
const URL_TOKEN =
  'https://www.rapidformations.co.uk/entrepreneur-scholarship-programme/application-guidance?utm_source=storybook'
const GERMAN_TOKEN = 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'

const richText = (blocks: { tag: string; text: string }[]) =>
  ({
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr' as const,
      children: blocks.map(({ tag, text }) => ({
        type: tag === 'p' ? 'paragraph' : 'heading',
        ...(tag === 'p' ? {} : { tag }),
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr' as const,
        children: [
          { type: 'text', text, format: 0, style: '', mode: 'normal', detail: 0, version: 1 },
        ],
      })),
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any

const SHORT_INTRO = richText([{ tag: 'p', text: 'Applications open in March.' }])

const LONG_INTRO = richText([
  {
    tag: 'p',
    text: 'Rapid Formations provides professional and affordable UK company registration services to scores of budding and established business owners from across the globe. Our expert knowledge has enabled us to deliver relevant products and consistently high-quality customer service in this increasingly competitive market.',
  },
  { tag: 'h3', text: 'Value of the award' },
  {
    tag: 'p',
    text: 'Up to 5 scholarships of £500 ($700) will be awarded on a competitive basis to candidates who can clearly demonstrate academic excellence and/or entrepreneurial potential.',
  },
])

const winner = (year: string, name: string, courseName: string, university: string) => ({
  id: `${year}-${name}`,
  year,
  name,
  courseName,
  university,
})

const defaultArgs: ScholarshipProgrammeBlockProps = {
  blockType: 'scholarshipProgramme',
  title: 'Rapid Formations Entrepreneur Scholarship Programme',
  intro: LONG_INTRO,
  applyCta: { label: 'Send Your Application', url: 'mailto:funding@rapidformations.co.uk' },
  winnersHeading: 'Scholarship Winners',
  winners: [
    winner('2025', 'Tali Schill', 'Business Management', 'University of Leeds'),
    winner('2025', 'Sebastian Pimentel', 'Computer Science', 'Imperial College London'),
    winner('2024', 'Vera Mintah-Yemoh', 'Economics', 'Durham University'),
    winner('2024', 'Joseph Flask', 'Engineering', 'Heriot Watt University'),
  ],
  sidebarPartners: {
    heading: 'UK Partner Universities',
    universities: [
      { id: 'uk-1', name: 'University of Cambridge', logo: wideLogo },
      { id: 'uk-2', name: 'University of Leeds', logo: wideLogo },
      { id: 'uk-3', name: "King's College London", logo: wideLogo },
    ],
  },
  inlinePartners: {
    heading: 'US Partner Universities',
    universities: [
      { id: 'us-1', name: 'Brandeis University', logo: wideLogo },
      { id: 'us-2', name: 'Pepperdine University', logo: wideLogo },
      { id: 'us-3', name: 'Valparaiso University', logo: wideLogo },
      { id: 'us-4', name: 'Newman University', logo: wideLogo },
      { id: 'us-5', name: 'Utah Valley University', logo: wideLogo },
      { id: 'us-6', name: 'Fontbonne University', logo: wideLogo },
    ],
  },
  sectionLayout: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
}

const meta: Meta<typeof ScholarshipProgrammeBlock> = {
  title: 'Blocks/ScholarshipProgramme',
  component: ScholarshipProgrammeBlock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--surface-canvas)', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ScholarshipProgrammeBlock>

export const Default: Story = { args: defaultArgs }

export const DefaultNarrow: Story = { ...narrowViewport, args: defaultArgs }

export const LongCopy: Story = {
  args: {
    ...defaultArgs,
    title:
      'Rapid Formations Entrepreneur Scholarship Programme for undergraduate and postgraduate students studying in the United Kingdom and the United States',
    applyCta: {
      label: 'Send Your Application To Our Scholarship Committee Today',
      url: 'mailto:funding@rapidformations.co.uk',
    },
    winnersHeading: 'Scholarship Winners From Every Year Of The Programme So Far',
    winners: [
      winner(
        '2025',
        'Maria-Alexandra Vasilescu-Constantinescu',
        'International Business Management and Entrepreneurship',
        'The University of Edinburgh Business School',
      ),
      winner('2024', 'Joseph Flask', 'Engineering', 'Heriot Watt University'),
    ],
  },
}

export const LongCopyNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    title:
      'Rapid Formations Entrepreneur Scholarship Programme for undergraduate and postgraduate students studying in the United Kingdom and the United States',
    winners: [
      winner(
        '2025',
        'Maria-Alexandra Vasilescu-Constantinescu',
        'International Business Management and Entrepreneurship',
        'The University of Edinburgh Business School',
      ),
    ],
  },
}

export const ShortCopy: Story = {
  args: {
    ...defaultArgs,
    title: 'Scholarships',
    intro: SHORT_INTRO,
    applyCta: { label: 'Apply', url: 'mailto:funding@rapidformations.co.uk' },
    winnersHeading: 'Winners',
    winners: [winner('2025', 'Tali Schill', 'Business', 'Leeds')],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    ...defaultArgs,
    title: GERMAN_TOKEN,
    applyCta: { label: EMAIL_TOKEN, url: URL_TOKEN },
    winnersHeading: GERMAN_TOKEN,
    winners: [winner('2025', GERMAN_TOKEN, EMAIL_TOKEN, URL_TOKEN)],
    sidebarPartners: {
      heading: GERMAN_TOKEN,
      universities: [{ id: 'uk-1', name: GERMAN_TOKEN, logo: wideLogo }],
    },
    inlinePartners: {
      heading: URL_TOKEN,
      universities: [{ id: 'us-1', name: EMAIL_TOKEN, logo: wideLogo }],
    },
  },
}

export const UnbrokenTokensNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    title: GERMAN_TOKEN,
    applyCta: { label: EMAIL_TOKEN, url: URL_TOKEN },
    winners: [winner('2025', GERMAN_TOKEN, EMAIL_TOKEN, URL_TOKEN)],
  },
}

export const OptionalsAbsent: Story = {
  args: {
    ...defaultArgs,
    intro: null,
    applyCta: undefined,
    winnersHeading: null,
    winners: [{ id: 'w-1', year: '2025', name: 'Tali Schill', courseName: null, university: null }],
    sidebarPartners: {
      heading: null,
      universities: [{ id: 'uk-1', name: 'Cambridge', logo: wideLogo }],
    },
    inlinePartners: {
      heading: null,
      universities: [{ id: 'us-1', name: 'Brandeis', logo: wideLogo }],
    },
  },
}

export const SingleRowArrays: Story = {
  args: {
    ...defaultArgs,
    winners: [winner('2025', 'Tali Schill', 'Business Management', 'University of Leeds')],
    sidebarPartners: {
      heading: 'UK Partner Universities',
      universities: [{ id: 'uk-1', name: 'University of Cambridge', logo: wideLogo }],
    },
    inlinePartners: {
      heading: 'US Partner Universities',
      universities: [{ id: 'us-1', name: 'Brandeis University', logo: wideLogo }],
    },
  },
}

export const PastNaturalRow: Story = {
  args: {
    ...defaultArgs,
    inlinePartners: {
      heading: 'US Partner Universities',
      universities: [
        { id: 'us-1', name: 'Partner University 1', logo: wideLogo },
        { id: 'us-2', name: 'Partner University 2', logo: wideLogo },
        { id: 'us-3', name: 'Partner University 3', logo: wideLogo },
        { id: 'us-4', name: 'Partner University 4', logo: wideLogo },
        { id: 'us-5', name: 'Partner University 5', logo: wideLogo },
        { id: 'us-6', name: 'Partner University 6', logo: wideLogo },
        { id: 'us-7', name: 'Partner University 7', logo: wideLogo },
      ],
    },
  },
}

export const PortraitLogos: Story = {
  args: {
    ...defaultArgs,
    sidebarPartners: {
      heading: 'UK Partner Universities',
      universities: [{ id: 'uk-1', name: 'Tall Crest University', logo: portraitLogo }],
    },
    inlinePartners: {
      heading: 'US Partner Universities',
      universities: [{ id: 'us-1', name: 'Tall Crest College', logo: portraitLogo }],
    },
  },
}

export const WinnersStress: Story = {
  args: {
    ...defaultArgs,
    winnersHeading: 'Scholarship Winners From Every Year Of The Programme So Far',
    winners: [
      {
        id: 'w-1',
        year: '2025',
        name: 'Maria-Alexandra Vasilescu-Constantinescu',
        courseName: 'International Business Management and Entrepreneurship',
        university: 'The University of Edinburgh Business School',
      },
      {
        id: 'w-2',
        year: '2025',
        name: 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz',
        courseName: 'entrepreneur.scholarship.applications@rapid-formations-limited.co.uk',
        university: 'https://www.rapidformations.co.uk/entrepreneur-scholarship-programme/guidance',
      },
      {
        id: 'w-3',
        year: '2024',
        name: 'Vera Mintah-Yemoh',
        courseName: 'Economics',
        university: 'Durham University',
      },
      {
        id: 'w-4',
        year: '2024',
        name: 'Joseph Flask',
        courseName: 'Engineering',
        university: 'Heriot Watt University',
      },
      {
        id: 'w-5',
        year: '2023',
        name: 'Mayuresh Budukh',
        courseName: 'Data Science',
        university: 'University of Sussex',
      },
    ],
  },
}

export const WinnersStressNarrow: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    winners: [
      {
        id: 'w-1',
        year: '2025',
        name: 'Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz',
        courseName: 'entrepreneur.scholarship.applications@rapid-formations-limited.co.uk',
        university: 'https://www.rapidformations.co.uk/entrepreneur-scholarship-programme/guidance',
      },
    ],
  },
}

export const LogoAbsent: Story = {
  args: {
    ...defaultArgs,
    sidebarPartners: {
      heading: 'UK Partner Universities',
      universities: [
        { id: 'uk-1', name: 'University of Cambridge', logo: 'media-id-not-populated' },
        { id: 'uk-2', name: 'University of Leeds', logo: wideLogo },
      ],
    },
    inlinePartners: {
      heading: 'US Partner Universities',
      universities: [
        { id: 'us-1', name: 'Brandeis University', logo: 'media-id-not-populated' },
        { id: 'us-2', name: 'Pepperdine University', logo: wideLogo },
      ],
    },
  },
}

export const PartnersAbsent: Story = {
  args: {
    ...defaultArgs,
    sidebarPartners: { heading: 'UK Partner Universities', universities: [] },
    inlinePartners: { heading: 'US Partner Universities', universities: [] },
  },
}
