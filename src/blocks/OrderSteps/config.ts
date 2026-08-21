import type { Block } from 'payload'

import { sectionLayoutField } from '@/fields/sectionLayout'

export const OrderSteps: Block = {
  slug: 'orderSteps',
  interfaceName: 'OrderStepsBlock',
  labels: {
    singular: 'Order Steps',
    plural: 'Order Steps',
  },
  fields: [
    {
      name: 'currentStep',
      type: 'number',
      label: 'Current step',
      required: true,
      defaultValue: 1,
      min: 1,
      max: 4,
      admin: {
        description:
          '1 Choose Company Name, 2 Select Package, 3 Checkout & Pay, 4 Enter Company Details.',
      },
    },
    sectionLayoutField({
      gap: true,
      defaults: { background: 'light', paddingTop: 'none', paddingBottom: 'none' },
    }),
  ],
}
