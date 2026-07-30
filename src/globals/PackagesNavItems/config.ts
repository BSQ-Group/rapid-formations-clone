import type { GlobalConfig } from 'payload'
import { link } from '@/fields/link'

export const PackagesNavGlobal: GlobalConfig = {
  slug: 'packagesNav',
  label: 'Packages Navigation',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description:
      'Tabs shown in the packages navigation pill across all package pages. Drag to reorder.',
  },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      labels: { singular: 'Tab', plural: 'Tabs' },
      minRows: 1,
      maxRows: 8,
      admin: {
        components: {
          RowLabel: '@/globals/PackagesNavItems/ItemRowLabel#default',
        },
      },
      fields: [link({ appearances: false })],
    },
  ],
}
