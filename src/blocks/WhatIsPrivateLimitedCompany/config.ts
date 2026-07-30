import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const WhatIsPrivateLimitedCompany: Block = {
  slug: 'whatIsPrivateLimitedCompany',
  interfaceName: 'WhatIsPrivateLimitedCompanyBlock',
  labels: {
    singular: 'What is a Private Limited Company',
    plural: 'What is a Private Limited Company Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'What is a private limited company?',
    },
    {
      name: 'paragraphs',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Side image',
      admin: { description: 'Portrait image shown beside (mobile: above) the copy.' },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
