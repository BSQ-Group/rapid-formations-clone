import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

import type { WhatsIncludedBlock as WhatsIncludedBlockProps } from '@/payload-types'

import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { whatsIncludedStyles as s } from './WhatsIncluded.styles'

type OrderLink = NonNullable<NonNullable<WhatsIncludedBlockProps['packageCard']>['orderLink']>

function getOrderHref(link: OrderLink): string {
  if (link.type === 'reference' && typeof link.reference?.value === 'object') {
    return `/${link.reference.value.slug ?? ''}`
  }
  return link.url || '#'
}

export const WhatsIncludedBlock: React.FC<WhatsIncludedBlockProps> = ({
  layout,
  heading,
  contentSections,
  packageCard,
  sectionLayout,
}) => {
  if (layout === 'stacked') {
    const firstSection = contentSections?.[0]

    return (
      <SectionWrapper {...sectionLayout} className={s.section}>
        <div className={s.stackedInner}>
          {/* Text row: heading+subtitle left / description right */}
          <div className={s.stackedTextRow}>
            <div className={s.stackedTitleCol}>
              <Text as="h2" textStyle="headline-5xl" text={heading} />
              {firstSection?.title && (
                <Text textStyle="headline-xl" text={firstSection.title} className={s.stackedSubtitle} />
              )}
            </div>
            {firstSection?.content && (
              <RichText
                data={firstSection.content}
                enableGutter={false}
                enableProse={false}
                className={s.stackedDescription}
              />
            )}
          </div>

          {/* Wide package card */}
          {packageCard && (
            <div className={s.stackedCard}>
              <div className={s.stackedCardHeader}>
                <div className={s.stackedCardHeaderText}>
                  <Text as="h3" textStyle="headline-2xl" text={packageCard.name} className={s.cardTitle} />
                  <div className={s.priceRow}>
                    <Text textStyle="headline-4xl" text={packageCard.price} className={s.price} />
                    {packageCard.priceSuffix && (
                      <Text
                        textStyle="body-xs"
                        text={packageCard.priceSuffix}
                        className={s.priceSuffix}
                      />
                    )}
                  </div>
                </div>
                {packageCard.orderLink && (
                  <Link
                    href={getOrderHref(packageCard.orderLink)}
                    aria-label={`${packageCard.orderLink.label} ${packageCard.name} package`}
                    className={s.stackedOrderButtonWrapper}
                  >
                    <Button variant="primary" size="lg" className={s.orderButton}>
                      {packageCard.orderLink.label}
                    </Button>
                  </Link>
                )}
              </div>

              <div className={s.benefits}>
                <hr className={s.divider} />
                {packageCard.benefitsLabel && (
                  <Text
                    textStyle="body-sm"
                    text={packageCard.benefitsLabel}
                    className={s.benefitsLabel}
                  />
                )}
                <ul className={s.stackedBenefitsList}>
                  {packageCard.benefits?.map((item) => (
                    <li key={item.id} className={s.stackedBenefitItem}>
                      <span className={s.benefitIconWrap} aria-hidden="true">
                        <Check size={16} className={s.benefitIcon} />
                      </span>
                      <Text textStyle="body-sm" text={item.benefit} className={s.benefitText} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>
    )
  }

  // Default: side-by-side layout
  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        {/* Left — Heading + content sections */}
        <div className={s.textCol}>
          <Text as="h2" textStyle="headline-5xl" text={heading} className={s.heading} />
          {contentSections?.map((section) => (
            <div key={section.id} className={s.contentSection}>
              <Text as="h3" textStyle="body-lg" text={section.title} className={s.sectionTitle} />
              <RichText
                data={section.content}
                enableGutter={false}
                enableProse={false}
                className={s.sectionContent}
              />
            </div>
          ))}
        </div>

        {/* Right — Package card */}
        {packageCard && (
          <div className={s.card}>
            <div className={s.cardHeader}>
              <div className={s.cardHeaderText}>
                <Text
                  as="h3"
                  textStyle="headline-2xl"
                  text={packageCard.name}
                  className={s.cardTitle}
                />
                <div className={s.priceRow}>
                  <Text textStyle="headline-4xl" text={packageCard.price} className={s.price} />
                  {packageCard.priceSuffix && (
                    <Text
                      textStyle="body-xs"
                      text={packageCard.priceSuffix}
                      className={s.priceSuffix}
                    />
                  )}
                </div>
              </div>
              {packageCard.orderLink && (
                <Link
                  href={getOrderHref(packageCard.orderLink)}
                  aria-label={`${packageCard.orderLink.label} ${packageCard.name} package`}
                  className={s.orderButton}
                >
                  <Button variant="primary" size="lg" className={s.orderButton}>
                    {packageCard.orderLink.label}
                  </Button>
                </Link>
              )}
            </div>

            <div className={s.benefits}>
              <hr className={s.divider} />
              {packageCard.benefitsLabel && (
                <Text
                  textStyle="body-sm"
                  text={packageCard.benefitsLabel}
                  className={s.benefitsLabel}
                />
              )}
              <ul className={s.benefitsList}>
                {packageCard.benefits?.map((item) => (
                  <li key={item.id} className={s.benefitItem}>
                    <span className={s.benefitIconWrap} aria-hidden="true">
                      <Check size={16} className={s.benefitIcon} />
                    </span>
                    <Text textStyle="body-sm" text={item.benefit} className={s.benefitText} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
