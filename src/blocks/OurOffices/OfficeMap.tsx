'use client'

import React from 'react'

import { MAPTILER_KEY, useLocationMap } from '@/hooks/useLocationMap'
import { officeMapStyles as s } from './OfficeMap.styles'

export type OfficeMapProps = {
  latitude: number
  longitude: number
  name: string
  address: string
}

export const OfficeMap: React.FC<OfficeMapProps> = ({ latitude, longitude, name, address }) => {
  const container = useLocationMap({
    latitude,
    longitude,
    markerClassName: s.marker,
    popupTitle: name,
    popupBody: address,
  })

  if (!MAPTILER_KEY) return null

  return <div ref={container} className={s.map} role="region" aria-label={`Map showing ${name}`} />
}
