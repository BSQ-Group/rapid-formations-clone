import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const HowItWorksList: Block = {
  slug: 'howItWorksList',
  interfaceName: 'HowItWorksListBlock',
  labels: {
    singular: 'How It Works + Included List',
    plural: 'How It Works + Included List Blocks',
  },
  fields: [
    {
      name: 'stepsHeading',
      type: 'text',
      label: 'Steps heading',
      defaultValue: 'How it works:',
      required: true,
    },
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      labels: { singular: 'Step', plural: 'Steps' },
      required: true,
      minRows: 1,
      maxRows: 12,
      admin: { description: 'Numbered automatically based on order.' },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'includedHeading',
      type: 'text',
      label: 'Included heading',
      defaultValue: 'What is included in our price?',
      required: true,
    },
    {
      name: 'includedItems',
      type: 'array',
      label: 'Included items',
      labels: { singular: 'Included item', plural: 'Included items' },
      required: true,
      minRows: 1,
      maxRows: 10,
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 's', paddingBottom: 's' },
    }),
  ],
}
