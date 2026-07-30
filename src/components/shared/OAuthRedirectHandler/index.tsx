'use client'

import { useEffect, useRef, memo } from 'react'
import useWasPageLoadedAsRedirect from '@/hooks/useWasPageLoadedAsRedirect'
import { getAuthState } from '@/state/auth'
import { getAuth, removeCrossOriginAutoLogoutCookie } from '@/lib/firebase'

interface OAuthRedirectHandlerProps {
  onError?: (message: string) => void
}

const getUserFriendlyErrorMessage = (error: { code?: string; message?: string }): string => {
  switch (error.code) {
    case 'auth/network-request-failed':
      return 'Network error occurred. Please check your connection and try again.'
    case 'auth/too-many-requests':
      return 'Too many sign-in attempts. Please wait a moment and try again.'
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.'
    case 'auth/account-exists-with-different-credential':
      return 'An account with this email already exists using a different sign-in method.'
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled. Please contact support.'
    default:
      if (error.message && !error.message.includes('Firebase:')) {
        return error.message
      }
      return 'Sign-in failed. Please try again or contact support if the problem persists.'
  }
}

function OAuthRedirectHandlerComponent({ onError }: OAuthRedirectHandlerProps) {
  const wasPageLoadedAsRedirect = useWasPageLoadedAsRedirect()
  const hasProcessedRedirect = useRef(false)

  useEffect(() => {
    if (!wasPageLoadedAsRedirect || hasProcessedRedirect.current) return

    hasProcessedRedirect.current = true

    const checkRedirectResult = async () => {
      try {
        const {
          auth,
          firebaseAuth: { getRedirectResult },
        } = await getAuth()
        const result = await getRedirectResult(auth)

        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.removeItem('oauth_flow_in_progress')
        }

        if (result?.user) {
          const idToken = await result.user.getIdToken()
          getAuthState().setToken(idToken)
          getAuthState().setUser(result.user)
          removeCrossOriginAutoLogoutCookie()
        }
      } catch (error: unknown) {
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.removeItem('oauth_flow_in_progress')
        }

        const err = error as { code?: string; message?: string }
        if (err.code !== 'auth/null-user') {
          onError?.(getUserFriendlyErrorMessage(err))
        }
      }
    }

    checkRedirectResult()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return null
}

export const OAuthRedirectHandler = memo(OAuthRedirectHandlerComponent)
