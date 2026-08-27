import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const BusinessBankingTable: Block = {
  slug: 'businessBankingTable',
  interfaceName: 'BusinessBankingTableBlock',
  labels: { singular: 'Business Banking Table', plural: 'Business Banking Tables' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Compare business banking partners for UK residents',
    },
    {
      name: 'intro',
      type: 'richText',
      editor: defaultLexical,
      admin: { description: 'Sits between the heading and the table.' },
    },
    {
      name: 'columnHeadings',
      type: 'group',
      label: 'Column headings',
      admin: {
        description:
          'The table always has these six columns. Rename them here; the order is fixed by the row fields below.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'bank', type: 'text', required: true, defaultValue: 'Bank Name' },
            { name: 'type', type: 'text', required: true, defaultValue: 'Type' },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'freeBankingPeriod',
              type: 'text',
              required: true,
              defaultValue: 'Free Banking Period',
            },
            { name: 'overdraft', type: 'text', required: true, defaultValue: 'Overdraft' },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'accountingIntegration',
              type: 'text',
              required: true,
              defaultValue: 'Accounting Integration',
            },
            { name: 'keyFeatures', type: 'text', required: true, defaultValue: 'Key Features' },
          ],
        },
      ],
    },
    {
      name: 'rows',
      type: 'array',
      label: 'Banks',
      labels: { singular: 'Bank', plural: 'Banks' },
      minRows: 1,
      admin: { initCollapsed: true, description: 'One row each, in this order.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'bankName',
              type: 'text',
              required: true,
              admin: { width: '60%', description: 'Builds the logo alt text, e.g. "Barclays logo".' },
            },
            {
              name: 'footnoteMarker',
              type: 'text',
              admin: {
                width: '40%',
                description: 'Optional superscript after the logo, e.g. "1", tying it to a footnote.',
              },
            },
          ],
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: { description: 'Rendered at its natural size, capped at 75px wide.' },
        },
        {
          type: 'row',
          fields: [
            { name: 'type', type: 'text', required: true, admin: { width: '60%' } },
            {
              name: 'overdraft',
              type: 'checkbox',
              label: 'Overdraft available',
              defaultValue: false,
              admin: { width: '40%', description: 'Ticked shows a green check, unticked a grey cross.' },
            },
          ],
        },
        {
          name: 'freeBankingPeriod',
          type: 'textarea',
          admin: { description: 'Line breaks are preserved.' },
        },
        {
          name: 'accountingIntegration',
          type: 'textarea',
          admin: { description: 'Line breaks are preserved.' },
        },
        { name: 'keyFeatures', type: 'textarea', admin: { description: 'Line breaks are preserved.' } },
      ],
    },
    {
      name: 'footnotes',
      type: 'richText',
      editor: defaultLexical,
      admin: { description: 'Sits under the table — caveats and the numbered footnotes.' },
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'xs' },
    }),
  ],
}
