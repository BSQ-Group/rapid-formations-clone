'use client'

import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import Cookies from 'js-cookie'
import { User } from 'firebase/auth'
import { isTokenExpired } from '@/utilities/jwtUtils'

export const TOKEN_COOKIE = 'TOKEN_COOKIE'
export const TOKEN_OVERRIDE = 'TOKEN_OVERRIDE'
export const LOCAL_STORAGE_USER_EMAIL = 'LOCAL_STORAGE_USER_EMAIL'

const DEV_AUTH_OVERRIDE =
  process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_AUTH_TOKEN_OVERRIDE : undefined

export const isServer = typeof window === 'undefined'

interface AuthState {
  user: User | null
  email: string
  _ts: number
  getToken: () => string | null
  setToken: (t: string | null) => void
  setUser: (u: User | null) => void
  setEmail: (e: string | null) => void
  triggerReRender: () => void
  clear: () => void
}

const getTokenFromCookie = () => {
  if (isServer) return null

  const bsqUserTokenOverride = Cookies.get(TOKEN_OVERRIDE)
  if (bsqUserTokenOverride) {
    return bsqUserTokenOverride
  }

  if (DEV_AUTH_OVERRIDE) {
    const isExpired = isTokenExpired(DEV_AUTH_OVERRIDE)
    if (isExpired !== false) {
      console.warn('[AUTH_OVERRIDE] Token is expired or malformed! Falling back to cookie auth.')
    } else {
      return DEV_AUTH_OVERRIDE
    }
  }

  return Cookies.get(TOKEN_COOKIE) ?? null
}

export const useAuthState = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        _ts: 0,
        user: null,
        email: isServer ? '' : (localStorage.getItem(LOCAL_STORAGE_USER_EMAIL) ?? ''),

        getToken: getTokenFromCookie,

        setToken: (token) => {
          if (token) {
            Cookies.set(TOKEN_COOKIE, token, {
              expires: 1 / 24,
              sameSite: 'lax' as const,
              secure: true,
              path: '/',
            })
          } else {
            Cookies.remove(TOKEN_COOKIE, {
              sameSite: 'lax' as const,
              secure: true,
              path: '/',
            })
          }
          set({ _ts: Date.now() })
        },

        setUser: (user) => set({ user }),

        setEmail: (email) => {
          const emailValue = email ?? ''
          set({ email: emailValue })
          if (!isServer) {
            localStorage.setItem(LOCAL_STORAGE_USER_EMAIL, emailValue)
          }
        },

        triggerReRender: () => {
          set({ _ts: Date.now() })
        },

        clear: () => {
          Cookies.remove(TOKEN_COOKIE, {
            sameSite: 'lax' as const,
            secure: true,
            path: '/',
          })
          Cookies.remove(TOKEN_OVERRIDE, {
            sameSite: 'lax' as const,
            secure: true,
            path: '/',
          })
          localStorage.removeItem(LOCAL_STORAGE_USER_EMAIL)
          set({ _ts: Date.now(), user: null, email: '' })
        },
      }),
      {
        name: 'auth-storage',
        partialize: (s) => ({ email: s.email, user: s.user }),
      },
    ),
    { name: 'Auth Store', enabled: process.env.NODE_ENV === 'development' },
  ),
)

export const useToken = () => {
  const _ts = useAuthState((state) => state._ts)
  void _ts
  return getTokenFromCookie()
}

export const getAuthState = useAuthState.getState
export const getUser = () => useAuthState.getState().user
export const getToken = () => getTokenFromCookie()
export const getEmail = () => useAuthState.getState().email
export const triggerReRender = () => useAuthState.getState().triggerReRender()

export const selectToken = (state: AuthState) => {
  void state._ts
  return getTokenFromCookie()
}
