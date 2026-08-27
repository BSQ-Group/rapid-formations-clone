import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'
import { AboutUsContent } from '@/blocks/AboutUsContent/config'
import { MagicNumbers } from '@/blocks/MagicNumbers/config'
import { OurOffices } from '@/blocks/OurOffices/config'
import { RegisterCtaPanel } from '@/blocks/RegisterCtaPanel/config'

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
              'Tick on exactly one tab. Every other tab renders its title as an h2, so the page keeps a single h1.',
          },
        },
        {
          name: 'content',
          type: 'blocks',
          label: 'Panel content',
          blocks: [AboutUsContent, MagicNumbers, OurOffices, RegisterCtaPanel],
          admin: {
            initCollapsed: true,
            description:
              'Rendered in order inside this tab’s panel. Meet The Team and Staff Reviews join this list once those blocks exist.',
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
