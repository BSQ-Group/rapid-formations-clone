import type { Meta, StoryObj } from '@storybook/react'

import { ServicesBenefitsBlockComponent } from './Component'
import type { Media, ServicesBenefitsBlock } from '@/payload-types'

const four = [
  {
    id: '1',
    icon: 'businessTime' as const,
    title: 'Save time and money with legally reviewed business documents',
    body: 'Get ready-to-use templates for contracts, policies, and forms - professionally drafted, legally reviewed, and fully editable.',
  },
  {
    id: '2',
    icon: 'fileCircleCheck' as const,
    title: 'Avoid late filings or penalties',
    body: "Your confirmation statement and ICO registration are submitted on time, avoiding Companies House penalties and protecting your company's standing.",
  },
  {
    id: '3',
    icon: 'headset' as const,
    title: 'Expert compliance support',
    body: 'Speak to our compliance specialists by phone or email whenever you need practical guidance.',
  },
  {
    id: '4',
    icon: 'calendarCheck' as const,
    title: 'Save 30% on company changes',
    body: 'Company changes can be costly through a solicitor or accountant. We’ll handle share transfers, director appointments, address updates, and more - at 30% off our standard rates.',
  },
]

const meta: Meta<typeof ServicesBenefitsBlockComponent> = {
  component: ServicesBenefitsBlockComponent,
  title: 'Blocks/ServicesBenefits',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)] py-10">
        <Story />
      </div>
    ),
  ],
  args: {
    blockType: 'servicesBenefits',
    heading: 'What are the benefits of the Hassle-Free Compliance Service?',
    subheading: '',
    benefits: four,
    image: {
      id: 'benefits-landscape',
      filename: 'benefits.png',
      alt: '',
      url: 'https://placehold.co/1106x1112/f1f1f1/595959?text=Benefits',
      width: 1106,
      height: 1112,
      mimeType: 'image/png',
      filesize: 0,
      createdAt: '',
      updatedAt: '',
    } as Media,
  },
}

export default meta
type Story = StoryObj<typeof ServicesBenefitsBlockComponent>

export const Default: Story = {
  args: {
    heading: 'What are the benefits of the Hassle-Free Compliance Service?',
    benefits: four,
    image: {
      id: 'benefits-landscape',
      filename: 'benefits.png',
      alt: '',
      url: 'https://placehold.co/1106x1112/f1f1f1/595959?text=Benefits',
      width: 1106,
      height: 1112,
      mimeType: 'image/png',
      filesize: 0,
      createdAt: '',
      updatedAt: '',
    } as Media,
  },
}

export const WithSubheading: Story = {
  args: { subheading: 'Everything a growing limited company needs to stay compliant.' },
}

export const OneBenefit: Story = {
  args: { heading: 'One benefit', benefits: [four[0]] },
}

export const SevenBenefits: Story = {
  args: {
    benefits: [
      ...four,
      { id: '5', icon: 'headset' as const, title: 'Priority phone line', body: 'Skip the queue.' },
      {
        id: '6',
        icon: 'calendarCheck' as const,
        title: 'Renewal reminders',
        body: 'We tell you before anything is due.',
      },
      {
        id: '7',
        icon: 'fileCircleCheck' as const,
        title: 'Filing history',
        body: 'Every submission kept in one place.',
      },
    ],
  },
}

export const NoImage: Story = {
  args: { image: null } as unknown as Partial<ServicesBenefitsBlock>,
}

export const PortraitImage: Story = {
  args: {
    image: {
      id: 'benefits-portrait',
      filename: 'portrait.png',
      alt: '',
      url: 'https://placehold.co/600x1200/f1f1f1/595959?text=Tall',
      width: 600,
      height: 1200,
      mimeType: 'image/png',
      filesize: 0,
      createdAt: '',
      updatedAt: '',
    } as Media,
  },
}

export const LongCopy: Story = {
  args: {
    heading:
      'What are the benefits of the Hassle-Free Compliance Service and the Business Document Template Library for a growing UK limited company?',
    subheading:
      'Everything a growing limited company needs to stay compliant with Companies House and the Information Commissioner’s Office, from statutory filings through to legally reviewed document templates and unlimited access to our in-house compliance specialists.',
    benefits: [
      {
        ...four[0],
        title:
          'Save a great deal of time and money with more than four hundred legally reviewed, fully editable business document templates',
        body: 'Get ready-to-use templates for contracts, policies, forms, letters, notices and board minutes — every one professionally drafted, reviewed by qualified lawyers, kept current with changing legislation, and fully editable in the tools you already use, so nothing has to be written from scratch again.',
      },
      ...four.slice(1),
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    heading: 'https://www.rapidformations.co.uk/hassle-free-compliance/benefits',
    subheading: 'Rechtsschutzversicherungsgesellschaftenvertragsvorlagendokumentation',
    benefits: [
      {
        id: '1',
        icon: 'headset' as const,
        title: 'compliance-support@rapidformations.co.uk',
        body: 'Betriebsvereinbarungsentwurfsdokumentationsvorlagenverzeichnis',
      },
      { id: '2', icon: 'businessTime' as const, title: 'Short one', body: 'Two words.' },
    ],
  },
}

export const Narrow: Story = {
  args: {
    heading:
      'What are the benefits of the Hassle-Free Compliance Service and the Business Document Template Library for a growing UK limited company?',
    subheading:
      'Everything a growing limited company needs to stay compliant with Companies House and the Information Commissioner’s Office, from statutory filings through to legally reviewed document templates and unlimited access to our in-house compliance specialists.',
    benefits: [
      {
        ...four[0],
        title:
          'Save a great deal of time and money with more than four hundred legally reviewed, fully editable business document templates',
        body: 'Get ready-to-use templates for contracts, policies, forms, letters, notices and board minutes — every one professionally drafted, reviewed by qualified lawyers, kept current with changing legislation, and fully editable in the tools you already use.',
      },
      ...four.slice(1),
    ],
  },
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '1600px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}
