import React from 'react'
import { faBusinessTime } from '@fortawesome/pro-solid-svg-icons/faBusinessTime'

import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { sameDayIncorporationStyles as s } from './SameDayIncorporation.styles'

export const SameDayIncorporationCard: React.FC<{
  heading: string
  body: React.ReactNode
}> = ({ heading, body }) => (
  <div className={s.card}>
    <div className={s.content}>
      <Text as="h3" textStyle="span" text={heading} className={s.heading} />
      {body}
    </div>
    <div className={s.iconWrap}>
      <FaIcon icon={faBusinessTime} className={s.icon} />
    </div>
    <div className={s.bubble} aria-hidden />
  </div>
)
