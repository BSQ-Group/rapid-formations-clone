'use client'

import React, { useCallback, useEffect, useState } from 'react'

import { FaIcon } from '@/components/shared/FaIcon'
import { cn } from '@/utilities/ui'
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons/faCaretDown'
import { reviewCentreTabsStyles as s } from './ReviewCentreTabs.styles'

export type TabDefinition = {
  id: string
  label: string
  content: React.ReactNode
}

const indexOfHash = (tabs: TabDefinition[], hash: string) =>
  tabs.findIndex((tab) => tab.id === hash.replace(/^#/, '').toLowerCase())

export const ReviewCentreTabsClient: React.FC<{ tabs: TabDefinition[] }> = ({ tabs }) => {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  const syncToHash = useCallback(() => {
    const found = indexOfHash(tabs, window.location.hash)
    if (found >= 0) {
      setActive(found)
      window.scrollTo({ top: 0 })
    }
  }, [tabs])

  useEffect(() => {
    syncToHash()
    window.addEventListener('hashchange', syncToHash)
    return () => window.removeEventListener('hashchange', syncToHash)
  }, [syncToHash])

  const select = (index: number) => {
    setActive(index)
    setMenuOpen(false)
    window.history.pushState(null, '', `#${tabs[index].id}`)
    window.scrollTo({ top: 0 })
  }

  if (!tabs.length) return null

  return (
    <div className={s.section}>
      <div className={s.mobileNav}>
        <div className={s.mobileActive}>{tabs[active].label}</div>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          className={s.mobileToggle}
        >
          <b>More</b>
          <FaIcon icon={faCaretDown} className={s.mobileToggleIcon} />
        </button>
      </div>
      <div data-open={menuOpen} className={cn(s.list, menuOpen ? s.listOpen : s.listClosed)}>
        <ul role="tablist" className={s.ul}>
          {tabs.map((tab, index) => (
            <li
              key={tab.id}
              id={`tab-${tab.id}`}
              role="tab"
              tabIndex={index === active ? 0 : -1}
              aria-selected={index === active}
              aria-controls={`panel-${tab.id}`}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  select(index)
                }
              }}
              className={cn(s.item, index === active ? s.itemActive : s.itemIdle)}
            >
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          hidden={index !== active}
        >
          {index === active && tab.content}
        </div>
      ))}
    </div>
  )
}
