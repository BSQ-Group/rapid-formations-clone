import React from 'react'

export const InfoDisc = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <circle cx="12" cy="12" r="12" fill="currentColor" />
    <circle cx="12" cy="6.6" r="1.5" fill="#fff" />
    <rect x="10.5" y="9.6" width="3" height="8.4" rx="1.5" fill="#fff" />
  </svg>
)
