import React from 'react'
import Link from 'next/link'
import { faShare } from '@fortawesome/pro-solid-svg-icons/faShare'
import { faUserPlus } from '@fortawesome/pro-solid-svg-icons/faUserPlus'

import type { PurchaseAnAddressBlock } from '@/payload-types'

import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { purchaseAnAddressStyles as s } from './PurchaseAnAddress.styles'

type Method = NonNullable<PurchaseAnAddressBlock['methods']>[number]

const icons = { share: faShare, userPlus: faUserPlus } as const

const circles = { cyan: s.circleCyan, green: s.circleGreen } as const

export const PurchaseAnAddressCard: React.FC<{ method: Method }> = ({ method }) => {
  const cta = method.cta as LinkData | undefined

  return (
    <div className={s.card}>
      <span className={cn(s.circle, circles[method.iconColour ?? 'cyan'] ?? s.circleCyan)}>
        <FaIcon icon={icons[method.icon ?? 'share'] ?? faShare} className={s.icon} />
      </span>
      <Text as="h3" textStyle="span" text={method.title} className={s.title} />
      <Text as="p" textStyle="span" text={method.body} className={s.body} />
      {cta?.label && (
        <Button variant="success" size="promo" className={s.cta} asChild>
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
