import type { Block } from 'payload'
import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const LegalSidenav: Block = {
  slug: 'legalSidenav',
  interfaceName: 'LegalSidenavBlock',
  labels: { singular: 'Legal Sidenav', plural: 'Legal Sidenavs' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: defaultLexical,
      label: 'Page Content',
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 's', paddingBottom: 'xs' },
    }),
  ],
}
