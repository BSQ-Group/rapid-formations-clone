import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServiceText: Block = {
  slug: 'serviceText',
  interfaceName: 'ServiceTextBlock',
  labels: {
    singular: 'Service Text',
    plural: 'Service Text',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'listTitle',
      type: 'text',
      required: true,
      label: 'Checklist title',
      defaultValue: 'How it works:',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      labels: {
        singular: 'Item',
        plural: 'Items',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'Text',
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
