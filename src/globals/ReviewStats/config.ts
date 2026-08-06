import type { GlobalConfig } from 'payload'

export const REVIEW_STAR_TONES = [
  'trustpilot',
  'google',
  'facebook',
  'yell',
  'freeindex',
] as const

export type ReviewStarTone = (typeof REVIEW_STAR_TONES)[number]

export const ReviewStatsGlobal: GlobalConfig = {
  slug: 'reviewStats',
  label: 'Review Stats',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description:
      'Ratings shown by the "How we are rated" block. The same figures appear on every page carrying that block.',
  },
  fields: [
    {
      name: 'platforms',
      type: 'array',
      label: 'Review Platforms',
      admin: {
        initCollapsed: true,
        description: 'Order here is the order they render in. Untick Show to hide one.',
      },
      fields: [
        {
          name: 'provider',
          type: 'text',
          label: 'Provider',
          required: true,
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Logo',
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'score',
              type: 'number',
              label: 'Score',
              required: true,
              admin: { width: '33%' },
            },
            {
              name: 'maxScore',
              type: 'number',
              label: 'Out Of',
              required: true,
              defaultValue: 5,
              admin: { width: '33%' },
            },
            {
              name: 'totalReviews',
              type: 'text',
              label: 'Total Reviews',
              required: true,
              admin: { width: '34%', description: 'Rendered as written, e.g. "11,974".' },
            },
          ],
        },
        {
          name: 'starTone',
          type: 'select',
          label: 'Star Colour',
          required: true,
          defaultValue: 'trustpilot',
          options: REVIEW_STAR_TONES.map((value) => ({
            label: value.charAt(0).toUpperCase() + value.slice(1),
            value,
          })),
          admin: {
            description: 'Each platform brands its stars a different colour.',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'Link',
          required: true,
        },
        {
          name: 'show',
          type: 'checkbox',
          label: 'Show',
          defaultValue: true,
        },
      ],
    },
  ],
}
