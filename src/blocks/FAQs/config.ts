import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const FAQs: Block = {
  slug: 'faqs',
  interfaceName: 'FAQsBlock',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ Items',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Question',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          label: 'Answer',
          required: true,
          editor: defaultLexical,
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
