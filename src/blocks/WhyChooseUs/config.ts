import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const WhyChooseUs: Block = {
  slug: 'whyChooseUs',
  interfaceName: 'WhyChooseUsBlock',
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Centred above the carousel. Line breaks are preserved.',
      },
    },
    {
      name: 'panes',
      type: 'array',
      label: 'Panes',
      required: true,
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Pane', plural: 'Panes' },
      admin: {
        initCollapsed: true,
        description:
          'One pane is shown at a time at every width, with arrows and dots. Copy sits on the left and the image on the right; below 768px they stack.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'body',
          type: 'richText',
          label: 'Body',
          required: true,
          editor: defaultLexical,
          admin: {
            description:
              'Pane body copy. Rich text so multiple paragraphs and inline links can be authored.',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
