'use client'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleOneTap } from './index'
import { Suspense } from 'react'

export function GoogleOneTapProvider() {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

  if (!clientId) return null

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Suspense fallback={null}>
        <GoogleOneTap />
      </Suspense>
    </GoogleOAuthProvider>
  )
}
