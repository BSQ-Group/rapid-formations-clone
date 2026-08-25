import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ComparePackageTable: Block = {
  slug: 'comparePackageTable',
  interfaceName: 'ComparePackageTableBlock',
  labels: {
    singular: 'Compare Package Table',
    plural: 'Compare Package Tables',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      editor: defaultLexical,
      admin: {
        description: 'Shown beside the heading when the table has one or two packages.',
      },
    },
    {
      name: 'sameDay',
      type: 'group',
      label: 'Same-day panel',
      admin: {
        description:
          'Sits under the heading in the first column. Only rendered with three packages.',
      },
      fields: [
        { name: 'heading', type: 'text' },
        { name: 'body', type: 'richText', editor: defaultLexical },
      ],
    },
    {
      name: 'packages',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      required: true,
      labels: { singular: 'Package column', plural: 'Package columns' },
      admin: {
        description:
          'One, two or three packages to compare, left to right. Select existing packages — their price, features, ribbon and buy links all come from the Packages collection. The header, footer and feature rows each lay out differently for each count.',
      },
      fields: [
        {
          name: 'package',
          type: 'relationship',
          relationTo: 'packages',
          required: true,
          label: 'Package',
          admin: {
            allowCreate: false,
          },
        },
      ],
    },
    {
      name: 'mobileCardHeight',
      type: 'select',
      defaultValue: 'auto',
      required: true,
      admin: {
        description:
          'Floor under the mobile card description so the Buy Now buttons line up across a swipe. AUTO on single-package tables.',
      },
      options: [
        { label: 'Auto', value: 'auto' },
        { label: 'Tall (255/220)', value: 'tall' },
        { label: 'Taller (315/270)', value: 'taller' },
      ],
    },
    {
      name: 'footnote',
      type: 'richText',
      editor: defaultLexical,
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
