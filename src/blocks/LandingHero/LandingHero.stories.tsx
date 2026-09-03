import type { Meta, StoryObj } from '@storybook/react'
import { LandingHeroBlock } from './Component'
import type { LandingHeroBlock as LandingHeroBlockProps } from '@/payload-types'

const defaultArgs: LandingHeroBlockProps = {
  id: 'story-1',
  blockType: 'landingHero',
  blockName: 'Landing Hero',
  eyebrow: null,
  heading: 'Company formation made easy',
  benefits: [
    {
      id: 'b1',
      text: 'Fastest UK company formation \u2013 get up and running in just 3 to 24 hours',
    },
    {
      id: 'b2',
      text: 'Companies House authorised agent (ACSP) with secure ID verification included',
    },
    { id: 'b3', text: "Specialist support and compliance you won't get at Companies House" },
  ],
  searchPlaceholder: 'Find your perfect company name',
  searchLink: {
    type: 'custom',
    url: '/company-name-search',
    newTab: false,
  },
  pricingLink: {
    type: 'custom',
    url: '/pricing',
    label: 'View Pricing',
    newTab: false,
  },
  packagesLink: {
    type: 'custom',
    url: '/compare-packages',
    label: 'Choose a Package',
    newTab: false,
  },
  backgroundImage: '' as any,
  bankCards: {
    heading: 'Set up your company today and get a free business bank account',
    banks: [
      {
        id: 'bank-0',
        name: 'Barclays',
        brandColour: '#4DAFEA',
        logo: {
          id: 'logo-0',
          url: 'https://placehold.co/32x32/ffffff/4DAFEA?text=B',
          width: 32,
          height: 32,
          alt: 'Barclays',
        },
      },
      {
        id: 'bank-1',
        name: 'NatWest',
        brandColour: '#401664',
        logo: {
          id: 'logo-1',
          url: 'https://placehold.co/32x32/ffffff/401664?text=N',
          width: 32,
          height: 32,
          alt: 'NatWest',
        },
      },
      {
        id: 'bank-2',
        name: 'Starling',
        brandColour: '#321E37',
        logo: {
          id: 'logo-2',
          url: 'https://placehold.co/32x32/ffffff/321E37?text=S',
          width: 32,
          height: 32,
          alt: 'Starling',
        },
      },
      {
        id: 'bank-3',
        name: 'Monzo',
        brandColour: '#E9524A',
        logo: {
          id: 'logo-3',
          url: 'https://placehold.co/32x32/ffffff/E9524A?text=M',
          width: 32,
          height: 32,
          alt: 'Monzo',
        },
      },
      {
        id: 'bank-4',
        name: 'Zempler',
        brandColour: '#5AA9E6',
        logo: {
          id: 'logo-4',
          url: 'https://placehold.co/32x32/ffffff/5AA9E6?text=Z',
          width: 32,
          height: 32,
          alt: 'Zempler',
        },
      },
      {
        id: 'bank-5',
        name: 'Anna',
        brandColour: '#2F2F2F',
        logo: {
          id: 'logo-5',
          url: 'https://placehold.co/32x32/ffffff/2F2F2F?text=A',
          width: 32,
          height: 32,
          alt: 'Anna',
        },
      },
      {
        id: 'bank-6',
        name: 'Wise',
        brandColour: '#9FE870',
        logo: {
          id: 'logo-6',
          url: 'https://placehold.co/32x32/ffffff/9FE870?text=W',
          width: 32,
          height: 32,
          alt: 'Wise',
        },
      },
      {
        id: 'bank-7',
        name: 'Lloyds',
        brandColour: '#12A594',
        logo: {
          id: 'logo-7',
          url: 'https://placehold.co/32x32/ffffff/12A594?text=L',
          width: 32,
          height: 32,
          alt: 'Lloyds',
        },
      },
    ],
  },
  reviewCards: [
    {
      id: 'r1',
      provider: 'Google',
      logo: {
        id: 'google-logo',
        url: 'https://placehold.co/91x30/ffffff/1c1d24?text=Google',
        width: 91,
        height: 30,
        alt: 'Google',
      },
      score: '4.9',
      maxScore: '5.0',
      reviewCount: '1,429',
      link: { type: 'custom', url: 'https://www.google.com', newTab: true },
    },
    {
      id: 'r2',
      provider: 'Trustpilot',
      logo: {
        id: 'trustpilot-logo',
        url: 'https://placehold.co/120x30/ffffff/1c1d24?text=Trustpilot',
        width: 120,
        height: 30,
        alt: 'Trustpilot',
      },
      score: '4.8',
      maxScore: '5.0',
      reviewCount: '11,824',
      link: { type: 'custom', url: 'https://www.trustpilot.com', newTab: true },
    },
  ],
} as any

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

const EMAIL_TOKEN = 'company.formations.customer.services@rapidformations-worldwide-group.co.uk'
const URL_TOKEN =
  'https://www.rapidformations.co.uk/company-formation/all-inclusive-package/checkout?utm_source=storybook&utm_campaign=overflow'
const GERMAN_TOKEN = 'Gesellschaftsgründungsbegleitungsdienstleistungsunternehmen'

const tokenBankLogo = (n: number) =>
  ({
    id: `token-logo-${n}`,
    url: `https://placehold.co/32x32/ffffff/275ee2?text=${n}`,
    width: 32,
    height: 32,
    alt: `Bank ${n}`,
  }) as any

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

export const WithMobileBadge: Story = {
  args: {
    ...defaultArgs,
    mobileBadge: {
      id: 'bcorp-badge',
      url: 'https://placehold.co/404x680/ffffff/275ee2?text=B',
      width: 404,
      height: 680,
      alt: 'Rapid Formations certified B Corporation logo.',
    },
  } as any,
}

export const PartialStarRating: Story = {
  args: {
    ...defaultArgs,
    reviewCards: (defaultArgs.reviewCards || []).map((c, i) => ({
      ...c,
      score: i === 0 ? '3.5' : '4.2',
      reviewCount: i === 0 ? '12' : '3,001',
    })),
  } as any,
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
    reviewCards: [],
  } as any,
}

export const NarrowLongCopy: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    eyebrow: 'UK LIMITED COMPANY FORMATION AND COMPANIES HOUSE FILING',
    heading: 'Register your UK limited company today with the fastest Companies House authorised agent',
    benefits: [
      {
        id: 'b1',
        text: 'The fastest UK company formation available anywhere — most companies are incorporated and trading within 3 to 24 hours of the application being submitted',
      },
      {
        id: 'b2',
        text: 'A Companies House authorised corporate service provider (ACSP), with secure identity verification for every officer and person with significant control included as standard',
      },
      {
        id: 'b3',
        text: "Specialist ongoing support and compliance reminders that you will never get by filing directly with Companies House yourself",
      },
    ],
    searchPlaceholder: 'Type the company name you would like to register and we will check it',
    pricingLink: {
      type: 'custom',
      url: '/pricing',
      label: 'Compare every formation package and see the full pricing',
      newTab: false,
    },
    bankCards: {
      heading:
        'Set up your limited company today and get a free UK business bank account with one of our partner banks, opened before you start trading',
      banks: defaultArgs.bankCards!.banks,
    },
    accreditations: [
      {
        id: 'a1',
        label: 'Part of',
        size: 'lg',
        logo: {
          id: 'bsq-logo',
          url: 'https://placehold.co/300x62/1c1d24/ffffff?text=BSQ+Group',
          width: 300,
          height: 62,
          alt: 'BSQ group logo.',
        },
      },
      {
        id: 'a2',
        size: 'sm',
        logo: {
          id: 'bcorp-logo',
          url: 'https://placehold.co/404x680/1c1d24/ffffff?text=B+Corp',
          width: 404,
          height: 680,
          alt: 'Rapid Formations certified B Corporation logo.',
        },
      },
    ],
    reviewCards: [
      {
        id: 'r1',
        provider: 'Google Business Profile Reviews',
        logo: {
          id: 'google-logo',
          url: 'https://placehold.co/91x30/ffffff/1c1d24?text=Google',
          width: 91,
          height: 30,
          alt: 'Google',
        },
        score: '4.95',
        maxScore: '5.00',
        reviewCount: '1,429,507',
      },
      {
        id: 'r2',
        provider: 'Trustpilot Verified Company Reviews',
        logo: {
          id: 'trustpilot-logo',
          url: 'https://placehold.co/120x30/ffffff/1c1d24?text=Trustpilot',
          width: 120,
          height: 30,
          alt: 'Trustpilot',
        },
        score: '4.85',
        maxScore: '5.00',
        reviewCount: '11,824,336',
      },
    ],
  } as any,
}

export const NarrowUnbrokenTokens: Story = {
  ...narrowViewport,
  args: {
    ...defaultArgs,
    eyebrow: GERMAN_TOKEN,
    heading: `Register at ${URL_TOKEN}`,
    benefits: [
      { id: 'b1', text: `Email ${EMAIL_TOKEN} and we reply the same working day` },
      { id: 'b2', text: GERMAN_TOKEN },
      { id: 'b3', text: URL_TOKEN },
    ],
    searchPlaceholder: GERMAN_TOKEN,
    pricingLink: { type: 'custom', url: '/pricing', label: GERMAN_TOKEN, newTab: false },
    packagesLink: { type: 'custom', url: URL_TOKEN, label: GERMAN_TOKEN, newTab: false },
    bankCards: {
      heading: `Free business bank account — ${EMAIL_TOKEN}`,
      banks: [
        {
          id: 'tb-0',
          name: GERMAN_TOKEN,
          brandColour: 'light-dark(#4DAFEA,#0B2E4F)',
          logo: tokenBankLogo(0),
        },
        { id: 'tb-1', name: 'Handelsbanken', brandColour: '#401664', logo: tokenBankLogo(1) },
        { id: 'tb-2', name: 'Starling', brandColour: '#321E37', logo: tokenBankLogo(2) },
        { id: 'tb-3', name: 'Monzo', brandColour: '#E9524A', logo: tokenBankLogo(3) },
        { id: 'tb-4', name: 'Zempler', brandColour: '#5AA9E6', logo: tokenBankLogo(4) },
        { id: 'tb-5', name: 'Anna', brandColour: '#2F2F2F', logo: tokenBankLogo(5) },
        { id: 'tb-6', name: 'Wise', brandColour: '#9FE870', logo: tokenBankLogo(6) },
        { id: 'tb-7', name: 'Lloyds', brandColour: '#12A594', logo: tokenBankLogo(7) },
      ],
    },
    accreditations: [
      {
        id: 'a1',
        label: GERMAN_TOKEN,
        size: 'lg',
        logo: {
          id: 'bsq-logo',
          url: 'https://placehold.co/300x62/1c1d24/ffffff?text=BSQ+Group',
          width: 300,
          height: 62,
          alt: 'BSQ group logo',
        },
      },
    ],
    reviewCards: [
      {
        id: 'r1',
        provider: GERMAN_TOKEN,
        logo: {
          id: 'google-logo',
          url: 'https://placehold.co/91x30/ffffff/1c1d24?text=Google',
          width: 91,
          height: 30,
          alt: 'Google',
        },
        score: '4.9',
        maxScore: '5.0',
        reviewCount: '1,429',
      },
      {
        id: 'r2',
        provider: 'Trustpilot',
        logo: {
          id: 'trustpilot-logo',
          url: 'https://placehold.co/120x30/ffffff/1c1d24?text=Trustpilot',
          width: 120,
          height: 30,
          alt: 'Trustpilot',
        },
        score: '4.8',
        maxScore: '5.0',
        reviewCount: '11,824',
      },
    ],
  } as any,
}

const landscape = (id: string, label: string) =>
  ({
    id,
    url: `https://placehold.co/1200x400/1c1d24/ffffff?text=${encodeURIComponent(label)}`,
    width: 1200,
    height: 400,
    alt: label,
  }) as any

const portrait = (id: string, label: string) =>
  ({
    id,
    url: `https://placehold.co/400x1200/1c1d24/ffffff?text=${encodeURIComponent(label)}`,
    width: 400,
    height: 1200,
    alt: label,
  }) as any

export const FourBenefits: Story = {
  args: {
    ...defaultArgs,
    benefits: [
      ...(defaultArgs.benefits || []),
      {
        id: 'b4',
        text: 'Free business bank account introduction with every formation package we sell',
      },
    ],
  } as any,
}

export const WidestNumerics: Story = {
  args: {
    ...defaultArgs,
    reviewCards: [
      {
        id: 'r1',
        provider: 'Google',
        logo: {
          id: 'google-logo',
          url: 'https://placehold.co/91x30/ffffff/1c1d24?text=Google',
          width: 91,
          height: 30,
          alt: 'Google',
        },
        score: '10.0',
        maxScore: '10.0',
        reviewCount: '11,824,336',
      },
      {
        id: 'r2',
        provider: 'Trustpilot',
        logo: {
          id: 'trustpilot-logo',
          url: 'https://placehold.co/120x30/ffffff/1c1d24?text=Trustpilot',
          width: 120,
          height: 30,
          alt: 'Trustpilot',
        },
        score: '4.95',
        maxScore: '5.00',
        reviewCount: '1,429,507',
      },
    ],
  } as any,
}

export const NarrowWidestNumerics: Story = {
  ...narrowViewport,
  args: WidestNumerics.args,
}

export const Depth0Media: Story = {
  args: {
    ...defaultArgs,
    searchPlaceholder: null,
    backgroundImage: null,
    mobileBadge: null,
    illustration: { video: null, videoFallback: null, poster: null },
    accreditations: [
      { id: 'a1', label: 'Part of', size: 'lg', logo: null },
      { id: 'a2', size: 'sm', logo: null },
    ],
    bankCards: {
      heading: null,
      banks: (defaultArgs.bankCards!.banks || []).map((bank: any) => ({
        ...bank,
        logo: null,
        backgroundImage: null,
      })),
    },
    reviewCards: (defaultArgs.reviewCards || []).map((card: any) => ({
      ...card,
      logo: null,
    })),
  } as any,
}

export const NarrowDepth0Media: Story = {
  ...narrowViewport,
  args: Depth0Media.args,
}

export const PortraitMedia: Story = {
  args: {
    ...defaultArgs,
    backgroundImage: portrait('bg-portrait', 'Portrait background'),
    mobileBadge: landscape('badge-landscape', 'Landscape badge'),
    accreditations: [
      {
        id: 'a1',
        label:
          'Part of the BSQ Group of company formation and business services businesses, trading across the United Kingdom and the Republic of Ireland since 2010',
        size: 'lg',
        logo: portrait('bsq-portrait', 'BSQ'),
      },
    ],
    bankCards: {
      heading: defaultArgs.bankCards!.heading,
      banks: (defaultArgs.bankCards!.banks || []).map((bank: any, i: number) => ({
        ...bank,
        backgroundImage: i % 2 ? portrait(`pat-${i}`, '') : landscape(`pat-${i}`, ''),
      })),
    },
  } as any,
}

export const WithIllustration: Story = {
  args: {
    ...defaultArgs,
    illustration: {
      video: {
        id: 'illustration-video',
        url: 'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/homepage-illustration.webm',
        width: 1200,
        height: 400,
        alt: 'Company formation illustration',
      },
      videoFallback: {
        id: 'illustration-video-fallback',
        url: 'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/homepage-illustration.mp4',
        width: 1200,
        height: 400,
        alt: 'Company formation illustration',
      },
      poster: {
        id: 'illustration-poster',
        url: 'https://placehold.co/1200x400/1c1d24/ffffff?text=Illustration+poster',
        width: 1200,
        height: 400,
        alt: 'Illustration poster',
      },
    },
  } as any,
}

export const PortraitIllustration: Story = {
  args: {
    ...defaultArgs,
    illustration: {
      video: {
        id: 'illustration-video-portrait',
        url: 'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/homepage-illustration.webm',
        width: 400,
        height: 1200,
        alt: 'Company formation illustration',
      },
      videoFallback: {
        id: 'illustration-video-fallback-portrait',
        url: 'https://sp-rapid.s3.eu-west-2.amazonaws.com/videos/homepage-illustration.mp4',
        width: 400,
        height: 1200,
        alt: 'Company formation illustration',
      },
      poster: {
        id: 'illustration-poster-portrait',
        url: 'https://placehold.co/400x1200/1c1d24/ffffff?text=Illustration+poster',
        width: 400,
        height: 1200,
        alt: 'Illustration poster',
      },
    },
  } as any,
}

export const WithAccreditations: Story = {
  args: {
    ...defaultArgs,
    accreditations: [
      {
        id: 'a1',
        label: 'Part of',
        size: 'lg',
        logo: {
          id: 'bsq-logo',
          url: 'https://placehold.co/300x62/1c1d24/ffffff?text=BSQ+Group',
          width: 300,
          height: 62,
          alt: 'BSQ group logo',
        },
        link: { type: 'custom', url: 'https://www.bsqgroup.co.uk', newTab: true },
      },
      {
        id: 'a2',
        size: 'sm',
        logo: {
          id: 'bcorp-logo',
          url: 'https://placehold.co/90x140/1c1d24/ffffff?text=B',
          width: 90,
          height: 140,
          alt: 'Certified B Corporation logo',
        },
        link: {
          type: 'custom',
          url: 'https://www.bcorporation.net/en-us/find-a-b-corp/company/bsq-group/',
          newTab: true,
        },
      },
    ],
  } as any,
}
