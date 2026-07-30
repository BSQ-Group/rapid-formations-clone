import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const LegalContent: Block = {
  slug: 'legalContent',
  interfaceName: 'LegalContentBlock',
  labels: {
    singular: 'Legal Content',
    plural: 'Legal Content',
  },
  fields: [
    {
      name: 'pageTitle',
      type: 'text',
      required: true,
      label: 'Page Title',
      admin: {
        description: 'Top-level page heading, e.g. "Environmental Policy".',
      },
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      admin: {
        initCollapsed: true,
        description:
          'Top-level sections rendered as H2 (e.g. "1. Introduction"). Numbering is authored manually.',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Section Heading',
          admin: {
            description: 'H2 heading, e.g. "1. Introduction" or "3. Our Environmental Commitments".',
          },
        },
        {
          name: 'intro',
          type: 'richText',
          editor: defaultLexical,
          label: 'Intro / Body',
          admin: {
            description:
              'Body text directly under the section heading. Leave empty if the section only contains subsections.',
          },
        },
        {
          name: 'subsections',
          type: 'array',
          labels: {
            singular: 'Subsection',
            plural: 'Subsections',
          },
          admin: {
            initCollapsed: true,
            description: 'Optional subsections rendered as H3 (e.g. "3.1 Compliance with…").',
          },
          fields: [
            {
              name: 'heading',
              type: 'text',
              required: true,
              label: 'Subsection Heading',
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              editor: defaultLexical,
              label: 'Body',
            },
          ],
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'xs', paddingBottom: 'l' },
    }),
  ],
}
