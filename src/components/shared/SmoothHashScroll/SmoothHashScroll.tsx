'use client'

import { useEffect } from 'react'

const resolveTarget = (hash: string): HTMLElement | null => {
  const raw = hash.slice(1)
  if (!raw) return null
  let id = raw
  try {
    id = decodeURIComponent(raw)
  } catch {
    id = raw
  }
  const byId = document.getElementById(id) ?? document.getElementById(raw)
  if (byId) return byId
  const byName = document.getElementsByName(id)[0] ?? document.getElementsByName(raw)[0]
  return byName instanceof HTMLElement ? byName : null
}

export function SmoothHashScroll() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return
      if (event.button !== 0) return
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

      const el = event.target instanceof Element ? event.target : null
      const anchor = el?.closest('a')
      if (!anchor) return
      if (anchor.hasAttribute('download')) return

      const target = anchor.getAttribute('target')
      if (target && target !== '_self') return

      const href = anchor.getAttribute('href')
      if (!href || href.length < 2 || href[0] !== '#') return

      const destination = resolveTarget(href)
      if (!destination) return

      event.preventDefault()

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      destination.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })

      if (!destination.hasAttribute('tabindex') && destination !== document.body) {
        destination.setAttribute('tabindex', '-1')
      }
      destination.focus({ preventScroll: true })
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}

export default SmoothHashScroll
