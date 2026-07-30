import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ContentWithPricingCard: Block = {
  slug: 'contentWithPricingCard',
  interfaceName: 'ContentWithPricingCardBlock',
  labels: {
    singular: 'Content with Pricing Card',
    plural: 'Content with Pricing Card Blocks',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Content Sections',
      required: true,
      minRows: 1,
      labels: { singular: 'Section', plural: 'Sections' },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Section heading',
          required: true,
        },
        {
          name: 'bulletItems',
          type: 'array',
          label: 'Bullet items',
          labels: { singular: 'Bullet item', plural: 'Bullet items' },
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Text',
              required: true,
            },
          ],
        },
        {
          name: 'tickItems',
          type: 'array',
          label: 'Tick items',
          labels: { singular: 'Tick item', plural: 'Tick items' },
          fields: [
            {
              name: 'text',
              type: 'textarea',
              label: 'Text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'card',
      type: 'group',
      label: 'Pricing card',
      fields: [
        {
          name: 'price',
          type: 'text',
          label: 'Price headline',
          defaultValue: 'Only £89.99 +VAT',
          required: true,
        },
        {
          name: 'serviceLabel',
          type: 'text',
          label: 'Service label',
          defaultValue: 'Company Dissolution Service',
          required: true,
        },
        link({
          overrides: {
            name: 'cta',
            label: 'Order CTA',
          },
        }),
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'l', paddingBottom: 'l' },
    }),
  ],
}
