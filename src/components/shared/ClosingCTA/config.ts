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
      type: 'text',
      label: 'Heading',
      required: true,
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
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
