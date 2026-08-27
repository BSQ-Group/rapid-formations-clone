'use client'

import { useEffect } from 'react'

import { LIVE_CHAT_HREF } from '@/utilities/shortcodes'
import { openHubSpotChat } from './openHubSpotChat'

// "live chat" links rendered by the [[live-chat]] shortcode use LIVE_CHAT_HREF
// ("#live-chat"); `.open-live-chat` / `#open-hubspot` are also honoured for
// hand-authored triggers. Mounted once in the layout: one delegated listener
// opens the widget for every trigger, so no block wires its own handler.
const CHAT_TRIGGER_SELECTOR = `a[href="${LIVE_CHAT_HREF}"], a[href="#open-hubspot"], .open-live-chat`

export function LiveChatLauncher() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Let modified clicks (new tab/window) behave normally.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return
      }
      const target = event.target as HTMLElement | null
      const trigger = target?.closest(CHAT_TRIGGER_SELECTOR)
      if (!trigger) return
      // Stop the dead "#live-chat" anchor from changing the hash / scrolling.
      event.preventDefault()
      openHubSpotChat()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}

export default LiveChatLauncher
