import type { Block, Condition } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

const twoColumnOnly: Condition = (_, __, { blockData }) => blockData?.variant === 'twoColumn'

export const AboutUsContent: Block = {
  slug: 'aboutUsContent',
  interfaceName: 'AboutUsContentBlock',
  labels: { singular: 'About Us Content', plural: 'About Us Content' },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Layout',
      required: true,
      defaultValue: 'twoColumn',
      options: [
        {
          label: 'Two column — items flow into a 2-up grid from 768px',
          value: 'twoColumn',
        },
        {
          label: 'Image rows — one item per row, image beside the copy from 768px',
          value: 'imageRows',
        },
      ],
      admin: {
        description: 'Image rows is the opening About Us tab. Every other tab uses two column.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      minRows: 1,
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'width',
              type: 'select',
              label: 'Width',
              required: true,
              defaultValue: 'left',
              options: [
                { label: 'Full — spans both columns', value: 'full' },
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              admin: {
                condition: twoColumnOnly,
                width: '50%',
                description:
                  'Left and Right are labels for the author — the grid places items in order. Only Full changes the layout.',
              },
            },
            {
              name: 'panel',
              type: 'checkbox',
              label: 'Render as a bordered panel',
              defaultValue: false,
              admin: {
                condition: twoColumnOnly,
                width: '50%',
                description:
                  'The white box with a shadow used by Join Our Team. A panel uses the icon groups below instead of the body.',
              },
            },
          ],
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            condition: (_, siblingData) => !siblingData?.panel,
            description:
              'Rendered as an h3 — above the image in two column, beside it in image rows.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          admin: { condition: (_, siblingData) => !siblingData?.panel },
        },
        {
          name: 'body',
          type: 'richText',
          editor: defaultLexical,
          admin: { condition: (_, siblingData) => !siblingData?.panel },
        },
        {
          name: 'panelGroups',
          type: 'array',
          label: 'Panel groups',
          labels: { singular: 'Group', plural: 'Groups' },
          admin: {
            condition: (_, siblingData) => Boolean(siblingData?.panel),
            initCollapsed: true,
            description: 'Each group is an icon, a heading on the same line, and its copy.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'icon',
                  type: 'select',
                  required: true,
                  defaultValue: 'user',
                  options: [
                    { label: 'Person', value: 'user' },
                    { label: 'Heart', value: 'heart' },
                  ],
                  admin: { width: '34%' },
                },
                { name: 'heading', type: 'text', required: true, admin: { width: '66%' } },
              ],
            },
            { name: 'body', type: 'richText', editor: defaultLexical },
          ],
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'dark', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
    }),
  ],
}
