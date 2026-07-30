import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const HeroServicesBanner: Block = {
  slug: 'heroServicesBanner',
  interfaceName: 'HeroServicesBannerBlock',
  labels: { singular: 'Hero Services Banner', plural: 'Hero Services Banners' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Annual Service Renewals',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      name: 'priceText',
      type: 'text',
      label: 'Price Text',
      defaultValue: 'from £26.00 +VAT',
    },
    link({
      optional: true,
      overrides: {
        name: 'cta',
        label: 'CTA',
      },
    }),
    {
      name: 'showTrustpilot',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Trustpilot rating',
      admin: {
        description:
          'Renders the Trustpilot Micro TrustScore widget under the CTA.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero image',
      admin: { description: 'Photo shown in the visual area to the right of the copy.' },
    },
    {
      name: 'widgets',
      type: 'array',
      maxRows: 3,
      labels: { singular: 'Widget', plural: 'Widgets' },
      admin: {
        description:
          'Up to three floating "service status" widgets layered over the hero image. With 2 widgets: first goes top-right, second mid-left. With 3 widgets: first top-right (sits more inset to make room), second mid-left, third bottom-right. At mobile only the last two widgets render in the 3-widget variant.',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon',
          defaultValue: 'BadgeCheck',
          admin: {
            description:
              'Lucide icon name in PascalCase, e.g. "BadgeCheck", "FileText", "Building2". See lucide.dev for the full set.',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
        {
          name: 'showProgress',
          type: 'checkbox',
          defaultValue: false,
          label: 'Show progress bar',
        },
        {
          name: 'progressPercent',
          type: 'number',
          defaultValue: 50,
          min: 0,
          max: 100,
          admin: {
            condition: (_, sibling) => Boolean(sibling?.showProgress),
            description: 'Progress fill percentage (0–100).',
          },
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
