import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const OtherWaysToBuy: Block = {
  slug: 'otherWaysToBuy',
  interfaceName: 'OtherWaysToBuyBlock',
  labels: {
    singular: 'Other Ways To Buy',
    plural: 'Other Ways To Buy Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      required: true,
      defaultValue: 'Other ways to buy a\nRegistered Office Service',
      admin: {
        description: 'Section heading. Use a newline to force a line break.',
      },
    },
    {
      name: 'separator',
      type: 'text',
      defaultValue: 'or',
      admin: {
        description: 'Text shown between the cards (e.g. "or").',
      },
    },
    {
      name: 'ways',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 4,
      labels: { singular: 'Way', plural: 'Ways' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          editor: defaultLexical,
        },
        link({
          appearances: false,
          overrides: {
            name: 'cta',
            label: 'Call to action',
          },
        }),
      ],
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
