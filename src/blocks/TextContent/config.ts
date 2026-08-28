import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const TextContent: Block = {
  slug: 'textContent',
  interfaceName: 'TextContentBlock',
  labels: {
    singular: 'Text Content',
    plural: 'Text Content',
  },
  fields: [
    {
      name: 'body',
      type: 'richText',
      required: true,
      editor: defaultLexical,
      label: 'Body',
      admin: {
        description:
          'Long-form body copy. H3 is a numbered top-level section ("1. Introduction"), H4 a subsection ("3.1 Compliance"). Numbering is authored manually.',
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: 'icon',
          type: 'select',
          label: 'List icon',
          defaultValue: 'none',
          options: [
            { label: 'None — standard bullet', value: 'none' },
            { label: 'Chevron', value: 'chevron' },
            { label: 'Check', value: 'check' },
          ],
          admin: {
            width: '50%',
            description: 'Replaces the bullet on every unordered list item in this block.',
          },
        },
        {
          name: 'iconColour',
          type: 'select',
          label: 'Icon colour',
          defaultValue: 'inherit',
          options: [
            { label: 'Inherit body colour', value: 'inherit' },
            { label: 'Check green', value: 'green' },
            { label: 'Success green', value: 'success' },
            { label: 'Subtle grey', value: 'subtle' },
          ],
          admin: {
            width: '50%',
            condition: (_, siblingData) => siblingData?.icon !== 'none',
          },
        },
      ],
    },
    {
      name: 'inlineImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Inline image',
      admin: {
        description:
          'Optional. A logo or badge sitting under this block’s first heading, the way the source places a partner mark above the copy. Set the alt text on the media item.',
      },
    },
    {
      name: 'inlineImageWidth',
      type: 'number',
      label: 'Inline image width (px)',
      defaultValue: 150,
      min: 16,
      max: 640,
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.inlineImage),
        description: 'Rendered width. The source uses 150px.',
      },
    },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'standard',
      label: 'Typography variant',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Page sections (site baseline headings, 21px H3)', value: 'pageSections' },
        { label: 'Banking sections (23px H2, tight list inset)', value: 'bankingSections' },
        { label: 'Package copy (24px H2, 18px H3, numbered footnote)', value: 'packageCopy' },
        { label: 'Policy (lettered lists, wider section spacing)', value: 'policy' },
        { label: 'Numbered clauses (1., 3.1., 3.1.1.)', value: 'numbered' },
        { label: 'Terms (clause numbering typed into the text)', value: 'terms' },
        { label: 'Cookies policy (narrow measure, boxed paragraphs)', value: 'cookies' },
      ],
      admin: {
        description:
          'Standard matches the default long-form body. Page sections carries the site baseline heading sizes the renewals page uses. Policy carries the page-scoped overrides the Environmental Policy page uses. Numbered clauses renders the multi-level counter numbering the Whistleblowing policy uses. Cookies policy narrows the measure and boxes the paragraphs that name a cookie.',
      },
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'l' },
    }),
  ],
}
