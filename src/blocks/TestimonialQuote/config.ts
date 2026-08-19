import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const TestimonialQuote: Block = {
  slug: 'testimonialQuote',
  interfaceName: 'TestimonialQuoteBlock',
  labels: {
    singular: 'Testimonial Quote',
    plural: 'Testimonial Quotes',
  },
  fields: [
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'l' },
    }),
  ],
}
