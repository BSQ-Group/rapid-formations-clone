import React from 'react'

import type { OfficePhotoAddressBlock as OfficePhotoAddressBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Media } from '@/components/Media'
import { officePhotoAddressStyles as s } from './OfficePhotoAddress.styles'

export const OfficePhotoAddressBlock: React.FC<OfficePhotoAddressBlockProps> = ({
  eyebrow,
  address,
  image,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.content}>
        <div className={s.imageWrap}>
          {image && typeof image === 'object' && (
            <Media resource={image} fill imgClassName={s.image} />
          )}
        </div>
        <div className={s.textCol}>
          {eyebrow && (
            <Text text={eyebrow} textStyle="span" className={s.eyebrow} />
          )}
          {address && (
            <Text text={address} textStyle="span" as="div" className={s.address} />
          )}
        </div>
      </div>
    </SectionWrapper>
  )
}
