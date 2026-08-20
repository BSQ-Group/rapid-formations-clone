import React from 'react'
import { faPhoneVolume } from '@fortawesome/pro-regular-svg-icons/faPhoneVolume'

import type { AdBannerBlock as AdBannerBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Container } from '@/components/shared/Container/Container'
import { CtaLink } from '@/components/shared/CtaLink'
import { FaIcon } from '@/components/shared/FaIcon'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { adBannerStyles as s } from './AdBanner.styles'

export const AdBannerBlock: React.FC<AdBannerBlockProps> = ({
  heading,
  body,
  cta,
  sectionLayout,
}) => {
  const link = cta as LinkData | undefined

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.banner}>
          <div className={s.inner}>
            <div className={s.left}>
              <Text as="h2" textStyle="span" text={heading} className={s.heading} />
              <RichText data={body} enableGutter={false} enableProse={false} className={s.body} />
            </div>
            {link?.label && (
              <div className={s.right}>
                <CtaLink
                  href={getLinkHref(link)}
                  label={link.label}
                  newTab={link.newTab}
                  icon={<FaIcon icon={faPhoneVolume} className={s.ctaIcon} />}
                  className={s.cta}
                />
              </div>
            )}
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
