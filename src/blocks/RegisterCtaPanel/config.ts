import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const RegisterCtaPanel: Block = {
  slug: 'registerCtaPanel',
  interfaceName: 'RegisterCtaPanelBlock',
  labels: { singular: 'Register CTA Panel', plural: 'Register CTA Panels' },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      required: true,
      admin: { description: 'Line breaks are preserved as written.' },
      defaultValue: 'Are you ready to\nregister your company today?',
    },
    {
      name: 'description',
      type: 'text',
      required: true,
      defaultValue: 'Order online or if you have any questions, please call',
    },
    {
      name: 'descriptionSuffix',
      type: 'text',
      defaultValue: '.',
      admin: { description: 'Text after the phone link. Usually just a full stop.' },
    },
    link({
      appearances: false,
      overrides: { name: 'phone', label: 'Phone link' },
    }),
    link({
      appearances: false,
      overrides: { name: 'cta', label: 'Call to action' },
    }),
    sectionLayoutField({
      gap: true,
      defaults: {
        background: 'inverse',
        paddingTop: 'none',
        paddingBottom: 'none',
        gap: 'sectionLarge',
      },
    }),
  ],
}
