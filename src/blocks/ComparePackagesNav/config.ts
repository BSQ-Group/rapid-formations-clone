import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ComparePackagesNav: Block = {
  slug: 'comparePackagesNav',
  interfaceName: 'ComparePackagesNavBlock',
  labels: {
    singular: 'Compare Packages Nav',
    plural: 'Compare Packages Navs',
  },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      minRows: 2,
      required: true,
      admin: {
        description:
          'The tab whose link matches the current page is highlighted automatically; there is no active flag to keep in sync.',
      },
      fields: [link({ appearances: false })],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
