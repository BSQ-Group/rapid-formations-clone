'use client'

import { useGoogleOneTapLogin, type CredentialResponse } from '@react-oauth/google'
import { getAuth, removeCrossOriginAutoLogoutCookie } from '@/lib/firebase'
import { getAuthState } from '@/state/auth'
import useWasPageLoadedAsRedirect from '@/hooks/useWasPageLoadedAsRedirect'

export function GoogleOneTap() {
  const wasPageLoadedAsRedirect = useWasPageLoadedAsRedirect()
  const hasExistingAuth = Boolean(getAuthState().getToken())

  const isDev = process.env.NODE_ENV === 'development'
  const shouldShowOneTap = !isDev && !wasPageLoadedAsRedirect && !hasExistingAuth

  useGoogleOneTapLogin({
    disabled: !shouldShowOneTap,
    onSuccess: async (credentialResponse: CredentialResponse) => {
      try {
        if (!credentialResponse.credential) return
        const {
          auth,
          firebaseAuth: { GoogleAuthProvider, signInWithCredential },
        } = await getAuth()
        const firebaseCredential = GoogleAuthProvider.credential(credentialResponse.credential)
        const result = await signInWithCredential(auth, firebaseCredential)
        const user = result.user
        const idToken = await user.getIdToken()
        getAuthState().setToken(idToken)
        getAuthState().setUser(user)
        if (user?.email) {
          getAuthState().setEmail(user.email)
        }
        removeCrossOriginAutoLogoutCookie()
      } catch (error) {
        console.error('Error signing in with Google One Tap:', error)
      }
    },
    onError: () => {
      console.error('Google One Tap login failed')
    },
    auto_select: false,
    cancel_on_tap_outside: false,
  })

  return <div aria-hidden="true" />
}
