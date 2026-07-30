import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const PromoTier2: Block = {
  slug: 'promoTier2',
  interfaceName: 'PromoTier2Block',
  labels: {
    singular: 'Promo Tier 2',
    plural: 'Promo Tier 2 Banners',
  },
  fields: [
    {
      name: 'icon',
      type: 'text',
      label: 'Icon',
      defaultValue: 'FileCheck2',
      admin: {
        description: 'Lucide icon name (e.g. FileCheck2). Rendered in green on the left tile.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'pricePrefix',
      type: 'text',
      label: 'Price prefix',
      defaultValue: 'from',
      admin: {
        description: 'Small label above the price (e.g. "from").',
      },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      required: true,
    },
    link({
      appearances: ['default'],
      overrides: { name: 'cta', label: 'CTA button' },
    }),
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'xs', paddingBottom: 'xs' },
    }),
  ],
}
