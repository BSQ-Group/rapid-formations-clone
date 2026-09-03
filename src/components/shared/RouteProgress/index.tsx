import NextTopLoader from 'nextjs-toploader'
import React from 'react'

export const RouteProgress: React.FC = () => (
  <NextTopLoader
    color="var(--surface-route-progress)"
    crawlSpeed={200}
    easing="linear"
    height={2}
    initialPosition={0.08}
    showSpinner={false}
    speed={200}
    zIndex={1031}
  />
)
