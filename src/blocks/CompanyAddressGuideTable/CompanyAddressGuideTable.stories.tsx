import type { Meta, StoryObj } from '@storybook/react'

import { CompanyAddressGuideTableBlockComponent } from './Component'
import type { CompanyAddressGuideTableBlock } from '@/payload-types'

type Inline = { text: string; superscript?: boolean; bold?: boolean; href?: string }

const textNode = ({ text, superscript, bold }: Inline) => ({
  type: 'text',
  detail: 0,
  format: (superscript ? 64 : 0) | (bold ? 1 : 0),
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

const inline = (part: Inline) =>
  part.href
    ? {
        type: 'link',
        children: [textNode(part)],
        direction: 'ltr',
        fields: { linkType: 'custom', newTab: false, url: part.href },
        format: '',
        indent: 0,
        version: 3,
      }
    : textNode(part)

const root = (children: unknown[]): any => ({
  root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
})

const rich = (...parts: (string | Inline)[]) =>
  root([
    {
      type: 'paragraph',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      textFormat: 0,
      textStyle: '',
      children: parts.map((part) => inline(typeof part === 'string' ? { text: part } : part)),
    },
  ])

const list = (...items: (string | Inline)[][]) =>
  root([
    {
      type: 'list',
      listType: 'number',
      start: 1,
      tag: 'ol',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: items.map((parts, index) => ({
        type: 'listitem',
        value: index + 1,
        checked: undefined,
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: parts.map((part) => inline(typeof part === 'string' ? { text: part } : part)),
      })),
    },
  ])

const headings = {
  registeredOffice: 'Registered Office Address',
  serviceAddress: 'Service\nAddress',
  businessAddress: 'Business\nAddress',
}

const addressRows: CompanyAddressGuideTableBlock['tables'][number]['rows'] = [
  {
    id: 'r1',
    question: rich('What is the purpose of this address?'),
    registeredOffice: rich("It is a company's official address for receiving government mail"),
    serviceAddress: rich(
      "It is a company officer's",
      { text: '1', superscript: true },
      ' official address for receiving government mail',
    ),
    businessAddress: rich('It is the address where all general business mail will be received'),
  },
  {
    id: 'r2',
    question: rich('Do I need this address to set up a limited company or LLP?'),
    registeredOffice: rich('Yes'),
    serviceAddress: rich('Yes'),
    businessAddress: rich('No'),
  },
  {
    id: 'r3',
    question: rich('Is this address displayed on public record at Companies House?'),
    registeredOffice: rich('Yes'),
    serviceAddress: rich('Yes'),
    businessAddress: rich('No'),
  },
  {
    id: 'r4',
    question: rich('What type of mail is sent to this address?'),
    registeredOffice: rich(
      'Official mail addressed to the company from UK government bodies and Court documents',
    ),
    serviceAddress: rich(
      'Official mail addressed to a company officer from UK government bodies and Court documents',
    ),
    businessAddress: rich('General business mail (from banks, suppliers, customers, etc.)'),
  },
  {
    id: 'r5',
    question: rich(
      'Does this address need to be in the same jurisdiction',
      { text: '3', superscript: true },
      ' in which the company is registered?',
    ),
    registeredOffice: rich('Yes'),
    serviceAddress: rich('No'),
    businessAddress: rich('No'),
  },
]

const addressFootnote = list(
  [{ text: 'Company Officer:', bold: true }, ' a director, company secretary or a shareholder.'],
  [
    { text: 'Business Address Service:', bold: true },
    ' there is no legal requirement to display a business address, but it is essential practice.',
  ],
  [
    { text: 'Jurisdiction:', bold: true },
    ' the UK is split into 3 jurisdictions (England & Wales, Scotland, N. Ireland).',
  ],
)

const servicesTable: CompanyAddressGuideTableBlock['tables'][number] = {
  id: 't2',
  heading: 'Our company address services',
  columnHeadings: {
    registeredOffice: 'Registered Office\nAddress Service',
    serviceAddress: 'Service Address\nService',
    businessAddress: 'Business Address\nService',
  },
  rows: [
    {
      id: 's1',
      question: rich('Why would I want to purchase this address service?'),
      registeredOffice: list(
        ['It is a legal requirement'],
        ['To keep your home address private'],
        ['To enhance your company image'],
      ),
      serviceAddress: list(['It is a legal requirement'], ['To keep your home address private']),
      businessAddress: list(
        ['To enhance your business image'],
        ['To keep your home address private'],
      ),
    },
    {
      id: 's2',
      question: rich('Where can I buy this address service?'),
      registeredOffice: rich({
        text: 'Registered Office',
        href: '/additional-services/london-registered-office/',
      }),
      serviceAddress: rich({
        text: 'Service Address',
        href: '/additional-services/service-address/',
      }),
      businessAddress: rich({
        text: 'Business Address',
        href: '/additional-services/business-address/',
      }),
    },
    {
      id: 's3',
      question: rich('How much does this address service cost?'),
      registeredOffice: rich('£39.00 per year'),
      serviceAddress: rich('£26.00 per year'),
      businessAddress: rich('£89.00 per year'),
    },
  ],
  footnote: list(
    [
      { text: 'Business Address Service:', bold: true },
      ' mail of value is forwarded by post to the forwarding address provided.',
    ],
    [
      { text: 'Business Address Service:', bold: true },
      ' scan and email is charged at £0.50 per letter.',
    ],
  ),
}

const addressesTable: CompanyAddressGuideTableBlock['tables'][number] = {
  id: 't1',
  heading: 'The company addresses',
  columnHeadings: headings,
  rows: addressRows,
  footnote: addressFootnote,
}

const meta: Meta<typeof CompanyAddressGuideTableBlockComponent> = {
  component: CompanyAddressGuideTableBlockComponent,
  title: 'Blocks/CompanyAddressGuideTable',
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="bg-[var(--surface-canvas)] py-10">
        <Story />
      </div>
    ),
  ],
  args: {
    blockType: 'companyAddressGuideTable',
    tables: [addressesTable],
  },
}

export default meta
type Story = StoryObj<typeof CompanyAddressGuideTableBlockComponent>

export const Default: Story = {
  args: { tables: [addressesTable] },
}

export const BothTables: Story = {
  args: { tables: [addressesTable, servicesTable] },
}

export const OneRow: Story = {
  args: { tables: [{ ...addressesTable, rows: [addressRows[0]] }] },
}

export const ManyRows: Story = {
  args: {
    tables: [
      {
        ...addressesTable,
        rows: [
          ...addressRows,
          ...addressRows.map((row, index) => ({ ...row, id: `extra-${index}` })),
        ],
      },
    ],
  },
}

export const NoFootnote: Story = {
  args: { tables: [{ ...addressesTable, footnote: null }] },
}

export const ShortCopy: Story = {
  args: {
    tables: [
      {
        ...addressesTable,
        heading: 'The addresses',
        columnHeadings: {
          registeredOffice: 'Office',
          serviceAddress: 'Service',
          businessAddress: 'Business',
        },
        rows: [
          {
            id: 'short',
            question: rich('Needed to register?'),
            registeredOffice: rich('Yes'),
            serviceAddress: rich('Yes'),
            businessAddress: rich('No'),
          },
        ],
        footnote: null,
      },
    ],
  },
}

export const LongCopy: Story = {
  args: {
    tables: [
      {
        ...addressesTable,
        heading:
          'The company addresses every UK limited company and limited liability partnership is required to hold, and what each one is actually for',
        columnHeadings: {
          registeredOffice:
            'Registered Office Address, held at a UK premises in the jurisdiction of incorporation',
          serviceAddress: 'Service Address for every appointed company officer on public record',
          businessAddress: 'Business Address used for day-to-day trading correspondence',
        },
        rows: [
          {
            id: 'long',
            question: rich(
              'Does this address need to be located in the same jurisdiction in which the company is registered, and does that remain true after a change of registered office is filed with Companies House?',
            ),
            registeredOffice: rich(
              'Yes — the registered office must always sit inside the jurisdiction the company was incorporated in (England & Wales, Scotland or Northern Ireland), and it cannot be moved across a jurisdictional boundary after incorporation.',
            ),
            serviceAddress: rich(
              'No — a service address may be anywhere in the world, provided the officer can reliably receive statutory mail sent to it.',
            ),
            businessAddress: rich('No'),
          },
          ...addressRows.slice(1),
        ],
      },
    ],
  },
}

export const UnbrokenTokens: Story = {
  args: {
    tables: [
      {
        ...addressesTable,
        heading: 'https://www.rapidformations.co.uk/company-address-guide/the-company-addresses',
        columnHeadings: {
          registeredOffice: 'Registrierteszweigniederlassungsanschriftenverzeichnis',
          serviceAddress: 'registered-office-support@rapidformations.co.uk',
          businessAddress: 'Geschäftskorrespondenzweiterleitungsdienstleistung',
        },
        rows: [
          {
            id: 'token',
            question: rich('Betriebsstättenanschriftenänderungsmitteilungsformular?'),
            registeredOffice: rich('company-changes@rapidformations.co.uk'),
            serviceAddress: rich(
              'https://www.rapidformations.co.uk/additional-services/service-address/',
            ),
            businessAddress: rich('No'),
          },
        ],
        footnote: list(['Handelsregistereintragungsbestätigungsschreiben.']),
      },
    ],
  },
}

export const Narrow: Story = {
  ...LongCopy,
  parameters: {
    viewport: {
      options: { narrow: { name: 'Narrow', styles: { width: '390px', height: '1600px' } } },
    },
  },
  globals: { viewport: { value: 'narrow' } },
}
