import type { Block } from 'payload'
import { link } from '@/fields/link'
import { defaultLexical } from '@/fields/defaultLexical'

export const PackageCardHero: Block = {
  slug: 'packageCardHero',
  interfaceName: 'PackageCardHeroBlock',
  labels: {
    singular: 'Package Card Hero',
    plural: 'Package Card Heroes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'E.g. "Non-Residents Package"',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          required: true,
          label: 'Price',
          admin: {
            width: '50%',
            description: 'Include currency symbol, e.g. "£19.99"',
          },
        },
        {
          name: 'priceSuffix',
          type: 'text',
          label: 'Price Suffix',
          admin: {
            width: '50%',
            description: 'E.g. "+ £100 Companies House fee"',
          },
        },
      ],
    },
    link({
      appearances: false,
      overrides: {
        name: 'orderLink',
        label: 'Order Button Link',
      },
    }),
    {
      name: 'prefixText',
      type: 'text',
      label: 'Benefits Prefix Text',
      admin: {
        description: 'E.g. "Ideal for:"',
      },
    },
    {
      name: 'benefits',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Benefit',
        plural: 'Benefits',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'benefit',
          type: 'text',
          required: true,
          label: 'Benefit Text',
        },
        {
          name: 'infoText',
          type: 'text',
          label: 'Tooltip Title',
          admin: {
            description: 'Optional. Heading shown in the info tooltip.',
          },
        },
        {
          name: 'tooltipText',
          type: 'richText',
          editor: defaultLexical,
          label: 'Tooltip Text',
          admin: {
            description:
              'Optional. Body text shown in the info tooltip. An info icon appears when either tooltip field is filled.',
          },
        },
      ],
    },
  ],
}
