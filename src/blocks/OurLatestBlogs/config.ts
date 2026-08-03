import type { Block } from 'payload'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const OurLatestBlogs: Block = {
  slug: 'ourLatestBlogs',
  interfaceName: 'OurLatestBlogsBlock',
  labels: {
    singular: 'Our Latest Blogs',
    plural: 'Our Latest Blogs',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Section Heading',
      admin: {
        description: 'Centred heading above the grid. Newlines are preserved as line breaks.',
      },
    },
    {
      name: 'cardCtaLabel',
      type: 'text',
      defaultValue: 'Read Post',
      label: 'Card Button Label',
      admin: {
        description: 'Label on the button inside every article card.',
      },
    },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Article', plural: 'Articles' },
      admin: {
        initCollapsed: true,
        description:
          'Editorial fallback. Used only when the brand blog feed cannot be reached at render time.',
      },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'textarea', required: true, label: 'Description' },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
        link({ disableLabel: true, appearances: false }),
      ],
    },
    link({
      disableLabel: false,
      appearances: false,
      overrides: { name: 'viewBlogLink', label: 'View Blog Button' },
    }),
    sectionLayoutField({
      defaults: { background: 'inverse', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
