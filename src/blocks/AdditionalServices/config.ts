import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const AdditionalServices: Block = {
  slug: 'additionalServices',
  interfaceName: 'AdditionalServicesBlock',
  labels: {
    singular: 'Additional Services',
    plural: 'Additional Services',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'cards',
      type: 'array',
      label: 'Service Cards',
      minRows: 1,
      admin: {
        initCollapsed: true,
      },
      fields: [
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
          overrides: {
            label: 'CTA Link',
            admin: {
              hideGutter: true,
              description: 'Shown on hover (desktop) and always visible on mobile/tablet.',
            },
          },
        }),
      ],
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
