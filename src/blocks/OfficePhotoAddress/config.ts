import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const OfficePhotoAddress: Block = {
  slug: 'officePhotoAddress',
  interfaceName: 'OfficePhotoAddressBlock',
  labels: {
    singular: 'Office Photo + Address',
    plural: 'Office Photo + Address Blocks',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      defaultValue: 'Your registered office address will be:',
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Multi-line address. Each new line renders on its own line.',
      },
      defaultValue: 'Your Company Name\n71-75 Shelton Street\nCovent Garden\nLondon\nWC2H 9JQ',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Office photo',
    },
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'xs', paddingBottom: 'xs' },
    }),
  ],
}
