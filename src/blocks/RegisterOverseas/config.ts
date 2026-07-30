import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const RegisterOverseas: Block = {
  slug: 'registerOverseas',
  interfaceName: 'RegisterOverseasBlock',
  labels: {
    singular: 'Register Overseas',
    plural: 'Register Overseas',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'Register a company <br> in the UK from overseas',
      admin: {
        description:
          'Main section heading. A <br> sets the desktop/mobile line break (after "company", matching Figma); it is automatically suppressed at the tablet breakpoint where the heading fits on one line.',
      },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body Text',
      required: true,
      defaultValue:
        'Quality Company Formations enable non-UK residents to register a company with a prestigious Central London office address which includes same-day digital mail service and business address service with international mail forwarding of all your business correspondence.',
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        admin: {
          description: 'Primary CTA button (e.g. "Start now").',
        },
      },
    }),
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'm', paddingBottom: 'm' },
    }),
  ],
}
