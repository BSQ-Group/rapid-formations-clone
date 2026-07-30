import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const HeroStepper: Block = {
  slug: 'heroStepper',
  interfaceName: 'HeroStepperBlock',
  labels: { singular: 'Hero Stepper', plural: 'Hero Steppers' },
  fields: [
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      labels: { singular: 'Step', plural: 'Steps' },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Step Label',
        },
      ],
    },
    {
      name: 'currentStep',
      type: 'number',
      required: true,
      label: 'Current Step',
      admin: {
        description: 'Which step is currently active (1-indexed). E.g. 2 means step 2 is active.',
      },
    },
    sectionLayoutField({
      defaults: { background: 'light', paddingTop: 'xs', paddingBottom: 'xs' },
    }),
  ],
}
