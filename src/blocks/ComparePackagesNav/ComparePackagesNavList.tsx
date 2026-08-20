import React from 'react'
import Link from 'next/link'

import { cn } from '@/utilities/ui'
import { comparePackagesNavStyles as s } from './ComparePackagesNav.styles'

export type ComparePackagesNavTab = {
  id: string
  href: string
  label: string
  newTab?: boolean | null
}

export const normalisePath = (value: string) => {
  const path = value.split(/[?#]/)[0]
  return path.length > 1 ? path.replace(/\/+$/, '') : path
}

export const ComparePackagesNavList: React.FC<{
  tabs: ComparePackagesNavTab[]
  activeHref: string
}> = ({ tabs, activeHref }) => (
  <nav className={s.list} aria-label="Compare packages">
    {tabs.map((tab) => {
      const isActive = normalisePath(tab.href) === normalisePath(activeHref)
      return (
        <Link
          key={tab.id}
          href={tab.href}
          target={tab.newTab ? '_blank' : undefined}
          rel={tab.newTab ? 'noopener noreferrer' : undefined}
          aria-current={isActive ? 'page' : undefined}
          className={cn(s.tab, isActive && s.tabActive)}
        >
          {tab.label}
        </Link>
      )
    })}
  </nav>
)
