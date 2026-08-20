import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const SameDayIncorporation: Block = {
  slug: 'sameDayIncorporation',
  interfaceName: 'SameDayIncorporationBlock',
  labels: {
    singular: 'Same-Day Incorporation',
    plural: 'Same-Day Incorporation',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Same-Day Incorporation',
      admin: {
        description:
          'Mobile-only tile. Hidden from 768px up, where the same copy sits in the compare-packages table header.',
      },
    },
    {
      name: 'body',
      type: 'richText',
      editor: defaultLexical,
      required: true,
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
