import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const AboutThisService: Block = {
  slug: 'aboutThisService',
  interfaceName: 'AboutThisServiceBlock',
  labels: {
    singular: 'About This Service',
    plural: 'About This Service Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'About this service',
    },
    {
      name: 'paragraphs',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'noteLabel',
      type: 'text',
      defaultValue: 'Please note:',
      admin: { description: 'Bold prefix shown before the note text.' },
    },
    {
      name: 'noteText',
      type: 'textarea',
      admin: { description: 'Body of the "Please note" callout.' },
    },
    link({
      overrides: {
        name: 'orderLink',
        label: 'Order CTA',
      },
    }),
    {
      name: 'price',
      type: 'text',
      label: 'Price label',
      defaultValue: '£39.00 +VAT',
    },
    {
      name: 'showTrustpilot',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show Trustpilot rating',
      admin: {
        description: 'Renders the Trustpilot Micro TrustScore widget under the order CTA.',
      },
    },
    {
      name: 'cardImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Card background image',
      admin: { description: 'Square gradient image used behind the floating feature cards.' },
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Feature', plural: 'Features' },
      admin: { description: 'Up to 3 floating feature cards layered over the card image.' },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'shieldCheck',
          options: [
            { label: 'Shield Check', value: 'shieldCheck' },
            { label: 'Map Pin', value: 'mapPin' },
            { label: 'Mail', value: 'mail' },
            { label: 'Check', value: 'check' },
            { label: 'Phone', value: 'phone' },
            { label: 'Sparkles', value: 'sparkles' },
          ],
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
