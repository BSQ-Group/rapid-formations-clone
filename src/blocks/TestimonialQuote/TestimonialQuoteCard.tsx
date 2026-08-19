import React from 'react'
import { faQuoteLeft } from '@fortawesome/pro-solid-svg-icons/faQuoteLeft'

import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { testimonialQuoteStyles as s } from './TestimonialQuote.styles'

export interface TestimonialQuoteCardProps {
  quote: string
  customerName: string
  brandLabel?: string
}

export const TestimonialQuoteCard: React.FC<TestimonialQuoteCardProps> = ({
  quote,
  customerName,
  brandLabel = 'Rapid Formations Customer',
}) => (
  <div className={s.box}>
    <div className={s.wrapper}>
      <span className={s.iconWrap}>
        <FaIcon icon={faQuoteLeft} className={s.icon} />
      </span>
      <Text as="p" textStyle="span" text={`“${quote}”`} className={s.comment} />
      <Text as="p" textStyle="span" text={customerName} className={s.author} />
      <Text as="p" textStyle="span" text={brandLabel} className={s.brand} />
    </div>
  </div>
)
