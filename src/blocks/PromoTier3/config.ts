import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const PromoTier3: Block = {
  slug: 'promoTier3',
  interfaceName: 'PromoTier3Block',
  labels: {
    singular: 'Promo Tier 3',
    plural: 'Promo Tier 3 Banners',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: 'BEST VALUE: UPGRADE & SAVE',
      admin: {
        description: 'Small uppercase label above the title.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      required: true,
    },
    {
      name: 'pills',
      type: 'array',
      label: 'Benefit pills',
      labels: { singular: 'Pill', plural: 'Pills' },
      minRows: 0,
      maxRows: 4,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
      ],
      admin: {
        description: 'Short benefit pills shown below the description.',
      },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      required: true,
    },
    {
      name: 'priceCaption',
      type: 'text',
      label: 'Price caption',
      defaultValue: 'per year',
      admin: {
        description: 'Smaller text shown next to the price (e.g. "per year").',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      required: true,
      admin: {
        description: 'Decorative card background (Figma gradient export).',
      },
    },
    link({
      appearances: ['default'],
      overrides: { name: 'cta', label: 'CTA button' },
    }),
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'm', paddingBottom: 'm' },
    }),
  ],
}
