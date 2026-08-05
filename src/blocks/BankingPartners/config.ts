import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const BankingPartners: Block = {
  slug: 'bankingPartners',
  interfaceName: 'BankingPartnersBlock',
  labels: {
    singular: 'Banking Partners',
    plural: 'Banking Partners',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Our business banking partners',
      admin: {
        description:
          'Centred heading above the partner grid. Newlines are preserved, so a deliberate line break can be typed in.',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
      admin: {
        description:
          'Optional line under the heading. Leave blank and the spacing above the grid stays the same.',
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
      label: 'Banking Partners',
      required: true,
      minRows: 1,
      maxRows: 12,
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
          admin: { description: 'Rendered at 58x58 inside a white rounded tile.' },
        },
        {
          name: 'brandColour',
          type: 'text',
          label: 'Brand Colour',
          required: true,
          admin: {
            description:
              'CSS colour for the tile background, e.g. #4DAFEA. This is per-partner brand data, so it is stored as content rather than a theme token.',
          },
        },
        {
          name: 'infoTitle',
          type: 'text',
          label: 'Info Heading',
          admin: {
            description:
              'Bold first line of the hover tooltip (desktop) and tap modal (mobile), e.g. "Barclays business bank account". Leave blank and the tile is not interactive.',
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
      ],
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        admin: {
          description: 'Optional CTA below the grid (e.g. "Learn More").',
        },
      },
    }),
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
