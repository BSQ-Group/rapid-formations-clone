import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServiceInclusionsGrid: Block = {
  slug: 'serviceInclusionsGrid',
  interfaceName: 'ServiceInclusionsGridBlock',
  labels: {
    singular: 'Service Inclusions Grid',
    plural: 'Service Inclusions Grid',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      label: 'Heading',
      required: true,
      defaultValue: "What's included",
      admin: { description: 'Centred above the grid. Line breaks are preserved.' },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Inclusions',
      labels: { singular: 'Inclusion', plural: 'Inclusions' },
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        description:
          'One bordered card each, in this order. Three per row from 768px up, stacked below that.',
      },
      fields: [
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          required: true,
          admin: { description: 'Rendered at 80×80. Its alt text comes from the media item.' },
        },
        { name: 'title', type: 'text', label: 'Title', required: true },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
          admin: { description: 'Line breaks are preserved.' },
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
    }),
  ],
}
