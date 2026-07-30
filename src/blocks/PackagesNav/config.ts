import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const PackagesNav: Block = {
  slug: 'packagesNav',
  interfaceName: 'PackagesNavBlock',
  labels: {
    singular: 'Packages Navigation',
    plural: 'Packages Navigation Blocks',
  },
  fields: [
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
