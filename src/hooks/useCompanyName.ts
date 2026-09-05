'use client'

import { useSyncExternalStore } from 'react'

const COOKIE = 'company-name'

function read(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`))
  if (!match?.[1]) return null
  try {
    return decodeURIComponent(match[1]) || null
  } catch {
    return null
  }
}

let cached: string | null = null
let cachedRaw: string | null = null
const listeners = new Set<() => void>()

// document.cookie fires no event, so the snapshot is recomputed on demand and
// memoised by raw cookie string — useSyncExternalStore requires a stable reference.
function getSnapshot(): string | null {
  const raw = typeof document === 'undefined' ? null : document.cookie
  if (raw !== cachedRaw) {
    cachedRaw = raw
    cached = read()
  }
  return cached
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

/** Tells every subscriber to re-read the cookie — call after writing it. */
export function notifyCompanyNameChanged() {
  cachedRaw = null
  listeners.forEach((l) => l())
}

/**
 * The name saved by a successful check, or null. Server and first paint both see
 * null, so static pages stay static and hydration matches.
 */
export function useCompanyName(): string | null {
  return useSyncExternalStore(subscribe, getSnapshot, () => null)
}
