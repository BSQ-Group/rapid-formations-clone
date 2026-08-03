import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const RegisteredOfficeAddress: Block = {
  slug: 'registeredOfficeAddress',
  interfaceName: 'RegisteredOfficeAddressBlock',
  labels: {
    singular: 'Registered Office Address',
    plural: 'Registered Office Address Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: "Use our impressive address as your company's registered office",
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Illustration',
    },
    {
      name: 'serviceTitle',
      type: 'text',
      required: true,
      defaultValue: 'London Registered Office',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue:
        'A Covent Garden registered office address for your company, with all government mail scanned and emailed to you, free of charge.',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          required: true,
          defaultValue: '£39.00',
          admin: { width: '50%' },
        },
        {
          name: 'priceSuffix',
          type: 'text',
          required: true,
          defaultValue: ' per year',
          admin: {
            width: '50%',
            description: 'Suffix shown next to the price. Include leading space.',
          },
        },
      ],
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Call to action',
      },
    }),
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
