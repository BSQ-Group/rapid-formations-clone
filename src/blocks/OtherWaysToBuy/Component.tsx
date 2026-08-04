import React from 'react'
import Link from 'next/link'

import type { OtherWaysToBuyBlock as OtherWaysToBuyBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { Button } from '@/components/ui/button'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { otherWaysToBuyStyles as s } from './OtherWaysToBuy.styles'

export const OtherWaysToBuyBlock: React.FC<OtherWaysToBuyBlockProps> = ({
  heading,
  separator,
  ways,
  sectionLayout,
}) => {
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.header}>
        <Text text={heading} as="h2" textStyle="headline-5xl" className={s.heading} />
      </div>
      <div className={s.cards}>
        {ways?.map((way, idx) => (
          <React.Fragment key={way.id ?? idx}>
            {idx > 0 && separator && (
              <Text
                text={separator}
                textStyle="span"
                asChild
                className={s.separator}
              >
                <span />
              </Text>
            )}
            <article className={s.card}>
              <Text
                text={String(idx + 1).padStart(2, '0')}
                textStyle="span"
                asChild
                className={s.cardNumber}
              >
                <span />
              </Text>
              <div className={s.cardBody}>
                <div className={s.titleAndText}>
                  <Text
                    text={way.title}
                    as="h3"
                    textStyle="body-base"
                    className={s.cardTitle}
                  />
                  {way.description && (
                    <RichText
                      data={way.description}
                      enableGutter={false}
                      enableProse={false}
                      className={s.cardDescription}
                    />
                  )}
                </div>
                {way.cta?.label && (
                  <div className={s.ctaRow}>
                    <Link
                      href={getLinkHref(way.cta as LinkData)}
                      target={way.cta.newTab ? '_blank' : undefined}
                      rel={way.cta.newTab ? 'noopener noreferrer' : undefined}
                      className={s.ctaButton}
                    >
                      <Button variant="primary" size="md" className="w-full md:w-auto">
                        {way.cta.label}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </article>
          </React.Fragment>
        ))}
      </div>
    </SectionWrapper>
  )
}
