import React from 'react'

import type { BCorpCertificationBlock as BCorpCertificationBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { Media } from '@/components/Media'
import Image from 'next/image'
import { bCorpCertificationStyles as s } from './BCorpCertification.styles'

export const BCorpCertificationBlock: React.FC<BCorpCertificationBlockProps> = ({
  backgroundImage,
  badge,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.banner}>
        {backgroundImage && typeof backgroundImage === 'object' && (
          <Media resource={backgroundImage} fill imgClassName={s.backgroundImage} />
        )}
        <div className={s.darkOverlay} />
        {badge && typeof badge === 'object' && badge.url && (
          <div className={s.badgeWrapper}>
            <div className={s.badgeImage}>
              <Image
                src={badge.url}
                alt={badge.alt || 'B Corp Certification'}
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
