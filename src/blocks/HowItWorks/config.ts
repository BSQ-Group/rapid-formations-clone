import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const HowItWorks: Block = {
  slug: 'howItWorks',
  interfaceName: 'HowItWorksBlock',
  labels: { singular: 'How It Works', plural: 'How It Works Blocks' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Step', plural: 'Steps' },
      fields: [
        {
          name: 'stepNumber',
          type: 'text',
          required: true,
          label: 'Step Number',
          admin: { description: 'e.g. "01"' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
          label: 'Step Body',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Card Background Image',
        },
      ],
    },
    link({
      overrides: {
        name: 'ctaLink',
        label: 'CTA Button',
      },
    }),
    {
      name: 'priceText',
      type: 'text',
      label: 'Price Text',
      admin: { description: 'e.g. "from £12.99 + VAT"' },
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
