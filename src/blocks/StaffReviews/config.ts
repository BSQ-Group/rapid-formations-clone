import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const StaffReviews: Block = {
  slug: 'staffReviews',
  interfaceName: 'StaffReviewsBlock',
  labels: {
    singular: 'Staff Reviews',
    plural: 'Staff Reviews',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Heading',
      defaultValue: 'What our people have to say',
      admin: { description: 'Centred above the quotes. Leave empty to render the quotes alone.' },
    },
    {
      name: 'quotes',
      type: 'array',
      label: 'Quotes',
      labels: { singular: 'Quote', plural: 'Quotes' },
      minRows: 1,
      admin: {
        description:
          'Three across from 1023px, stacked below it. Any number works, but rows of three read best.',
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote',
          required: true,
          admin: { description: 'No quotation marks — the tile draws its own.' },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'person',
              type: 'text',
              label: 'Name',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'role',
              type: 'text',
              label: 'Job title',
              admin: { width: '50%', description: 'Rendered under the name as a citation.' },
            },
          ],
        },
      ],
    },
    sectionLayoutField({ gap: true, defaults: { paddingTop: 'none', paddingBottom: 'none' } }),
  ],
}
