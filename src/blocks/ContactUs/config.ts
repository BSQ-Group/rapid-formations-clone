import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ContactUs: Block = {
  slug: 'contactUs',
  interfaceName: 'ContactUsBlock',
  labels: {
    singular: 'Contact Us',
    plural: 'Contact Us Blocks',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      minRows: 1,
      required: true,
      labels: { singular: 'Section', plural: 'Sections' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'heading', type: 'text', label: 'Heading', required: true },
        {
          name: 'body',
          type: 'richText',
          editor: defaultLexical,
          label: 'Body',
          required: true,
        },
        {
          name: 'buttons',
          type: 'array',
          label: 'Buttons',
          minRows: 1,
          labels: { singular: 'Button', plural: 'Buttons' },
          fields: [
            {
              name: 'action',
              type: 'select',
              label: 'Action',
              required: true,
              defaultValue: 'link',
              options: [
                { label: 'Go to a link', value: 'link' },
                { label: 'Open live chat', value: 'liveChat' },
              ],
              admin: {
                description:
                  'Live chat opens the HubSpot conversations widget. It does nothing on pages where that widget is not loaded.',
              },
            },
            {
              name: 'icon',
              type: 'select',
              label: 'Icon',
              defaultValue: 'none',
              options: [
                { label: 'None', value: 'none' },
                { label: 'Phone', value: 'phone' },
              ],
            },
            {
              name: 'chatLabel',
              type: 'text',
              label: 'Label',
              admin: { condition: (_, siblingData) => siblingData?.action === 'liveChat' },
            },
            link({
              appearances: false,
              optional: true,
              overrides: {
                name: 'cta',
                label: 'Link',
                admin: { condition: (_, siblingData) => siblingData?.action !== 'liveChat' },
              },
            }),
          ],
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
