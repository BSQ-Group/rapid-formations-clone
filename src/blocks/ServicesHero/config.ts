import type { Block } from 'payload'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServicesHero: Block = {
  slug: 'servicesHero',
  interfaceName: 'ServicesHeroBlock',
  labels: { singular: 'Services Hero', plural: 'Services Heroes' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'priceText',
          type: 'text',
          label: 'Price Text',
          admin: {
            width: '50%',
            description: 'e.g. "Only £39.00"',
          },
        },
        {
          name: 'priceSuffix',
          type: 'text',
          label: 'Price Suffix',
          admin: {
            width: '50%',
            description: 'e.g. "+VAT per year"',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'heroImage1',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image (Main)',
          admin: { width: '50%' },
        },
        {
          name: 'heroImage2',
          type: 'upload',
          relationTo: 'media',
          label: 'Hero Image (Secondary, hidden on mobile)',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'addressCard',
      type: 'group',
      label: 'Floating Address Card',
      fields: [
        {
          name: 'companyName',
          type: 'text',
          label: 'Example Company Name',
          admin: { description: 'e.g. "Your Company Ltd"' },
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Address (multi-line)',
          admin: { description: 'Use line breaks to separate address lines' },
        },
        {
          name: 'badges',
          type: 'array',
          label: 'Address Badges',
          maxRows: 4,
          labels: { singular: 'Badge', plural: 'Badges' },
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Badge Label',
            },
          ],
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
