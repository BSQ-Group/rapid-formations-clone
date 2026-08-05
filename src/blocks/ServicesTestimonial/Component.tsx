import React from 'react'
import type { ServicesTestimonialBlock as ServicesTestimonialBlockProps } from '@/payload-types'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { TrustpilotWidget } from '@/components/shared/TrustpilotWidget'
import { servicesTestimonialStyles as s } from './ServicesTestimonial.styles'
import IconQuoteMark from '@/assets/icons/iconQuoteMark.svg'

export const ServicesTestimonialBlock: React.FC<ServicesTestimonialBlockProps> = ({
  quoteText,
  authorName,
  authorRole,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.tpPanel}>
          <TrustpilotWidget
            template="mini"
            theme="light"
            height="110px"
            width="200px"
            className="w-full flex items-center justify-center"
          />
        </div>
        <div className={s.quoteCol}>
          <div className={s.quoteAndMark}>
            <div className={s.quoteMark} aria-hidden>
              <IconQuoteMark width={64} height={64} className="shrink-0" />
            </div>
            <Text
              as="p"
              textStyle="span"
              text={`\u201C${quoteText}\u201D`}
              className={s.quoteText}
            />
          </div>
          <div className={s.footer}>
            <div>
              <Text textStyle="body-sm" text={authorName} className={s.authorName} />
              {authorRole && (
                <Text textStyle="body-sm" as="p" text={authorRole} className={s.authorRole} />
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
