import React from 'react'
import Image from 'next/image'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import type { SupportBlock as SupportBlockProps, Media } from '@/payload-types'
import { supportStyles as s } from './Support.styles'

type Props = SupportBlockProps

function getMediaUrl(media: string | Media | null | undefined): string {
  if (!media || typeof media !== 'object') return ''
  return media.url ?? ''
}

function getMediaAlt(media: string | Media | null | undefined): string {
  if (!media || typeof media !== 'object') return ''
  return media.alt ?? ''
}

export const SupportBlock: React.FC<Props> = ({ heading, image, stats, sectionLayout }) => {
  return (
    <SectionWrapper {...sectionLayout}>
      <div className={s.section}>
        {heading && (
          <div className={s.header}>
            <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />
          </div>
        )}
        {image && getMediaUrl(image) && (
          <div className={s.imageWrapper}>
            <Image src={getMediaUrl(image)} alt={getMediaAlt(image)} fill className={s.image} />
          </div>
        )}
        {stats && stats.length > 0 && (
          <div className={s.statsList}>
            {stats.map((stat, index) => (
              <div key={stat.id ?? index} className={s.statItem}>
                <Text textStyle="statistic-7xl" text={stat.value} className={s.statValue} />
                <Text textStyle="body-base" text={stat.label} className={s.statLabel} />
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
