import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const Note: Block = {
  slug: 'note',
  interfaceName: 'NoteBlock',
  labels: { singular: 'Note', plural: 'Notes' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Please note:',
    },
    {
      name: 'headingLevel',
      type: 'select',
      label: 'Heading level',
      required: true,
      defaultValue: 'h2',
      admin: {
        description:
          'HTML heading tag emitted for the heading text. Use h2 for top-level section headings; h3/h4/h5 when this Note sits inside a deeper content hierarchy.',
      },
      options: [
        { label: 'H2', value: 'h2' },
        { label: 'H3', value: 'h3' },
        { label: 'H4', value: 'h4' },
        { label: 'H5', value: 'h5' },
        { label: 'H6', value: 'h6' },
      ],
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body',
      required: true,
      editor: defaultLexical,
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 's', paddingBottom: 's' },
    }),
  ],
}
