import type { Block } from 'payload'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ChooseCompanyStructure: Block = {
  slug: 'chooseCompanyStructure',
  interfaceName: 'ChooseCompanyStructureBlock',
  labels: {
    singular: 'Choose Company Structure',
    plural: 'Choose Company Structures',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      required: true,
      label: 'Section Heading',
      admin: {
        description:
          'Centred above the cards. Line breaks are preserved, so the two-line source heading can be typed as two lines.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: {
        initCollapsed: true,
        description:
          'One card per structure. Below 1200px these scroll one at a time with dots; from 1200px they lay out as a row.',
      },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Card Title' },
        {
          name: 'body',
          type: 'textarea',
          required: true,
          label: 'Card Body',
          admin: { description: 'Line breaks are preserved.' },
        },
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Card Image' },
        link({
          appearances: false,
          overrides: {
            admin: {
              description:
                'The image, the title and the button all point here. The label is the button text, e.g. "LLP Package".',
            },
          },
        }),
      ],
    },
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
