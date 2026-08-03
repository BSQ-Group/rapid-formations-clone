import type { Block } from 'payload'

import { link } from '@/fields/link'

export const LandingHero: Block = {
  slug: 'landingHero',
  interfaceName: 'LandingHeroBlock',
  labels: {
    singular: 'Landing Hero',
    plural: 'Landing Heroes',
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow Text',
      defaultValue: 'COMPANY FORMATION',
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Benefits',
      minRows: 1,
      maxRows: 5,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'searchPlaceholder',
      type: 'text',
      label: 'Search Placeholder',
      defaultValue: 'Find your perfect company name',
    },
    link({
      appearances: false,
      overrides: {
        name: 'pricingLink',
        label: 'Pricing Link',
      },
    }),
    link({
      appearances: false,
      overrides: {
        name: 'packagesLink',
        label: 'Packages Link (shown as "Choose a Package" after a successful name check)',
      },
    }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    {
      name: 'mobileBadge',
      type: 'upload',
      relationTo: 'media',
      label: 'Mobile Badge',
      admin: {
        description:
          'Small centred badge above the headline, shown ONLY below 768px — the source puts the B Corp mark here, where the desktop accreditation strip is hidden. Set the alt text on the media item.',
      },
    },
    {
      type: 'group',
      name: 'illustration',
      label: 'Illustration',
      admin: {
        description:
          'Looping, muted video shown to the right of the headline. Desktop only — hidden below 1200px, matching the source, which renders nothing there rather than shrinking it.',
      },
      fields: [
        {
          name: 'video',
          type: 'upload',
          relationTo: 'media',
          label: 'Video (WebM)',
          admin: { description: 'Played by Chrome and Firefox. Leave empty to hide the column.' },
        },
        {
          name: 'videoFallback',
          type: 'upload',
          relationTo: 'media',
          label: 'Video (MP4 fallback)',
          admin: {
            description:
              'Safari cannot play WebM. Offered as a second <source>, so the browser picks for itself — the source site sniffs the user agent instead, which misreports on Chromium-based browsers and every new release.',
          },
        },
        {
          name: 'poster',
          type: 'upload',
          relationTo: 'media',
          label: 'Poster Image',
          admin: { description: 'Shown while the video loads, and to anyone who blocks autoplay.' },
        },
      ],
    },
    {
      name: 'accreditations',
      type: 'array',
      label: 'Accreditations',
      maxRows: 3,
      admin: {
        initCollapsed: true,
        description:
          'Logo strip pinned to the top-right of the hero (e.g. "Part of" + BSQ group, B Corp). Desktop only — hidden below xl, matching the source design.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Prefix Label',
          admin: {
            description:
              'Optional text shown before the logo, e.g. "Part of". Leave blank for a logo on its own.',
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'size',
          type: 'select',
          label: 'Logo Size',
          defaultValue: 'sm',
          options: [
            { label: 'Small (badge)', value: 'sm' },
            { label: 'Large (wordmark)', value: 'lg' },
          ],
        },
        link({
          appearances: false,
          disableLabel: true,
          optional: true,
        }),
      ],
    },
    {
      type: 'group',
      name: 'bankCards',
      label: 'Free Business Bank Accounts',
      admin: {
        description: 'Strip of partner bank cards shown at the foot of the hero.',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Heading',
          defaultValue: 'Set up your company today and get a free business bank account',
        },
        {
          name: 'banks',
          type: 'array',
          label: 'Banks',
          maxRows: 12,
          admin: { initCollapsed: true },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: { description: 'Rendered at 32x32.' },
            },
            {
              name: 'brandColour',
              type: 'text',
              label: 'Brand Colour',
              required: true,
              admin: {
                description:
                  'CSS colour for the card background, e.g. #4DAFEA. This is per-bank brand data, so it is stored as content rather than a theme token.',
              },
            },
            {
              name: 'backgroundImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Background Pattern',
            },
            link({
              appearances: false,
              disableLabel: true,
              optional: true,
            }),
          ],
        },
      ],
    },
    {
      name: 'reviewCards',
      type: 'array',
      label: 'Review Cards',
      maxRows: 3,
      admin: {
        initCollapsed: true,
        description:
          'Review provider cards shown beneath the name search (e.g. Google, Trustpilot).',
      },
      fields: [
        {
          name: 'provider',
          type: 'text',
          label: 'Provider Name',
          required: true,
          admin: { description: 'Used for the logo alt text and the link label, e.g. "Google".' },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: 'Provider Logo',
          required: true,
        },
        {
          name: 'score',
          type: 'text',
          label: 'Score',
          required: true,
          admin: { description: 'e.g. "4.9"' },
        },
        {
          name: 'maxScore',
          type: 'text',
          label: 'Maximum Score',
          defaultValue: '5.0',
        },
        {
          name: 'reviewCount',
          type: 'text',
          label: 'Review Count',
          required: true,
          admin: { description: 'e.g. "1,429"' },
        },
        link({
          appearances: false,
          disableLabel: true,
          optional: true,
        }),
      ],
    },
  ],
}
