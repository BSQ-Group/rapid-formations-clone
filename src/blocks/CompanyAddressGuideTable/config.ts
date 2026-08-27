import type { Block, Field } from 'payload'

import { SuperscriptFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { sectionLayoutField } from '@/fields/sectionLayout'

const NOT_IN_A_CELL = ['heading', 'experimental_table']

const cellEditor = lexicalEditor({
  features: ({ rootFeatures }) => [
    ...rootFeatures.filter((feature) => !NOT_IN_A_CELL.includes(feature.key)),
    SuperscriptFeature(),
  ],
})

const cell = (name: string, label: string): Field => ({
  name,
  type: 'richText',
  label,
  editor: cellEditor,
  required: true,
})

export const CompanyAddressGuideTable: Block = {
  slug: 'companyAddressGuideTable',
  interfaceName: 'CompanyAddressGuideTableBlock',
  labels: {
    singular: 'Company Address Guide Table',
    plural: 'Company Address Guide Tables',
  },
  fields: [
    {
      name: 'tables',
      type: 'array',
      label: 'Tables',
      labels: { singular: 'Table', plural: 'Tables' },
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        description:
          'One heading, one four-column table and one footnote each, in this order. Every table compares the same three address types.',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
        },
        {
          name: 'columnHeadings',
          type: 'group',
          label: 'Column headings',
          admin: {
            description:
              'Centred above each of the three address columns. Line breaks are preserved.',
          },
          fields: [
            {
              name: 'registeredOffice',
              type: 'textarea',
              label: 'Registered office column',
              required: true,
              defaultValue: 'Registered Office Address',
            },
            {
              name: 'serviceAddress',
              type: 'textarea',
              label: 'Service address column',
              required: true,
              defaultValue: 'Service\nAddress',
            },
            {
              name: 'businessAddress',
              type: 'textarea',
              label: 'Business address column',
              required: true,
              defaultValue: 'Business\nAddress',
            },
          ],
        },
        {
          name: 'rows',
          type: 'array',
          label: 'Rows',
          labels: { singular: 'Row', plural: 'Rows' },
          required: true,
          minRows: 1,
          admin: {
            initCollapsed: true,
            description:
              'The question runs down the first column; the three answers fill the rest. Superscript markers tie an answer to the footnote below.',
          },
          fields: [
            cell('question', 'Question'),
            cell('registeredOffice', 'Registered office answer'),
            cell('serviceAddress', 'Service address answer'),
            cell('businessAddress', 'Business address answer'),
          ],
        },
        {
          name: 'footnote',
          type: 'richText',
          label: 'Footnote',
          editor: cellEditor,
          admin: {
            description:
              'Numbered notes on a tinted panel under the table. Leave empty to show nothing.',
          },
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
    }),
  ],
}
