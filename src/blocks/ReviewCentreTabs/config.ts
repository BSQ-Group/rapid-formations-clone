import type { Block } from 'payload'

export const ReviewCentreTabs: Block = {
  slug: 'reviewCentreTabs',
  interfaceName: 'ReviewCentreTabsBlock',
  labels: {
    singular: 'Review Centre Tabs',
    plural: 'Review Centre Tabs',
  },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      labels: { singular: 'Tab', plural: 'Tabs' },
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        description:
          'Rendered left to right, first tab selected by default. Each label becomes its own URL fragment, so /customer-reviews#trustpilot opens that tab.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
        },
        {
          name: 'panel',
          type: 'select',
          label: 'Panel',
          required: true,
          defaultValue: 'ratings',
          options: [
            { label: 'Ratings — every platform at a glance', value: 'ratings' },
            { label: 'Provider — one platform and its latest reviews', value: 'provider' },
          ],
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Panel heading',
          defaultValue: 'How we are rated',
          admin: {
            condition: (_, siblingData) => siblingData?.panel === 'ratings',
          },
        },
        {
          name: 'provider',
          type: 'text',
          label: 'Provider',
          admin: {
            condition: (_, siblingData) => siblingData?.panel === 'provider',
            description:
              'Matches a platform in the Review Stats global and the Provider on each review, e.g. "Trustpilot".',
          },
        },
      ],
    },
    {
      name: 'reviewsHeading',
      type: 'text',
      label: 'Reviews heading',
      defaultValue: 'Our last five reviews....',
      admin: { description: 'Sits above the review cards on every provider tab.' },
    },
    {
      name: 'reviewsPerProvider',
      type: 'number',
      label: 'Reviews per provider',
      defaultValue: 5,
      min: 1,
      max: 12,
      admin: { description: 'Newest first, taken from the Reviews collection.' },
    },
    {
      name: 'readAllLabel',
      type: 'text',
      label: 'Banner button label',
      defaultValue: 'Read All Reviews',
      admin: { description: 'The white button in the coloured banner.' },
    },
    {
      name: 'readAllTileLabel',
      type: 'text',
      label: 'Closing tile label',
      defaultValue: 'Read all reviews',
      admin: { description: 'The coloured tile that closes the card grid.' },
    },
  ],
}
