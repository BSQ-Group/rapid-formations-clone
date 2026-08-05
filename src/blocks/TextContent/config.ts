import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const TextContent: Block = {
  slug: 'textContent',
  interfaceName: 'TextContentBlock',
  labels: {
    singular: 'Text Content',
    plural: 'Text Content',
  },
  fields: [
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: defaultLexical,
      label: 'Body',
      admin: {
        description:
          'Long-form body copy. H3 is a numbered top-level section ("1. Introduction"), H4 a subsection ("3.1 Compliance"). Numbering is authored manually.',
      },
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      label: 'Typography variant',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Policy (lettered lists, wider section spacing)', value: 'policy' },
        { label: 'Numbered clauses (1., 3.1., 3.1.1.)', value: 'numbered' },
      ],
      admin: {
        description:
          'Standard matches the default long-form body. Policy carries the page-scoped overrides the Environmental Policy page uses. Numbered clauses renders the multi-level counter numbering the Whistleblowing policy uses.',
      },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'l' },
    }),
  ],
}
