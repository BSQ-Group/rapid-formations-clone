import type { Block } from 'payload'

import { link } from '@/fields/link'
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
    {
      name: 'buyNow',
      type: 'group',
      label: 'Buy Now widget',
      admin: {
        description:
          'Price and buttons beside the heading, used on the service pages. Leave every field empty to show nothing.',
      },
      fields: [
        {
          name: 'priceSlug',
          type: 'text',
          label: 'Price slug',
          admin: {
            description:
              'Matches an entry in the Prices global, e.g. "ico-registration". Leave empty to show buttons without a price.',
          },
        },
        link({
          appearances: false,
          optional: true,
          overrides: {
            name: 'cta',
            label: 'Primary button',
            admin: { description: 'The green Buy Now button. Leave the label empty to omit it.' },
          },
        }),
        link({
          appearances: false,
          optional: true,
          overrides: {
            name: 'secondaryCta',
            label: 'Secondary button',
            admin: { description: 'Optional outlined button beside it, e.g. "View Packages".' },
          },
        }),
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
