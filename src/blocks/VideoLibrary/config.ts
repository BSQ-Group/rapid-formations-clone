import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const VideoLibrary: Block = {
  slug: 'videoLibrary',
  interfaceName: 'VideoLibraryBlock',
  labels: {
    singular: 'Video Library',
    plural: 'Video Libraries',
  },
  fields: [
    {
      name: 'videos',
      type: 'array',
      label: 'Videos',
      admin: {
        initCollapsed: true,
        description:
          'Vimeo videos grouped by category. Thumbnails are derived from the Vimeo ID, so no image upload is needed.',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'vimeoId',
              type: 'text',
              required: true,
              label: 'Vimeo ID',
              admin: {
                width: '50%',
                description:
                  'Digits only, e.g. 1145232700. Drives both the thumbnail (vumbnail.com) and the player.',
              },
            },
            {
              name: 'category',
              type: 'text',
              required: true,
              label: 'Category',
              admin: {
                width: '50%',
                description:
                  'Videos are grouped under this heading. Reuse the exact wording to add to an existing group.',
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'duration',
              type: 'text',
              label: 'Duration',
              admin: {
                width: '50%',
                description: 'ISO-8601, e.g. PT3M12S. Rendered as "3 mins".',
              },
            },
            {
              name: 'publishedDate',
              type: 'date',
              label: 'Published date',
              admin: {
                width: '50%',
                date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMMM yyyy' },
                description: 'Newest first within each category.',
              },
            },
          ],
        },
        {
          name: 'categoryOrder',
          type: 'number',
          label: 'Category order',
          admin: {
            description:
              'Lowest wins when ordering the category sections. Videos sharing a category should share this number.',
          },
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
