import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const FaqTopic: Block = {
  slug: 'faqTopic',
  interfaceName: 'FaqTopicBlock',
  labels: {
    singular: 'FAQ Topic',
    plural: 'FAQ Topics',
  },
  fields: [
    {
      name: 'topics',
      type: 'array',
      label: 'Topics',
      admin: {
        initCollapsed: true,
        description: 'Order here is the order the cards render in, and drives the topic quick-nav.',
      },
      fields: [
        {
          name: 'title',
          type: 'textarea',
          label: 'Title',
          required: true,
          admin: { description: 'Line breaks are preserved, matching the source layout.' },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Image',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link',
          required: true,
          admin: { description: 'e.g. /faqs/basics' },
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
