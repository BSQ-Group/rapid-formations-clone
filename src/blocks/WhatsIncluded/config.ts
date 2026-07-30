import type { Block } from 'payload'

import { link } from '@/fields/link'
import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const WhatsIncluded: Block = {
  slug: 'whatsIncluded',
  interfaceName: 'WhatsIncludedBlock',
  labels: {
    singular: "What's Included",
    plural: "What's Included",
  },
  fields: [
    {
      name: 'layout',
      type: 'select',
      label: 'Layout',
      required: true,
      defaultValue: 'side-by-side',
      admin: {
        description:
          '"Side by Side" places text left and the package card right. "Stacked" places a 2-column text header above a wide card with 2-column benefits.',
      },
      options: [
        { label: 'Side by Side', value: 'side-by-side' },
        { label: 'Stacked', value: 'stacked' },
      ],
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
      defaultValue: "What's included",
    },
    {
      name: 'contentSections',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Content Sections',
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      admin: {
        initCollapsed: true,
        description:
          'For "Side by Side": subsection headings and body text displayed on the left. For "Stacked": only the first section is used — its title becomes the subtitle and its content becomes the description paragraph.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Section Title',
        },
        {
          name: 'content',
          type: 'richText',
          required: true,
          editor: defaultLexical,
          label: 'Section Content',
        },
      ],
    },
    {
      name: 'packageCard',
      type: 'group',
      label: 'Package Card',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Package Name',
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
        link({
          appearances: false,
          overrides: {
            name: 'orderLink',
            label: 'Order Button Link',
          },
        }),
        {
          name: 'benefitsLabel',
          type: 'text',
          required: true,
          label: 'Benefits Label',
          defaultValue: 'Package Features',
        },
        {
          name: 'benefits',
          type: 'array',
          required: true,
          minRows: 1,
          label: 'Benefits',
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
          ],
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
