'use client'

import { useEffect, useState, type ReactNode } from 'react'

interface IdleMountProps {
  children: ReactNode
  fallbackDelayMs?: number
}

export function IdleMount({ children, fallbackDelayMs = 2000 }: IdleMountProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: fallbackDelayMs })
      return () => w.cancelIdleCallback?.(id)
    }

    const timeoutId = window.setTimeout(() => setReady(true), fallbackDelayMs)
    return () => window.clearTimeout(timeoutId)
  }, [fallbackDelayMs])

  if (!ready) return null
  return <>{children}</>
}
