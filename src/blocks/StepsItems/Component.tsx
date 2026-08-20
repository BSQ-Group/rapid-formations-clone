import React from 'react'
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons/faAngleRight'
import { faDotCircle } from '@fortawesome/pro-solid-svg-icons/faDotCircle'
import { faFile } from '@fortawesome/pro-solid-svg-icons/faFile'
import { faFileChartLine } from '@fortawesome/pro-solid-svg-icons/faFileChartLine'
import { faFlag } from '@fortawesome/pro-solid-svg-icons/faFlag'
import { faMapMarker } from '@fortawesome/pro-solid-svg-icons/faMapMarker'
import { faSearch } from '@fortawesome/pro-solid-svg-icons/faSearch'
import { faShoppingCart } from '@fortawesome/pro-solid-svg-icons/faShoppingCart'
import { faUser } from '@fortawesome/pro-solid-svg-icons/faUser'
import { faUsers } from '@fortawesome/pro-solid-svg-icons/faUsers'

import type { StepsItemsBlock as StepsItemsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { stepsItemsStyles as s } from './StepsItems.styles'

export type StepsItem = NonNullable<StepsItemsBlockProps['steps']>[number]

const icons = {
  mapMarker: faMapMarker,
  fileChartLine: faFileChartLine,
  user: faUser,
  users: faUsers,
  file: faFile,
  dotCircle: faDotCircle,
  search: faSearch,
  shoppingCart: faShoppingCart,
  flag: faFlag,
} as const

const iconColours = {
  cyan: s.iconCyan,
  green: s.iconGreen,
  orange: s.iconOrange,
  magenta: s.iconMagenta,
  blue: s.iconBlue,
} as const

export const StepsItemRow: React.FC<{ step: StepsItem }> = ({ step }) => {
  const icon = icons[step.icon ?? 'file'] ?? faFile
  const colour = iconColours[step.iconColour ?? 'cyan'] ?? s.iconCyan
  const subtitle = step.subtitle?.trim()

  return (
    <div className={s.item}>
      <div className={s.title}>
        <span className={cn(s.icon, colour, subtitle && s.iconAlignTop)}>
          <FaIcon icon={icon} className={s.iconGlyph} />
        </span>
        <Text as="h2" textStyle="span" className={s.heading}>
          {step.heading}
          {subtitle && <Text textStyle="span" text={subtitle} className={s.subtitle} />}
        </Text>
      </div>
      <RichText
        data={step.content}
        enableGutter={false}
        enableProse={false}
        className={s.content}
        listItemIcon={<FaIcon icon={faAngleRight} className={s.contentIcon} />}
      />
    </div>
  )
}

export const StepsItemsBlock: React.FC<StepsItemsBlockProps> = ({ steps, sectionLayout }) => {
  const rows = steps ?? []

  if (!rows.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.list}>
          {rows.map((step, index) => (
            <StepsItemRow key={step.id ?? index} step={step} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
