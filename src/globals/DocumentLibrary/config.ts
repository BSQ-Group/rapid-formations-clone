import type { GlobalConfig } from 'payload'

export const DocumentLibraryGlobal: GlobalConfig = {
  slug: 'document-library',
  label: 'Document Library',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description:
      'Every template in the Business Document Template Library, listed by the [[documents-list]] shortcode. Sections and groups render in the order held here.',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      labels: { singular: 'Section', plural: 'Sections' },
      admin: {
        initCollapsed: true,
        description: 'Top-level headings, e.g. "Finance and Accounting".',
      },
      fields: [
        { name: 'title', type: 'text', label: 'Section title', required: true },
        {
          name: 'groups',
          type: 'array',
          label: 'Groups',
          labels: { singular: 'Group', plural: 'Groups' },
          admin: {
            initCollapsed: true,
            description: 'Sub-headings within the section, e.g. "Purchasing".',
          },
          fields: [
            { name: 'title', type: 'text', label: 'Group title', required: true },
            {
              name: 'documents',
              type: 'array',
              label: 'Documents',
              labels: { singular: 'Document', plural: 'Documents' },
              admin: {
                initCollapsed: true,
                description: 'One row per template, named as it appears in the library.',
              },
              fields: [{ name: 'name', type: 'text', label: 'Document', required: true }],
            },
          ],
        },
      ],
    },
  ],
}
