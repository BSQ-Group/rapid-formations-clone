import React from 'react'
import Link from 'next/link'
import { faCheck } from '@fortawesome/pro-solid-svg-icons/faCheck'
import { faCircleInfo } from '@fortawesome/pro-solid-svg-icons/faCircleInfo'

import RichText from '@/components/RichText'
import { FaIcon } from '@/components/shared/FaIcon'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { BuyNowLink } from './BuyNowLink'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import { linksPackageName } from './PackageRow'
import { PriceStack } from './PriceStack'
import type { TableData, TableProduct } from './types'

const DESCRIPTION_MIN_HEIGHT: Record<string, string> = {
  tall: s.mobileDescriptionTall,
  taller: s.mobileDescriptionTaller,
}

const MOBILE_PRODUCT_ORDER: Record<string, readonly string[]> = {
  'llp-package': ['6a8c21de554f4d9a40c07ad2', '6a8c21e2554f4d9a40c07af1'],
}

const applyMobileProductOrder = (
  packageSlug: string,
  included: readonly TableProduct[],
): TableProduct[] => {
  const pinnedOrder = MOBILE_PRODUCT_ORDER[packageSlug]
  if (!pinnedOrder) return [...included]

  const productsById = new Map(included.map((product) => [product.id, product]))
  const pinnedProducts = pinnedOrder.flatMap((id) => productsById.get(id) ?? [])
  const pinnedSlots = included.flatMap((product, index) =>
    pinnedProducts.includes(product) ? [index] : [],
  )

  const reordered = [...included]
  pinnedSlots.forEach((slot, index) => {
    reordered[slot] = pinnedProducts[index]
  })
  return reordered
}

export const MobileCarousel: React.FC<{ data: TableData; cardHeight?: string | null }> = ({
  data,
  cardHeight,
}) => {
  const isMulti = data.packages.length > 1
  const linkName = linksPackageName(data.packages.length)
  const descriptionModifier = DESCRIPTION_MIN_HEIGHT[cardHeight ?? '']
  const cards = data.packages.map((pkg) => ({
    pkg,
    included: applyMobileProductOrder(
      pkg.slug,
      data.products.filter((product) => product.includedIn.includes(pkg.slug)),
    ),
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
                  {linkName && pkg.readMoreHref ? (
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
                        content={product.tooltip}
                        icon={<FaIcon icon={faCircleInfo} className={s.mobileInfoIconGlyph} />}
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
