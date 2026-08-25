'use client'

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { faqQuickNavStyles as s } from './FaqQuickNav.styles'

export type FaqQuickNavTopic = {
  title: string
  url: string
}

export type FaqQuickNavProps = {
  topics: FaqQuickNavTopic[]
  title?: string
  homeLabel?: string
  homeUrl?: string
  className?: string
}

export const FaqQuickNav: React.FC<FaqQuickNavProps> = ({
  topics,
  title = 'FAQs Quick Navigation',
  homeLabel = 'FAQ Homepage',
  homeUrl = '/faqs',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => setIsOpen(false), [pathname])

  useEffect(() => {
    if (!isOpen) return
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  if (!topics.length) return null

  const items = [{ title: homeLabel, url: homeUrl }, ...topics]

  return (
    <div ref={rootRef} className={cn(s.root, className)}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className={cn(s.button, isOpen && s.buttonOpen)}
      >
        <Text
          as="h4"
          textStyle="span"
          text={title}
          className={cn(s.title, isOpen && s.titleOpen)}
        />
      </button>

      <ul className={cn(s.list, isOpen ? s.listOpen : s.listClosed)}>
        {items.map((item, index) => (
          <li key={item.url} className={s.item}>
            <Link href={item.url} className={cn(s.link, index === 0 && s.linkHome)}>
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
