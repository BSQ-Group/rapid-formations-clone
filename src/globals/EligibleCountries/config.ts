import type { GlobalConfig } from 'payload'

export const EligibleCountriesGlobal: GlobalConfig = {
  slug: 'eligible-countries',
  label: 'Eligible Countries',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description:
      'Countries whose residents can register a UK company with us, listed by the [[eligiblecountries]] shortcode. Changing the list updates every page that offers it.',
  },
  fields: [
    {
      name: 'lastUpdated',
      type: 'text',
      label: 'Last updated',
      admin: {
        description: 'Shown above the list, e.g. 06 July 2026. Free text, not a date field.',
      },
    },
    {
      name: 'countries',
      type: 'array',
      label: 'Countries',
      admin: {
        initCollapsed: true,
        description: 'Rendered alphabetically in the order held here.',
      },
      fields: [{ name: 'name', type: 'text', label: 'Country', required: true }],
    },
  ],
}
