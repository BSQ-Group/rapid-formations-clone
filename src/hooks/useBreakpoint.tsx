import * as React from 'react'

const XSMALL_BREAKPOINT = 480
const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

type Breakpoint = 'xsmall' | 'mobile' | 'tablet'

export function useBreakpoint(breakpoint: Breakpoint = 'mobile') {
  const breakpointValue = React.useMemo(() => {
    switch (breakpoint) {
      case 'xsmall':
        return XSMALL_BREAKPOINT
      case 'mobile':
        return MOBILE_BREAKPOINT
      case 'tablet':
        return TABLET_BREAKPOINT
      default:
        return MOBILE_BREAKPOINT
    }
  }, [breakpoint])

  const [isBelowBreakpoint, setIsBelowBreakpoint] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth < breakpointValue
  })

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpointValue - 1}px)`)
    const onChange = () => {
      setIsBelowBreakpoint(window.innerWidth < breakpointValue)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [breakpointValue])

  return isBelowBreakpoint
}
