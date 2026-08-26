import type { Meta, StoryObj } from '@storybook/react'

import { ServiceInclusionsGridBlockComponent } from './Component'
import type { Media, ServiceInclusionsGridBlock } from '@/payload-types'

const icon = (label: string, size = '160x160'): Media =>
  ({
    id: `icon-${label}`,
    filename: `${label}.png`,
    alt: label,
    url: `https://placehold.co/${size}/f1f1f1/595959?text=${encodeURIComponent(label)}`,
    width: Number(size.split('x')[0]),
    height: Number(size.split('x')[1]),
    mimeType: 'image/png',
    filesize: 0,
    createdAt: '',
    updatedAt: '',
  }) as Media

const twelve = [
  {
    id: '1',
    icon: icon('Templates'),
    title: 'Business Document Template Library',
    description: '400+ customisable, legally reviewed business document templates.',
  },
  {
    id: '2',
    icon: icon('Support'),
    title: 'Expert Compliance Support',
    description: 'Your questions answered by phone or email, whenever you need us.',
  },
  {
    id: '3',
    icon: icon('Discount'),
    title: '30% Discount on Company Changes',
    description: 'Save on essential admin updates.',
  },
  {
    id: '4',
    icon: icon('Filing'),
    title: 'Filing of your Confirmation Statement',
    description: 'Stay compliant and avoid Companies House late filing penalties.',
  },
  {
    id: '5',
    icon: icon('ICO'),
    title: 'ICO Registration – Optional',
    description: 'Ensure data protection compliance effortlessly.',
  },
  {
    id: '6',
    icon: icon('Standing'),
    title: 'Certificate of Good Standing – Optional',
    description: 'Confirm legitimacy with ease.',
  },
  {
    id: '7',
    icon: icon('Alerts'),
    title: 'Email Alerts for Filings',
    description: 'Timely notifications on all deadlines.',
  },
  {
    id: '8',
    icon: icon('Registers'),
    title: 'Preparation and Maintenance of your Company Registers',
    description: 'Accurate statutory record keeping.',
  },
  {
    id: '9',
    icon: icon('Dormant'),
    title: 'Dormant Company Service',
    description: 'Simplified management for companies that aren’t trading.',
  },
  {
    id: '10',
    icon: icon('Tips'),
    title: 'Compliance Hints, Tips and Tricks',
    description: 'Compliance insights and tips, delivered monthly.',
  },
  {
    id: '11',
    icon: icon('GDPR'),
    title: 'UK GDPR Compliance Package',
    description: 'Templates to strengthen data protection and avoid data breaches.',
  },
  {
    id: '12',
    icon: icon('Webinars'),
    title: 'Compliance Webinars',
    description: 'Quarterly sessions from industry leaders.',
  },
]

const meta: Meta<typeof ServiceInclusionsGridBlockComponent> = {
  component: ServiceInclusionsGridBlockComponent,
  title: 'Blocks/ServiceInclusionsGrid',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)] py-10">
        <Story />
      </div>
    ),
  ],
  args: {
    blockType: 'serviceInclusionsGrid',
    heading: "What's included",
    items: twelve,
  },
}

export default meta
type Story = StoryObj<typeof ServiceInclusionsGridBlockComponent>

export const Default: Story = {
  args: { heading: "What's included", items: twelve },
}

export const OneInclusion: Story = {
  args: { heading: 'One thing', items: [twelve[0]] },
}

export const FourInclusions: Story = {
  args: { items: twelve.slice(0, 4) },
}

export const PortraitIcons: Story = {
  args: {
    items: twelve.slice(0, 3).map((item) => ({ ...item, icon: icon('Tall', '300x900') })),
  },
}

export const LongCopy: Story = {
  args: {
    heading:
      'What is included in the Hassle-Free Compliance Service for a growing UK limited company, month after month?',
    items: [
      {
        ...twelve[0],
        title:
          'Business Document Template Library with more than four hundred legally reviewed templates',
        description:
          'Over four hundred customisable, legally reviewed business document templates covering contracts, policies, forms, letters, notices and board minutes, every one kept current with changing legislation and editable in the tools you already use.',
      },
      ...twelve.slice(1, 3),
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    heading: 'https://www.rapidformations.co.uk/hassle-free-compliance/whats-included',
    items: [
      {
        id: 'u1',
        icon: icon('Templates'),
        title: 'compliance-support@rapidformations.co.uk',
        description: 'Rechtsschutzversicherungsgesellschaftenvertragsvorlagendokumentation',
      },
      {
        id: 'u2',
        icon: icon('Support'),
        title: 'Short one',
        description: 'Two words.',
      },
      {
        id: 'u3',
        icon: icon('Discount'),
        title:
          'Preparation and Maintenance of your Company Registers and Statutory Books, Kept Current',
        description:
          'Accurate statutory record keeping, reviewed every time a director, shareholder or registered address changes, so the registers are always ready for inspection.',
      },
    ],
  },
}

export const IconMissing: Story = {
  args: {
    heading: 'Icon missing',
    items: [
      {
        id: 'm1',
        icon: null,
        title: 'Business Document Template Library',
        description: '400+ customisable, legally reviewed business document templates.',
      },
      {
        id: 'm2',
        icon: icon('Support'),
        title: 'Expert Compliance Support',
        description: 'Your questions answered by phone or email, whenever you need us.',
      },
    ],
  } as unknown as Partial<ServiceInclusionsGridBlock>,
}

export const Narrow: Story = {
  args: {
    heading:
      'What is included in the Hassle-Free Compliance Service for a growing UK limited company, month after month?',
    items: [
      {
        ...twelve[0],
        title:
          'Business Document Template Library with more than four hundred legally reviewed templates',
        description:
          'Over four hundred customisable, legally reviewed business document templates covering contracts, policies, forms, letters, notices and board minutes, every one kept current with changing legislation.',
      },
      ...twelve.slice(1, 3),
    ],
  },
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '1600px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}
