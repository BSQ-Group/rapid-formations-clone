'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { useInView } from '@/hooks/useInView'

export const TRUSTPILOT_SCRIPT_URL =
  'https://widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js'

type TrustpilotWindow = Window & {
  Trustpilot?: { loadFromElement: (el: HTMLElement, refresh: boolean) => void }
}

interface UseTrustpilotWidgetOptions {
  rootMargin?: string
  once?: boolean
}

export function useTrustpilotWidget(
  widgetRefs: RefObject<HTMLElement | null>[] = [],
  options: UseTrustpilotWidgetOptions = {},
): { containerRef: RefObject<HTMLDivElement | null>; inView: boolean } {
  const { rootMargin = '300px', once = true } = options
  const { ref: containerRef, inView } = useInView<HTMLDivElement>({ rootMargin, once })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!inView) return

    const targets: RefObject<HTMLElement | null>[] =
      widgetRefs.length > 0 ? widgetRefs : [containerRef as RefObject<HTMLElement | null>]

    const tryLoad = () => {
      const tp = (window as TrustpilotWindow).Trustpilot
      if (tp) {
        targets.forEach((r) => {
          if (r.current) tp.loadFromElement(r.current, true)
        })
      } else {
        timerRef.current = setTimeout(tryLoad, 50)
      }
    }

    tryLoad()

    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView])

  return { containerRef, inView }
}
