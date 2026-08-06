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
      name: 'title',
      type: 'textarea',
      label: 'Title',
      admin: {
        description:
          'Line breaks are preserved. Leave blank for a photo-only band with no text over it.',
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
        description:
          'Leave ticked when the banner carries the page heading. Untick if the page already has an H1 elsewhere.',
      },
    },
  ],
}
