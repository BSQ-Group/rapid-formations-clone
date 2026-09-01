import type { CollectionConfig } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Products: CollectionConfig = {
  slug: 'products',
  // Audit trail: every save keeps a version (who/when/before→after). No drafts.
  versions: { maxPerDoc: 50 },
  labels: {
    singular: 'Product',
    plural: 'Products',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Commerce',
    useAsTitle: 'displayName',
    defaultColumns: ['displayName', 'usedIn', 'notes'],
    description:
      'A single feature row shown in the compare-package grids. Edit a name or tooltip here once and every package that includes it updates. Products are a pure catalogue — they are selected from a Package, and know nothing about which packages use them.',
  },
  defaultSort: 'name',
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      required: true,
      admin: {
        description: 'The feature name shown on the website, e.g. "Registered Office Service".',
      },
    },
    {
      name: 'displayName',
      type: 'text',
      label: 'Admin label',
      admin: {
        description:
          'Shown in admin lists and the “Add product” picker so you can pick the right one. Defaults to the name; when two products share a name, add a short qualifier. Never shown on the website.',
      },
      hooks: {
        // Default to the product name when left blank (e.g. a manually-created product).
        beforeValidate: [
          ({ value, siblingData }) =>
            (typeof value === 'string' && value.trim()) || (siblingData as { name?: string })?.name,
        ],
      },
    },
    {
      name: 'tooltip',
      type: 'richText',
      editor: defaultLexical,
      label: 'Tooltip (info popup)',
      admin: {
        description: 'The info-circle popup shown next to this product in the grid. Leave blank for no tooltip.',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal notes',
      admin: {
        description:
          'Editor-only, never shown on the website. Explains why this record exists — e.g. it shares a name with another product but has different copy, and which packages use it.',
      },
    },
    {
      // Read-only reverse view of Packages.products.product. You cannot add a
      // package here — a package is linked by selecting this product from its own Products list.
      name: 'usedIn',
      type: 'join',
      label: 'Used in packages',
      collection: 'packages',
      on: 'products.product',
      admin: {
        allowCreate: false,
        // Custom read-only edit-page render (no "Columns" control); list-view cell stays native.
        components: {
          Field: '@/components/admin/UsedInPackagesField#UsedInPackagesField',
        },
        description:
          'Read-only. The packages that currently include this product, kept in sync automatically.',
      },
    },
  ],
}

export default Products
