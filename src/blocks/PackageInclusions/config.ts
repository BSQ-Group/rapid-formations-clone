import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const PackageInclusions: Block = {
  slug: 'packageInclusions',
  interfaceName: 'PackageInclusionsBlock',
  labels: {
    singular: 'Package Inclusions',
    plural: 'Package Inclusions',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: "What's included:",
    },
    {
      name: 'items',
      type: 'array',
      label: 'Included items',
      required: true,
      minRows: 1,
      labels: { singular: 'Item', plural: 'Items' },
      admin: {
        initCollapsed: true,
        description:
          'Above 1023px these flow down the left column and then the right, so the order here reads column by column, not row by row. The source packages run 9, 12 and 17 items.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'Icon',
          required: true,
          defaultValue: 'badgeCheck',
          options: [
            { label: 'Badge with check', value: 'badgeCheck' },
            { label: 'Bank', value: 'university' },
            { label: 'Cash register', value: 'cashRegister' },
            { label: 'Envelope', value: 'envelope' },
            { label: 'File archive', value: 'fileArchive' },
            { label: 'File with pencil', value: 'fileEdit' },
            { label: 'Globe', value: 'globeEurope' },
            { label: 'Life ring', value: 'lifeRing' },
            { label: 'Money cheque', value: 'moneyCheckEdit' },
            { label: 'Monitor', value: 'desktop' },
            { label: 'Rotary telephone', value: 'phoneRotary' },
            { label: 'Screen with people', value: 'screenUsers' },
            { label: 'Tools', value: 'tools' },
            { label: 'Users', value: 'users' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'content',
          type: 'richText',
          editor: defaultLexical,
          label: 'Description',
          required: true,
        },
      ],
    },
    {
      name: 'priceSlug',
      type: 'text',
      label: 'Price slug',
      admin: {
        description:
          'Matches an entry in the Prices global, e.g. "basic-package". Leave empty to show the button without a price.',
      },
    },
    {
      name: 'priceNote',
      type: 'text',
      label: 'Price note',
      admin: {
        description: 'Small line under the price, e.g. "+ £100 Companies House Fee".',
      },
    },
    link({
      appearances: false,
      optional: true,
      overrides: {
        name: 'cta',
        label: 'Buy button',
        admin: {
          description: 'The green button beside the price. Leave the label empty to omit it.',
        },
      },
    }),
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 's' },
    }),
  ],
}
