'use client'

import React, { useRef, useCallback, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { scrollCarouselStyles as s } from './ScrollCarousel.styles'

interface ScrollCarouselProps {
  children: React.ReactNode
  maxWidth?: string
  bleedRight?: boolean
  bleedBoth?: boolean
  centerControl?: React.ReactNode
  arrowsClassName?: string
}

export function ScrollCarousel({
  children,
  maxWidth,
  bleedRight = false,
  bleedBoth = false,
  centerControl,
  arrowsClassName,
}: ScrollCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScroll, setCanScroll] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const center = () => {
      if (bleedBoth && window.innerWidth >= 768) {
        el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2)
      }
    }
    center()

    const measure = () => setCanScroll(el.scrollWidth - el.clientWidth > 1)
    measure()

    const ro = new ResizeObserver(() => {
      measure()
      center()
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [children, bleedBoth])

  const scroll = useCallback((direction: 'left' | 'right') => {
    const container = scrollRef.current
    if (!container) return
    const card = container.firstElementChild as HTMLElement | null
    const scrollAmount = card ? card.offsetWidth + 24 : 344
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }, [])

  return (
    <div className={cn(s.container, maxWidth)}>
      <div
        ref={scrollRef}
        className={cn(s.track, bleedRight && s.trackBleedRight, bleedBoth && s.trackBleedBoth, bleedBoth && 'md:snap-none')}
      >
        {children}
      </div>
      <div className={cn(s.footer, centerControl ? 'flex-col md:flex-row gap-4 md:justify-between' : 'justify-end')}>
        {centerControl && (
          <>
            <div className={s.footerSpacer} aria-hidden />
            {centerControl}
          </>
        )}
        {canScroll ? (
          <div className={cn(s.arrows, arrowsClassName)}>
            <Button
              variant="tertiary"
              size="icon"
              onClick={() => scroll('left')}
              aria-label="Previous"
              className={s.arrowButton}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="tertiary"
              size="icon"
              onClick={() => scroll('right')}
              aria-label="Next"
              className={s.arrowButton}
            >
              <ChevronRight />
            </Button>
          </div>
        ) : centerControl ? (
          <div className={s.footerSpacer} aria-hidden />
        ) : null}
      </div>
    </div>
  )
}
