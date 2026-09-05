import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

/** `/name-check/basic-package/` → `basic-package`. Null for any other href. */
export function nameCheckSlug(href?: string | null): string | null {
  if (!href) return null
  const path = (href.split('?')[0] ?? '').replace(/\/+$/, '')
  const match = path.match(/^\/name-check\/([a-z0-9-]+)$/)
  return match?.[1] ?? null
}

/**
 * slug → checkoutPath for every package. Cannot be derived from the slug: Limited by
 * Guarantee and LLP check out at paths that don't match theirs.
 *
 * `cache` dedupes concurrent callers within one render, `unstable_cache` across
 * them. Without the outer wrap, N calls started in the same tick all miss the cold
 * cache and each runs its own query.
 */
export const getCheckoutPaths = cache(
  unstable_cache(
    async (): Promise<Record<string, string>> => {
      const payload = await getPayload({ config: configPromise })
      const { docs } = await payload.find({
        collection: 'packages',
        limit: 100,
        pagination: false,
        select: { slug: true, checkoutPath: true },
      })

      return Object.fromEntries(
        docs.flatMap((doc) => (doc.slug && doc.checkoutPath ? [[doc.slug, doc.checkoutPath]] : [])),
      )
    },
    ['name-check-checkout-paths'],
    { tags: ['packages'] },
  ),
)

/** The checkoutPath a name-check href leads to, or null if it isn't one. */
export async function checkoutPathFor(href?: string | null): Promise<string | null> {
  const slug = nameCheckSlug(href)
  if (!slug) return null
  return (await getCheckoutPaths())[slug] ?? null
}
