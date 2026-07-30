import type { CollectionBeforeChangeHook } from 'payload'
import type { Page } from '../../../payload-types'

// Stores the current page's own full URL as a flat, indexed field so queries
// can target exactly this document without matching ancestor breadcrumb entries
// that appear identically in deeper pages.
export const populateFullPath: CollectionBeforeChangeHook<Page> = ({ data }) => {
  const breadcrumbs = data.breadcrumbs as Array<{ url: string }> | undefined
  data.fullPath = breadcrumbs?.at(-1)?.url ?? (data.slug ? `/${data.slug}` : null)
  return data
}
