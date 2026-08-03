import React from 'react'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { TrustpilotWidget } from '@/components/shared/TrustpilotWidget'
import type { TestimonialBannerBlock as TestimonialBannerBlockProps } from '@/payload-types'
import { testimonialBannerStyles as s } from './TestimonialBanner.styles'

const QuoteMarkIcon: React.FC = () => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    aria-hidden
  >
    <path
      d="M10.6952 21.0909H6.50272L0 8.42781V0H10.4385V10.3958H7.27272L10.6952 21.0909ZM24 21.0909H19.8075L13.3048 8.42781V0H23.7433V10.3958H20.5775L24 21.0909Z"
      transform="translate(4 5.45)"
      fill="currentColor"
    />
  </svg>
)

export const TestimonialBannerBlock: React.FC<TestimonialBannerBlockProps> = ({
  quote,
  authorName,
  authorRole,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.tpPanel}>
          <TrustpilotWidget
            template="mini"
            theme="light"
            height="140px"
            width="270px"
            className={s.tpWidget}
          />
        </div>
        <div className={s.quoteCol}>
          <div className={s.quoteAndMark}>
            <div className={s.quoteMark}>
              <QuoteMarkIcon />
            </div>
            <Text
              as="p"
              textStyle="headline-2xl"
              text={`“${quote}”`}
              className={s.quoteText}
            />
          </div>
          <div className={s.footer}>
            <Text as="p" textStyle="body-lg" text={authorName} className={s.authorName} />
            {authorRole && (
              <Text as="p" textStyle="body-base" text={authorRole} className={s.authorRole} />
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
