'use client'

import { useCallback, useRef, useState } from 'react'
import { Turnstile } from 'react-turnstile'
import type { BoundTurnstileObject } from 'react-turnstile'
import { FC } from 'react'

interface TurnstileHookResult {
  latestToken: string | null
  resetToken: () => void
  TurnstileComponent: FC
  // Gate on this before latestToken — with no site key no token ever arrives.
  isEnabled: boolean
}

/**
 * Hook that provides access to the latest Turnstile token.
 * Call resetToken() after each use to invalidate the consumed token and
 * trigger a fresh challenge for the next request.
 */
export const useTurnstileToken = (): TurnstileHookResult => {
  const [latestToken, setLatestToken] = useState<string | null>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY
  const boundRef = useRef<BoundTurnstileObject | null>(null)

  const handleSuccess = useCallback((token: string) => {
    setLatestToken(token)
  }, [])

  const handleExpire = useCallback(() => {
    setLatestToken(null)
  }, [])

  const handleLoad = useCallback((_widgetId: string, bound: BoundTurnstileObject) => {
    boundRef.current = bound
  }, [])

  const resetToken = useCallback(() => {
    setLatestToken(null)
    boundRef.current?.reset()
  }, [])

  const TurnstileComponent = useCallback(() => {
    if (!siteKey) return null

    return (
      <Turnstile
        sitekey={siteKey}
        onSuccess={handleSuccess}
        onExpire={handleExpire}
        onLoad={handleLoad}
        onError={(code) => console.error('[Turnstile] error code:', code)}
        refreshExpired="auto"
      />
    )
  }, [handleSuccess, handleExpire, handleLoad, siteKey])

  return { latestToken, resetToken, TurnstileComponent, isEnabled: Boolean(siteKey) }
}
