import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const VideoLibrary: Block = {
  slug: 'videoLibrary',
  interfaceName: 'VideoLibraryBlock',
  labels: {
    singular: 'Video Library',
    plural: 'Video Libraries',
  },
  fields: [
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
