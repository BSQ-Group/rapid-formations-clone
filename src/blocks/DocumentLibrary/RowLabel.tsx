'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

type RowData = { title?: string | null; name?: string | null }

export default function DocumentLibraryRowLabel() {
  const { data, rowNumber } = useRowLabel<RowData>()
  const label = (data?.title || data?.name)?.trim()
  return <span>{label || `Row ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`}</span>
}
