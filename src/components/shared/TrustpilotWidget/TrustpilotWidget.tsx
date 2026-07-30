'use client'

import Script from 'next/script'
import { useRef } from 'react'
import { useTrustpilotWidget, TRUSTPILOT_SCRIPT_URL } from '@/hooks/useTrustpilotWidget'
import {
  TRUSTPILOT_BUSINESS_UNIT_ID,
  TRUSTPILOT_REVIEW_URL,
  TRUSTPILOT_TEMPLATE_IDS,
  type TrustpilotTemplate,
} from './constants'

interface TrustpilotWidgetProps {
  template: TrustpilotTemplate
  theme?: 'light' | 'dark'
  height: string
  width: string
  token?: string
  locale?: string
  businessUnitId?: string
  /** Filter to only show reviews with these star ratings (e.g. "5" or "4,5"). Carousel/review-list templates only. */
  stars?: string
  /** Filter reviews by language code (e.g. "en"). Carousel/review-list templates only. */
  reviewLanguages?: string
  className?: string
}

export function TrustpilotWidget({
  template,
  theme = 'light',
  height,
  width,
  token,
  locale = 'en-GB',
  businessUnitId = TRUSTPILOT_BUSINESS_UNIT_ID,
  stars,
  reviewLanguages,
  className,
}: TrustpilotWidgetProps) {
  const widgetRef = useRef<HTMLDivElement>(null)
  const { containerRef, inView } = useTrustpilotWidget([widgetRef])

  return (
    <div ref={containerRef} className={className}>
      {inView && <Script src={TRUSTPILOT_SCRIPT_URL} strategy="lazyOnload" />}
      <div
        ref={widgetRef}
        className="trustpilot-widget"
        data-locale={locale}
        data-template-id={TRUSTPILOT_TEMPLATE_IDS[template]}
        data-businessunit-id={businessUnitId}
        data-style-height={height}
        data-style-width={width}
        data-theme={theme}
        {...(token ? { 'data-token': token } : {})}
        {...(stars ? { 'data-stars': stars } : {})}
        {...(reviewLanguages ? { 'data-review-languages': reviewLanguages } : {})}
      >
        <a href={TRUSTPILOT_REVIEW_URL} target="_blank" rel="noopener noreferrer">
          Trustpilot
        </a>
      </div>
    </div>
  )
}
