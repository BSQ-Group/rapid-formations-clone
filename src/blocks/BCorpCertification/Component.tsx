import React from 'react'

import type { BCorpCertificationBlock as BCorpCertificationBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { bCorpCertificationStyles as s } from './BCorpCertification.styles'

export const BCorpCertificationBlock: React.FC<BCorpCertificationBlockProps> = ({
  backgroundImage,
  caption,
  badge,
  badgeUrl,
  badgeLinkTitle,
  sectionLayout,
}) => {
  const hasBadge = badge && typeof badge === 'object'
  const isExternal = Boolean(badgeUrl && /^https?:\/\//.test(badgeUrl))

  const badgeImage = hasBadge ? <Media resource={badge} imgClassName={s.badgeImage} /> : null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.banner}>
        {backgroundImage && typeof backgroundImage === 'object' && (
          <Media
            resource={backgroundImage}
            fill
            className={s.backgroundWrapper}
            imgClassName={s.backgroundImage}
          />
        )}
        <div className={s.overlay} />
        {caption && <Text text={caption} textStyle="span" className={s.caption} />}
        {badgeUrl ? (
          <a
            href={badgeUrl}
            className={s.badgeLink}
            title={badgeLinkTitle || undefined}
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {badgeImage}
          </a>
        ) : (
          <div className={s.badgeLink}>{badgeImage}</div>
        )}
      </div>
    </SectionWrapper>
  )
}
