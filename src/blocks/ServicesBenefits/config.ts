import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'
import { BENEFIT_ICON_OPTIONS } from './icons'

export const ServicesBenefits: Block = {
  slug: 'servicesBenefits',
  interfaceName: 'ServicesBenefitsBlock',
  labels: {
    singular: 'Services Benefits',
    plural: 'Services Benefits',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      label: 'Heading',
      required: true,
      admin: { description: 'Centred above the two columns. Line breaks are preserved.' },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      admin: { description: 'Optional line under the heading.' },
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      labels: { singular: 'Benefit', plural: 'Benefits' },
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        description: 'Stacked in the left column from 768px up, above the image below that.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: BENEFIT_ICON_OPTIONS[0].value,
          options: BENEFIT_ICON_OPTIONS,
          admin: {
            description:
              'Add a new one by importing it in the block’s icons.ts; the list here follows.',
          },
        },
        { name: 'title', type: 'text', label: 'Title', required: true },
        {
          name: 'body',
          type: 'textarea',
          label: 'Body',
          required: true,
          admin: { description: 'Line breaks are preserved.' },
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      admin: { description: 'Fills the right column, and sits under the list below 768px.' },
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
