import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const BCorpCertification: Block = {
  slug: 'bCorpCertification',
  interfaceName: 'BCorpCertificationBlock',
  labels: { singular: 'B Corp Certification', plural: 'B Corp Certifications' },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'badge',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
