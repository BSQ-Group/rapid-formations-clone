import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const SearchCTA: Block = {
  // Slug kept as 'packagesCTA' for backward-compat with existing CMS records.
  // Folder and interface renamed in CORE-3270 to reuse the block on the homepage.
  slug: 'packagesCTA',
  interfaceName: 'SearchCTABlock',
  labels: { singular: 'Search CTA', plural: 'Search CTAs' },
  fields: [
    {
      name: 'textTheme',
      type: 'select',
      label: 'Text Theme',
      defaultValue: 'light',
      options: [
        { label: 'Light text (for dark image backgrounds)', value: 'light' },
        { label: 'Dark text (for light image backgrounds)', value: 'dark' },
      ],
      admin: {
        description:
          'Light = white text on a dark photo (existing pricing-page behaviour). Dark = black text for light/gradient backgrounds (homepage style).',
      },
    },
    {
      name: 'trustPillText',
      type: 'text',
      label: 'Trust Pill Text (tablet+)',
      defaultValue: '350,000+ UK companies formed · Rated Excellent on Trustpilot',
    },
    {
      name: 'trustPillTextMobile',
      type: 'text',
      label: 'Trust Pill Text (mobile)',
      defaultValue: '350,000+ UK companies formed',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      defaultValue: 'Check your name and apply in minutes.',
    },
    {
      name: 'inputPlaceholder',
      type: 'text',
      label: 'Input Placeholder',
      defaultValue: 'Enter company name',
    },
    {
      name: 'submitButtonText',
      type: 'text',
      label: 'Submit Button Text',
      defaultValue: 'Check availability',
    },
    {
      name: 'searchActionUrl',
      type: 'text',
      label: 'Search Action URL',
      admin: {
        description: 'URL to navigate to when the user submits the company name (e.g. /search?q=)',
      },
    },
    {
      name: 'footerNote',
      type: 'text',
      label: 'Footer Note',
      defaultValue: 'Free name check  ·  Certified B Corp',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      admin: {
        description:
          'Optional. If omitted, the card renders with a CSS gradient (intended for the dark-text / light-card variant).',
      },
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
