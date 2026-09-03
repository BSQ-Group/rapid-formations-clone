import React from 'react'

import type { ClosingCTABlock as ClosingCTAProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { TELEPHONE_HREF, TELEPHONE_NUMBER } from '@/utilities/shortcodes'
import { cn } from '@/utilities/ui'
import { closingCTAStyles as s, closingCTAVariants } from './ClosingCTA.styles'

/**
 * The description is plain text, so a phone number in it arrives as characters
 * rather than a link — [[telephone]] has already resolved to the bare number by the
 * time this renders. Split it back out so the number dials when it is tapped.
 */
const withTelephoneLink = (text: string): React.ReactNode[] =>
  text.split(TELEPHONE_NUMBER).flatMap((part, index) =>
    index === 0
      ? [part]
      : [
          <a key={index} href={TELEPHONE_HREF} className={s.telephone}>
            {TELEPHONE_NUMBER}
          </a>,
          part,
        ],
  )

export const ClosingCTA: React.FC<ClosingCTAProps> = ({
  heading,
  description,
  cta,
  variant,
  sectionLayout,
}) => {
  const ctaHref = getLinkHref(cta as LinkData | undefined)
  const styles = closingCTAVariants[variant ?? 'standard'] ?? closingCTAVariants.standard
  const isPanel = variant === 'panel'

  return (
    <SectionWrapper {...sectionLayout} className={cn(s.section, styles.section)}>
      <Container>
        <div className={s.wrapper}>
          <Text
            as={isPanel ? 'h2' : 'h3'}
            textStyle="span"
            text={heading}
            className={cn(s.heading, styles.heading)}
          />
          {description && (
            <Text
              as={isPanel ? 'h4' : 'p'}
              textStyle="span"
              className={cn(s.description, styles.description)}
            >
              {withTelephoneLink(description)}
            </Text>
          )}
          {cta?.label && (
            <div className={s.ctaWrap}>
              <CtaLink
                href={ctaHref}
                label={cta.label}
                newTab={cta.newTab}
                size={isPanel ? 'lg' : 'md'}
                tone="success"
              />
            </div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
