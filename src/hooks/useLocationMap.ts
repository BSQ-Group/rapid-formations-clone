'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { Map, Marker, NavigationControl, Popup } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export const MAPTILER_KEY = process.env.NEXT_PUBLIC_MAPTILER_KEY

const styleUrl = (key: string) => `https://api.maptiler.com/maps/streets/style.json?key=${key}`

interface UseLocationMapOptions {
  latitude: number
  longitude: number
  zoom?: number
  markerClassName?: string
  popupTitle?: string
  popupBody?: string
}

const buildPopup = (title: string, body: string) => {
  const el = document.createElement('div')
  const heading = document.createElement('h3')
  heading.textContent = title
  const text = document.createElement('p')
  text.textContent = body
  text.style.whiteSpace = 'pre-line'
  el.append(heading, text)
  return el
}

export function useLocationMap({
  latitude,
  longitude,
  zoom = 16,
  markerClassName,
  popupTitle,
  popupBody,
}: UseLocationMapOptions): RefObject<HTMLDivElement | null> {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!container.current || !MAPTILER_KEY) return

    const centre: [number, number] = [longitude, latitude]
    const map = new Map({
      container: container.current,
      style: styleUrl(MAPTILER_KEY),
      center: centre,
      zoom,
      attributionControl: { compact: true },
    })

    map.addControl(
      new NavigationControl({ showZoom: true, showCompass: false, visualizePitch: false }),
      'top-right',
    )

    const pin = document.createElement('div')
    if (markerClassName) pin.className = markerClassName

    const marker = new Marker({ element: pin }).setLngLat(centre)
    if (popupTitle) {
      marker.setPopup(
        new Popup({ offset: 25 }).setDOMContent(buildPopup(popupTitle, popupBody ?? '')),
      )
    }
    marker.addTo(map)

    return () => map.remove()
  }, [latitude, longitude, zoom, markerClassName, popupTitle, popupBody])

  return container
}
