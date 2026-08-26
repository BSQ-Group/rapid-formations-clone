import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

// Content (heading, subheading, background pattern, banks, CTA) lives in the
// `businessBankAccounts` global and is read by the component via findGlobal —
// the same pattern as the BusinessBankAccounts card block. The block itself only
// carries per-placement section layout.
export const BankingPartners: Block = {
  slug: 'bankingPartners',
  interfaceName: 'BankingPartnersBlock',
  labels: {
    singular: 'Banking Partners',
    plural: 'Banking Partners',
  },
  fields: [
    sectionLayoutField({
      gap: true,
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none', gap: 'sectionLarge' },
    }),
  ],
}
