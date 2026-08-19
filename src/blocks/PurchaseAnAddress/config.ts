import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const PurchaseAnAddress: Block = {
  slug: 'purchaseAnAddress',
  interfaceName: 'PurchaseAnAddressBlock',
  labels: {
    singular: 'Purchase An Address',
    plural: 'Purchase An Address',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Centred above the cards, e.g. "Other ways to buy a service address".',
      },
    },
    {
      name: 'methods',
      type: 'array',
      label: 'Methods',
      required: true,
      minRows: 1,
      maxRows: 3,
      admin: {
        initCollapsed: true,
        description: 'Two is the usual pairing; the grid splits evenly however many there are.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              required: true,
              defaultValue: 'share',
              options: [
                { label: 'Share arrow', value: 'share' },
                { label: 'Add user', value: 'userPlus' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'iconColour',
              type: 'select',
              label: 'Icon circle colour',
              required: true,
              defaultValue: 'cyan',
              options: [
                { label: 'Cyan', value: 'cyan' },
                { label: 'Green', value: 'green' },
              ],
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'title',
          type: 'textarea',
          label: 'Title',
          required: true,
          admin: { description: 'Line breaks are preserved.' },
        },
        {
          name: 'body',
          type: 'textarea',
          label: 'Body',
          required: true,
        },
        link({
          appearances: false,
          overrides: { name: 'cta', label: 'Button' },
        }),
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
