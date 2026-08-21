import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const FAQs: Block = {
  slug: 'faqs',
  interfaceName: 'FAQsBlock',
  labels: {
    singular: 'FAQs',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Variant',
      defaultValue: 'panel',
      options: [
        { label: 'Panel — centred heading, inset list', value: 'panel' },
        { label: 'Page — full-width list, no heading', value: 'page' },
      ],
      admin: {
        description:
          'Panel is the marketing-page treatment. Page is the FAQ topic pages: the list runs the full container width with no side inset.',
      },
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title',
      admin: {
        condition: (_, siblingData) => siblingData?.variant !== 'page',
        description: 'Line breaks are preserved, matching the source layout.',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      admin: { description: 'Sits under the heading. Leave empty to show nothing.' },
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
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
