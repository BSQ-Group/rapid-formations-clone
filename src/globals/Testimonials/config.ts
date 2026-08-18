import type { GlobalConfig } from 'payload'

export const TestimonialsGlobal: GlobalConfig = {
  slug: 'testimonialPool',
  label: 'Testimonial Pool',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description:
      'Customer quotes shared by the "Testimonial Quote" block. Every page carrying that block draws one from this pool, so a quote added here appears across the site.',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Testimonials',
      minRows: 1,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Testimonials/ItemRowLabel#default',
        },
      },
      fields: [
        {
          name: 'quote',
          type: 'textarea',
          label: 'Quote',
          required: true,
          admin: {
            description: 'Without surrounding quotation marks — the block adds them.',
          },
        },
        {
          name: 'customerName',
          type: 'text',
          label: 'Customer Name',
          required: true,
        },
      ],
    },
  ],
}
