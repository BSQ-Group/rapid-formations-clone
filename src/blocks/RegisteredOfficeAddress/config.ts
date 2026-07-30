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
      defaultValue: 'Our registered office address',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Office photo',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Multi-line address. Each new line renders on its own line.',
      },
      defaultValue: "Your Company's Name\n71–75 Shelton Street\nCovent Garden\nLondon\nWC2H 9JQ",
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          required: true,
          defaultValue: '£39',
          admin: { width: '50%' },
        },
        {
          name: 'priceSuffix',
          type: 'text',
          required: true,
          defaultValue: ' + VAT per year',
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
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
