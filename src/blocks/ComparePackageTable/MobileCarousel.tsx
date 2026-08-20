import React from 'react'
import Link from 'next/link'
import { faCheck } from '@fortawesome/pro-solid-svg-icons/faCheck'

import RichText from '@/components/RichText'
import { FaIcon } from '@/components/shared/FaIcon'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { BuyNowLink } from './BuyNowLink'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import { PriceStack } from './PriceStack'
import type { TableData } from './types'

const DESCRIPTION_MIN_HEIGHT: Record<string, string> = {
  tall: s.mobileDescriptionTall,
  taller: s.mobileDescriptionTaller,
}

export const MobileCarousel: React.FC<{ data: TableData; cardHeight?: string | null }> = ({
  data,
  cardHeight,
}) => {
  const isMulti = data.packages.length > 1
  const descriptionModifier = DESCRIPTION_MIN_HEIGHT[cardHeight ?? '']
  const cards = data.packages.map((pkg) => ({
    pkg,
    included: data.products.filter((product) => product.includedIn.includes(pkg.slug)),
  }))
  const rowCount = Math.max(0, ...cards.map((card) => card.included.length))

  return (
    <div className={s.mobile}>
      <div className={cn(s.carousel, !isMulti && s.carouselSingle)}>
        {cards.map(({ pkg, included }) => (
          <div key={pkg.id} className={cn(s.box, !isMulti && s.boxFull)}>
            <div className={s.mobilePackage}>
              <div className={s.mobileHeader}>
                <Text as="h3" textStyle="span" className={s.mobileName}>
                  {pkg.readMoreHref ? (
                    <Link href={pkg.readMoreHref} className={s.packageNameLink}>
                      {pkg.name}
                    </Link>
                  ) : (
                    pkg.name
                  )}
                </Text>
                <PriceStack pkg={pkg} className={s.prices} />
                {pkg.shortDescription && (
                  <RichText
                    data={pkg.shortDescription}
                    enableGutter={false}
                    enableProse={false}
                    className={cn(s.mobileDescription, descriptionModifier)}
                  />
                )}
                <div className={s.buttons}>
                  <BuyNowLink pkg={pkg} />
                </div>
              </div>
              <ul className={cn(s.mobileProducts, isMulti && s.mobileProductsAligned)}>
                {included.map((product) => (
                  <li key={product.id} className={s.mobileProduct}>
                    <FaIcon icon={faCheck} className={s.mobileCheck} />
                    <span className={s.mobileProductLabel}>{product.name}</span>
                    {product.tooltip && (
                      <InfoTooltip
                        title={product.name}
                        content={product.tooltip}
                        iconSize={15}
                        triggerClassName={s.mobileInfoIcon}
                      />
                    )}
                  </li>
                ))}
                {Array.from({ length: rowCount - included.length }, (_, index) => (
                  <li key={`spacer-${index}`} className={s.mobileProduct} aria-hidden />
                ))}
              </ul>
              {pkg.ribbonText && (
                <div className={s.ribbon}>
                  <Text textStyle="span" text={pkg.ribbonText} className={s.ribbonLabel} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
