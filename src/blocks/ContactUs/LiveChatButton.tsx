'use client'

import React from 'react'

import { ctaLinkClasses } from '@/components/shared/CtaLink/CtaLink'

declare global {
  interface Window {
    HubSpotConversations?: { widget?: { open?: () => void } }
  }
}

export const LiveChatButton: React.FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => (
  <button
    type="button"
    onClick={() => window.HubSpotConversations?.widget?.open?.()}
    className={ctaLinkClasses({ size: 'md', tone: 'cyan', className })}
  >
    {label}
  </button>
)
