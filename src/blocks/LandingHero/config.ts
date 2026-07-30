import type { Block } from 'payload'

import { link } from '@/fields/link'

export const LandingHero: Block = {
  slug: 'landingHero',
  interfaceName: 'LandingHeroBlock',
  labels: {
    singular: 'Landing Hero',
    plural: 'Landing Heroes',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      defaultValue: 'COMPANY FORMATION',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      minRows: 1,
      maxRows: 5,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Placeholder',
      defaultValue: 'What will you call your company?',
    },
    link({
      appearances: false,
      disableLabel: true,
      overrides: {
        name: 'searchLink',
        label: 'Search Button Link',
      },
    }),
    link({
      appearances: false,
      overrides: {
        name: 'pricingLink',
        label: 'Pricing Link',
      },
    }),
    link({
      appearances: false,
      overrides: {
        name: 'packagesLink',
        label: 'Packages Link (shown as "Choose a Package" after a successful name check)',
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    {
      type: 'group',
      name: 'google',
      label: 'Google Reviews',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Google Logo',
        },
        {
          name: 'rating',
          type: 'text',
          label: 'Rating',
          defaultValue: '4.9',
        },
        {
          name: 'reviewCount',
          type: 'text',
          label: 'Review Count',
          defaultValue: '462',
        },
      ],
    },
  ],
}
