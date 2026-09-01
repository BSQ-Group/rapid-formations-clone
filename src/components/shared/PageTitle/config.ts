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
      name: 'titleAlign',
      type: 'select',
      label: 'Title alignment',
      defaultValue: 'centre',
      options: [
        { label: 'Centre — level with the price and button', value: 'centre' },
        { label: 'Bottom — sitting on the price’s baseline', value: 'bottom' },
      ],
      admin: {
        description:
          'Only matters where the price column runs taller than the heading, as on a package page — the source drops the title onto its baseline there instead of centring it.',
      },
    },
    {
      name: 'isPageTitle',
      type: 'checkbox',
      label: 'Render as the page H1',
      defaultValue: true,
      admin: {
        description:
          'Untick when a banner above already carries the H1 — the heading then renders as an H2 subtitle at the source line height.',
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
          name: 'priceSuffix',
          type: 'text',
          label: 'Price suffix',
          admin: { description: 'Renders under the price, e.g. "+ £100 Companies House fee".' },
        },
        {
          name: 'price',
          type: 'text',
          label: 'Price',
          admin: {
            description:
              'Shown after a £, e.g. "89.99". Leave empty to show buttons without a price.',
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
