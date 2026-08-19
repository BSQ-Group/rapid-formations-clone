import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServiceContent: Block = {
  slug: 'serviceContent',
  interfaceName: 'ServiceContentBlock',
  labels: {
    singular: 'Service Content',
    plural: 'Service Content',
  },
  fields: [
    {
      name: 'columns',
      type: 'select',
      label: 'Columns',
      required: true,
      defaultValue: 'two',
      options: [
        { label: 'Two — split into left and right', value: 'two' },
        { label: 'One — a single stacked column', value: 'one' },
      ],
      admin: {
        description: 'Two columns split at 1023px; below that everything stacks.',
      },
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      minRows: 1,
      admin: {
        initCollapsed: true,
        description: 'Rendered in this order, down the left column then the right.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'position',
              type: 'select',
              label: 'Column',
              required: true,
              defaultValue: 'left',
              options: [
                { label: 'Left', value: 'left' },
                { label: 'Right', value: 'right' },
              ],
              admin: { width: '34%' },
            },
            {
              name: 'icon',
              type: 'select',
              label: 'List icon',
              defaultValue: 'none',
              options: [
                { label: 'None — standard bullet', value: 'none' },
                { label: 'Chevron', value: 'chevron' },
                { label: 'Check', value: 'check' },
              ],
              admin: {
                width: '33%',
                description: 'Replaces the bullet on every list item in this section.',
              },
            },
            {
              name: 'iconColour',
              type: 'select',
              label: 'Icon colour',
              defaultValue: 'inherit',
              options: [
                { label: 'Inherit body colour', value: 'inherit' },
                { label: 'Green', value: 'green' },
                { label: 'Subtle grey', value: 'subtle' },
              ],
              admin: {
                width: '33%',
                condition: (_, siblingData) => siblingData?.icon !== 'none',
              },
            },
          ],
        },
        {
          name: 'content',
          type: 'richText',
          editor: defaultLexical,
          label: 'Content',
          required: true,
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
