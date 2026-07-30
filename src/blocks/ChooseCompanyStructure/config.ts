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
    { name: 'heading', type: 'text', required: true, label: 'Section Heading' },
    { name: 'description', type: 'textarea', required: true, label: 'Section Description' },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Card Title' },
        { name: 'cardDescription', type: 'text', label: 'Card Description' },
        { name: 'image', type: 'upload', relationTo: 'media', required: true, label: 'Card Image' },
        link({ disableLabel: true, appearances: false }),
      ],
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
