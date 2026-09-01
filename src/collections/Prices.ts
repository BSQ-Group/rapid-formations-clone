import type { CollectionConfig } from 'payload'

import { revalidateTag } from 'next/cache'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

// Flat price registry quoted inside page copy via the [[price slug="..."]]
// shortcode and read by the priced blocks/service cards. Relocated from the
// former `prices` global to a collection so each price gains its own version
// history/audit trail. `getCachedPrices()` reads this under the `prices` tag.
export const Prices: CollectionConfig = {
  slug: 'prices',
  // Audit trail: every save keeps a version (who/when/before→after). No drafts.
  versions: { maxPerDoc: 50 },
  labels: {
    singular: 'Price',
    plural: 'Prices',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    group: 'Commerce',
    useAsTitle: 'slug',
    defaultColumns: ['slug', 'value'],
    description:
      'Prices quoted inside page copy via the [[price slug="..."]] shortcode, and read by the priced service cards, renewal and address blocks. Changing a value here updates every place that quotes it. Package-tier prices live on the Packages collection instead.',
  },
  defaultSort: 'slug',
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'slug',
          type: 'text',
          label: 'Slug',
          required: true,
          unique: true,
          index: true,
          admin: {
            width: '50%',
            description: 'What the shortcode / price slug references, e.g. "vat-registration".',
          },
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          required: true,
          admin: {
            width: '50%',
            description: 'Without the £, trailing zeros kept — e.g. 100.00. Rendered after a £ sign.',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, req: { context } }) => {
        if (!context?.disableRevalidate) revalidateTag('prices', 'max')
        return doc
      },
    ],
    afterDelete: [
      ({ doc, req: { context } }) => {
        if (!context?.disableRevalidate) revalidateTag('prices', 'max')
        return doc
      },
    ],
  },
}

export default Prices
