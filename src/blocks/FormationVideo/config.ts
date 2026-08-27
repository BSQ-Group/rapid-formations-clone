import type { Block, TextFieldSingleValidation } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

const requiredWithoutHeading: TextFieldSingleValidation = (value, { siblingData }) => {
  const heading = (siblingData as { heading?: string | null } | undefined)?.heading
  if (typeof value === 'string' && value.trim()) return true
  if (typeof heading === 'string' && heading.trim()) return true
  return 'With no heading this is the only name the video has — enter one.'
}

export const FormationVideo: Block = {
  slug: 'formationVideo',
  interfaceName: 'FormationVideoBlock',
  labels: { singular: 'Formation Video', plural: 'Formation Videos' },
  fields: [
    {
      name: 'heading',
      type: 'text',
      admin: {
        description:
          'Centred heading above the video still. Newlines are preserved, so a deliberate line break can be typed in. Leave blank for a bare still with nothing above it.',
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
      name: 'videoTitle',
      type: 'text',
      label: 'Video title',
      validate: requiredWithoutHeading,
      admin: {
        description:
          'Names the video for screen readers — it labels the play button and titles the dialog. Leave blank to use the heading. Required when there is no heading, because nothing else names the video.',
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
      name: 'stillWidth',
      type: 'select',
      label: 'Still width',
      required: true,
      defaultValue: 'capped',
      options: [
        { label: 'Capped — full width, but never wider than 640px from 1023px', value: 'capped' },
        { label: 'Inset — 85% of the container from 768px, with rounded corners', value: 'inset' },
      ],
      admin: {
        description:
          'Capped is the home page treatment. Inset matches the standalone video the service pages drop between sections — it stays full width on mobile and pulls in to 85% from 768px.',
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
      gap: true,
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
