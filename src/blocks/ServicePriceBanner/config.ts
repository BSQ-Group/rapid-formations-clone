import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServicePriceBanner: Block = {
  slug: 'servicePriceBanner',
  interfaceName: 'ServicePriceBannerBlock',
  labels: {
    singular: 'Service Price Banner',
    plural: 'Service Price Banners',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      label: 'Heading',
      required: true,
      admin: { description: 'The page H1. Line breaks are preserved.' },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      admin: { description: 'One line under the heading.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'price',
          type: 'text',
          label: 'Price',
          required: true,
          admin: { width: '50%', description: 'Digits only, e.g. 149.99. The £ is added.' },
        },
        {
          name: 'priceSuffix',
          type: 'text',
          label: 'After the price',
          admin: { width: '50%', description: 'Smaller text beside it, e.g. "per year".' },
        },
      ],
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Call to action',
        admin: { description: 'Full width below 768px, sized to its label above.' },
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      admin: {
        description: 'Sits at the right, capped at 300px wide. Hidden below 1023px.',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'Review quote',
      admin: {
        description: 'A five-star card over the bottom-left of the image. Leave empty to hide it.',
      },
    },
    {
      name: 'background',
      type: 'select',
      label: 'Background',
      required: true,
      defaultValue: 'navy',
      options: [
        { label: 'Navy', value: 'navy' },
        { label: 'Black', value: 'inverse' },
        { label: 'Cyan', value: 'cyan' },
      ],
      admin: {
        description: 'The source stores a free colour here; this repo uses theme tokens instead.',
      },
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
