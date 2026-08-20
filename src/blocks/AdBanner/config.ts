import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const AdBanner: Block = {
  slug: 'adBanner',
  interfaceName: 'AdBannerBlock',
  labels: {
    singular: 'Ad Banner',
    plural: 'Ad Banners',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      required: true,
    },
    {
      name: 'body',
      type: 'richText',
      editor: defaultLexical,
      label: 'Body',
      required: true,
    },
    link({
      appearances: false,
      overrides: {
        name: 'cta',
        label: 'Call to action',
        admin: {
          description:
            'Rendered with a leading phone icon. The source uses a tel: link, e.g. "tel:+442078719990" labelled "020 7871 9990".',
        },
      },
    }),
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
