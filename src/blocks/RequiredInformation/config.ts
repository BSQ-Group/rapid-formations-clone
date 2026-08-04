import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const RequiredInformation: Block = {
  slug: 'requiredInformation',
  interfaceName: 'RequiredInformationBlock',
  labels: {
    singular: 'Required Information',
    plural: 'Required Information',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Information required for UK company formation',
      admin: {
        description:
          'Centred heading above the cards. Newlines are preserved, so a deliberate line break can be typed in.',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      admin: {
        description:
          'Optional line under the heading. Leave blank and the spacing above the cards stays the same.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Information Cards',
      required: true,
      minRows: 1,
      maxRows: 9,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          editor: defaultLexical,
          label: 'Description',
          required: true,
          admin: {
            description:
              'Body copy under the title. Inline links are rendered in the brand cyan, e.g. a link to a package page.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
          admin: {
            description:
              'Sits above the copy at the full width of the card. The source uses square images; the card grows to whatever aspect is uploaded.',
          },
        },
      ],
    },
    link({
      appearances: false,
      optional: true,
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        admin: {
          description: 'Optional centred button below the cards, e.g. "Register Now".',
        },
      },
    }),
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
