import { useRef } from 'react'

const OAUTH_TIMEOUT_MS = 5 * 60 * 1000

const useWasPageLoadedAsRedirect = (): boolean => {
  const initialRedirectState = useRef<boolean | null>(null)

  if (initialRedirectState.current === null) {
    let isRedirect = false

    if (typeof sessionStorage !== 'undefined') {
      const oauthFlowTimestamp = sessionStorage.getItem('oauth_flow_in_progress')

      if (oauthFlowTimestamp) {
        const timestamp = parseInt(oauthFlowTimestamp, 10)
        const now = Date.now()
        const isValid = !isNaN(timestamp) && now - timestamp < OAUTH_TIMEOUT_MS

        isRedirect = isValid

        if (!isValid) {
          sessionStorage.removeItem('oauth_flow_in_progress')
        }
      }
    }

    initialRedirectState.current = isRedirect
  }

  return initialRedirectState.current ?? false
}

export default useWasPageLoadedAsRedirect
