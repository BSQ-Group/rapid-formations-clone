import type { Block } from 'payload'

export const Partners: Block = {
  slug: 'partners',
  interfaceName: 'PartnersBlock',
  labels: {
    singular: 'Partners',
    plural: 'Partners',
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'partners',
      type: 'array',
      label: 'Partners',
      labels: { singular: 'Partner', plural: 'Partners' },
      minRows: 1,
      admin: {
        initCollapsed: true,
        components: { RowLabel: '@/blocks/Partners/RowLabel#default' },
        description:
          'Logos listed by the [[partners]] shortcode. Add the block once per page; the shortcode renders whatever is here.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Partner name',
          required: true,
          admin: { description: 'Used for the alt text, e.g. "Barclays".' },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
        },
        {
          name: 'tall',
          type: 'checkbox',
          label: 'Allow this logo to overhang the row',
          defaultValue: false,
          admin: {
            description:
              'Logos sit on a 20px row. Tick this for a mark that needs more height without opening up the row, e.g. the Lloyds horse.',
          },
        },
      ],
    },
  ],
}
