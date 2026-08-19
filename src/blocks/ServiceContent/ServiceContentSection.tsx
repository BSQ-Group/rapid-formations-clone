import React from 'react'
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons/faAngleRight'
import { faCheck } from '@fortawesome/pro-solid-svg-icons/faCheck'

import type { ServiceContentBlock } from '@/payload-types'

import RichText from '@/components/RichText'
import { FaIcon } from '@/components/shared/FaIcon'
import { cn } from '@/utilities/ui'
import { serviceContentStyles as s } from './ServiceContent.styles'

type Section = NonNullable<ServiceContentBlock['sections']>[number]

const icons = { check: faCheck, chevron: faAngleRight } as const

const colours = {
  green: s.iconGreen,
  subtle: s.iconSubtle,
  inherit: s.iconInherit,
} as const

export const ServiceContentSection: React.FC<{ section: Section }> = ({ section }) => {
  const name = section.icon && section.icon !== 'none' ? section.icon : undefined
  const icon = name ? icons[name] : undefined

  return (
    <div className={s.item}>
      <RichText
        data={section.content}
        enableGutter={false}
        enableProse={false}
        className={cn(s.content, icon ? s.iconList : s.bulleted)}
        listItemIcon={
          icon ? (
            <FaIcon
              icon={icon}
              className={cn(s.icon, colours[section.iconColour ?? 'inherit'] ?? s.iconInherit)}
            />
          ) : undefined
        }
      />
    </div>
  )
}
