import React from 'react'

import type { PackageCardHeroBlock as PackageCardHeroBlockProps } from '@/payload-types'

import { PackageCard } from '@/components/shared/PackageCard'
import { type LinkData } from '@/utilities/links'
import {
  packageCardHeroStyles as s,
  packageCardHeroCardStyles,
  packageCardHeroCardTextStyles,
} from './PackageCardHero.styles'

export const PackageCardHeroBlock: React.FC<PackageCardHeroBlockProps> = ({
  title,
  description,
  price,
  priceSuffix,
  orderLink,
  prefixText,
  benefits,
}) => {
  return (
    <section className={s.section}>
      <div className={s.wrapper}>
        <PackageCard
          name={title}
          description={description}
          price={price}
          priceSuffix={priceSuffix}
          orderLink={orderLink as LinkData}
          prefixText={prefixText}
          benefits={benefits ?? []}
          titleAs="h2"
          styles={packageCardHeroCardStyles}
          textStyles={packageCardHeroCardTextStyles}
        />
      </div>
    </section>
  )
}
