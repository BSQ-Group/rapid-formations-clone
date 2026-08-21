import type { Block } from 'payload'

import { link } from '@/fields/link'
import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const OnlineAdminPortal: Block = {
  slug: 'onlineAdminPortal',
  interfaceName: 'OnlineAdminPortalBlock',
  labels: {
    singular: 'Online Admin Portal',
    plural: 'Online Admin Portal Blocks',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Panels',
      required: true,
      minRows: 1,
      labels: { singular: 'Panel', plural: 'Panels' },
      admin: {
        initCollapsed: true,
        description:
          'Full panels span the grid and carry no card chrome; half panels are bordered cards, two to a row from 768px.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'width',
              type: 'select',
              label: 'Width',
              required: true,
              defaultValue: 'half',
              options: [
                { label: 'Half — bordered card', value: 'half' },
                { label: 'Full — spans both columns, no card', value: 'full' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              required: true,
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Padlock', value: 'lock' },
                { label: 'Add user', value: 'userPlus' },
              ],
              admin: { width: '50%' },
            },
          ],
        },
        {
          name: 'iconColour',
          type: 'select',
          label: 'Icon circle colour',
          required: true,
          defaultValue: 'cyan',
          options: [
            { label: 'Cyan', value: 'cyan' },
            { label: 'Green', value: 'green' },
          ],
          admin: { condition: (_, siblings) => siblings?.icon && siblings.icon !== 'none' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          label: 'Content',
          required: true,
          editor: defaultLexical,
          admin: { description: 'List items render with a chevron.' },
        },
        {
          name: 'ctaStyle',
          type: 'select',
          label: 'Button colour',
          required: true,
          defaultValue: 'green',
          options: [
            { label: 'Green', value: 'green' },
            { label: 'Blue', value: 'blue' },
          ],
          admin: { condition: (_, siblings) => Boolean(siblings?.cta?.label) },
        },
        link({
          appearances: false,
          optional: true,
          overrides: { name: 'cta', label: 'Button' },
        }),
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
    }),
  ],
}
