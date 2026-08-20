import React from 'react'
import Link from 'next/link'
import { faChevronRight } from '@fortawesome/pro-solid-svg-icons/faChevronRight'
import { faLock } from '@fortawesome/pro-solid-svg-icons/faLock'
import { faUserPlus } from '@fortawesome/pro-solid-svg-icons/faUserPlus'

import type { OnlineAdminPortalBlock } from '@/payload-types'

import RichText from '@/components/RichText'
import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { onlineAdminPortalStyles as s } from './OnlineAdminPortal.styles'

type Panel = NonNullable<OnlineAdminPortalBlock['items']>[number]

const icons = { lock: faLock, userPlus: faUserPlus } as const

const circles = { cyan: s.circleCyan, green: s.circleGreen } as const

const ctaVariants = { green: 'success', blue: 'promo' } as const

const ctaSlots = { green: undefined, blue: s.ctaBlue } as const

export const OnlineAdminPortalPanel: React.FC<{ panel: Panel }> = ({ panel }) => {
  const isFull = panel.width === 'full'
  const name = panel.icon && panel.icon !== 'none' ? panel.icon : undefined
  const icon = name ? icons[name] : undefined
  const cta = panel.cta as LinkData | undefined

  return (
    <div className={isFull ? s.full : s.half}>
      <div className={isFull ? undefined : s.halfBody}>
        {icon && (
          <span className={cn(s.circle, circles[panel.iconColour ?? 'cyan'] ?? s.circleCyan)}>
            <FaIcon icon={icon} className={s.icon} />
          </span>
        )}
        <Text
          as="h3"
          textStyle="span"
          text={panel.title}
          className={isFull ? s.titleFull : s.titleHalf}
        />
        <RichText
          data={panel.content}
          enableGutter={false}
          enableProse={false}
          className={cn(s.content, !isFull && s.contentCentred)}
          listItemIcon={<FaIcon icon={faChevronRight} className={s.listIcon} />}
        />
      </div>
      {cta?.label && (
        <Button
          variant={ctaVariants[panel.ctaStyle ?? 'green'] ?? 'success'}
          size="promo"
          className={cn(s.cta, ctaSlots[panel.ctaStyle ?? 'green'])}
          asChild
        >
          <Link
            href={getLinkHref(cta)}
            target={cta.newTab ? '_blank' : undefined}
            rel={cta.newTab ? 'noopener noreferrer' : undefined}
          >
            {cta.label}
          </Link>
        </Button>
      )}
    </div>
  )
}
