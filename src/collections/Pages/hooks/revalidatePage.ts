import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Page } from '../../../payload-types'

type Breadcrumb = { url: string }

const getPagePath = (doc: Page): string => {
  if (doc.slug === 'home') return '/'
  const breadcrumbs = doc.breadcrumbs as Breadcrumb[] | undefined
  return breadcrumbs?.at(-1)?.url ?? `/${doc.slug}`
}

export const revalidatePage: CollectionAfterChangeHook<Page> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = getPagePath(doc)

      payload.logger.info(`Revalidating page at path: ${path}`)

      revalidatePath(path)
      revalidateTag('pages-sitemap', 'max')
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = getPagePath(previousDoc)

      payload.logger.info(`Revalidating old page at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('pages-sitemap', 'max')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Page> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = getPagePath(doc)
    revalidatePath(path)
    revalidateTag('pages-sitemap', 'max')
  }

  return doc
}
