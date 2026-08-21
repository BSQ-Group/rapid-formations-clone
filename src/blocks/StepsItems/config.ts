import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const StepsItems: Block = {
  slug: 'stepsItems',
  interfaceName: 'StepsItemsBlock',
  labels: {
    singular: 'Steps Items',
    plural: 'Steps Items',
  },
  fields: [
    {
      name: 'steps',
      type: 'array',
      label: 'Steps',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Step', plural: 'Steps' },
      admin: {
        initCollapsed: true,
        description:
          'One bordered tile per step, stacked full width. The source pages run 4 and 7 steps.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              required: true,
              defaultValue: 'file',
              options: [
                { label: 'Map marker', value: 'mapMarker' },
                { label: 'File with chart', value: 'fileChartLine' },
                { label: 'User', value: 'user' },
                { label: 'Users', value: 'users' },
                { label: 'File', value: 'file' },
                { label: 'Dot in circle', value: 'dotCircle' },
                { label: 'Magnifying glass', value: 'search' },
                { label: 'Shopping cart', value: 'shoppingCart' },
                { label: 'Flag', value: 'flag' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'iconColour',
              type: 'select',
              label: 'Icon colour',
              required: true,
              defaultValue: 'cyan',
              options: [
                { label: 'Brand cyan (default)', value: 'cyan' },
                { label: 'Green', value: 'green' },
                { label: 'Orange', value: 'orange' },
                { label: 'Magenta', value: 'magenta' },
                { label: 'Deep cyan', value: 'blue' },
              ],
              admin: {
                width: '50%',
                description:
                  'Tints the icon only. Every step on a help-centre checklist keeps the default; the 4-step formation walkthrough gives each step its own colour.',
              },
            },
          ],
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          required: true,
          admin: {
            description: 'Includes the step number, e.g. "1. Registered Office Address".',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          admin: {
            description:
              'Optional qualifier that wraps onto a second line under the heading, indented to match it.',
          },
        },
        {
          name: 'content',
          type: 'richText',
          editor: defaultLexical,
          label: 'Content',
          required: true,
          admin: {
            description:
              'Paragraphs and lists. List items get a chevron marker instead of a bullet, and nesting is supported one level deep.',
          },
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'm' },
    }),
  ],
}
