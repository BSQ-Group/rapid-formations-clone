import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const ComparePackagesHero: Block = {
  slug: 'comparePackagesHero',
  interfaceName: 'ComparePackagesHeroBlock',
  labels: {
    singular: 'Compare Packages Hero',
    plural: 'Compare Packages Heroes',
  },
  fields: [
    {
      name: 'title',
      type: 'textarea',
      label: 'Title',
      required: true,
      admin: { description: 'The page H1. Line breaks are preserved.' },
    },
    {
      name: 'body',
      type: 'richText',
      label: 'Body',
      admin: {
        description:
          'Sits beside the title in a 3fr/1fr grid above 768px. Supports [[telephone]], [[live-chat]] and [[eligiblecountries]].',
      },
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
