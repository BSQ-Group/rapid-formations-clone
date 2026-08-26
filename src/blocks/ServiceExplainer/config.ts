import type { Block } from 'payload'

import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServiceExplainer: Block = {
  slug: 'serviceExplainer',
  interfaceName: 'ServiceExplainerBlock',
  labels: {
    singular: 'Service Explainer',
    plural: 'Service Explainers',
  },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      label: 'Heading',
      required: true,
      admin: { description: 'Centred at the top of the navy band. Line breaks are preserved.' },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      admin: { description: 'Optional centred line under the heading.' },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      admin: {
        description:
          'Player embed URL (Vimeo/YouTube) or a direct .mp4 file URL. An embed URL opens in an iframe, a file URL in a native player. Leave blank and the still renders on its own, with no play button and nothing to click.',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true
        if (/^https?:\/\/\S+$/.test(value)) return true
        return 'Enter a full URL starting with https:// — a bare file name or video ID will not play.'
      },
    },
    {
      name: 'videoStill',
      type: 'upload',
      relationTo: 'media',
      label: 'Video still',
      admin: {
        description:
          'Landscape. It is the whole clickable target, so set the alt text on the media item — that is what a screen reader announces.',
      },
    },
    {
      name: 'videoTitle',
      type: 'text',
      label: 'Video title',
      admin: {
        description:
          'Names the video to screen readers and in the player frame. Falls back to the heading when blank.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      admin: {
        description: 'Left column below the video from 768px up, above the text below that.',
      },
    },
    {
      name: 'contentTitle',
      type: 'text',
      label: 'Content title',
      admin: { description: 'Heading of the text column beside the image.' },
    },
    {
      name: 'contentBody',
      type: 'textarea',
      label: 'Content body',
      admin: { description: 'Line breaks are preserved.' },
    },
    link({
      appearances: false,
      overrides: { name: 'cta', label: 'Call to action' },
    }),
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
    }),
  ],
}
