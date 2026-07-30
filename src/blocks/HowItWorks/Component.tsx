'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, CircleCheckBig, FileClock, MailCheck } from 'lucide-react'
import type { HowItWorksBlock as HowItWorksBlockProps, Media as MediaType } from '@/payload-types'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/button'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { cn } from '@/utilities/ui'
import { howItWorksStyles as s } from './HowItWorks.styles'

// ─────────────────────────────────────────────
// Decorative overlay widgets — hardcoded per step
// ─────────────────────────────────────────────

function Overlay1() {
  return (
    <div className={cn(s.overlayBase, s.overlay1Pos)}>
      <div className={s.overlayIconWrap}>
        <CircleCheckBig size={20} className={s.overlayIcon} aria-hidden />
      </div>
      <div className={s.overlayTextCol}>
        <Text textStyle="span" text="Order confirmed" className={s.overlayTitle} />
        <Text textStyle="span" text="Registered Office Service" className={s.overlaySubBold} />
        <Text
          textStyle="span"
          text="12 months · Covent Garden, WC2"
          className={cn(`${s.overlaySub} mt-[-7px]`)}
        />
      </div>
    </div>
  )
}

function Overlay2() {
  return (
    <div className={cn(s.overlayBase, s.overlay2Pos)}>
      <div className={s.overlayIconWrap}>
        <FileClock size={20} className={s.overlayIcon} aria-hidden />
      </div>
      <div className={s.overlayTextCol}>
        <div className="flex flex-col gap-0.5">
          <Text textStyle="span" text="Companies House" className={s.overlayMicroStrong} />
          <Text textStyle="span" text="Update in progress…" className={s.overlayTitle} />
        </div>
        <div className={s.progressTrack}>
          <div className={s.progressFill} />
        </div>
        <div className="flex flex-col gap-0.5">
          <Text textStyle="span" text="3 of 4 records updated" className={s.overlaySubBold} />
          <Text textStyle="span" text="CRN 15892031 reserved" className={s.overlaySub} />
        </div>
      </div>
    </div>
  )
}

function Overlay3() {
  return (
    <>
      {/* Ghost card (visually behind the email card) */}
      <div className={s.ghostCard} />
      {/* Inbox header + email card grouped so the header always sits above the card */}
      <div className={s.inboxGroup}>
        <div className={s.inboxHeader}>
          <Text textStyle="span" text="Inbox" className={s.inboxLabel} />
          <div className={s.newPill}>
            <div className={s.newDot} />
            <Text textStyle="span" text="2 new" className={s.newText} />
          </div>
        </div>
        <div className={s.overlayBase}>
          <div className={s.overlayIconWrap}>
            <MailCheck size={20} className={s.overlayIcon} aria-hidden />
          </div>
          <div className={s.overlayTextCol}>
            <Text textStyle="span" text="Companies House" className={s.overlayTitle} />
            <Text
              textStyle="span"
              text="Registered office change confirmed"
              className={s.overlaySub}
            />
          </div>
        </div>
      </div>
    </>
  )
}

const OVERLAYS = [Overlay1, Overlay2, Overlay3]

// ─────────────────────────────────────────────
// Step card
// ─────────────────────────────────────────────

type Step = NonNullable<HowItWorksBlockProps['steps']>[number]

function StepCard({ step, index }: { step: Step; index: number }) {
  const Overlay = OVERLAYS[index]

  return (
    <div className={s.card}>
      <div className={s.cardImageWrap}>
        {step.image && typeof step.image === 'object' && (
          <Media resource={step.image as MediaType} fill imgClassName="object-cover" />
        )}
        {Overlay && <Overlay />}
      </div>

      <div className={s.cardBody}>
        <Text textStyle="body-sm" text={step.stepNumber} className={s.stepNumber} />
        <div className={s.cardTextGroup}>
          <Text as="h3" textStyle="body-base" text={step.title} className={s.cardTitle} />
          <Text textStyle="body-sm" text={step.body} className={s.cardBodyText} />
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Block
// ─────────────────────────────────────────────

export const HowItWorksBlock: React.FC<HowItWorksBlockProps> = ({
  heading,
  description,
  steps,
  ctaLink,
  priceText,
  sectionLayout,
}) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateNav = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    const { scrollLeft, scrollWidth, clientWidth } = track
    setCanScrollLeft(scrollLeft > 1)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    updateNav()
    track.addEventListener('scroll', updateNav, { passive: true })
    const ro = new ResizeObserver(updateNav)
    ro.observe(track)
    return () => {
      track.removeEventListener('scroll', updateNav)
      ro.disconnect()
    }
  }, [updateNav])

  const scrollBy = (dir: 'left' | 'right') => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = (track.firstElementChild as HTMLElement | null)?.offsetWidth ?? 304
    track.scrollBy({
      left: dir === 'left' ? -(cardWidth + 16) : cardWidth + 16,
      behavior: 'smooth',
    })
  }

  const showNav = canScrollLeft || canScrollRight

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        {/* Section header */}
        <div className={s.header}>
          {heading && (
            <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />
          )}
          {description && (
            <Text textStyle="body-base" text={description} className={s.description} />
          )}
        </div>

        {/* ── Mobile column (< md) ── */}
        <div className={s.mobileCol}>
          {steps?.map((step, i) => (
            <StepCard key={step.id ?? i} step={step} index={i} />
          ))}
        </div>

        {/* ── Tablet carousel (md only) ── */}
        <div className={s.tabletCarousel}>
          <div ref={trackRef} className={s.carouselTrack}>
            {steps?.map((step, i) => (
              <StepCard key={step.id ?? i} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* ── Desktop / laptop row (lg+) ── */}
        <div className={s.desktopRow}>
          {steps?.map((step, i) => (
            <StepCard key={step.id ?? i} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        {ctaLink && (
          <div className={s.ctaRow}>
            <Link href={getLinkHref(ctaLink as LinkData)}>
              <Button variant="primary" size="lg">
                {ctaLink.label}
              </Button>
            </Link>
            {priceText && <Text textStyle="body-base" text={priceText} className={s.priceText} />}
          </div>
        )}

        {/* Carousel arrows — tablet only, absolute bottom-right of inner container */}
        {showNav && (
          <div className={s.arrowsOuter}>
            <Button
              variant="tertiary"
              size="icon"
              onClick={() => scrollBy('left')}
              disabled={!canScrollLeft}
              aria-label="Previous step"
            >
              <ChevronLeft size={24} aria-hidden />
            </Button>
            <Button
              variant="tertiary"
              size="icon"
              onClick={() => scrollBy('right')}
              disabled={!canScrollRight}
              aria-label="Next step"
            >
              <ChevronRight size={24} aria-hidden />
            </Button>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
