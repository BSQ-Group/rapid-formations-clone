import type { Block } from 'payload'

import { link } from '@/fields/link'

export const UniqueSellingPoints: Block = {
  slug: 'uniqueSellingPoints',
  interfaceName: 'UniqueSellingPointsBlock',
  labels: {
    singular: 'Unique Selling Points',
    plural: 'Unique Selling Points',
  },
  fields: [
    {
      name: 'points',
      type: 'array',
      label: 'Selling Points',
      minRows: 1,
      maxRows: 4,
      admin: {
        initCollapsed: true,
        description:
          'Full-bleed band of equal columns separated by dividers. The live site runs four across at desktop.',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          required: true,
          admin: { description: 'Rendered at 90x90.' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
        link({
          appearances: false,
          disableLabel: true,
          optional: true,
          overrides: {
            admin: {
              description: 'Optional — when set, the whole column becomes a link.',
            },
          },
        }),
      ],
    },
  ],
}
