import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  Payload,
  RequestContext,
} from 'payload'

import { revalidatePath } from 'next/cache'

import type { Page, ScholarshipWinner } from '../../payload-types'

type Breadcrumb = { url: string }

const pagePath = (page: Page): string => {
  if (page.slug === 'home') return '/'
  return (page.breadcrumbs as Breadcrumb[] | undefined)?.at(-1)?.url ?? `/${page.slug}`
}

/**
 * The winners have no page of their own — a block reads them — so editing one has to
 * refresh whichever pages render that block rather than a path of its own. Looking
 * the pages up keeps a second placement working without touching this hook.
 */
const revalidateHostPages = async (payload: Payload, context: RequestContext) => {
  if (context.disableRevalidate) return

  const { docs } = await payload.find({
    collection: 'pages',
    where: { 'layout.blockType': { equals: 'scholarshipProgramme' } },
    depth: 0,
    pagination: false,
    limit: 0,
  })

  for (const page of docs) {
    const path = pagePath(page)
    payload.logger.info(`Revalidating scholarship winners on page: ${path}`)
    revalidatePath(path)
  }
}

export const revalidateScholarshipWinner: CollectionAfterChangeHook<ScholarshipWinner> = async ({
  doc,
  req: { payload, context },
}) => {
  await revalidateHostPages(payload, context)
  return doc
}

export const revalidateScholarshipWinnerDelete: CollectionAfterDeleteHook<
  ScholarshipWinner
> = async ({ doc, req: { payload, context } }) => {
  await revalidateHostPages(payload, context)
  return doc
}
