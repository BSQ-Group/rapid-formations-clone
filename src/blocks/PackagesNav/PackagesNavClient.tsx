'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { packagesNavStyles as s } from './PackagesNav.styles'

export type PackagesNavTab = {
  id: string
  href: string
  label: string
}

export function PackagesNavClient({ tabs }: { tabs: PackagesNavTab[] }) {
  const pathname = usePathname()
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const container = trackRef.current
      const active = container?.querySelector<HTMLElement>('[aria-current="page"]')
      if (!container || !active) return

      const pad = 8
      const cr = container.getBoundingClientRect()
      const ar = active.getBoundingClientRect()
      const itemLeft = ar.left - cr.left + container.scrollLeft
      const itemRight = ar.right - cr.left + container.scrollLeft

      if (itemLeft - pad < container.scrollLeft) {
        container.scrollLeft = itemLeft - pad
      } else if (itemRight + pad > container.scrollLeft + container.clientWidth) {
        const next = active.nextElementSibling as HTMLElement | null
        let targetRight = itemRight
        if (next) {
          const nr = next.getBoundingClientRect()
          const nextRight = nr.right - cr.left + container.scrollLeft
          if (nextRight + pad > container.scrollLeft + container.clientWidth) {
            targetRight = nextRight
          }
        }
        container.scrollLeft = targetRight + pad - container.clientWidth
      }
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <nav className={s.section} aria-label="Packages navigation">
      <div className={s.carouselWrapper}>
        <div className={s.pill} ref={trackRef}>
          <div className={s.tabTrack}>
            {tabs.map((tab) => {
              const isActive = pathname === tab.href
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(s.tab, isActive && s.tabActive)}
                >
                  <Text
                    text={tab.label}
                    as="span"
                    textStyle="body-sm"
                    className={cn(s.tabLabel, isActive && s.tabLabelActive)}
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
