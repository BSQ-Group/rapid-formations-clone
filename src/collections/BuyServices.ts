import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'

export const BuyServicesCollection: CollectionConfig = {
  slug: 'buyServices',
  labels: {
    singular: 'Buy Service',
    plural: 'Buy Services',
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
    defaultColumns: ['name', 'title', 'priceSlug'],
    description:
      'Priced service cards. The price itself lives in the Prices global — this references it by slug so a change there updates every card.',
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
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'mobileTitle',
      type: 'text',
      label: 'Mobile title',
      admin: {
        description: 'Shown instead of the title below 1024px. Leave empty to use the title.',
      },
    },
    {
      name: 'priceSlug',
      type: 'text',
      label: 'Price slug',
      required: true,
      admin: {
        description: 'Looked up in the Prices global — the same slug the [[price]] shortcode uses.',
      },
    },
    {
      name: 'postText',
      type: 'text',
      label: 'Price caption',
      admin: {
        description: 'Small text after the price (e.g. "per year").',
      },
    },
    {
      name: 'showVat',
      type: 'checkbox',
      label: 'Show "+VAT"',
      defaultValue: false,
    },
    {
      name: 'content',
      type: 'richText',
      editor: defaultLexical,
      label: 'Body',
    },
    {
      name: 'hideBodyOnMobile',
      type: 'checkbox',
      label: 'Hide body below 1024px',
      defaultValue: false,
      admin: {
        description: 'Matches the source, which hides the body on a fixed set of service pages.',
      },
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Button',
      },
    }),
  ],
}
