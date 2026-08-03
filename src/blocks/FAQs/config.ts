import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'

export const FAQs: Block = {
  slug: 'faqs',
  interfaceName: 'FAQsBlock',
  labels: {
    singular: 'FAQs',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'title',
      type: 'textarea',
      label: 'Title',
      admin: { description: 'Line breaks are preserved, matching the source layout.' },
    },
    {
      name: 'faqs',
      type: 'array',
      label: 'FAQ Items',
      admin: {
        initCollapsed: true,
        description: 'Single-open accordion — opening one question closes the others.',
      },
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
  ],
}
