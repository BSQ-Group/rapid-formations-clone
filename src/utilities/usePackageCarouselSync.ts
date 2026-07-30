'use client'

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'

/**
 * Cross-block "active package" sync for the Compare Packages page (CORE-3620).
 *
 * On tablet & mobile the FormationPackages cards carousel and the
 * ComparePackages feature-table carousel are two independent, sibling blocks.
 * They are linked so swiping (or tapping a tab on) either one moves both to the
 * same plan. We sync by *plan index* — not raw scroll pixels — because the two
 * carousels have different card widths/gaps; index sync is robust where pixel
 * sync would drift.
 *
 * State lives in a module-level store read via useSyncExternalStore. Each mounted
 * carousel registers as a participant; when the last one unmounts the index
 * resets so a fresh navigation starts on the first plan.
 */

type Listener = () => void

let activeIndex = 0
let participants = 0
const listeners = new Set<Listener>()

function emit() {
  for (const l of listeners) l()
}

function getActiveIndex() {
  return activeIndex
}

/** Server snapshot — always the first plan (matches initial client render). */
function getServerSnapshot() {
  return 0
}

export function setActivePackageIndex(index: number) {
  if (index === activeIndex) return
  activeIndex = index
  emit()
}

function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function registerParticipant() {
  participants += 1
  return () => {
    participants -= 1
    if (participants <= 0) {
      participants = 0
      activeIndex = 0
    }
  }
}

/**
 * Wires a horizontal scroll-snap carousel to the shared active-plan index.
 *
 * - Reflects the shared index by smooth-scrolling its own container to the
 *   matching card (skipped while the container is hidden, e.g. `lg:hidden`).
 * - Publishes the user's own swipe back to the store once it settles.
 *
 * A `programmatic` guard prevents the follow-scroll from echoing back as a
 * user scroll and causing a feedback loop between the two carousels.
 */
export function useLinkedCarousel(scrollRef: React.RefObject<HTMLElement | null>) {
  const activeIndex = useSyncExternalStore(subscribe, getActiveIndex, getServerSnapshot)
  const programmatic = useRef(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const endProgrammatic = useRef<(() => void) | null>(null)

  const getCards = useCallback(
    () => Array.from(scrollRef.current?.children ?? []) as HTMLElement[],
    [scrollRef],
  )

  /** Index of the card currently nearest the container's left edge. */
  const closestIndex = useCallback(() => {
    const el = scrollRef.current
    const cards = getCards()
    if (!el || cards.length === 0) return 0
    const maxScroll = el.scrollWidth - el.clientWidth
    // Endpoint snapping: when fewer cards fit than exist, the last card can
    // never reach the left edge (max scroll stops short), so a pure
    // "closest to left" search caps below the last index. Treat the scroll
    // extremes as the first / last card explicitly.
    if (maxScroll > 0 && el.scrollLeft >= maxScroll - 2) return cards.length - 1
    if (el.scrollLeft <= 2) return 0
    const base = cards[0].offsetLeft
    const scrollLeft = el.scrollLeft
    let best = 0
    let bestDistance = Infinity
    cards.forEach((card, i) => {
      const distance = Math.abs(card.offsetLeft - base - scrollLeft)
      if (distance < bestDistance) {
        bestDistance = distance
        best = i
      }
    })
    return best
  }, [getCards, scrollRef])

  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current
      const cards = getCards()
      const card = cards[index]
      if (!el || !card) return
      const maxScroll = el.scrollWidth - el.clientWidth
      // Start-align the target card (snap-start); subtracting card[0].offsetLeft
      // keeps the carousel's left scroll-padding intact regardless of
      // per-breakpoint padding. The last card right-aligns at max scroll when
      // it can't reach the left edge (mirrors closestIndex's endpoint rule).
      const left =
        index >= cards.length - 1
          ? maxScroll
          : Math.min(card.offsetLeft - cards[0].offsetLeft, maxScroll)
      el.scrollTo({ left, behavior: 'smooth' })
    },
    [getCards, scrollRef],
  )

  useEffect(() => registerParticipant(), [])

  // Follow the shared index. offsetParent === null means display:none
  // (carousel not active at this breakpoint) — nothing to scroll.
  //
  // The `programmatic` guard suppresses the follow-scroll from being read back
  // as a user swipe. It is cleared on `scrollend` (so it lasts exactly as long
  // as the smooth scroll, however long that takes) with a timeout as a fallback
  // for browsers without `scrollend` or when no scroll actually happens.
  useEffect(() => {
    const el = scrollRef.current
    if (!el || el.offsetParent === null) return
    if (closestIndex() === activeIndex) return

    const clear = () => {
      programmatic.current = false
      if (resetTimer.current) {
        clearTimeout(resetTimer.current)
        resetTimer.current = null
      }
      el.removeEventListener('scrollend', clear)
      endProgrammatic.current = null
    }
    // Clear any in-flight guard from a previous target before starting a new one.
    endProgrammatic.current?.()

    programmatic.current = true
    endProgrammatic.current = clear
    el.addEventListener('scrollend', clear)
    scrollToIndex(activeIndex)
    resetTimer.current = setTimeout(clear, 1200)

    return clear
  }, [activeIndex, closestIndex, scrollToIndex, scrollRef])

  // Publish the user's own swipe back to the store once it settles.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let raf = 0
    const handleScroll = () => {
      if (programmatic.current) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setActivePackageIndex(closestIndex()))
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(raf)
    }
  }, [closestIndex, scrollRef])

  return { activeIndex, setActiveIndex: setActivePackageIndex }
}
