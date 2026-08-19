'use client'

import { useRowLabel } from '@payloadcms/ui'
import React from 'react'

type RowData = {
  customerName?: string | null
  quote?: string | null
}

export default function ItemRowLabel() {
  const { data } = useRowLabel<RowData>()
  const name = data?.customerName?.trim()
  const quote = data?.quote?.trim()
  return <span>{name || quote?.slice(0, 40) || 'Testimonial'}</span>
}
