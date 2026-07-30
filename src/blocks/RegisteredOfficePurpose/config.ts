import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const RegisteredOfficePurpose: Block = {
  slug: 'registeredOfficePurpose',
  interfaceName: 'RegisteredOfficePurposeBlock',
  labels: {
    singular: 'Registered Office Purpose',
    plural: 'Registered Office Purpose Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'The purpose of a registered office',
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Item', plural: 'Items' },
      admin: { description: 'Icon + text items, rendered in a 2-column grid (single column on mobile). Add as many rows as needed.' },
      fields: [
        {
          name: 'icon',
          type: 'text',
          required: true,
          defaultValue: 'scale',
          admin: {
            description:
              'Lucide icon name in kebab-case (e.g. "scale", "mail-check", "eye", "shield-check"). Browse the full set at https://lucide.dev/icons.',
          },
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
