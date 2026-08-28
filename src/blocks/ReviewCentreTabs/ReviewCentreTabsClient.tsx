'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

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

  const tabRefs = useRef<Array<HTMLLIElement | null>>([])

  const select = (index: number, { viaKeyboard = false } = {}) => {
    setActive(index)
    setMenuOpen(false)
    // Arrowing along the row would otherwise stack one history entry per tab, so the
    // back button walks the row instead of leaving the page.
    const hash = `#${tabs[index].id}`
    if (viaKeyboard) window.history.replaceState(null, '', hash)
    else {
      window.history.pushState(null, '', hash)
      window.scrollTo({ top: 0 })
    }
  }

  // Roving tabindex takes every inactive tab out of the tab order, so without arrow
  // keys they cannot be reached at all. Wraps at both ends. focus() brings the tab
  // into view on its own, which is what a keyboard user needs; the jump to the top
  // of the page stays a click-only behaviour.
  const moveTo = (index: number) => {
    const next = (index + tabs.length) % tabs.length
    select(next, { viaKeyboard: true })
    tabRefs.current[next]?.focus()
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
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              tabIndex={index === active ? 0 : -1}
              aria-selected={index === active}
              aria-controls={`panel-${tab.id}`}
              onClick={() => select(index)}
              onKeyDown={(event) => {
                const keys: Record<string, () => void> = {
                  Enter: () => select(index),
                  ' ': () => select(index),
                  ArrowRight: () => moveTo(index + 1),
                  ArrowDown: () => moveTo(index + 1),
                  ArrowLeft: () => moveTo(index - 1),
                  ArrowUp: () => moveTo(index - 1),
                  Home: () => moveTo(0),
                  End: () => moveTo(tabs.length - 1),
                }
                const handler = keys[event.key]
                if (!handler) return
                event.preventDefault()
                handler()
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
