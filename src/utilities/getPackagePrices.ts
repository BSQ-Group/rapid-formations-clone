import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { getCachedPrices } from './getPrices'

export type PackagePriceEntry = { slug: string; value: string }

// Package-tier prices single-sourced from the `packages` collection so the
// PackageInclusions / RecommendedPackages blocks read the same value shown on
// the compare grids. `Packages.price` is stored WITH the £ (e.g. "£2.99"); the
// block Views render `£{price}`, so we return the bare number. We also expose
// each package under its slug with a trailing `-package` stripped, because the
// blocks reference tiers by the short form (e.g. "basic" -> "basic-package").
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

// Lookup used by the tier blocks (PackageInclusions / RecommendedPackages):
// package-collection prices take precedence, with the prices collection as a
// fallback so an unrecognised slug still resolves rather than blanking.
export async function getTierPriceMap(): Promise<Map<string, string>> {
  const [pkgEntries, priceItems] = await Promise.all([getPackagePriceEntries(), getCachedPrices()()])
  const map = new Map<string, string>()
  for (const item of priceItems) map.set(item.slug, item.value)
  for (const entry of pkgEntries) map.set(entry.slug, entry.value)
  return map
}
