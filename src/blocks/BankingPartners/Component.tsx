import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import type { BankingPartnersBlock as BankingPartnersBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { bankingPartnersStyles as s } from './BankingPartners.styles'

export const BankingPartnersBlock: React.FC<BankingPartnersBlockProps> = ({
  heading,
  subheading,
  backgroundPattern,
  banks,
  cta,
  sectionLayout,
}) => {
  const ctaHref = getLinkHref(cta as LinkData | undefined)
  const patternUrl =
    backgroundPattern && typeof backgroundPattern === 'object'
      ? getMediaUrl(backgroundPattern.url)
      : ''

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
          {banks?.map((bank, index) => {
            const style: React.CSSProperties = { backgroundColor: bank.brandColour }
            if (patternUrl) {
              style.backgroundImage = `url(${patternUrl})`
              style.backgroundPosition = `${10 + ((index * 37) % 80)}% -${100 + ((index * 101) % 291)}px`
            }
            const face = (
              <>
                {bank.logo && (
                  <Media
                    resource={bank.logo}
                    alt={(typeof bank.logo === 'object' && bank.logo.alt) || `${bank.name} logo`}
                    className={s.logoTile}
                    imgClassName={s.logo}
                    loading="lazy"
                  />
                )}
                <Text as="span" textStyle="span" text={bank.name} className={s.name} />
              </>
            )
            const hasInfo = Boolean(bank.infoTitle || bank.description)

            return (
              <li key={bank.id ?? index} className={s.tileWrap}>
                {hasInfo ? (
                  <InfoTooltip
                    title={bank.infoTitle}
                    content={bank.description as DefaultTypedEditorState | null | undefined}
                    trigger={face}
                    triggerLabel={bank.name}
                    triggerClassName={s.tile}
                    triggerStyle={style}
                    side="top"
                  />
                ) : (
                  <div className={s.tile} style={style}>
                    {face}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
        {cta?.label && (
          <div className={s.ctaWrap}>
            <CtaLink
              href={ctaHref}
              label={cta.label}
              newTab={cta.newTab}
              size="lg"
              tone="success"
              className={s.cta}
            />
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}
