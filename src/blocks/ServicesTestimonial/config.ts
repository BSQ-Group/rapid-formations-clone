import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServicesTestimonial: Block = {
  slug: 'servicesTestimonial',
  interfaceName: 'ServicesTestimonialBlock',
  labels: { singular: 'Services Testimonial', plural: 'Services Testimonials' },
  fields: [
    {
      name: 'quoteText',
      type: 'textarea',
      required: true,
      label: 'Quote',
      admin: {
        description: 'The testimonial quote text (without quotation marks)',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
      label: 'Author Name',
    },
    {
      name: 'authorRole',
      type: 'text',
      label: 'Author Role',
      admin: {
        description: 'e.g. "Quality Company Formations customer"',
      },
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
