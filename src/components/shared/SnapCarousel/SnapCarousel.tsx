'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'
import { snapCarouselStyles as s } from './SnapCarousel.styles'

interface SnapCarouselProps {
  children: React.ReactNode
  label: string
  className?: string
  slideClassName?: string
  dotsClassName?: string
  as?: 'ol' | 'ul' | 'div'
}

const SLIDE_TAG = { ol: 'li', ul: 'li', div: 'div' } as const

export function SnapCarousel({
  children,
  label,
  className,
  slideClassName,
  dotsClassName,
  as = 'div',
}: SnapCarouselProps) {
  const trackRef = useRef<HTMLElement>(null)
  const slides = React.Children.toArray(children)

  const [pages, setPages] = useState(slides.length)
  const [active, setActive] = useState(0)

  const measure = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const width = el.clientWidth
    if (width === 0) return
    setPages(Math.max(1, Math.round(el.scrollWidth / width)))
    setActive(Math.round(el.scrollLeft / width))
  }, [])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [measure])

  const goTo = (index: number) => {
    const el = trackRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: index * el.clientWidth, behavior: reduced ? 'auto' : 'smooth' })
  }

  const Track = as
  const Slide = SLIDE_TAG[as]

  return (
    <>
      <Track
        ref={trackRef as React.Ref<never>}
        className={className}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={label}
      >
        {slides.map((slide, i) => (
          <Slide key={i} className={slideClassName}>
            {slide}
          </Slide>
        ))}
      </Track>
      {pages > 1 && (
        <div className={cn(s.dots, dotsClassName)}>
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === active}
              aria-label={`Go to slide ${i + 1} of ${pages}`}
              className={cn(s.dot, i === active && s.dotActive)}
            />
          ))}
        </div>
      )}
    </>
  )
}
