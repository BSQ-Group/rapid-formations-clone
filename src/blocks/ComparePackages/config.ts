import type { Block } from 'payload'

import { link } from '@/fields/link'
import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const ComparePackages: Block = {
  slug: 'comparePackages',
  interfaceName: 'ComparePackagesBlock',
  labels: {
    singular: 'Compare Packages',
    plural: 'Compare Packages Blocks',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      defaultValue: 'Compare features by plan',
    },
    {
      name: 'description',
      type: 'text',
      defaultValue: 'Easily compare features across all available plans.',
    },
    {
      name: 'featuresLabel',
      type: 'text',
      required: true,
      defaultValue: 'FEATURES',
      admin: {
        description: 'Label shown in the dark header above the feature column.',
      },
    },
    {
      name: 'plans',
      type: 'array',
      required: true,
      minRows: 3,
      maxRows: 3,
      labels: { singular: 'Plan', plural: 'Plans' },
      admin: {
        description: 'Exactly three plans, in the order they should appear left-to-right.',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "£1.99"' },
        },
        {
          name: 'subPrice',
          type: 'text',
          admin: { description: 'e.g. "+ £100 Companies House fee"' },
        },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Use the primary (green) Order button for this plan.',
          },
        },
        link({
          appearances: false,
          disableLabel: false,
          overrides: {
            name: 'button',
            label: 'Order button',
          },
        }),
      ],
    },
    {
      name: 'sections',
      type: 'array',
      required: true,
      minRows: 1,
      labels: { singular: 'Section', plural: 'Sections' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "CORE SERVICES"' },
        },
        {
          name: 'features',
          type: 'array',
          required: true,
          minRows: 1,
          labels: { singular: 'Feature', plural: 'Features' },
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
            },
            {
              name: 'infoText',
              type: 'text',
              label: 'Tooltip Title',
              admin: {
                description: 'Optional heading shown in the info tooltip.',
              },
            },
            {
              name: 'tooltipText',
              type: 'richText',
              editor: defaultLexical,
              label: 'Tooltip Text',
              admin: {
                description:
                  'Optional body text shown in the info tooltip. An info icon appears when either tooltip field is filled.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'inPlan1',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Included in Plan 1',
                  admin: { width: '33%' },
                },
                {
                  name: 'inPlan2',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Included in Plan 2',
                  admin: { width: '33%' },
                },
                {
                  name: 'inPlan3',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Included in Plan 3',
                  admin: { width: '33%' },
                },
              ],
            },
          ],
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'xl' },
    }),
  ],
}
