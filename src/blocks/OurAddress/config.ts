import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const OurAddress: Block = {
  slug: 'ourAddress',
  interfaceName: 'OurAddressBlock',
  labels: {
    singular: 'Our Address',
    plural: 'Our Address Blocks',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Variant',
      required: true,
      defaultValue: 'compact',
      options: [
        { label: 'Compact — white card, half width', value: 'compact' },
        { label: 'Feature — grey panel, large photo', value: 'feature' },
      ],
      admin: {
        description:
          'Compact is used on the service and business address pages, feature on the registered office page.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Centred above the card, e.g. "Our London Service Address".',
      },
    },
    {
      name: 'label',
      type: 'text',
      label: 'Office label',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'feature',
        description: 'Sits above the address, e.g. "London".',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Office photo',
      required: true,
    },
    {
      name: 'address',
      type: 'textarea',
      label: 'Address',
      required: true,
      admin: {
        description: 'One line per row. Line breaks are preserved.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'priceSlug',
          type: 'text',
          label: 'Price slug',
          required: true,
          admin: {
            width: '50%',
            description: 'Matches a slug in the Prices collection, e.g. "london-service-address".',
          },
        },
        {
          name: 'postText',
          type: 'text',
          label: 'Price suffix',
          defaultValue: 'per year',
          admin: { width: '50%' },
        },
      ],
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Button',
      },
    }),
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
