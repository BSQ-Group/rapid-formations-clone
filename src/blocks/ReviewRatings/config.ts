import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ReviewRatings: Block = {
  slug: 'reviewRatings',
  interfaceName: 'ReviewRatingsBlock',
  labels: {
    singular: 'Review Ratings',
    plural: 'Review Ratings',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'How we are rated',
    },
    {
      name: 'subheading',
      type: 'text',
      label: 'Subheading',
    },
    link({
      appearances: false,
      optional: true,
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        admin: {
          description: 'Optional centred button below the ratings, e.g. "Our Customer Reviews".',
        },
      },
    }),
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
