import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const FormationVideo: Block = {
  slug: 'formationVideo',
  interfaceName: 'FormationVideoBlock',
  labels: { singular: 'Formation Video', plural: 'Formation Videos' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: {
        description:
          'Centred heading above the video still. Newlines are preserved, so a deliberate line break can be typed in.',
      },
    },
    {
      name: 'subheading',
      type: 'text',
      admin: {
        description: 'Optional centred line under the heading. Leave blank to drop it entirely.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Video still. Landscape, and it is the whole clickable target — set the alt text on the media item, because that is what a screen reader announces. With no still the section renders as heading and subheading only.',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      required: true,
      admin: {
        description:
          'Player embed URL (Vimeo/YouTube) or a direct .mp4 file URL. An embed URL opens in an iframe, a file URL in a native player.',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Enter the video URL.'
        if (/^https?:\/\/\S+$/.test(value)) return true
        return 'Enter a full URL starting with https:// — a bare file name or video ID will not play.'
      },
    },
    {
      name: 'showPlayIcon',
      type: 'checkbox',
      label: 'Overlay a play icon',
      defaultValue: false,
      admin: {
        description:
          'Leave off when the still already has a play button in the artwork, which is the case on the home page. Turn it on for a still that does not.',
      },
    },
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
