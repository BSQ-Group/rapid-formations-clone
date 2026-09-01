import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type PackagePriceEntry = { slug: string; value: string }

// Tier prices from the `packages` collection, £ stripped (Views render `£{price}`)
// and also keyed by the `-package`-less short form the blocks use (e.g. "basic").
export async function getPackagePriceEntries(): Promise<PackagePriceEntry[]> {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'packages',
    limit: 0,
    depth: 0,
    pagination: false,
    overrideAccess: true,
    select: { slug: true, price: true },
  })

  const entries: PackagePriceEntry[] = []
  for (const doc of docs as { slug?: string | null; price?: string | null }[]) {
    if (!doc?.slug || !doc?.price) continue
    const value = doc.price.replace(/^£/, '')
    entries.push({ slug: doc.slug, value })
    if (doc.slug.endsWith('-package')) {
      entries.push({ slug: doc.slug.slice(0, -'-package'.length), value })
    }
  }
  return entries
}

// slug→value map for the tier blocks (PackageInclusions / RecommendedPackages).
export async function getTierPriceMap(): Promise<Map<string, string>> {
  const entries = await getPackagePriceEntries()
  return new Map(entries.map((entry) => [entry.slug, entry.value]))
}
