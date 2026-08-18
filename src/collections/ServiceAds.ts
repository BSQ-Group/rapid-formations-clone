import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { link } from '@/fields/link'

export const ServiceAdsCollection: CollectionConfig = {
  slug: 'serviceAds',
  labels: {
    singular: 'Service Ad',
    plural: 'Service Ads',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'variant'],
    description:
      'Cross-sell promo tiles. Each ad is written once and placed on any number of pages via the Service Ads block.',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      admin: {
        description: 'Admin-only label used in lists and pickers. Never rendered.',
      },
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title',
      required: true,
      admin: {
        description: 'Line breaks are preserved on the tile.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body',
      required: true,
    },
    {
      name: 'variant',
      type: 'select',
      label: 'Colour',
      required: true,
      defaultValue: 'default',
      options: [
        { label: 'Cyan', value: 'default' },
        { label: 'Blue / Green', value: 'blue-green' },
        { label: 'Blue / Purple', value: 'blue-purple' },
        { label: 'Pink / Purple', value: 'pink-purple' },
      ],
      admin: {
        description: 'Sets the tile gradient and the matching button colour.',
      },
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'Watermark icon',
      required: true,
      admin: {
        description: 'Blended into the right-hand side of the tile as decoration.',
      },
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Button',
      },
    }),
    {
      name: 'pricing',
      type: 'group',
      label: 'Pricing',
      admin: {
        description: 'Only rendered by the Wide layout. Leave empty for paired tiles.',
      },
      fields: [
        {
          name: 'price',
          type: 'text',
          label: 'Price',
          admin: {
            description: 'Amount only, without the currency symbol (e.g. 149.99).',
          },
        },
        {
          name: 'prefix',
          type: 'text',
          label: 'Prefix',
          admin: {
            description: 'Sits before the price (e.g. "from").',
          },
        },
        {
          name: 'suffix',
          type: 'text',
          label: 'Suffix',
          admin: {
            description: 'Sits after the price (e.g. "per year").',
          },
        },
        {
          name: 'postPrice',
          type: 'text',
          label: 'Caption',
          admin: {
            description: 'Small line under the price (e.g. "+ £100 Companies House Fee").',
          },
        },
      ],
    },
  ],
}
