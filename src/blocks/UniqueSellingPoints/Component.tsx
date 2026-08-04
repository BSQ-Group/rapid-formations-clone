import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import type { UniqueSellingPointsBlock as UniqueSellingPointsBlockProps } from '@/payload-types'

import Text from '@/components/shared/Text'
import { SnapCarousel } from '@/components/shared/SnapCarousel/SnapCarousel'
import { cn } from '@/utilities/ui'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { uniqueSellingPointsStyles as s } from './UniqueSellingPoints.styles'

export const UniqueSellingPointsBlock: React.FC<UniqueSellingPointsBlockProps> = ({ points }) => {
  if (!points?.length) return null

  return (
    <section className={s.section}>
      <SnapCarousel
        label="Why choose us"
        className={s.grid}
        slideClassName={s.slide}
        dotsClassName={s.dots}
      >
        {points.map((point, index) => {
          const icon = point.icon
          const href = point.link ? getLinkHref(point.link as LinkData) : null

          const body = (
            <>
              {icon && typeof icon === 'object' && icon.url ? (
                <Image
                  src={getMediaUrl(icon.url)}
                  alt={icon.alt || point.title}
                  width={90}
                  height={90}
                  className={s.icon}
                  unoptimized
                  loading="eager"
                />
              ) : (
                <div className={s.icon} aria-hidden />
              )}
              <Text as="h3" textStyle="span" text={point.title} className={s.title} />
              <Text as="p" textStyle="span" text={point.description} className={s.description} />
            </>
          )

          if (href && href !== '#') {
            return (
              <Link
                key={point.id ?? index}
                href={href}
                className={cn(s.item, s.itemHover)}
                {...(point.link?.newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {body}
              </Link>
            )
          }

          return (
            <div key={point.id ?? index} className={s.item}>
              {body}
            </div>
          )
        })}
      </SnapCarousel>
    </section>
  )
}
