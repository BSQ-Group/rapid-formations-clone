import type { GlobalConfig } from 'payload'

export const PricesGlobal: GlobalConfig = {
  slug: 'prices',
  label: 'Prices',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description:
      'Prices quoted inside page copy via the [[price slug="..."]] shortcode. Changing a value here updates every page that quotes it.',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Prices',
      admin: {
        initCollapsed: true,
        description: 'Slug is what the shortcode references. Value is rendered after a £ sign.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'slug',
              type: 'text',
              label: 'Slug',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              required: true,
              admin: {
                width: '50%',
                description: 'Without the £, trailing zeros kept — e.g. 100.00',
              },
            },
          ],
        },
      ],
    },
  ],
}
