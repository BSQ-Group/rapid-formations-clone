import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const StaffCollection: CollectionConfig = {
  slug: 'staff',
  labels: {
    singular: 'Team member',
    plural: 'Team members',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'fullName',
    group: 'Content',
    defaultColumns: ['fullName', 'jobTitle', 'displayOrder'],
    description:
      'People shown by the Meet The Team block. Each card opens a dialog with the photo, the job title and the facts listed below it.',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
          type: 'text',
          label: 'Name',
          required: true,
          admin: { width: '50%', description: 'Shown on the card and as the dialog heading.' },
        },
        {
          name: 'jobTitle',
          type: 'text',
          label: 'Job title',
          required: true,
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Photo',
      required: true,
      admin: {
        description:
          'Cut-out portrait on the pale panel. The source set is 370x320; anything wider than it is tall keeps the row heights even.',
      },
    },
    {
      name: 'facts',
      type: 'array',
      label: 'Facts',
      labels: { singular: 'Fact', plural: 'Facts' },
      admin: {
        description:
          'One line each in the dialog, rendered as "Label: value". Leave empty and the dialog shows the photo, name and job title alone.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              admin: { width: '40%', description: 'e.g. "Favourite Drink". Rendered in bold.' },
            },
            {
              name: 'value',
              type: 'text',
              label: 'Value',
              required: true,
              admin: { width: '60%' },
            },
          ],
        },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      label: 'Display order',
      admin: {
        position: 'sidebar',
        description: 'Lowest wins. Members without a number sort after those with one.',
      },
    },
  ],
}
