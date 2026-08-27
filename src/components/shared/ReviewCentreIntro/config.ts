import type { Block } from 'payload'

export const ReviewCentreIntro: Block = {
  slug: 'reviewCentreIntro',
  interfaceName: 'ReviewCentreIntroBlock',
  labels: {
    singular: 'Review Centre Intro',
    plural: 'Review Centre Intros',
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      required: true,
      admin: {
        description:
          'Fills the band behind the text, cropped to centre. Its alt text comes from the media item.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'isPageTitle',
      type: 'checkbox',
      label: 'Render as the page H1',
      defaultValue: true,
      admin: {
        description: 'Untick when something above already carries the H1.',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      admin: { description: 'Sits under the title. Line breaks are preserved.' },
    },
    {
      name: 'body',
      type: 'textarea',
      label: 'Body',
      admin: {
        description:
          'Runs at 85% of the content width so it wraps ahead of the title. Line breaks are preserved.',
      },
    },
  ],
}
