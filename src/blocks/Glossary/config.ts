import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const Glossary: Block = {
  slug: 'glossary',
  interfaceName: 'GlossaryBlock',
  labels: {
    singular: 'Glossary',
    plural: 'Glossary',
  },
  fields: [
    {
      name: 'groups',
      type: 'array',
      label: 'Letter ranges',
      required: true,
      minRows: 1,
      labels: { singular: 'Letter range', plural: 'Letter ranges' },
      admin: {
        initCollapsed: true,
        description:
          'One tab per range, in the order listed here. Only the selected range renders, so a range can hold as many terms as it needs.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Tab label',
          required: true,
          admin: {
            description: 'Shown on the tab, e.g. "A-C". Keep it short — tabs sit on one row.',
          },
        },
        {
          name: 'terms',
          type: 'array',
          label: 'Terms',
          required: true,
          minRows: 1,
          labels: { singular: 'Term', plural: 'Terms' },
          admin: {
            initCollapsed: true,
            description:
              'Listed in this order. Terms are grouped under a letter heading automatically, so keep terms sharing a letter together.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'letter',
                  type: 'text',
                  label: 'Letter',
                  required: true,
                  maxLength: 1,
                  admin: {
                    width: '20%',
                    description: 'Drives the heading this term sits under.',
                  },
                },
                {
                  name: 'term',
                  type: 'text',
                  label: 'Term',
                  required: true,
                  admin: { width: '80%' },
                },
              ],
            },
            {
              name: 'definition',
              type: 'richText',
              label: 'Definition',
              required: true,
              editor: defaultLexical,
            },
            {
              name: 'ad',
              type: 'relationship',
              relationTo: 'serviceAds',
              label: 'Service ad',
              admin: {
                description:
                  'Optional promo tile rendered directly beneath this definition, full width with its price.',
              },
            },
          ],
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
