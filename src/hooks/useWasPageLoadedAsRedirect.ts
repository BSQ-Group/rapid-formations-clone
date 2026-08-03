import { useSyncExternalStore } from 'react'

const OAUTH_TIMEOUT_MS = 5 * 60 * 1000

let cachedRedirectState: boolean | null = null

const computeRedirectState = (): boolean => {
  if (typeof sessionStorage === 'undefined') return false

  const oauthFlowTimestamp = sessionStorage.getItem('oauth_flow_in_progress')
  if (!oauthFlowTimestamp) return false

  const timestamp = parseInt(oauthFlowTimestamp, 10)
  const isValid = !isNaN(timestamp) && Date.now() - timestamp < OAUTH_TIMEOUT_MS

  if (!isValid) {
    sessionStorage.removeItem('oauth_flow_in_progress')
  }

  return isValid
}

const getRedirectState = (): boolean => {
  if (cachedRedirectState === null) {
    cachedRedirectState = computeRedirectState()
  }
  return cachedRedirectState
}

const subscribe = () => () => {}

const getServerRedirectState = () => false

const useWasPageLoadedAsRedirect = (): boolean =>
  useSyncExternalStore(subscribe, getRedirectState, getServerRedirectState)

export default useWasPageLoadedAsRedirect
