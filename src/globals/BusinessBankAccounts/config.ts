import type { GlobalConfig } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'

export const BusinessBankAccountsGlobal: GlobalConfig = {
  slug: 'businessBankAccounts',
  label: 'Business Bank Accounts',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Section heading shown above the partner grid on every block that uses this global.',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      admin: {
        description: 'Optional line under the heading.',
      },
    },
    {
      name: 'backgroundPattern',
      type: 'upload',
      relationTo: 'media',
      label: 'Tile Background Pattern',
      admin: {
        description:
          'Repeating texture tiled behind every partner tile and blended over its brand colour. One image is shared by all tiles.',
      },
    },
    {
      name: 'banks',
      type: 'array',
      label: 'Bank Options',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Bank Name',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Bank Logo',
          required: true,
          admin: { description: 'Rendered at 58x58 inside a white rounded tile.' },
        },
        {
          name: 'brandColour',
          type: 'text',
          label: 'Brand Colour',
          admin: {
            description:
              'CSS colour for the tile background, e.g. #4DAFEA. Per-partner brand data, stored as content rather than a theme token. Used by the partner-grid presentation.',
          },
        },
        {
          name: 'infoTitle',
          type: 'text',
          label: 'Info Heading',
          admin: {
            description:
              'Bold first line of the hover tooltip (desktop) and tap modal (mobile). Leave blank and the tile is not interactive.',
          },
        },
        {
          name: 'description',
          type: 'richText',
          editor: defaultLexical,
          label: 'Info Copy',
          admin: {
            description:
              'Body of the hover tooltip (desktop) and tap modal (mobile). Leave blank and the tile is not interactive.',
          },
        },
        {
          name: 'cardImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Image',
          admin: {
            description: 'Used by the card/carousel presentation only. Optional.',
          },
        },
        {
          name: 'subtext',
          type: 'text',
          label: 'Subtext',
          admin: {
            description: 'Used by the card/carousel presentation only. Optional.',
          },
        },
      ],
    },
    link({
      appearances: false,
      optional: true,
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        admin: {
          description: 'Optional CTA below the grid (e.g. "Learn More").',
        },
      },
    }),
  ],
}
