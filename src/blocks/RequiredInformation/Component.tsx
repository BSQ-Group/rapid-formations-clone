import React from 'react'

import type { RequiredInformationBlock as RequiredInformationBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { requiredInformationStyles as s } from './RequiredInformation.styles'

export const RequiredInformationBlock: React.FC<RequiredInformationBlockProps> = ({
  heading,
  subheading,
  items,
  cta,
  sectionLayout,
}) => {
  const ctaHref = getLinkHref(cta as LinkData | undefined)

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.header}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
          {subheading && (
            <Text as="p" textStyle="span" text={subheading} className={s.subheading} />
          )}
        </div>
        <ul className={s.grid}>
          {items?.map((item, index) => (
            <li key={item.id ?? index} className={s.card}>
              {item.image && (
                <Media
                  resource={item.image}
                  alt={(typeof item.image === 'object' && item.image.alt) || item.title}
                  imgClassName={s.cardImage}
                  loading="lazy"
                />
              )}
              <div className={s.cardBody}>
                <Text as="h3" textStyle="span" text={item.title} className={s.cardTitle} />
                {item.description && (
                  <RichText
                    data={item.description}
                    enableGutter={false}
                    enableProse={false}
                    className={s.cardCopy}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
        {cta?.label && (
          <div className={s.ctaWrap}>
            <CtaLink
              href={ctaHref}
              label={cta.label}
              newTab={cta.newTab}
              size="lg"
              tone="success"
            />
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}
