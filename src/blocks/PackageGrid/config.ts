import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'

export const PackageGrid: Block = {
  slug: 'packageGrid',
  interfaceName: 'PackageGridBlock',
  labels: {
    singular: 'Package Grid',
    plural: 'Package Grids',
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
      minRows: 1,
      maxRows: 4,
      admin: {
        initCollapsed: true,
        description:
          'Three per row on desktop, two on tablet, one on mobile. On desktop a row that is not full is centred, so 1, 2 and 4 packages all stay balanced under the heading.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        link({
          appearances: false,
          disableLabel: true,
          optional: true,
          overrides: {
            name: 'nameLink',
            label: 'Package Name Link',
          },
        }),
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "£ 2.99"' },
        },
        {
          name: 'priceNote',
          type: 'text',
          label: 'Price Note',
          defaultValue: '+ £100 Companies House Fee',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
        link({
          appearances: false,
          optional: true,
          overrides: {
            name: 'buyLink',
            label: 'Buy Button',
          },
        }),
        {
          name: 'highlightsTitle',
          type: 'text',
          defaultValue: 'Highlights',
        },
        {
          name: 'highlights',
          type: 'array',
          label: 'Highlights',
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
            {
              name: 'tooltipTitle',
              type: 'text',
              label: 'Tooltip Heading',
            },
            {
              name: 'tooltipContent',
              type: 'richText',
              editor: defaultLexical,
              label: 'Tooltip',
              admin: {
                description:
                  'Optional — makes the info disc an interactive tooltip. Supports bold and bullet lists.',
              },
            },
            {
              name: 'tooltip',
              type: 'textarea',
              label: 'Tooltip (legacy plain text)',
              admin: {
                description:
                  'Deprecated — used only when Tooltip is empty. Blank lines separate paragraphs; no formatting.',
              },
            },
          ],
        },
        link({
          appearances: false,
          optional: true,
          overrides: {
            name: 'readMoreLink',
            label: 'Read More Button',
          },
        }),
        {
          name: 'badgeText',
          type: 'text',
          label: 'Badge Text',
          admin: { description: 'e.g. "BEST VALUE". Leave blank for no badge.' },
        },
      ],
    },
    link({
      appearances: false,
      optional: true,
      overrides: {
        name: 'compareLink',
        label: 'Compare Packages Button',
      },
    }),
    {
      name: 'contactNote',
      type: 'text',
      label: 'Contact Note',
      admin: {
        description:
          'Line under the compare button, e.g. "Have a question? Use our live chat facility." Rendered as plain text — it does not open a chat widget.',
      },
    },
    {
      name: 'footerNote',
      type: 'text',
      label: 'Footer Note',
      admin: { description: 'e.g. the Companies House fee disclaimer.' },
    },
  ],
}
