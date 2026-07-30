import type { Block } from 'payload'
import { link } from '@/fields/link'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ServicesCTA: Block = {
  slug: 'servicesCTA',
  interfaceName: 'ServicesCTABlock',
  labels: { singular: 'Services CTA', plural: 'Services CTAs' },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      label: 'Description',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'trustPillBoldPrefix',
          type: 'text',
          label: 'Trust Pill Bold Text',
          admin: {
            width: '50%',
            description: 'e.g. "350,000+ UK"',
          },
        },
        {
          name: 'trustPillText',
          type: 'text',
          label: 'Trust Pill Text (tablet+)',
          admin: {
            width: '50%',
            description: 'e.g. "companies formed · Rated Excellent on Trustpilot"',
          },
        },
      ],
    },
    {
      name: 'trustPillTextMobile',
      type: 'text',
      label: 'Trust Pill Text (mobile)',
      admin: {
        description: 'Shorter text shown only on mobile, e.g. "companies formed"',
      },
    },
    link({
      overrides: {
        name: 'ctaLink',
        label: 'CTA Button',
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        description: 'Green gradient background image for the CTA card',
      },
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'l', paddingBottom: 'l' },
    }),
  ],
}
