import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ReviewsCollection: CollectionConfig = {
  slug: 'reviews',
  labels: {
    singular: 'Review',
    plural: 'Reviews',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'authorName',
    group: 'Content',
    defaultColumns: ['authorName', 'provider', 'score', 'reviewDate'],
    description:
      'Individual customer reviews shown by the Review Centre Tabs block. Provider must match a platform name in the Review Stats global, e.g. "Trustpilot".',
  },
  fields: [
    {
      name: 'authorName',
      type: 'text',
      label: 'Author',
      required: true,
      admin: { description: 'Their initials fill the avatar circle.' },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'provider',
          type: 'text',
          label: 'Provider',
          required: true,
          admin: {
            width: '40%',
            description: 'Matches a platform in Review Stats, e.g. "Trustpilot" or "Google".',
          },
        },
        {
          name: 'score',
          type: 'number',
          label: 'Score',
          required: true,
          min: 0,
          max: 5,
          admin: { width: '25%', description: 'Out of 5.' },
        },
        {
          name: 'reviewDate',
          type: 'date',
          label: 'Date',
          required: true,
          admin: {
            width: '35%',
            description: 'Shown as a relative age, e.g. "4 months ago". Newest render first.',
          },
        },
      ],
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Review',
      required: true,
      admin: {
        description: 'Truncated to the first 20 words behind a Read More toggle.',
      },
    },
  ],
}
