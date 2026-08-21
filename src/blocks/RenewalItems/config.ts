import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const RenewalItems: Block = {
  slug: 'renewalItems',
  interfaceName: 'RenewalItemsBlock',
  labels: {
    singular: 'Renewal Items',
    plural: 'Renewal Items',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      required: true,
      labels: { singular: 'Item', plural: 'Items' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
            {
              name: 'priceSlug',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
                description:
                  'Matches an entry in the Prices global, e.g. "london-registered-office".',
              },
            },
          ],
        },
        {
          name: 'body',
          type: 'richText',
          editor: defaultLexical,
          required: true,
        },
        link({
          appearances: false,
          overrides: {
            name: 'cta',
            label: 'Button',
          },
        }),
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
    }),
  ],
}
