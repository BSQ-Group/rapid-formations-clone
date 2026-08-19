import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServiceAds: Block = {
  slug: 'serviceAds',
  interfaceName: 'ServiceAdsBlock',
  labels: {
    singular: 'Service Ads',
    plural: 'Service Ads',
  },
  fields: [
    {
      name: 'ads',
      type: 'relationship',
      relationTo: 'serviceAds',
      hasMany: true,
      required: true,
      minRows: 1,
      maxRows: 4,
      label: 'Ads',
      admin: {
        description: 'Rendered in the order listed here. Two tiles is the usual pairing.',
      },
    },
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      required: true,
      defaultValue: 'paired',
      options: [
        { label: 'Paired (two columns, no price)', value: 'paired' },
        { label: 'Wide (single centred tile, shows price)', value: 'wide' },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
