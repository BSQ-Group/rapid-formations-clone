import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'

const subscribeToNothing = () => () => {}
const getSupportsIntersectionObserver = () => typeof IntersectionObserver !== 'undefined'
const getServerSupportsIntersectionObserver = () => true

interface UseInViewOptions {
  /** Extra margin around the viewport that still counts as "in view". Accepts any IntersectionObserver rootMargin string. */
  rootMargin?: string
  /** Intersection ratio threshold. */
  threshold?: number | number[]
  /** When true, the hook stops observing after the first intersection. */
  once?: boolean
}

/**
 * Observe a DOM node with IntersectionObserver and report whether it's within
 * (or near) the viewport. Use for deferring expensive mounts — third-party
 * widgets, below-the-fold images, carousel hydration, etc.
 *
 * Returns a ref to attach to the element and the current in-view state.
 */
export function useInView<T extends Element = HTMLDivElement>(
  options: UseInViewOptions = {},
): { ref: RefObject<T | null>; inView: boolean } {
  const { rootMargin = '0px', threshold = 0, once = true } = options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)
  const supportsIntersectionObserver = useSyncExternalStore(
    subscribeToNothing,
    getSupportsIntersectionObserver,
    getServerSupportsIntersectionObserver,
  )

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )

    io.observe(node)
    return () => io.disconnect()
  }, [rootMargin, threshold, once])

  return { ref, inView: inView || !supportsIntersectionObserver }
}
