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
    {
      name: 'showFaqQuickNav',
      type: 'checkbox',
      label: 'Show FAQs quick navigation',
      defaultValue: false,
      admin: {
        description:
          'Adds the "FAQs Quick Navigation" dropdown beside the heading, listing every FAQ topic. Used on the FAQ topic pages.',
      },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
