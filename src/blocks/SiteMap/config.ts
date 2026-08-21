import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const SiteMap: Block = {
  slug: 'siteMap',
  interfaceName: 'SiteMapBlock',
  labels: {
    singular: 'Site Map',
    plural: 'Site Maps',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      required: true,
      labels: { singular: 'Section', plural: 'Sections' },
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'richText',
          editor: defaultLexical,
          required: true,
          admin: { description: 'A bulleted list of links. Each bullet renders with a chevron.' },
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'm' },
    }),
  ],
}
