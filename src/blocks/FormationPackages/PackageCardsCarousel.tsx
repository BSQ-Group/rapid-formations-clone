'use client'

import React, { useRef, useCallback, useState, useEffect } from 'react'
import { cn } from '@/utilities/ui'
import { formationPackagesStyles as s } from './FormationPackages.styles'

interface PackageCardsCarouselProps {
  packageNames: string[]
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
      scrollLeft = 0
    } else if (index === lastIndex) {
      scrollLeft = container.scrollWidth - container.clientWidth
    } else {
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

      if (maxScroll > 0 && scrollLeft >= maxScroll - 2) {
        setActiveIndex(cards.length - 1)
        return
      }

      if (scrollLeft <= 2) {
        setActiveIndex(0)
        return
      }

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
