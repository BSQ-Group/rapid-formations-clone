'use client'

import React, { useRef, useCallback, useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import { formationPackagesStyles as s } from './FormationPackages.styles'

interface PackageCardsCarouselProps {
  packageNames: string[]
  /**
   * When a ComparePackages block on the same page renders the combined
   * card+services carousel <lg (CORE-3620), hide these standalone cards (and
   * their tabs) below lg — they only show from lg up.
   */
  combined?: boolean
  children: React.ReactNode
}

export function PackageCardsCarousel({ packageNames, combined, children }: PackageCardsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToIndex = useCallback((index: number) => {
    const container = scrollRef.current
    if (!container) return
    const cards = Array.from(container.children) as HTMLElement[]
    if (!cards[index]) return

    const totalCards = cards.length
    const lastIndex = totalCards - 1
    let scrollLeft: number

    if (index === 0) {
      // First card: left-aligned
      scrollLeft = 0
    } else if (index === lastIndex) {
      // Last card: right-aligned (scroll to max)
      scrollLeft = container.scrollWidth - container.clientWidth
    } else {
      // Middle cards: centered
      const card = cards[index]
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      scrollLeft = cardCenter - container.clientWidth / 2
    }

    container.scrollTo({ left: scrollLeft, behavior: 'smooth' })
    setActiveIndex(index)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const handleScroll = () => {
      const cards = Array.from(container.children) as HTMLElement[]
      const scrollLeft = container.scrollLeft
      const maxScroll = container.scrollWidth - container.clientWidth

      // At scroll end → last card active
      if (maxScroll > 0 && scrollLeft >= maxScroll - 2) {
        setActiveIndex(cards.length - 1)
        return
      }

      // At scroll start → first card active
      if (scrollLeft <= 2) {
        setActiveIndex(0)
        return
      }

      // Otherwise, find the card closest to the left edge of the viewport
      let closestIndex = 0
      let closestDistance = Infinity

      cards.forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft - scrollLeft)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = i
        }
      })

      setActiveIndex(closestIndex)
    }

    container.addEventListener('scroll', handleScroll, { passive: true })
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Tab Navigation — hidden on desktop. When combined, the <lg view is the
          combined carousel above, so only the laptop (lg–xl) carousel needs tabs. */}
      <div className={cn(s.tabs, combined && 'hidden lg:flex')}>
        {packageNames.map((name, i) => (
          <button
            key={name}
            onClick={() => scrollToIndex(i)}
            className={cn(s.tab, i === activeIndex && s.tabActive)}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Cards — grid on desktop, horizontal scroll on mobile/tablet. When
          combined, hidden <lg (the combined carousel takes over there). */}
      <div ref={scrollRef} className={cn(s.cardsScroll, combined && 'hidden lg:flex xl:grid')}>
        {children}
      </div>
    </>
  )
}
