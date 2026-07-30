'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { init, track } from '@/lib/analytics'

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    init()
    track('Page Viewed', { path: pathname })
  }, [pathname])

  return <>{children}</>
}
