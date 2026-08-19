import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const BuyService: Block = {
  slug: 'buyService',
  interfaceName: 'BuyServiceBlock',
  labels: {
    singular: 'Buy Service',
    plural: 'Buy Services',
  },
  fields: [
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'buyServices',
      hasMany: true,
      required: true,
      minRows: 1,
      label: 'Services',
      admin: {
        description: 'Rendered in the order listed here.',
      },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
