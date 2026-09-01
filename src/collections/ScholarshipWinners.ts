import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const ScholarshipWinnersCollection: CollectionConfig = {
  slug: 'scholarship-winners',
  labels: {
    singular: 'Scholarship winner',
    plural: 'Scholarship winners',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'year', 'courseName', 'university'],
    description:
      'Everyone who has won the Entrepreneur Scholarship. The Scholarship Programme block groups them by year automatically, newest first, so adding a new year needs no code change.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'year',
          type: 'text',
          required: true,
          admin: {
            width: '25%',
            description: 'The year they won, e.g. 2025. Becomes the group heading.',
          },
        },
        { name: 'name', type: 'text', required: true, admin: { width: '75%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'courseName',
          type: 'text',
          label: 'Course',
          admin: { width: '50%', description: 'Reads as "<course> student at <university>".' },
        },
        { name: 'university', type: 'text', admin: { width: '50%' } },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display order',
      admin: {
        position: 'sidebar',
        description:
          'Order within the year. Lowest wins; winners without a number sort after those with one.',
      },
    },
  ],
}
