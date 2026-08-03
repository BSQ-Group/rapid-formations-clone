import type { GlobalConfig, Field } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

const navItemFields: Field[] = [
  link({
    appearances: false,
  }),
  {
    name: 'icon',
    type: 'select',
    label: 'Leading icon',
    defaultValue: 'none',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Lock', value: 'lock' },
    ],
    admin: {
      description: 'Small glyph before the label. The legacy site uses the lock on Login.',
    },
  },
  {
    name: 'dropdownColumns',
    type: 'array',
    label: 'Dropdown Columns',
    fields: [
      {
        name: 'heading',
        type: 'text',
        label: 'Column Heading',
        admin: {
          description: 'Optional. Only the Company Formation dropdown uses headings.',
        },
      },
      {
        name: 'links',
        type: 'array',
        label: 'Links',
        fields: [
          link({
            appearances: false,
          }),
        ],
        maxRows: 12,
        admin: {
          initCollapsed: true,
          components: {
            RowLabel: '@/Header/RowLabel#RowLabel',
          },
        },
      },
    ],
    maxRows: 3,
    admin: {
      initCollapsed: true,
      description:
        'If populated, this nav item becomes a dropdown. One column stacks; two or three lay out side by side from 768px.',
    },
  },
  link({
    appearances: false,
    optional: true,
    overrides: {
      name: 'dropdownCta',
      label: 'Dropdown Call To Action',
      admin: {
        description:
          'Optional uppercase link shown under the dropdown columns on desktop and above them on mobile.',
      },
    },
  }),
]

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      label: 'Main Navigation',
      fields: navItemFields,
      maxRows: 8,
      admin: {
        initCollapsed: true,
        description: 'Primary navigation links (left of the nav row)',
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'secondaryNavItems',
      type: 'array',
      label: 'Secondary Navigation',
      fields: navItemFields,
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Secondary links (right of the nav row, e.g. Help Centre, Resources, Login)',
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'accountLinks',
      type: 'array',
      label: 'Account Dropdown Links',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 8,
      admin: {
        initCollapsed: true,
        description:
          'Links shown in the account dropdown (desktop) and account sub-panel (mobile) when logged in',
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    link({
      appearances: false,
      optional: true,
      overrides: {
        name: 'loginLink',
        label: 'Login Button',
      },
    }),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
