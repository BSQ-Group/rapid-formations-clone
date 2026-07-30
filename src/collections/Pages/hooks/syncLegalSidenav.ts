import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import type { LegalSidenav, Page } from '../../../payload-types'

type Item = NonNullable<LegalSidenav['items']>[number]

function pageIdOf(page: Item['page']): string | null {
  if (!page) return null
  if (typeof page === 'string') return page
  if (typeof page === 'object' && 'id' in page && page.id) return String(page.id)
  return null
}

export const syncLegalSidenavOnChange: CollectionAfterChangeHook<Page> = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context?.disableLegalSidenavSync) return doc

  const wasLegal = Boolean(previousDoc?.isLegalPage)
  const isLegal = Boolean(doc.isLegalPage)

  if (!wasLegal && !isLegal) return doc

  const global = await payload
    .findGlobal({ slug: 'legalSidenav', depth: 0, overrideAccess: true })
    .catch(() => null)
  const items: Item[] = global?.items ?? []
  const docId = String(doc.id)
  const idx = items.findIndex((item) => pageIdOf(item.page) === docId)

  let nextItems = items

  if (isLegal && idx === -1) {
    nextItems = [...items, { page: docId, hidden: false }]
  } else if (!isLegal && idx !== -1) {
    nextItems = items.filter((_, i) => i !== idx)
  } else {
    return doc
  }

  await payload.updateGlobal({
    slug: 'legalSidenav',
    data: { items: nextItems },
    overrideAccess: true,
    context: { disableLegalSidenavSync: true },
  })

  return doc
}

export const syncLegalSidenavOnDelete: CollectionAfterDeleteHook<Page> = async ({
  doc,
  req: { payload, context },
}) => {
  if (context?.disableLegalSidenavSync) return doc
  if (!doc?.isLegalPage) return doc

  const global = await payload
    .findGlobal({ slug: 'legalSidenav', depth: 0, overrideAccess: true })
    .catch(() => null)
  const items: Item[] = global?.items ?? []
  const docId = String(doc.id)
  const nextItems = items.filter((item) => pageIdOf(item.page) !== docId)

  if (nextItems.length === items.length) return doc

  await payload.updateGlobal({
    slug: 'legalSidenav',
    data: { items: nextItems },
    overrideAccess: true,
    context: { disableLegalSidenavSync: true },
  })

  return doc
}
