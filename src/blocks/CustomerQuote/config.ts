import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const CustomerQuote: Block = {
  slug: 'customerQuote',
  interfaceName: 'CustomerQuoteBlock',
  labels: { singular: 'Customer Quote', plural: 'Customer Quotes' },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Include the surrounding quotation marks — they are not added for you.',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      required: true,
    },
    {
      name: 'authorRole',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Author photo',
      admin: { description: 'Square crop. Renders at 323×323 from tablet up.' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      admin: {
        description:
          'Optional. Full player embed URL, e.g. https://player.vimeo.com/video/1030834360?autoplay=1&muted=0 — paste the whole URL, not just the video ID. Leave blank to show the photo with no play button.',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true
        if (/^https?:\/\/\S+$/.test(value)) return true
        return 'Enter a full embed URL starting with https:// — a bare video ID will not play.'
      },
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none', gap: 'l' },
    }),
  ],
}
