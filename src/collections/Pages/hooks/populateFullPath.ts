import type { CollectionBeforeChangeHook } from 'payload'
import type { Page } from '../../../payload-types'

export const populateFullPath: CollectionBeforeChangeHook<Page> = ({ data }) => {
  const breadcrumbs = data.breadcrumbs as Array<{ url: string }> | undefined
  data.fullPath = breadcrumbs?.at(-1)?.url ?? (data.slug ? `/${data.slug}` : null)
  return data
}
