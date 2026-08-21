import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const AffiliateProgram: Block = {
  slug: 'affiliateProgram',
  interfaceName: 'AffiliateProgramBlock',
  labels: {
    singular: 'Affiliate Program',
    plural: 'Affiliate Programs',
  },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: defaultLexical,
      required: true,
      admin: {
        description:
          'Heading, intro paragraph and a bulleted list. Each bullet renders with a chevron.',
      },
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Call to action',
      },
    }),
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
