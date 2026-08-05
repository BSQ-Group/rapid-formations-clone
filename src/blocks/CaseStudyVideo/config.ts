import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const CaseStudyVideo: Block = {
  slug: 'caseStudyVideo',
  interfaceName: 'CaseStudyVideoBlock',
  labels: { singular: 'Case Study Video', plural: 'Case Study Videos' },
  fields: [
    {
      name: 'heading',
      type: 'textarea',
      label: 'Heading',
      required: true,
      admin: {
        description: 'Centred above the video. Line breaks are preserved.',
      },
    },
    {
      name: 'subheading',
      type: 'textarea',
      label: 'Subheading',
      admin: {
        description: 'Optional line under the heading. Line breaks are preserved.',
      },
    },
    {
      name: 'posterImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Poster Image',
      admin: {
        description:
          'Shown before the video plays. Upload a 16:9 still — the player is always 16:9 and the poster is scaled to fill it.',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      required: true,
      admin: {
        description:
          'Direct URL to an MP4. Hosted externally rather than uploaded, so the file stays out of the media library.',
      },
    },
    {
      name: 'captionsUrl',
      type: 'text',
      label: 'Captions URL',
      admin: {
        description:
          'Optional WebVTT captions track. A cross-origin file needs CORS headers, otherwise the browser drops the track silently.',
      },
    },
    {
      name: 'autoplayInView',
      type: 'checkbox',
      label: 'Play automatically when scrolled into view',
      defaultValue: true,
      admin: {
        description:
          'Plays muted when the video enters the viewport and pauses when it leaves. Never autoplays for visitors who have asked for reduced motion, and stops for good once the visitor pauses it themselves.',
      },
    },
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
