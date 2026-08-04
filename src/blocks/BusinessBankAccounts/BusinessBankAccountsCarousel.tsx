'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { BusinessBankAccount, Media } from '@/payload-types'
import Text from '@/components/shared/Text'
import { businessBankAccountsStyles as s } from './BusinessBankAccounts.styles'
import './BusinessBankAccounts.animations.css'

type Props = Pick<BusinessBankAccount, 'heading' | 'banks'>
type Bank = NonNullable<BusinessBankAccount['banks']>[number]

function getUrl(media: Media | string | undefined | null): string {
  if (!media || typeof media !== 'object') return ''
  return media.url ?? ''
}

function CardImage({ bank, className }: { bank: Bank; className: string }) {
  return (
    <Image
      width={480}
      height={314}
      src={getUrl(bank.cardImage)}
      alt={bank.name}
      className={className}
    />
  )
}

function formatSubtext(text: string): string {
  const match = text.match(/^(.*?[.!?])\s+(.+)$/)
  return match ? `${match[1]}\n${match[2]}` : text
}

export function BusinessBankAccountsCarousel({ heading, banks }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const [animKey, setAnimKey] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const nextRef = useRef<() => void>(() => {})

  const stopAutoplay = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
  }

  const scheduleAutoplay = () => {
    if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current)
    idleTimeoutRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => nextRef.current(), 4500)
    }, 3000)
  }

  const total = banks?.length ?? 0
  const wrap = (i: number) => (total === 0 ? 0 : ((i % total) + total) % total)

  const prev = () => {
    setDirection('left')
    setAnimKey((k) => k + 1)
    setActiveIndex((idx) => wrap(idx - 1))
  }
  const next = () => {
    setDirection('right')
    setAnimKey((k) => k + 1)
    setActiveIndex((idx) => wrap(idx + 1))
  }

  useEffect(() => {
    nextRef.current = next
  })

  useEffect(() => {
    intervalRef.current = setInterval(() => nextRef.current(), 4500)
    return () => {
      stopAutoplay()
    }
  }, [])

  if (!banks?.length) return null

  const activeBank = banks[wrap(activeIndex)]
  const leftCard0 = banks[wrap(activeIndex - 4)]
  const leftCard1 = banks[wrap(activeIndex - 3)]
  const leftCard2 = banks[wrap(activeIndex - 2)]
  const leftCard3 = banks[wrap(activeIndex - 1)]
  const rightCard1 = banks[wrap(activeIndex + 1)]
  const rightCard2 = banks[wrap(activeIndex + 2)]
  const rightCard3 = banks[wrap(activeIndex + 3)]
  const rightCard4 = banks[wrap(activeIndex + 4)]

  return (
    <div className={s.section} onMouseEnter={stopAutoplay} onMouseLeave={scheduleAutoplay}>
      {heading && <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />}
      <div className={s.carouselGroup}>
        <div
          className={s.carouselWrapper}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const delta = touchStartX.current - e.changedTouches[0].clientX
            if (Math.abs(delta) > 40) {
              stopAutoplay()
              delta > 0 ? next() : prev()
              scheduleAutoplay()
            }
            touchStartX.current = null
          }}
        >
          <div
            key={animKey}
            className={`${s.carousel} ${direction === 'right' ? 'carousel-slide-right' : 'carousel-slide-left'}`}
          >
            <div className={s.sideCards}>
              <div className={s.sideCard}>
                <CardImage bank={leftCard0} className={s.cardImage} />
              </div>
              <div className={s.sideCard}>
                <CardImage bank={leftCard1} className={s.cardImage} />
              </div>
              <div className={s.sideCard}>
                <CardImage bank={leftCard2} className={s.cardImage} />
              </div>
              <div
                className={`${s.sideCard} ${direction === 'right' && 'carousel-featured-out-left'}`}
                key={animKey}
              >
                <CardImage bank={leftCard3} className={s.cardImage} />
              </div>
            </div>
            <div className={s.featuredContainer}>
              <div
                key={animKey}
                className={`${s.featuredCard} ${direction === 'right' ? 'carousel-featured-in-right' : 'carousel-featured-in-left'}`}
              >
                <CardImage bank={activeBank} className={s.featuredImage} />
              </div>
            </div>
            <div className={s.sideCards}>
              <div
                className={`${s.sideCard} ${direction === 'left' && 'carousel-featured-out-right'}`}
                key={animKey}
              >
                <CardImage bank={rightCard1} className={s.cardImage} />
              </div>
              <div className={s.sideCard}>
                <CardImage bank={rightCard2} className={s.cardImage} />
              </div>
              <div className={s.sideCard}>
                <CardImage bank={rightCard3} className={s.cardImage} />
              </div>
              <div className={s.sideCard}>
                <CardImage bank={rightCard4} className={s.cardImage} />
              </div>
            </div>
          </div>
        </div>
        <div className={s.footer}>
          <div className={s.nav}>
            <button
              onClick={(e) => {
                const isMobile =
                  e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === 'touch'
                if (isMobile) stopAutoplay()
                prev()
              }}
              className={s.navButton}
              aria-label="Previous bank"
            >
              <ChevronLeft size={24} className={s.navIcon} />
            </button>
            <div className={s.logoContainer}>
              {getUrl(activeBank.logo) && (
                <Image
                  src={getUrl(activeBank.logo)}
                  alt={activeBank.name}
                  width={160}
                  height={44}
                  sizes="160px"
                  className={s.logo}
                />
              )}
            </div>
            <button
              onClick={(e) => {
                const isMobile =
                  e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === 'touch'
                if (isMobile) stopAutoplay()
                next()
              }}
              className={s.navButton}
              aria-label="Next bank"
            >
              <ChevronRight size={24} className={s.navIcon} />
            </button>
          </div>
          {activeBank.subtext && (
            <Text
              textStyle="body-sm"
              text={formatSubtext(activeBank.subtext)}
              className={s.subtext}
            />
          )}
        </div>
      </div>
    </div>
  )
}
