import type { GlobalConfig } from 'payload'

export const FaqTopicsGlobal: GlobalConfig = {
  slug: 'faqTopics',
  label: 'FAQ Topics',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description:
      'The FAQ subject list. Drives the card grid on /faqs and the quick-navigation dropdown on each topic page.',
  },
  fields: [
    {
      name: 'topics',
      type: 'array',
      label: 'Topics',
      admin: {
        initCollapsed: true,
        description: 'Order here is the order the cards render in.',
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
  ],
}
