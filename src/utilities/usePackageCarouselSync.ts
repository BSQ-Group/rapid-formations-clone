'use client'

import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react'

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

export function useLinkedCarousel(scrollRef: React.RefObject<HTMLElement | null>) {
  const activeIndex = useSyncExternalStore(subscribe, getActiveIndex, getServerSnapshot)
  const programmatic = useRef(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const endProgrammatic = useRef<(() => void) | null>(null)

  const getCards = useCallback(
    () => Array.from(scrollRef.current?.children ?? []) as HTMLElement[],
    [scrollRef],
  )

  const closestIndex = useCallback(() => {
    const el = scrollRef.current
    const cards = getCards()
    if (!el || cards.length === 0) return 0
    const maxScroll = el.scrollWidth - el.clientWidth
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
      const left =
        index >= cards.length - 1
          ? maxScroll
          : Math.min(card.offsetLeft - cards[0].offsetLeft, maxScroll)
      el.scrollTo({ left, behavior: 'smooth' })
    },
    [getCards, scrollRef],
  )

  useEffect(() => registerParticipant(), [])

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
    endProgrammatic.current?.()

    programmatic.current = true
    endProgrammatic.current = clear
    el.addEventListener('scrollend', clear)
    scrollToIndex(activeIndex)
    resetTimer.current = setTimeout(clear, 1200)

    return clear
  }, [activeIndex, closestIndex, scrollToIndex, scrollRef])

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
