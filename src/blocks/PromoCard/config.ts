import type { Block } from 'payload'

import { defaultLexical } from '@/fields/defaultLexical'
import { sectionLayoutField } from '@/fields/sectionLayout'

export const PromoCard: Block = {
  slug: 'promoCard',
  interfaceName: 'PromoCardBlock',
  labels: {
    singular: 'Promo Card',
    plural: 'Promo Cards',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: defaultLexical,
      label: 'Description',
      required: true,
      admin: {
        description:
          'Body copy. Bold any inline values (e.g. the price) using the rich text editor.',
      },
    },
    {
      name: 'addLabel',
      type: 'text',
      label: 'Price prefix',
      admin: {
        description: 'Small label above the price. Defaults to "Add".',
      },
    },
    {
      name: 'price',
      type: 'text',
      label: 'Price',
      required: true,
    },
    {
      name: 'priceCaption',
      type: 'text',
      label: 'Price caption',
      admin: {
        description: 'Small caption below the price. Defaults to "at the checkout".',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background image',
      required: true,
      admin: {
        description: 'Decorative card background (Figma gradient export).',
      },
    },
    sectionLayoutField({
      defaults: { background: 'dark', paddingTop: 's', paddingBottom: 's' },
    }),
  ],
}
