import React from 'react'
import { ArrowRight } from 'lucide-react'

import type { CallOutCTABlock as CallOutCTABlockProps } from '@/payload-types'

import { Button } from '@/components/ui/button'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { callOutCTAStyles as s } from './CallOutCTA.styles'

type Props = CallOutCTABlockProps

export const CallOutCTABlock: React.FC<Props> = ({ heading, image, searchPlaceholder, sectionLayout }) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.card}>
        {/* Image — top on mobile, right column on desktop (via flex-row-reverse) */}
        {image && (
          <div className={s.imageWrapper}>
            <Media
              resource={image}
              fill
              imgClassName={s.image}
            />
          </div>
        )}

        {/* Content — bottom on mobile, left column on desktop */}
        <div className={s.content}>
          <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />

          <div className={s.searchInput}>
            <input
              type="text"
              placeholder={searchPlaceholder || 'Enter company name'}
              className={s.searchInputField}
            />
            <Button variant="primary" size="icon" aria-label="Check company name availability" className={s.searchButton}>
              <ArrowRight size={24} className={s.searchButtonIcon} />
            </Button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
