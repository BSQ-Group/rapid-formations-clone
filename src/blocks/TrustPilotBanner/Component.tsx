'use client'

import React, { useRef } from 'react'
import Script from 'next/script'
import { useTrustpilotWidget, TRUSTPILOT_SCRIPT_URL } from '@/hooks/useTrustpilotWidget'

import type { TrustPilotBannerBlock as TrustPilotBannerBlockProps } from '@/payload-types'
import { trustPilotBannerStyles as s } from './TrustPilotBanner.styles'

// Trustpilot TrustBox template IDs
// Horizontal expands to "Excellent ★★★★★ 4.8 out of 5 based on N reviews ★ Trustpilot"
// when its container is ≥ ~860px; below that it drops the score/reviews text.
const HORIZONTAL_TEMPLATE_ID = '5406e65db0d04a09e042d5fc'
const MICRO_TRUST_SCORE_TEMPLATE_ID = '5419b637fa0340045cd0c936'

export const TrustPilotBannerBlock: React.FC<TrustPilotBannerBlockProps> = ({
  businessUnitId,
  locale,
}) => {
  const widgetLocale = locale ?? 'en-GB'
  const comboRef = useRef<HTMLDivElement>(null)
  const scoreRef = useRef<HTMLDivElement>(null)
  const { containerRef, inView } = useTrustpilotWidget([comboRef, scoreRef])

  return (
    <div ref={containerRef} className={s.banner}>
      {inView && <Script src={TRUSTPILOT_SCRIPT_URL} strategy="lazyOnload" />}

      <div className={s.comboWrapper}>
        <div
          ref={comboRef}
          className="trustpilot-widget"
          data-locale={widgetLocale}
          data-template-id={HORIZONTAL_TEMPLATE_ID}
          data-businessunit-id={businessUnitId}
          data-style-height="28px"
          data-style-width="100%"
          data-theme="dark"
        >
          <a
            href="https://uk.trustpilot.com/review/www.qualitycompanyformations.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trustpilot
          </a>
        </div>
      </div>

      <div className={s.scoreWrapper}>
        <div
          ref={scoreRef}
          className="trustpilot-widget"
          data-locale={widgetLocale}
          data-template-id={MICRO_TRUST_SCORE_TEMPLATE_ID}
          data-businessunit-id={businessUnitId}
          data-style-height="20px"
          data-style-width="100%"
          data-theme="dark"
        >
          <a
            href="https://uk.trustpilot.com/review/www.qualitycompanyformations.co.uk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trustpilot
          </a>
        </div>
      </div>
    </div>
  )
}
