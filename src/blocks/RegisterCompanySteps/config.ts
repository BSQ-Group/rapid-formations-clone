import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const RegisterCompanySteps: Block = {
  slug: 'registerCompanySteps',
  interfaceName: 'RegisterCompanyStepsBlock',
  labels: {
    singular: 'Register Company Steps',
    plural: 'Register Company Steps',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Section Title',
    },
    {
      name: 'subtitle',
      type: 'textarea',
      required: true,
      label: 'Section Subtitle',
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 8,
      labels: {
        singular: 'Step',
        plural: 'Steps',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Step Image',
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Step Title',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Step Description',
        },
      ],
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'xl', paddingBottom: 'xl' },
    }),
  ],
}
