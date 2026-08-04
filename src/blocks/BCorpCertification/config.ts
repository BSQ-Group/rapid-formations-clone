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
      admin: {
        description:
          'Full-bleed photograph behind the badge. A dark scrim is laid over it automatically, so pick for composition rather than contrast.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      admin: {
        description:
          'Short line over the photo, e.g. "Rapid Formations, Covent Garden HQ." Leave empty to show the badge alone.',
      },
    },
    {
      name: 'badge',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Certification badge. Its alt text is what a screen reader announces — set that on the media item.',
      },
    },
    {
      name: 'badgeUrl',
      type: 'text',
      admin: {
        description:
          'Optional. Where the badge links, e.g. the B Corp directory listing. External links open in a new tab.',
      },
    },
    {
      name: 'badgeLinkTitle',
      type: 'text',
      admin: {
        description:
          'Optional tooltip for the badge link, e.g. "View Rapid Formations on the B Corporation website".',
        condition: (_, siblingData) => Boolean(siblingData?.badgeUrl),
      },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
