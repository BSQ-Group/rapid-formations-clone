import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const WiseBusinessAccount: Block = {
  slug: 'wiseBusinessAccount',
  interfaceName: 'WiseBusinessAccountBlock',
  labels: {
    singular: 'Wise Business Account Referral',
    plural: 'Wise Business Account Referrals',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
      admin: {
        description: 'Heading shown at the top of the card, e.g. "Wise Business Account Referral".',
      },
    },
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: defaultLexical,
      label: 'Body',
      admin: {
        description: 'Paragraph content rendered under the title.',
      },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'm', paddingBottom: 'm' },
    }),
  ],
}
