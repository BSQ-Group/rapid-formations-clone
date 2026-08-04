import type { Block } from 'payload'

import { link } from '@/fields/link'

export const FourSteps: Block = {
  slug: 'fourSteps',
  interfaceName: 'FourStepsBlock',
  labels: {
    singular: 'Four Steps',
    plural: 'Four Steps',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      minRows: 1,
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description:
          'Numbered steps shown left to right with a chevron between each. The number is derived from position, so reordering renumbers automatically.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Icon',
          required: true,
          admin: { description: 'Circular icon, rendered at 140x140.' },
        },
        {
          name: 'title',
          type: 'textarea',
          label: 'Title',
          required: true,
          admin: { description: 'Line breaks are preserved, matching the source layout.' },
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
        },
      ],
    },
    link({
      appearances: false,
      optional: true,
      overrides: {
        name: 'ctaLink',
        label: 'Call to action',
        admin: { description: 'Button below the steps, e.g. "Register Now".' },
      },
    }),
  ],
}
