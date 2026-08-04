import React from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'

import type { WhatsIncludedSinglePackageBlock as WhatsIncludedSinglePackageBlockProps } from '@/payload-types'

import { cn } from '@/utilities/ui'
import { buttonVariants } from '@/components/ui/button'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { getLinkHref } from '@/utilities/links'
import { whatsIncludedSinglePackageStyles as s } from './WhatsIncludedSinglePackage.styles'

export const WhatsIncludedSinglePackageBlock: React.FC<
  WhatsIncludedSinglePackageBlockProps
> = ({ heading, packageName, features, price, priceSubtext, orderButton, sectionLayout }) => {
  const href = orderButton ? getLinkHref(orderButton) : null
  const buttonLabel = orderButton?.label || 'Order'

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.titleBlock}>
          <Text as="h2" text={heading} textStyle="span" className={s.title} />
        </div>
        <div className={s.table}>
          <div className={s.header}>
            <Text as="span" textStyle="span" text={packageName} className={s.headerLabel} />
          </div>
          {features?.map((feature, index) => (
            <div
              key={feature.id || index}
              className={cn(
                s.featureRow,
                index % 2 === 0 ? s.featureRowOdd : s.featureRowEven,
              )}
            >
              <div className={s.featureContent}>
                <div className={s.featureTextBlock}>
                  <Text
                    as="span"
                    textStyle="span"
                    text={feature.title}
                    className={s.featureTitle}
                  />
                  {feature.description && (
                    <Text
                      as="span"
                      textStyle="span"
                      text={feature.description}
                      className={s.featureDescription}
                    />
                  )}
                </div>
                {(feature.tooltipTitle || feature.tooltipContent) && (
                  <div className={s.featureInfoIconWrap}>
                    <InfoTooltip
                      title={feature.tooltipTitle}
                      content={feature.tooltipContent}
                      iconSize={24}
                    />
                  </div>
                )}
              </div>
              <Check
                className={s.featureCheckIcon}
                aria-label="Included"
                strokeWidth={2.5}
              />
            </div>
          ))}
          <div className={s.ctaRow}>
            <div className={s.ctaInner}>
              <div className={s.ctaContent}>
                <Text
                  as="span"
                  textStyle="span"
                  text={packageName}
                  className={s.ctaPackageName}
                />
                <div className={s.ctaPrice}>
                  <Text
                    as="span"
                    textStyle="span"
                    text={price}
                    className={s.ctaPriceAmount}
                  />
                  {priceSubtext && (
                    <Text
                      as="span"
                      textStyle="span"
                      text={priceSubtext}
                      className={s.ctaPriceSubtext}
                    />
                  )}
                </div>
              </div>
              {href && (
                <Link
                  href={href}
                  target={orderButton?.newTab ? '_blank' : undefined}
                  rel={orderButton?.newTab ? 'noopener noreferrer' : undefined}
                  className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), s.ctaButton)}
                >
                  {buttonLabel}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
