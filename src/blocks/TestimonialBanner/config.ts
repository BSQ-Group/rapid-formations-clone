import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const TestimonialBanner: Block = {
  slug: 'testimonialBanner',
  interfaceName: 'TestimonialBannerBlock',
  labels: { singular: 'Testimonial Banner', plural: 'Testimonial Banners' },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Quote',
      admin: {
        description: 'The testimonial quote text. Curly quotes are added automatically.',
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
      defaults: { background: 'light', paddingTop: 's', paddingBottom: 's' },
      overrides: {
        admin: {
          description:
            'Top/bottom section padding (BSQ Spacing/Section tokens, responsive). Background is fixed to surface-accent-light for this variant.',
        },
      },
    }),
  ],
}
