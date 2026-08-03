import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'

const subscribeToNothing = () => () => {}
const getSupportsIntersectionObserver = () => typeof IntersectionObserver !== 'undefined'
const getServerSupportsIntersectionObserver = () => true

interface UseInViewOptions {
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
}

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
