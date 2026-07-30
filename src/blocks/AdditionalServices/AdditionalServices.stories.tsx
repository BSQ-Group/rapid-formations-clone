import type { Meta, StoryObj } from '@storybook/react'
import { AdditionalServicesBlock } from './Component'
import type { AdditionalServicesBlock as AdditionalServicesBlockProps } from '@/payload-types'

const makeLink = (url: string) => ({
  type: 'custom' as const,
  url,
  label: 'Learn more',
  newTab: false,
  reference: null,
})

const cards: NonNullable<AdditionalServicesBlockProps['cards']> = [
  {
    id: '1',
    title: 'Registered Office',
    description:
      "Use our address as your company's official location and keep your home address private.",
    link: makeLink('/registered-office'),
  },
  {
    id: '2',
    title: "Director's Address",
    description:
      "Keep your residential address off public records. We'll forward your official mail.",
    link: makeLink('/directors-address'),
  },
  {
    id: '3',
    title: 'Change Company Name',
    description:
      "Update your company's name quickly and easily with our straightforward service.",
    link: makeLink('/change-company-name'),
  },
  {
    id: '4',
    title: 'Business Address',
    description: 'Establish a professional image with a prestigious London business address.',
    link: makeLink('/business-address'),
  },
  {
    id: '5',
    title: 'Compliance Support',
    description: 'Stay on top of filings and deadlines with our expert compliance assistance.',
    link: makeLink('/compliance-support'),
  },
  {
    id: '6',
    title: 'Company Dissolution',
    description: 'Close your company efficiently and avoid late filing penalties.',
    link: makeLink('/company-dissolution'),
  },
  {
    id: '7',
    title: 'Confirmation Statement',
    description:
      'Ensure your company meets its legal obligations with our confirmation statement service.',
    link: makeLink('/confirmation-statement'),
  },
  {
    id: '8',
    title: 'VAT Registration',
    description: 'Simplify VAT registration with our expert preparation and filing service.',
    link: makeLink('/vat-registration'),
  },
  {
    id: '9',
    title: 'Dormant Company Accounts',
    description:
      "If your company is not trading, save money on accountants' fees and let us prepare and file your annual accounts.",
    link: makeLink('/dormant-company-accounts'),
  },
]

const defaultArgs: AdditionalServicesBlockProps = {
  id: 'story-1',
  blockType: 'additionalServices',
  blockName: 'Additional Services',
  heading: 'Additional limited company and address services',
  cards,
  sectionLayout: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
}

const meta: Meta<typeof AdditionalServicesBlock> = {
  component: AdditionalServicesBlock,
  title: 'Blocks/AdditionalServices',
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
type Story = StoryObj<typeof AdditionalServicesBlock>

export const Default: Story = {
  args: defaultArgs,
}

export const FewCards: Story = {
  args: {
    ...defaultArgs,
    cards: cards.slice(0, 3),
  },
}

export const LongDescriptions: Story = {
  args: {
    ...defaultArgs,
    cards: cards.map((c) => ({
      ...c,
      description: c.description + ' Additional context that makes this description much longer to test equal row heights across all cards in the same grid row.',
    })),
  },
}
