import type { GlobalAfterReadHook } from 'payload'
import type { LegalSidenav, Page } from '../../payload-types'

type HookArgs = Parameters<GlobalAfterReadHook>[0]

type Item = NonNullable<LegalSidenav['items']>[number]

const PREFERRED_ORDER: string[] = [
  'id-requirements',
  'complaints',
  'terms-and-conditions',
  'refund-cancellation-policy',
  'privacy-policy',
  'cookies-policy',
  'environmental-policy',
  'whistleblowing-and-grievance',
]

export const hydrateLegalSidenavItems: GlobalAfterReadHook = async ({
  doc,
  req: { payload, context },
}: HookArgs) => {
  if ((context as { disableLegalSidenavSync?: boolean })?.disableLegalSidenavSync) return doc

  const typedDoc = doc as LegalSidenav
  const items: Item[] = typedDoc.items ?? []
  if (items.length > 0) return doc

  const result = await payload.find({
    collection: 'pages',
    where: {
      and: [{ isLegalPage: { equals: true } }, { _status: { equals: 'published' } }],
    },
    select: { id: true, title: true, slug: true },
    limit: 200,
    overrideAccess: true,
  })

  const pages = result.docs as Page[]
  const preferredIndex = (slug: string | null | undefined) => {
    if (!slug) return PREFERRED_ORDER.length
    const idx = PREFERRED_ORDER.indexOf(slug)
    return idx === -1 ? PREFERRED_ORDER.length : idx
  }

  pages.sort((a, b) => {
    const ia = preferredIndex(a.slug)
    const ib = preferredIndex(b.slug)
    if (ia !== ib) return ia - ib
    return (a.title ?? '').localeCompare(b.title ?? '')
  })

  const seeded: Item[] = pages.map((page) => ({
    page: String(page.id),
    hidden: false,
  }))

  if (seeded.length === 0) return doc

  const updated = await payload.updateGlobal({
    slug: 'legalSidenav',
    data: { items: seeded },
    overrideAccess: true,
    context: { disableLegalSidenavSync: true } as never,
  })

  return { ...typedDoc, items: updated.items }
}
