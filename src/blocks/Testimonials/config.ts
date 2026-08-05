import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Centred above the Trustpilot carousel.',
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
    link({
      appearances: false,
      optional: true,
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        admin: {
          description: 'Optional centred button below the carousel, e.g. "Our Customer Reviews".',
        },
      },
    }),
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
