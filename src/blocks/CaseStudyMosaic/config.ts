import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const CaseStudyMosaic: Block = {
  slug: 'caseStudyMosaic',
  interfaceName: 'CaseStudyMosaicBlock',
  labels: { singular: 'Case Study Mosaic', plural: 'Case Study Mosaics' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      required: true,
      labels: { singular: 'Case study', plural: 'Case studies' },
      admin: {
        description:
          'The mosaic is a hand-composed layout: each of the six positions has its own size and place in the grid, so ORDER MATTERS and the design assumes exactly six. Below 768px they simply stack in this order.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'Portrait of the founder. Set the alt text on the media item — it is what a screen reader announces.',
          },
        },
        {
          name: 'company',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "Riderr" — the bold line in the caption bar.' },
        },
        {
          name: 'category',
          type: 'text',
          admin: {
            description:
              'e.g. "Health and Fitness: Ride Sports". Hidden between 768px and 1023px, where the tiles are too small to carry two lines.',
          },
        },
        {
          name: 'videoUrl',
          type: 'text',
          label: 'Video URL',
          admin: {
            description:
              'Optional. Direct .mp4 file URL, or a player embed URL (Vimeo/YouTube). Leave blank to show the photo with no play button.',
          },
          validate: (value: string | null | undefined) => {
            if (!value) return true
            if (/^https?:\/\/\S+$/.test(value)) return true
            return 'Enter a full URL starting with https:// — a bare file name or video ID will not play.'
          },
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
