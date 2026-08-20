import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const OurOffices: Block = {
  slug: 'ourOffices',
  interfaceName: 'OurOfficesBlock',
  labels: {
    singular: 'Our Offices',
    plural: 'Our Offices Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Sits above the cards with a rule under it, e.g. "Our London Office".',
      },
    },
    {
      name: 'offices',
      type: 'array',
      label: 'Offices',
      minRows: 1,
      required: true,
      labels: { singular: 'Office', plural: 'Offices' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Office photo',
          required: true,
        },
        {
          name: 'focalX',
          type: 'number',
          label: 'Photo horizontal focus',
          defaultValue: 50,
          min: 0,
          max: 100,
          admin: {
            description:
              'Which part of the photo stays in frame when it is cropped, as a percentage from the left. 50 is centred.',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address',
          required: true,
          admin: { description: 'One line per row. Line breaks are preserved.' },
        },
        link({
          appearances: false,
          overrides: {
            name: 'mapLink',
            label: 'Map link',
          },
        }),
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
