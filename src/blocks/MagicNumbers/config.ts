import type { Block } from 'payload'

import { hexColourField } from '@/fields/hexColour'
import { sectionLayoutField } from '@/fields/sectionLayout'
import { MAGIC_NUMBER_ICON_OPTIONS } from './icons'

export const MagicNumbers: Block = {
  slug: 'magicNumbers',
  interfaceName: 'MagicNumbersBlock',
  labels: { singular: 'Magic Numbers', plural: 'Magic Numbers' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: "Rapid Formations' magic numbers",
    },
    { name: 'subheading', type: 'text' },
    {
      name: 'numbers',
      type: 'array',
      label: 'Numbers',
      minRows: 1,
      admin: {
        initCollapsed: true,
        description:
          'A stacked list below 768px and a 2-up grid from there. From 1590px they are placed by hand at the offsets below, with the connector lines drawn between them.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              defaultValue: 'comments',
              options: MAGIC_NUMBER_ICON_OPTIONS,
              admin: {
                width: '50%',
                description:
                  'Add a new one by importing it in the block’s icons.ts; the list here follows.',
              },
            },
            hexColourField({
              admin: {
                width: '50%',
                description: 'Fills the icon circle and its connector line.',
              },
            }),
          ],
        },
        { name: 'heading', type: 'text', required: true },
        {
          name: 'body',
          type: 'textarea',
          admin: { description: 'Line breaks are preserved.' },
        },
        {
          name: 'placement',
          type: 'group',
          label: 'Placement from 1590px',
          admin: {
            description:
              'Ignored below 1590px, where the items are a plain grid. Set either Top or Bottom, not both.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'left', type: 'number', required: true, admin: { width: '34%' } },
                { name: 'top', type: 'number', admin: { width: '33%' } },
                { name: 'bottom', type: 'number', admin: { width: '33%' } },
              ],
            },
          ],
        },
        {
          name: 'connector',
          type: 'group',
          label: 'Connector line',
          admin: {
            description:
              'The vertical rule under the row of items, drawn in the colour above. Also 1590px and up only.',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'width',
                  type: 'number',
                  required: true,
                  admin: { width: '25%', description: '% of the row' },
                },
                {
                  name: 'side',
                  type: 'select',
                  required: true,
                  defaultValue: 'left',
                  options: [
                    { label: 'From left', value: 'left' },
                    { label: 'From right', value: 'right' },
                  ],
                  admin: { width: '25%' },
                },
                { name: 'inset', type: 'number', required: true, admin: { width: '25%' } },
                { name: 'top', type: 'number', required: true, admin: { width: '25%' } },
              ],
            },
            { name: 'height', type: 'number', required: true },
          ],
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'lg' },
    }),
  ],
}
