import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
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
      name: 'sectionHeading',
      type: 'text',
      label: 'Section Heading',
      required: true,
      defaultValue: 'Want to register a UK company from abroad?',
      admin: {
        description:
          'Centred heading above the bordered panel. Newlines are preserved, so a deliberate line break can be typed in.',
      },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Panel Heading',
      required: true,
      defaultValue: 'Non-resident UK company formation',
      admin: {
        description: 'Heading inside the panel, above the body copy.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body Text',
      required: true,
      editor: defaultLexical,
      admin: {
        description:
          'Panel body copy. Rich text so multiple paragraphs and inline links can be authored.',
      },
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Call to Action',
        admin: {
          description: 'Primary CTA button (e.g. "Our Non-Resident Packages").',
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
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
