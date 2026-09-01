import type { Block } from 'payload'

export const DocumentLibrary: Block = {
  slug: 'documentLibrary',
  interfaceName: 'DocumentLibraryBlock',
  labels: {
    singular: 'Document Library',
    plural: 'Document Library',
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'sections',
      type: 'array',
      label: 'Sections',
      labels: { singular: 'Section', plural: 'Section' },
      admin: {
        initCollapsed: true,
        components: { RowLabel: '@/blocks/DocumentLibrary/RowLabel#default' },
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
            components: { RowLabel: '@/blocks/DocumentLibrary/RowLabel#default' },
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
                components: { RowLabel: '@/blocks/DocumentLibrary/RowLabel#default' },
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
