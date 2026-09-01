import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Packages: CollectionConfig = {
  slug: 'packages',
  // Audit trail: every save keeps a version (who/when/before→after) so a price
  // edit is traceable and reversible. No drafts.
  versions: { maxPerDoc: 50 },
  labels: {
    singular: 'Package',
    plural: 'Packages',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Commerce',
    useAsTitle: 'name',
    defaultColumns: ['name', 'packageType', 'price', 'order', 'slug'],
    description:
      'Company formation packages. A price, name or feature list lives here once and every compare-packages page that shows it reads from this record.',
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      admin: {
        description: 'As shown to customers, e.g. "All Inclusive Package".',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'packageType',
          type: 'select',
          label: 'Company Type',
          required: true,
          options: [
            { label: 'Limited by Shares', value: 'limited-by-shares' },
            { label: 'Non-Residents', value: 'non-residents' },
            { label: 'Limited Liability Partnership', value: 'limited-liability-partnership' },
            { label: 'Limited by Guarantee', value: 'limited-by-guarantee' },
            { label: 'Other', value: 'other' },
          ],
          admin: {
            width: '50%',
            description: 'Which compare-packages page the package belongs to.',
          },
        },
        {
          name: 'order',
          type: 'number',
          label: 'Sort Order',
          required: true,
          defaultValue: 0,
          admin: {
            width: '50%',
            description: 'Low to high, within a company type. Also sets left-to-right column order in the grid.',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          label: 'Price',
          required: true,
          admin: {
            width: '33%',
            description: 'As shown, e.g. "£2.99".',
          },
        },
        {
          name: 'priceNote',
          type: 'text',
          label: 'Price note',
          admin: {
            width: '33%',
            description: 'The line under the price, e.g. "+ £100 Companies House Fee". Leave blank if none.',
          },
        },
        {
          name: 'ribbonText',
          type: 'text',
          label: 'Ribbon text',
          admin: {
            width: '33%',
            description: 'Optional ribbon/badge on the column, e.g. "Most Popular". Leave blank for none.',
          },
        },
      ],
    },
    {
      name: 'whosItFor',
      type: 'richText',
      editor: defaultLexical,
      label: 'Who’s it for',
      admin: {
        description: 'Desktop only, and only on the three-package compare grid.',
      },
    },
    {
      name: 'shortDescription',
      type: 'richText',
      editor: defaultLexical,
      label: 'Short description',
      admin: {
        description: 'Mobile card only.',
      },
    },
    {
      name: 'products',
      type: 'array',
      label: 'Products',
      labels: { singular: 'Product', plural: 'Products' },
      admin: {
        description:
          'Features shown in this package’s grid, in display order (drag to reorder). Use “Add product” to select an existing product — the same product can be shared across packages.',
      },
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
          label: 'Add product',
          admin: {
            allowCreate: false,
          },
        },
      ],
    },
    link({ appearances: false, overrides: { name: 'buyLink' } }),
    link({ appearances: false, optional: true, overrides: { name: 'readMoreLink' } }),
    slugField({ useAsSlug: 'name' }),
  ],
}

export default Packages
