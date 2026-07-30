import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const ComparePackagesHeader: Block = {
  slug: 'comparePackagesHeader',
  interfaceName: 'ComparePackagesHeaderBlock',
  labels: {
    singular: 'Compare Packages Header',
    plural: 'Compare Packages Header Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'textarea',
      required: true,
      defaultValue: 'Compare our Limited\nCompany Formation Packages',
      admin: {
        description: 'Section title. Use a newline to force a line break.',
      },
    },
    {
      name: 'descriptionPrimary',
      type: 'textarea',
      defaultValue:
        'If you would like help in choosing the right company formation package or ordering your company, call our specialist team and they will happily assist you.',
      admin: {
        description: 'First paragraph of supporting text.',
      },
    },
    {
      name: 'descriptionSecondaryBefore',
      type: 'text',
      defaultValue: 'We can form companies for residents of countries listed ',
      admin: {
        description: 'Text before the inline link (include a trailing space).',
      },
    },
    {
      name: 'descriptionLink',
      type: 'group',
      label: 'Inline link',
      admin: {
        description: 'Inline link rendered inside the second paragraph (e.g. "here").',
        hideGutter: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'type',
              type: 'radio',
              admin: {
                layout: 'horizontal',
                width: '50%',
              },
              defaultValue: 'reference',
              options: [
                { label: 'Internal link', value: 'reference' },
                { label: 'Custom URL', value: 'custom' },
              ],
            },
            {
              name: 'newTab',
              type: 'checkbox',
              admin: {
                style: { alignSelf: 'flex-end' },
                width: '50%',
              },
              label: 'Open in new tab',
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'reference',
              type: 'relationship',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'reference',
                width: '50%',
              },
              label: 'Document to link to',
              relationTo: ['pages', 'posts'],
            },
            {
              name: 'url',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom',
                width: '50%',
              },
              label: 'Custom URL',
            },
            {
              name: 'label',
              type: 'text',
              admin: { width: '50%' },
              label: 'Label',
            },
          ],
        },
      ],
    },
    {
      name: 'descriptionSecondaryAfter',
      type: 'text',
      defaultValue: '.',
      admin: {
        description: 'Text after the inline link (typically just punctuation).',
      },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 's', paddingBottom: 'none' },
    }),
  ],
}
