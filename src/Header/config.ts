import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

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
      fields: [
        link({
          appearances: false,
        }),
        {
          name: 'megaMenuCategories',
          type: 'array',
          label: 'Mega Menu Categories',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Category Title',
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
          admin: {
            initCollapsed: true,
            description:
              'If populated, this nav item will show a mega menu dropdown on desktop and a sub-menu on mobile',
          },
        },
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        description: 'Primary navigation links (left side)',
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'secondaryNavItems',
      type: 'array',
      label: 'Secondary Navigation',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 4,
      admin: {
        initCollapsed: true,
        description: 'Secondary links (right side, e.g. Blog, About)',
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
