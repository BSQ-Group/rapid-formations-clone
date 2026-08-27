'use client'

import React, { useId, useRef, useState } from 'react'

import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { aboutUsTabsStyles as s } from './AboutUsTabs.styles'

export type AboutUsTab = {
  label: string
  title: string
  isPageTitle: boolean
  panel: React.ReactNode
}

export const AboutUsTabsClient: React.FC<{ tabs: AboutUsTab[] }> = ({ tabs }) => {
  const [selected, setSelected] = useState(0)
  const baseId = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const active = tabs[selected] ?? tabs[0]

  const move = (to: number) => {
    const next = (to + tabs.length) % tabs.length
    setSelected(next)
    refs.current[next]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') move(selected + 1)
    else if (event.key === 'ArrowLeft') move(selected - 1)
    else if (event.key === 'Home') move(0)
    else if (event.key === 'End') move(tabs.length - 1)
    else return
    event.preventDefault()
  }

  return (
    <>
      <Text
        as={active?.isPageTitle ? 'h1' : 'h2'}
        textStyle="span"
        text={active?.title}
        className={s.title}
      />
      <div className={s.list} role="tablist" onKeyDown={onKeyDown}>
        {tabs.map((tab, index) => (
          <button
            key={`${tab.label}-${index}`}
            ref={(node) => {
              refs.current[index] = node
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${index}`}
            aria-selected={index === selected}
            aria-controls={`${baseId}-panel-${index}`}
            tabIndex={index === selected ? 0 : -1}
            className={cn(s.tab, index === selected ? s.tabActive : s.tabIdle)}
            onClick={() => setSelected(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={`${tab.label}-panel-${index}`}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== selected}
          className={s.panel}
        >
          {tab.panel}
        </div>
      ))}
    </>
  )
}
