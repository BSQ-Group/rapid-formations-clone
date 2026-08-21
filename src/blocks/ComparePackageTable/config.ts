import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
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
      admin: {
        description:
          'One, two or three. The header, footer and feature rows each lay out differently for each count.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
            {
              name: 'slug',
              type: 'text',
              required: true,
              admin: {
                width: '50%',
                description: 'Matches the values in a feature row\'s "Included in".',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'price', type: 'text', required: true, admin: { width: '33%' } },
            { name: 'priceNote', type: 'text', admin: { width: '33%' } },
            { name: 'ribbonText', type: 'text', admin: { width: '33%' } },
          ],
        },
        {
          name: 'whosItFor',
          type: 'richText',
          editor: defaultLexical,
          admin: { description: 'Desktop only, and only with three packages.' },
        },
        {
          name: 'shortDescription',
          type: 'richText',
          editor: defaultLexical,
          admin: { description: 'Mobile card only.' },
        },
        link({ appearances: false, overrides: { name: 'buyLink' } }),
        link({ appearances: false, optional: true, overrides: { name: 'readMoreLink' } }),
      ],
    },
    {
      name: 'products',
      type: 'array',
      minRows: 1,
      required: true,
      labels: { singular: 'Feature', plural: 'Features' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'tooltip', type: 'richText', editor: defaultLexical },
        {
          name: 'includedIn',
          type: 'text',
          hasMany: true,
          admin: {
            description:
              'Package slugs that include this feature. Anything not listed renders a dash.',
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
