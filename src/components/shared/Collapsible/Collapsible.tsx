'use client'

import React, { useId, useState } from 'react'

import { faAngleDown } from '@fortawesome/pro-solid-svg-icons/faAngleDown'

import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { collapsibleStyles as s } from './Collapsible.styles'

export type CollapsibleItem = {
  id?: string | null
  title: string
  content: React.ReactNode
}

export type CollapsibleProps = {
  items: CollapsibleItem[]
  headingAs?: 'h2' | 'h3' | 'h4'
  className?: string
  itemClassName?: string
}

export function Collapsible({
  items,
  headingAs = 'h3',
  className,
  itemClassName,
}: CollapsibleProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const baseId = useId()

  if (!items.length) return null

  return (
    <ul className={cn(s.list, className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index
        const triggerId = `${baseId}-trigger-${index}`
        const panelId = `${baseId}-panel-${index}`

        return (
          <li key={item.id ?? index} className={cn(s.item, itemClassName)}>
            <Text as={headingAs} textStyle="span" className={s.heading}>
              <button
                type="button"
                id={triggerId}
                aria-controls={panelId}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(s.trigger, isOpen && s.triggerOpen)}
              >
                <Text
                  textStyle="span"
                  text={item.title}
                  className={cn(s.title, isOpen && s.titleOpen)}
                />
                <span className={cn(s.iconCircle, isOpen && s.iconCircleOpen)}>
                  <FaIcon icon={faAngleDown} className={s.icon} />
                </span>
              </button>
            </Text>
            <div
              id={panelId}
              inert={!isOpen}
              className={cn(s.panel, isOpen ? s.panelOpen : s.panelClosed)}
            >
              <div className={s.panelInner}>{item.content}</div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default Collapsible
