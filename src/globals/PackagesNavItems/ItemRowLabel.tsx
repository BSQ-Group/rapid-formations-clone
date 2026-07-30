'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

type RowData = {
  link?: {
    label?: string | null
    type?: 'reference' | 'custom' | null
    url?: string | null
    reference?: { value?: { slug?: string | null } | string | null } | null
  } | null
}

export default function ItemRowLabel() {
  const { data } = useRowLabel<RowData>()
  const link = data?.link
  const ref = link?.reference?.value
  const slug = typeof ref === 'object' && ref !== null ? ref.slug : undefined
  const fallback = slug || link?.url || 'Tab'
  return <span>{link?.label || fallback}</span>
}
