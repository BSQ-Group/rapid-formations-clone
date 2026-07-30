import type { GlobalConfig } from 'payload'

export const BusinessBankAccountsGlobal: GlobalConfig = {
  slug: 'businessBankAccounts',
  label: 'Business Bank Accounts',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'banks',
      type: 'array',
      label: 'Bank Options',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Bank Name',
          required: true,
        },
        {
          name: 'cardImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Card Image',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Bank Logo',
          required: true,
        },
        {
          name: 'subtext',
          type: 'text',
          label: 'Subtext',
        },
      ],
    },
  ],
}
