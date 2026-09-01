import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

export type PriceItem = { slug: string; value: string }

// Single source for the flat price registry (formerly the `prices` global,
// now the `prices` collection). Cached under the `prices` tag, which the
// collection's afterChange/afterDelete hooks revalidate on edit.
async function getPrices(): Promise<PriceItem[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'prices',
    limit: 0,
    depth: 0,
    pagination: false,
    overrideAccess: true,
    select: { slug: true, value: true },
  })
  return (docs as PriceItem[]).filter((d) => Boolean(d?.slug) && Boolean(d?.value))
}

export const getCachedPrices = () =>
  unstable_cache(getPrices, ['prices'], { tags: ['prices'] })
