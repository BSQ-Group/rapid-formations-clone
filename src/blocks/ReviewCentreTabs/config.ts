import type { Block } from 'payload'

import { ReviewHighlightRows } from '@/blocks/ReviewHighlightRows/config'

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
          name: 'content',
          type: 'blocks',
          label: 'Panel content',
          blocks: [ReviewHighlightRows],
          admin: {
            initCollapsed: true,
            condition: (_, siblingData) => siblingData?.panel === 'ratings',
            description:
              'Rendered under the ratings banner, inside this tab. The source keeps the review highlight rows here rather than on the page, so they show on the overview and go away when a provider tab is open.',
          },
        },
        {
          name: 'provider',
          type: 'text',
          label: 'Provider',
          admin: {
            condition: (_, siblingData) => siblingData?.panel === 'provider',
            description:
              'Matches a platform in the Review Stats global and the Provider on each review, e.g. "Trustpilot". Spelling must match Review Stats; case does not matter.',
          },
          // A provider panel with no provider resolves to nothing and the tab drops out
          // of the page silently, so refuse to save it rather than let it vanish.
          validate: (value: string | null | undefined, options: unknown) => {
            const { siblingData } = (options ?? {}) as { siblingData?: { panel?: string } }
            if (siblingData?.panel !== 'provider') return true
            if (value && value.trim()) return true
            return 'Name the provider this tab shows, matching a platform in Review Stats.'
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
