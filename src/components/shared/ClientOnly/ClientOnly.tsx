'use client'

import { useSyncExternalStore, ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const hasMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  if (!hasMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
