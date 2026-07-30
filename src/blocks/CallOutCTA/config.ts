import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const CallOutCTA: Block = {
  slug: 'callOutCTA',
  interfaceName: 'CallOutCTABlock',
  labels: {
    singular: 'Call-Out CTA',
    plural: 'Call-Out CTAs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Input Placeholder',
      admin: {
        description: 'Placeholder text for the company name input. Defaults to "Enter company name".',
      },
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
