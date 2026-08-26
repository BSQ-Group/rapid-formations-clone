import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const HowItWorksScreens: Block = {
  slug: 'howItWorksScreens',
  interfaceName: 'HowItWorksScreensBlock',
  labels: {
    singular: 'How It Works — Screens',
    plural: 'How It Works — Screens',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
      defaultValue: 'How it works',
    },
    {
      name: 'chrome',
      type: 'checkbox',
      label: 'Frame each screen in a browser window',
      defaultValue: true,
      admin: {
        description:
          'Unticked the screenshot sits on its own with rounded corners and no title bar.',
      },
    },
    {
      name: 'screens',
      type: 'array',
      label: 'Screens',
      labels: { singular: 'Screen', plural: 'Screens' },
      required: true,
      minRows: 1,
      admin: {
        initCollapsed: true,
        description:
          'One column each from 768px up, stacked below that. Three is the number both source pages use.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Screenshot',
          required: true,
        },
        {
          name: 'caption',
          type: 'textarea',
          label: 'Caption',
          required: true,
          admin: { description: 'Centred under the screen. Line breaks are preserved.' },
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
