// Opens the HubSpot Conversations widget (loaded via GTM/HubSpot script). Queues
// via `hsConversationsOnReady` if the API isn't ready yet. No-op on the server
// and a safe no-op until the chat integration is enabled on the clone.

interface HubSpotWidget {
  status?: () => { loaded?: boolean; pending?: boolean }
  load?: (options?: { widgetOpen?: boolean }) => void
  open?: () => void
}

interface HubSpotConversations {
  widget?: HubSpotWidget
}

interface HubSpotWindow extends Window {
  HubSpotConversations?: HubSpotConversations
  hsConversationsOnReady?: Array<() => void>
}

function openWidget(w: HubSpotWindow): void {
  const widget = w.HubSpotConversations?.widget
  if (!widget) return
  // Present-but-not-loaded (no always-visible launcher) → load it opened;
  // otherwise open the already-loaded widget.
  const status = widget.status?.()
  if (status && status.loaded === false) {
    widget.load?.({ widgetOpen: true })
  } else {
    widget.open?.()
  }
}

export function openHubSpotChat(): void {
  if (typeof window === 'undefined') return
  const w = window as HubSpotWindow

  if (w.HubSpotConversations) {
    openWidget(w)
    return
  }

  // API not ready yet — queue until HubSpot Conversations initialises.
  w.hsConversationsOnReady = w.hsConversationsOnReady || []
  w.hsConversationsOnReady.push(() => openWidget(w))
}
