import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const WhyUseAgent: Block = {
  slug: 'whyUseAgent',
  interfaceName: 'WhyUseAgentBlock',
  labels: { singular: 'Why Use An Agent', plural: 'Why Use An Agent' },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Centred above the grid. Line breaks are preserved.',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      admin: {
        description: 'Optional line under the heading. Line breaks are preserved.',
      },
    },
    {
      name: 'items',
      type: 'array',
      label: 'Reasons',
      required: true,
      minRows: 1,
      maxRows: 12,
      labels: { singular: 'Reason', plural: 'Reasons' },
      admin: {
        initCollapsed: true,
        description:
          'One per column: one column below 576px, two from 576px, three from 768px. Any number of items works, and rows simply wrap.',
      },
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icon',
          required: true,
          admin: {
            description:
              'A FontAwesome solid icon name in kebab-case. Available: building-shield, chart-pie, clipboard-list-check, globe, hand-holding-hand, phone, piggy-bank, sliders-up, thumbs-up. Adding another means importing it in the block\'s icons.ts, so that the glyph ships from the licensed package rather than as copied path data. An unrecognised name renders nothing.',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Description',
          required: true,
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
          description: 'Optional centred button below the grid, e.g. "Get Started".',
        },
      },
    }),
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
