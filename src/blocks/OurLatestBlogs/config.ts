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
    { name: 'heading', type: 'text', required: true, label: 'Section Heading' },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Article', plural: 'Articles' },
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true, label: 'Title' },
        { name: 'description', type: 'textarea', required: true, label: 'Description' },
        { name: 'readTime', type: 'text', label: 'Read time (e.g. 3m)' },
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
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
