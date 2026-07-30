'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

type RowData = {
  page?: { title?: string | null; slug?: string | null } | string | null
  hidden?: boolean | null
}

export default function ItemRowLabel() {
  const { data } = useRowLabel<RowData>()
  const page = data?.page
  const pageLabel =
    typeof page === 'object' && page !== null
      ? page.title || page.slug || 'Page'
      : typeof page === 'string'
        ? page
        : 'Page'

  return (
    <span>
      {pageLabel}
      {data?.hidden ? ' — hidden' : ''}
    </span>
  )
}
