import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ContentWithExtendedPricingCard: Block = {
  slug: 'contentWithExtendedPricingCard',
  interfaceName: 'ContentWithExtendedPricingCardBlock',
  labels: {
    singular: 'Content with Extended Pricing Card',
    plural: 'Content with Extended Pricing Card Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Big title',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      label: 'Intro paragraph',
      required: true,
    },
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
          defaultValue: 'Only £9.99 per month',
          required: true,
        },
        {
          name: 'serviceLabel',
          type: 'text',
          label: 'Service label',
          defaultValue: 'Business Telephone Number',
          required: true,
        },
        link({
          overrides: {
            name: 'cta',
            label: 'Order CTA',
          },
        }),
        {
          name: 'feature',
          type: 'group',
          label: 'Feature (optional)',
          admin: {
            description: 'Optional descriptive block shown below the CTA (e.g. "Improve your corporate image").',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Feature title',
            },
            {
              name: 'description',
              type: 'textarea',
              label: 'Feature description',
            },
          ],
        },
        {
          name: 'detailsTitle',
          type: 'text',
          label: 'Details heading (optional)',
          defaultValue: 'Details & Costs',
        },
        {
          name: 'details',
          type: 'array',
          label: 'Details & Costs (optional)',
          labels: { singular: 'Detail', plural: 'Details' },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
            },
            {
              name: 'value',
              type: 'textarea',
              label: 'Value',
              required: true,
            },
          ],
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'l', paddingBottom: 'l' },
    }),
  ],
}
