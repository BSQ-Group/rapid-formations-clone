'use client'

import React, { useId, useRef, useState } from 'react'

import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { GlossaryLetterList, type GlossaryGroup } from './GlossaryLetterList'
import { glossaryStyles as s } from './Glossary.styles'

const STEP: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

export const GlossaryTabs: React.FC<{ groups: GlossaryGroup[] }> = ({ groups }) => {
  const [selected, setSelected] = useState(0)
  const listRef = useRef<HTMLUListElement>(null)
  const baseId = useId()

  const focusTab = (index: number) => {
    setSelected(index)
    listRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[index]?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = STEP[event.key]
    if (step) {
      event.preventDefault()
      focusTab((selected + step + groups.length) % groups.length)
      return
    }
    if (event.key === 'Home') {
      event.preventDefault()
      focusTab(0)
    }
    if (event.key === 'End') {
      event.preventDefault()
      focusTab(groups.length - 1)
    }
  }

  return (
    <div className={s.root}>
      <ul className={s.tabList} role="tablist" aria-label="Glossary letter ranges" ref={listRef}>
        {groups.map((group, index) => (
          <li key={group.id ?? index} className={s.tabItem} role="presentation">
            <button
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-controls={`${baseId}-panel-${index}`}
              aria-selected={index === selected}
              tabIndex={index === selected ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={onKeyDown}
              className={cn(
                s.tab,
                index === selected && s.tabActive,
                index === 0 && s.tabFirst,
                index === groups.length - 1 && s.tabLast,
              )}
            >
              <Text textStyle="span" text={group.label} className={s.tabLabel} />
            </button>
          </li>
        ))}
      </ul>

      {groups.map((group, index) => (
        <div
          key={group.id ?? index}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== selected}
        >
          {index === selected && <GlossaryLetterList terms={group.terms ?? []} />}
        </div>
      ))}
    </div>
  )
}
