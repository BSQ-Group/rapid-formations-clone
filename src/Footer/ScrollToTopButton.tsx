'use client'

import React from 'react'

import { footerStyles as s } from './Footer.styles'
import { CircleArrowUpIcon } from './icons'

export function ScrollToTopButton() {
  return (
    <div className={s.scrollToTopRow}>
      <button
        type="button"
        className={s.scrollToTopButton}
        aria-label="Scroll to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <CircleArrowUpIcon className={s.scrollToTopIcon} />
      </button>
    </div>
  )
}
