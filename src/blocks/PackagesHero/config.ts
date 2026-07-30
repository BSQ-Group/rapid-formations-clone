import type { Block } from 'payload'

export const PackagesHero: Block = {
  slug: 'packagesHero',
  interfaceName: 'PackagesHeroBlock',
  labels: { singular: 'Packages Hero', plural: 'Packages Heroes' },
  fields: [
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
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      minRows: 1,
      maxRows: 8,
      labels: { singular: 'Benefit', plural: 'Benefits' },
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          label: 'Benefit Text',
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image',
    },
    {
      name: 'topCard',
      type: 'group',
      label: 'Floating Card (top-right of image)',
      fields: [
        {
          name: 'iconName',
          type: 'text',
          label: 'Icon Name',
          admin: { description: 'Lucide icon name, e.g. "FileText", "ShieldCheck"' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          admin: { description: 'e.g. "Preparing... Documents"' },
        },
        {
          name: 'detail',
          type: 'text',
          label: 'Detail (inline right of title)',
          admin: { description: 'e.g. "2/4" — shown right of title. Leave blank if using subtitle.' },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          admin: {
            description: 'Second line of text, e.g. "Hassle-Free Compliance". Used when no detail/progress bar.',
          },
        },
        {
          name: 'progressValue',
          type: 'number',
          label: 'Progress Value (0–100)',
          min: 0,
          max: 100,
          admin: { description: 'When set, shows a progress bar below the title row.' },
        },
        {
          name: 'showRedactedLines',
          type: 'checkbox',
          label: 'Show Redacted Lines',
          admin: {
            description:
              'Shows decorative redacted-text bars below the title. Used for the Privacy Package EyeOff card.',
          },
        },
      ],
    },
    {
      name: 'topCardExtra',
      type: 'group',
      label: 'Extra Floating Card (near top-right, smaller)',
      admin: { description: 'Optional second card near the top-right. Hidden on mobile.' },
      fields: [
        {
          name: 'iconName',
          type: 'text',
          label: 'Icon Name',
          admin: { description: 'Lucide icon name, e.g. "Mails"' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'detail',
          type: 'text',
          label: 'Detail (inline right of title)',
          admin: { description: 'e.g. "2/4" — shown right of title. Leave blank if using subtitle.' },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          admin: { description: 'Second line of text. Used when no detail/progress bar.' },
        },
        {
          name: 'progressValue',
          type: 'number',
          label: 'Progress Value (0–100)',
          min: 0,
          max: 100,
          admin: { description: 'When set, shows a progress bar below the title row.' },
        },
      ],
    },
    {
      name: 'bottomCardExtra',
      type: 'group',
      label: 'Extra Floating Card (near bottom-left, smaller)',
      admin: { description: 'Optional second card near the bottom-left.' },
      fields: [
        {
          name: 'iconName',
          type: 'text',
          label: 'Icon Name',
          admin: { description: 'Lucide icon name, e.g. "CircleCheckBig"' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
        },
      ],
    },
    {
      name: 'bottomCard',
      type: 'group',
      label: 'Floating Card (bottom-left of image)',
      fields: [
        {
          name: 'iconName',
          type: 'text',
          label: 'Icon Name',
          admin: { description: 'Lucide icon name, e.g. "CircleCheckBig", "MapPin"' },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          admin: { description: 'e.g. "Bramble & Wick Ltd" or "Covent Garden, London"' },
        },
        {
          name: 'subtitle',
          type: 'text',
          label: 'Subtitle',
          admin: { description: 'e.g. "Reserved at Companies House" or "Registered office active"' },
        },
      ],
    },
  ],
}
