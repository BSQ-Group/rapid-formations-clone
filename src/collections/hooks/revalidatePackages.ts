import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Package } from '../../payload-types'

const nameCheckPath = (slug?: string | null) => (slug ? `/name-check/${slug}` : null)

// /name-check/<slug>/ is prerendered from this collection, so a rename or a
// checkoutPath edit is invisible until its path is revalidated.
export const revalidatePackage: CollectionAfterChangeHook<Package> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  for (const path of new Set([nameCheckPath(doc.slug), nameCheckPath(previousDoc?.slug)])) {
    if (!path) continue
    payload.logger.info(`Revalidating name-check page at path: ${path}`)
    revalidatePath(path)
  }

  return doc
}

export const revalidatePackageDelete: CollectionAfterDeleteHook<Package> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = nameCheckPath(doc?.slug)
    if (path) revalidatePath(path)
  }

  return doc
}
