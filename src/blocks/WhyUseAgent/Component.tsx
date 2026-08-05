import React from 'react'

import type { WhyUseAgentBlock as WhyUseAgentBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { FaIcon } from '@/components/shared/FaIcon'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { whyUseAgentIcons } from './icons'
import { whyUseAgentStyles as s } from './WhyUseAgent.styles'

export const WhyUseAgentBlock: React.FC<WhyUseAgentBlockProps> = ({
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
            <li key={item.id ?? index} className={s.item}>
              <div className={s.iconWrap}>
                {whyUseAgentIcons[item.icon] && (
                  <FaIcon icon={whyUseAgentIcons[item.icon]} className={s.icon} />
                )}
              </div>
              <Text as="h3" textStyle="span" text={item.title} className={s.title} />
              <Text as="p" textStyle="span" text={item.description} className={s.description} />
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
              className={s.cta}
            />
          </div>
        )}
      </Container>
    </SectionWrapper>
  )
}
