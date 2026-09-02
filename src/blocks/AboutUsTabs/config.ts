import type { ArrayFieldValidation, Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'
import { AboutUsContent } from '@/blocks/AboutUsContent/config'
import { MagicNumbers } from '@/blocks/MagicNumbers/config'
import { MeetTheTeam } from '@/blocks/MeetTheTeam/config'
import { OurOffices } from '@/blocks/OurOffices/config'
import { RegisterCtaPanel } from '@/blocks/RegisterCtaPanel/config'
import { StaffReviews } from '@/blocks/StaffReviews/config'

const atMostOnePageTitle: ArrayFieldValidation = (value) => {
  if (!Array.isArray(value)) return true
  const ticked = value.filter((row) => (row as { isPageTitle?: unknown }).isPageTitle).length
  return ticked > 1 ? `Only one tab can carry the page h1 — ${ticked} tabs are ticked.` : true
}

export const AboutUsTabs: Block = {
  slug: 'aboutUsTabs',
  interfaceName: 'AboutUsTabsBlock',
  labels: { singular: 'About Us Tabs', plural: 'About Us Tabs' },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      minRows: 1,
      validate: atMostOnePageTitle,
      admin: {
        initCollapsed: true,
        description:
          'One tab each, in this order. The heading above the tab strip is the selected tab’s title.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
              admin: { width: '50%', description: 'The word on the tab itself.' },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: { width: '50%', description: 'The heading shown above the tabs.' },
            },
          ],
        },
        {
          name: 'isPageTitle',
          type: 'checkbox',
          label: 'This tab’s title is the page h1',
          defaultValue: false,
          admin: {
            description:
              'Tick on one tab when this block supplies the page heading — the heading then renders as an h1 whichever tab is open, so the page always has exactly one. Leave every tab unticked when the page h1 comes from elsewhere; the heading renders as an h2.',
          },
        },
        {
          name: 'content',
          type: 'blocks',
          label: 'Panel content',
          blocks: [
            AboutUsContent,
            MagicNumbers,
            MeetTheTeam,
            OurOffices,
            RegisterCtaPanel,
            StaffReviews,
          ],
          admin: {
            initCollapsed: true,
            description: 'Rendered in order inside this tab’s panel.',
          },
        },
      ],
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none', gap: 'section' },
    }),
  ],
}
