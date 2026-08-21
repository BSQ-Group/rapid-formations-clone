import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const RecommendedPackages: Block = {
  slug: 'recommendedPackages',
  interfaceName: 'RecommendedPackagesBlock',
  labels: {
    singular: 'Recommended Packages',
    plural: 'Recommended Packages',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    {
      name: 'packages',
      type: 'array',
      label: 'Packages',
      required: true,
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Package', plural: 'Packages' },
      admin: {
        initCollapsed: true,
        description:
          'One card each, in a row of three above 1023px. At exactly two the pair is pushed to the outer edges of the grid, which is how the source lays two out.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Package name',
          required: true,
        },
        {
          name: 'priceSlug',
          type: 'text',
          label: 'Price slug',
          admin: {
            description: 'Matches an entry in the Prices global, e.g. "all-inclusive".',
          },
        },
        {
          name: 'priceNote',
          type: 'text',
          label: 'Price note',
          admin: { description: 'Small line under the price, e.g. "+ £100 Companies House Fee".' },
        },
        {
          name: 'recommendedLabel',
          type: 'text',
          label: 'Lead-in label',
          defaultValue: 'Recommended for:',
        },
        {
          name: 'content',
          type: 'richText',
          editor: defaultLexical,
          label: 'Content',
          required: true,
          admin: {
            description:
              'A bold line naming who the package suits, then the selling points as a list. List items get a chevron marker.',
          },
        },
        {
          name: 'ribbonText',
          type: 'text',
          label: 'Ribbon',
          admin: {
            description:
              'Optional corner ribbon, e.g. "Best value". Rendered uppercase, and only above 1023px.',
          },
        },
        link({
          appearances: false,
          overrides: {
            name: 'cta',
            label: 'Package link',
            admin: {
              description:
                'Used by both the package name and the button below the card, as the source does.',
            },
          },
        }),
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
    }),
  ],
}
