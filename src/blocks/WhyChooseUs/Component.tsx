import React from 'react'
import type { WhyChooseUsBlock as WhyChooseUsBlockProps, Media } from '@/payload-types'
import Image from 'next/image'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { whyChooseUsStyles as s } from './WhyChooseUs.styles'

type Props = WhyChooseUsBlockProps

function getIconUrl(icon: (string | null) | Media | undefined): string {
  if (!icon || typeof icon !== 'object') return ''
  return icon.url ?? ''
}

function getIconAlt(icon: (string | null) | Media | undefined, fallback: string): string {
  if (!icon || typeof icon !== 'object') return fallback
  return icon.alt ?? fallback
}

export const WhyChooseUsBlock: React.FC<Props> = ({ heading, description, features, sectionLayout }) => {
  if (!features?.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.header}>
        {heading && <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />}
        {description && <Text textStyle="body-sm" text={description} className={s.description} />}
      </div>
      <div className={s.grid}>
        {features.map((feature, index) => {
          const iconUrl = getIconUrl(feature.icon)
          return (
            <div key={feature.id ?? index} className={s.card}>
              {iconUrl && (
                <div className={s.iconContainer}>
                  <Image
                    src={iconUrl}
                    alt={getIconAlt(feature.icon, feature.title)}
                    width={156}
                    height={156}
                    className={s.icon}
                    unoptimized
                  />
                </div>
              )}
              <Text as="h3" textStyle="headline-xl" text={feature.title} className={s.cardTitle} />
              <Text textStyle="body-sm" text={feature.description} className={s.cardDescription} />
            </div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
