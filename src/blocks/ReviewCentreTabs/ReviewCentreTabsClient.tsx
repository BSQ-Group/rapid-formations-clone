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

// location.hash comes back percent-encoded, so a tab id carrying anything non-ASCII
// never matches its own deep link. Mirrors SmoothHashScroll's guarded decode.
const decodeHash = (hash: string) => {
  const raw = hash.replace(/^#/, '')
  try {
    return decodeURIComponent(raw)
  } catch {
    return raw
  }
}

const indexOfHash = (tabs: TabDefinition[], hash: string) =>
  tabs.findIndex((tab) => tab.id === decodeHash(hash).toLowerCase())

export const ReviewCentreTabsClient: React.FC<{ tabs: TabDefinition[] }> = ({ tabs }) => {
  const [active, setActive] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  // Live preview re-renders this component in place, so `tabs` can shrink under a
  // selection made against the longer list. `active` is only bounded where it is set,
  // so read every lookup through the clamp rather than the raw state.
  const current = tabs.length ? Math.min(active, tabs.length - 1) : 0

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
    // Arrowing along the row, or re-picking the tab already showing, would otherwise
    // stack a history entry every time, so Back walks the row instead of leaving.
    const hash = `#${tabs[index].id}`
    const repeat = index === current || window.location.hash === hash
    if (viaKeyboard || repeat) window.history.replaceState(null, '', hash)
    else window.history.pushState(null, '', hash)
    if (!viaKeyboard) window.scrollTo({ top: 0 })
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
        <div className={s.mobileActive}>{tabs[current].label}</div>
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
              tabIndex={index === current ? 0 : -1}
              aria-selected={index === current}
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
              className={cn(s.item, index === current ? s.itemActive : s.itemIdle)}
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
          hidden={index !== current}
        >
          {index === current && tab.content}
        </div>
      ))}
    </div>
  )
}
