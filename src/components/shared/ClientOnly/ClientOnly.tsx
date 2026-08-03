'use client'

import { useSyncExternalStore, ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * ClientOnly component prevents hydration errors by only rendering children on the client side.
 * Useful for components that rely on browser APIs or have different server/client rendering.
 *
 * @example
 * ```tsx
 * <ClientOnly>
 *   <ComponentThatUsesWindow />
 * </ClientOnly>
 * ```
 */
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
