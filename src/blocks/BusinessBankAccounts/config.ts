import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const BusinessBankAccounts: Block = {
  slug: 'businessBankAccounts',
  interfaceName: 'BusinessBankAccountsBlock',
  labels: {
    singular: 'Business Bank Accounts',
    plural: 'Business Bank Accounts',
  },
  fields: [
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'l', paddingBottom: 'l' },
    }),
  ],
}
