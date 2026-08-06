import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const FaqTopic: Block = {
  slug: 'faqTopic',
  interfaceName: 'FaqTopicBlock',
  labels: {
    singular: 'FAQ Topic',
    plural: 'FAQ Topics',
  },
  fields: [
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
