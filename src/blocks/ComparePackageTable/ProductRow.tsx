import React from 'react'
import { faCheck } from '@fortawesome/pro-light-svg-icons/faCheck'
import { faMinus } from '@fortawesome/pro-light-svg-icons/faMinus'
import { faCircleInfo } from '@fortawesome/pro-solid-svg-icons/faCircleInfo'

import { FaIcon } from '@/components/shared/FaIcon'
import { InfoTooltip } from '@/components/shared/InfoTooltip'
import Text from '@/components/shared/Text'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import type { TablePackage, TableProduct } from './types'

export const ProductRow: React.FC<{
  product: TableProduct
  packages: TablePackage[]
  className: string
}> = ({ product, packages, className }) => (
  <div className={className}>
    <div className={s.productName}>
      <Text as="h3" textStyle="span" text={product.name} className={s.productTitle} />
      {product.tooltip && (
        <InfoTooltip
          content={product.tooltip}
          icon={<FaIcon icon={faCircleInfo} className={s.infoIconGlyph} />}
          triggerClassName={s.infoIcon}
        />
      )}
    </div>
    {packages.map((pkg) => (
      <div key={pkg.id} className={s.includedItem}>
        {product.includedIn.includes(pkg.slug) ? (
          <FaIcon icon={faCheck} className={s.check} />
        ) : (
          <FaIcon icon={faMinus} className={s.minus} />
        )}
      </div>
    ))}
  </div>
)
