import type { Block } from 'payload'

export const TitleBanner: Block = {
  slug: 'titleBanner',
  interfaceName: 'TitleBannerBlock',
  labels: {
    singular: 'Title Banner',
    plural: 'Title Banners',
  },
  fields: [
    {
      name: 'variant',
      type: 'select',
      label: 'Variant',
      defaultValue: 'titleBackground',
      options: [
        { label: 'Title over background image', value: 'titleBackground' },
        { label: 'Image only — bleeds to viewport width', value: 'imageBleed' },
        { label: 'Image only — stays inside the container', value: 'imageContained' },
      ],
      admin: {
        description:
          'The image-only variants ignore the title. They differ below 1170px: one runs edge to edge, the other keeps the page gutters.',
      },
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Title',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'titleBackground',
        description:
          'Line breaks are preserved. Leave blank for a photo-only band with no text over it.',
      },
    },
    {
      name: 'subtitle',
      type: 'textarea',
      label: 'Subtitle',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'titleBackground',
        description: 'Sits under the title. Line breaks are preserved.',
      },
    },
    {
      name: 'badge',
      type: 'text',
      label: 'Badge',
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'titleBackground',
        description: 'Optional cyan pill under the subtitle, e.g. "Only 50p per letter".',
      },
    },
    {
      name: 'hideTextOnMobile',
      type: 'checkbox',
      label: 'Hide the text at 768px and below',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'titleBackground',
        description:
          'The source shows banner text only above 768px on pages that have no mobile title. Leave off to show it at every width.',
      },
    },
    {
      name: 'backdrop',
      type: 'select',
      label: 'Backdrop behind the image',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Dark slate', value: 'dark' },
        { label: 'Mist grey', value: 'mist' },
        { label: 'Pale grey', value: 'pale' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData?.variant !== 'titleBackground',
        description: 'Fills the full-width band either side of the image above 1170px.',
      },
    },
    {
      name: 'naturalHeight',
      type: 'checkbox',
      label: 'Let the image run to its natural height',
      defaultValue: false,
      admin: {
        condition: (_, siblingData) => siblingData?.variant !== 'titleBackground',
        description: 'Unticked the band is cropped to 260px tall.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
      admin: { description: 'Cropped to a 300px-tall full-bleed band, centred.' },
    },
    {
      name: 'isPageTitle',
      type: 'checkbox',
      label: 'Render as the page H1',
      defaultValue: true,
      admin: {
        condition: (_, siblingData) => siblingData?.variant === 'titleBackground',
        description:
          'Leave ticked when the banner carries the page heading. Untick if the page already has an H1 elsewhere.',
      },
    },
  ],
}
