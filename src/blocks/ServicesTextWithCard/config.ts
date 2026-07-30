import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServicesTextWithCard: Block = {
  slug: 'servicesTextWithCard',
  interfaceName: 'ServicesTextWithCardBlock',
  labels: {
    singular: 'Services Text with Card',
    plural: 'Services Text with Card Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Confirmation Statement',
    },
    {
      name: 'paragraphs',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
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
          defaultValue: 'from £75.99 +VAT',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Price subtitle',
          defaultValue: 'Standard or Express service',
        },
        {
          name: 'serviceLabel',
          type: 'text',
          label: 'Service label',
          defaultValue: 'Confirmation Statement Service',
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
