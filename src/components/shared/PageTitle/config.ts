import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const PageTitle: Block = {
  slug: 'pageTitle',
  interfaceName: 'PageTitleBlock',
  labels: {
    singular: 'Page Title',
    plural: 'Page Titles',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      admin: {
        description:
          "Renders as the page H1. Leave empty to use the page's own title — fill this in only when the heading should read differently.",
      },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
