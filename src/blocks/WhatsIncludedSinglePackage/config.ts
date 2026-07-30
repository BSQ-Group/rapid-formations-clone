import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const WhatsIncludedSinglePackage: Block = {
  slug: 'whatsIncludedSinglePackage',
  interfaceName: 'WhatsIncludedSinglePackageBlock',
  labels: {
    singular: "What's Included (Single Package)",
    plural: "What's Included (Single Package)",
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: "What's included",
      label: 'Heading',
      admin: {
        description: 'Section heading shown above the table.',
      },
    },
    {
      name: 'packageName',
      type: 'text',
      required: true,
      label: 'Package Name',
      admin: {
        description: 'Shown in the dark table header and in the CTA row, e.g. "Non-Residents Package".',
      },
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Feature', plural: 'Features' },
      admin: {
        initCollapsed: true,
        description: 'Rows in the comparison table, in display order.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          name: 'description',
          type: 'text',
          label: 'Description',
          admin: { description: 'Optional second line shown under the title.' },
        },
        {
          name: 'tooltipTitle',
          type: 'text',
          label: 'Tooltip Title',
          admin: {
            description: 'Optional heading shown in the info tooltip.',
          },
        },
        {
          name: 'tooltipContent',
          type: 'richText',
          editor: defaultLexical,
          label: 'Tooltip Content',
          admin: {
            description:
              'Optional body text shown in the info tooltip. An info icon appears when either tooltip field is filled.',
          },
        },
      ],
    },
    {
      name: 'price',
      type: 'text',
      required: true,
      label: 'Price',
      admin: { description: 'e.g. "£19.99"' },
    },
    {
      name: 'priceSubtext',
      type: 'text',
      label: 'Price Subtext',
      admin: { description: 'e.g. "+ £100 Companies House fee"' },
    },
    link({
      appearances: false,
      disableLabel: false,
      overrides: {
        name: 'orderButton',
        label: 'Order Button',
      },
    }),
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'm', paddingBottom: 'm' },
    }),
  ],
}
