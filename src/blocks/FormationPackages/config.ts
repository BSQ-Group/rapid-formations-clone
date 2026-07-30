import type { Block } from 'payload'
import { link } from '@/fields/link'
import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const FormationPackages: Block = {
  slug: 'formationPackages',
  interfaceName: 'FormationPackagesBlock',
  labels: {
    singular: 'Formation Packages',
    plural: 'Formation Packages',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Section Subtitle',
    },
    {
      name: 'packages',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      labels: {
        singular: 'Package',
        plural: 'Packages',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Package Name',
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Short Description',
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
                description: 'Include currency symbol, e.g. "£1.99"',
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
        {
          name: 'isHighlighted',
          type: 'checkbox',
          defaultValue: false,
          label: 'Highlighted Card (Dark Background)',
        },
        {
          name: 'badgeText',
          type: 'text',
          label: 'Badge Text',
          admin: {
            condition: (_data, siblingData) => Boolean(siblingData?.isHighlighted),
            description: 'E.g. "Best value"',
          },
        },
        link({
          appearances: false,
          optional: true,
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
            description: 'E.g. "Everything in Basic, plus:"',
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
                description: 'Optional. Heading shown in the info tooltip (e.g. "LTD Company").',
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
        {
          name: 'showFindOutMoreLink',
          type: 'checkbox',
          defaultValue: true,
          label: 'Show "Find Out More" Link',
        },
        link({
          appearances: false,
          optional: true,
          overrides: {
            name: 'findOutMoreLink',
            label: 'Find Out More Link',
          },
        }),
      ],
    },
    {
      name: 'footerTitle',
      type: 'text',
      label: 'Footer Title',
    },
    {
      name: 'footerDescription',
      type: 'richText',
      editor: defaultLexical,
      label: 'Footer Description',
    },
    link({
      appearances: false,
      optional: true,
      overrides: {
        name: 'footerLink',
        label: 'Footer CTA Link',
      },
    }),
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
