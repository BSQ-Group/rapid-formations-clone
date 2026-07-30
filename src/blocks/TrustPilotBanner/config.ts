import type { Block } from 'payload'

export const TrustPilotBanner: Block = {
  slug: 'trustpilotBanner',
  interfaceName: 'TrustPilotBannerBlock',
  labels: { singular: 'Trustpilot Banner', plural: 'Trustpilot Banners' },
  fields: [
    {
      name: 'businessUnitId',
      type: 'text',
      required: true,
      label: 'Trustpilot Business Unit ID',
      admin: {
        description: 'Found in your Trustpilot Business account under Integrations.',
      },
    },
    {
      name: 'locale',
      type: 'text',
      defaultValue: 'en-GB',
      label: 'Widget Locale',
    },
  ],
}
