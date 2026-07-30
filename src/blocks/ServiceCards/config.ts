import type { Block, Field } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

const cardFields: Field[] = [
  {
    name: 'icon',
    type: 'text',
    required: true,
    defaultValue: 'badge-check',
    admin: {
      description:
        'Lucide icon name in kebab-case (e.g. "badge-check", "file-text", "building-2", "mail"). Browse the full set at https://lucide.dev/icons.',
    },
  },
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
    required: true,
  },
  {
    name: 'price',
    type: 'text',
    required: true,
    admin: { description: 'Price label, e.g. "£75.99 +VAT".' },
  },
  link({
    overrides: {
      name: 'orderLink',
      label: 'Order CTA',
    },
  }),
]

export const ServiceCards: Block = {
  slug: 'serviceCards',
  interfaceName: 'ServiceCardsBlock',
  labels: {
    singular: 'Service Cards',
    plural: 'Service Cards Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'Order a confirmation statement',
    },
    {
      name: 'groups',
      type: 'array',
      required: false,
      labels: { singular: 'Group', plural: 'Groups' },
      admin: {
        description:
          'Card groups. Each group can have an optional subtitle (e.g. "Address Services") that renders above its cards. Use a single group with no subtitle for the simple subheading-less layout. If empty, the legacy `cards` field below is rendered as a single anonymous group (backwards compatibility — new content should use Groups).',
      },
      fields: [
        {
          name: 'subtitle',
          type: 'text',
          required: false,
          admin: {
            description:
              'Optional. Renders as a section subheading above this group\'s cards. Leave blank for a single anonymous group.',
          },
        },
        {
          name: 'cards',
          type: 'array',
          required: true,
          minRows: 1,
          labels: { singular: 'Card', plural: 'Cards' },
          admin: {
            description:
              'Cards in this group. Desktop layout adapts to the count: 2 cards render side-by-side; 3 or more render 3 per row (trailing cards left-align at the same card width).',
          },
          fields: cardFields,
        },
      ],
    },
    // Legacy field — used only when `groups` above is empty. Existing content
    // (pre-CORE-3571) is rendered as a single anonymous group. New content
    // should add cards under a Group instead. Plan to remove in a follow-up PR
    // once all pages have been migrated to `groups`.
    {
      name: 'cards',
      type: 'array',
      required: false,
      labels: { singular: 'Card (legacy)', plural: 'Cards (legacy)' },
      admin: {
        description:
          'Legacy. Only used when Groups above is empty. New content should add cards under a Group.',
        condition: (_data, siblingData) => {
          const groups = siblingData?.groups
          return !Array.isArray(groups) || groups.length === 0
        },
      },
      fields: cardFields,
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 's', paddingBottom: 's' },
    }),
  ],
}
