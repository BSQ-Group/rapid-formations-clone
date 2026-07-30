'use client'

import { getAuthState } from '@/state/auth'
import { identify, reset } from '@/lib/analytics'
import Cookies from 'js-cookie'
import type { Auth } from 'firebase/auth'
import { getFirebaseConfig } from './config'
import { getBrand, getDomainConfig } from './brand'

export const CROSS_ORIGIN_AUTO_LOGOUT = 'CROSS_ORIGIN_AUTO_LOGOUT'

type FirebaseAuthBundle = {
  auth: Auth
  firebaseAuth: typeof import('firebase/auth')
}

let _authPromise: Promise<FirebaseAuthBundle> | null = null
let authStateAvailable = false

export const isAuthStateAvailable = () => authStateAvailable

/**
 * Lazily initialize Firebase + auth listeners. Dynamic imports keep
 * `firebase/app` and `firebase/auth` out of the landing-page bundle.
 * Returns both the `auth` instance and the `firebase/auth` module so
 * callers don't need to re-import.
 */
export async function getAuth(): Promise<FirebaseAuthBundle> {
  if (_authPromise) return _authPromise

  const promise: Promise<FirebaseAuthBundle> = (async () => {
    const [{ initializeApp }, firebaseAuth] = await Promise.all([
      import('firebase/app'),
      import('firebase/auth'),
    ])

    const brand = getBrand()
    const app = initializeApp(getFirebaseConfig())
    const authInstance = firebaseAuth.getAuth(app)
    authInstance.tenantId = getDomainConfig(brand).tenantId

    authInstance.onAuthStateChanged(() => {
      authStateAvailable = true
    })
    authInstance.onIdTokenChanged(async (user) => {
      if (user) {
        const newToken = await user.getIdToken()
        getAuthState().setToken(newToken)
        getAuthState().setUser(user)
        identify(user.uid, { $email: user.email ?? undefined })
      }
    })

    return { auth: authInstance, firebaseAuth }
  })()

  // If init fails (e.g. chunk load error after a deploy), clear the cache
  // so the next caller can retry instead of receiving the same rejection.
  promise.catch(() => {
    if (_authPromise === promise) _authPromise = null
  })

  _authPromise = promise
  return promise
}

// ---------------------------------------------------------------------------
// Email + OTP sign-in
// ---------------------------------------------------------------------------

export async function firebaseSendSignInLink(email: string) {
  const {
    auth,
    firebaseAuth: { sendSignInLinkToEmail },
  } = await getAuth()

  const actionCodeSettings = {
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/sign-in`,
    handleCodeInApp: true,
  }

  return sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => ({ ok: true, error: null }))
    .catch((error) => {
      console.error('Error sending magic link:', error)
      return { error, ok: false }
    })
}

export async function firebaseSignInWithLink(email: string, link: string, onSuccess?: () => void) {
  try {
    const {
      auth,
      firebaseAuth: { signInWithEmailLink },
    } = await getAuth()

    await signInWithEmailLink(auth, email, link)
    const idToken = await auth.currentUser?.getIdToken(true)

    if (!idToken) {
      return { ok: false, error: 'Failed to retrieve authentication token' }
    }

    getAuthState().setToken(idToken)
    removeCrossOriginAutoLogoutCookie()

    if (onSuccess) {
      onSuccess()
    } else {
      setTimeout(() => {
        window.location.href = '/'
      }, 100)
    }
    return { ok: true, error: null }
  } catch (error) {
    console.error('Error signing in with link:', error)
    return { ok: false, error: (error as Error).message || 'Authentication failed' }
  }
}

// ---------------------------------------------------------------------------
// Token refresh
// ---------------------------------------------------------------------------

let nrOfMaxRetries = 0

export async function getRefreshIdToken(): Promise<string | null> {
  const { auth } = await getAuth()

  if (!authStateAvailable) {
    nrOfMaxRetries++

    if (nrOfMaxRetries > 9) {
      return null
    }

    return new Promise<string | null>((resolve) =>
      setTimeout(() => {
        getRefreshIdToken().then(resolve)
      }, 200),
    )
  }

  const user = auth.currentUser

  if (user) {
    try {
      const idToken = await user.getIdToken()
      getAuthState().setToken(idToken)
      return idToken
    } catch (error) {
      console.error('Error getting ID token:', error)
      return null
    }
  } else {
    return null
  }
}

// ---------------------------------------------------------------------------
// Sign out
// ---------------------------------------------------------------------------

export async function firebaseSignOut() {
  try {
    const { auth } = await getAuth()
    await auth.signOut()
    getAuthState().clear()
    reset()

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign-out`, {
      method: 'POST',
      credentials: 'include',
    })

    Cookies.set(CROSS_ORIGIN_AUTO_LOGOUT, location.hostname, {
      domain: '.companyformationsdirect.co.uk',
      path: '/',
      secure: true,
      sameSite: 'lax',
    })

    return { ok: true, error: null }
  } catch (error) {
    console.error('Error signing out:', error)
    return { ok: false, error }
  }
}

// ---------------------------------------------------------------------------
// OAuth redirect helpers
// ---------------------------------------------------------------------------

function markOAuthFlowInProgress() {
  if (typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('oauth_flow_in_progress', String(Date.now()))
  }
}

// ---------------------------------------------------------------------------
// OAuth redirect — Google
// ---------------------------------------------------------------------------

export async function firebaseSignInWithGoogle() {
  try {
    const {
      auth,
      firebaseAuth: { GoogleAuthProvider, signInWithRedirect },
    } = await getAuth()

    const provider = new GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    provider.setCustomParameters({ prompt: 'select_account' })

    markOAuthFlowInProgress()
    await signInWithRedirect(auth, provider)
    return { ok: true, error: null }
  } catch (error) {
    console.error('Google SSO Redirect Error:', error)
    return { ok: false, error: (error as Error).message || 'Google sign-in redirect failed' }
  }
}

// ---------------------------------------------------------------------------
// OAuth redirect — Apple
// ---------------------------------------------------------------------------

export async function firebaseSignInWithApple() {
  try {
    const {
      auth,
      firebaseAuth: { OAuthProvider, signInWithRedirect },
    } = await getAuth()

    const provider = new OAuthProvider('apple.com')
    provider.addScope('name')
    provider.addScope('email')
    provider.setCustomParameters({ prompt: 'consent' })

    markOAuthFlowInProgress()
    await signInWithRedirect(auth, provider)
    return { ok: true, error: null }
  } catch (error) {
    console.error('Apple SSO Redirect Error:', error)
    return { ok: false, error: (error as Error).message || 'Apple sign-in redirect failed' }
  }
}

// ---------------------------------------------------------------------------
// OAuth redirect — Microsoft
// ---------------------------------------------------------------------------

export async function firebaseSignInWithMicrosoft() {
  try {
    const {
      auth,
      firebaseAuth: { OAuthProvider, signInWithRedirect },
    } = await getAuth()

    const provider = new OAuthProvider('microsoft.com')
    provider.setCustomParameters({ prompt: 'consent' })

    markOAuthFlowInProgress()
    await signInWithRedirect(auth, provider)
    return { ok: true, error: null }
  } catch (error) {
    console.error('Microsoft SSO Redirect Error:', error)
    return { ok: false, error: (error as Error).message || 'Microsoft sign-in redirect failed' }
  }
}

// ---------------------------------------------------------------------------
// OAuth redirect — BSQ (OIDC)
// ---------------------------------------------------------------------------

export async function firebaseSignInWithBSQAccount() {
  try {
    const {
      auth,
      firebaseAuth: { OAuthProvider, signInWithRedirect },
    } = await getAuth()

    const oidcProvider = new OAuthProvider('oidc.admin')
    oidcProvider.setCustomParameters({ prompt: 'select_account' })

    markOAuthFlowInProgress()
    await signInWithRedirect(auth, oidcProvider)
    return { ok: true, error: null }
  } catch (error) {
    console.error('BSQ OIDC Redirect Error:', error)
    return { ok: false, error: (error as Error).message || 'BSQ sign-in redirect failed' }
  }
}

// ---------------------------------------------------------------------------
// Cross-domain logout cookie
// ---------------------------------------------------------------------------

export function removeCrossOriginAutoLogoutCookie() {
  Cookies.remove(CROSS_ORIGIN_AUTO_LOGOUT, {
    domain: '.companyformationsdirect.co.uk',
    path: '/',
  })
}
