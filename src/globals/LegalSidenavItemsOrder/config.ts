import type { GlobalConfig } from 'payload'
import { hydrateLegalSidenavItems } from './hydrateItems'

export const LegalSidenavGlobal: GlobalConfig = {
  slug: 'legalSidenav',
  label: 'Legal Sidenav',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description:
      'Order and visibility of legal pages in the sidebar. Pages are added here automatically when you mark them as a legal page on the Pages collection. Drag to reorder; tick "hidden" to keep a page out of the menu without unmarking it as a legal page.',
  },
  hooks: {
    afterRead: [hydrateLegalSidenavItems],
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Items',
      labels: { singular: 'Page', plural: 'Pages' },
      admin: {
        description: 'Auto-synced from Pages where “Is legal page” is ticked.',
        components: {
          RowLabel: '@/globals/LegalSidenavItemsOrder/ItemRowLabel#default',
        },
      },
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            readOnly: true,
            description:
              'Set automatically. To remove a page from this list, untick “Is legal page” on the Pages collection.',
          },
        },
        {
          name: 'hidden',
          type: 'checkbox',
          defaultValue: false,
          label: 'Hidden from sidebar',
          admin: {
            description: 'Keep the page marked as legal but hide it from this menu.',
          },
        },
      ],
    },
  ],
}
