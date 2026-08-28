import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ClosingCTA: Block = {
  slug: 'closingCTA',
  interfaceName: 'ClosingCTABlock',
  labels: {
    singular: 'Closing CTA',
    plural: 'Closing CTAs',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      label: 'Heading',
      required: true,
      admin: { description: 'Line breaks are preserved, matching the source layout.' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      admin: { description: 'Line breaks are preserved, matching the source layout.' },
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Button',
      },
    }),
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      label: 'Typography variant',
      options: [
        { label: 'Standard — 32px bold cyan heading', value: 'standard' },
        {
          label: 'Panel — 36px heading in body colour, larger standfirst and button',
          value: 'panel',
        },
      ],
      admin: {
        description:
          'Standard is the closing CTA the rest of the site uses. Panel is the wider, quieter treatment the Review Centre closes on.',
      },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
