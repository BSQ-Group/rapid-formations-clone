import React from 'react'

import type { ComparePackageTableBlock as ComparePackageTableBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import { ComparePackageTableView } from './ComparePackageTableView'
import type { TableData, TablePackage, TableProduct } from './types'

export const ComparePackageTableBlockComponent: React.FC<ComparePackageTableBlockProps> = ({
  heading,
  content,
  sameDay,
  packages,
  products,
  footnote,
  mobileCardHeight,
  sectionLayout,
}) => {
  const resolvedPackages = (packages ?? []).flatMap((pkg, index): TablePackage[] => {
    const { name, slug, price } = pkg
    if (!name || !slug || !price) return []
    const buy = pkg.buyLink as LinkData | undefined
    const readMore = pkg.readMoreLink as LinkData | undefined
    return [
      {
        id: pkg.id ?? `${slug}-${index}`,
        name,
        slug,
        price,
        priceNote: pkg.priceNote,
        ribbonText: pkg.ribbonText,
        whosItFor: pkg.whosItFor,
        shortDescription: pkg.shortDescription,
        buyHref: buy ? getLinkHref(buy) : '#',
        buyNewTab: buy?.newTab,
        readMoreHref: readMore ? getLinkHref(readMore) : null,
        readMoreLabel: readMore?.label,
      },
    ]
  })

  const resolvedProducts = (products ?? []).flatMap((product, index): TableProduct[] => {
    const { name } = product
    if (!name) return []
    return [
      {
        id: product.id ?? `${name}-${index}`,
        name,
        tooltip: product.tooltip,
        includedIn: (product.includedIn ?? []).flatMap((slug) => (slug ? [slug] : [])),
      },
    ]
  })

  if (!resolvedPackages.length || !resolvedProducts.length) return null

  const data: TableData = {
    heading: heading ?? '',
    content,
    sameDayHeading: sameDay?.heading,
    sameDayBody: sameDay?.body,
    footnote,
    packages: resolvedPackages,
    products: resolvedProducts,
  }

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <ComparePackageTableView data={data} cardHeight={mobileCardHeight} />
      </Container>
    </SectionWrapper>
  )
}
