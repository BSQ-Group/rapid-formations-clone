import mixpanel from 'mixpanel-browser'

const TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN
let ready = false

export function init(): void {
  if (typeof window === 'undefined' || !TOKEN || ready) return
  mixpanel.init(TOKEN, {
    api_host: 'https://api-eu.mixpanel.com',
    track_pageview: false,
    persistence: 'localStorage',
    ignore_dnt: false,
  })
  ready = true
}

export function track(event: string, properties?: Record<string, unknown>): void {
  if (!ready) return
  mixpanel.track(event, properties)
}

export function identify(userId: string, traits?: Record<string, unknown>): void {
  if (!ready) return
  mixpanel.identify(userId)
  if (traits) mixpanel.people.set(traits)
}

export function reset(): void {
  if (!ready) return
  mixpanel.reset()
}
