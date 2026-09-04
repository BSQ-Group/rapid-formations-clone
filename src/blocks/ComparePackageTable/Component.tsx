import React from 'react'

import type {
  ComparePackageTableBlock as ComparePackageTableBlockProps,
  Package,
  Product,
} from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { comparePackageTableStyles as s } from './ComparePackageTable.styles'
import { ComparePackageTableView } from './ComparePackageTableView'
import type { TableData, TablePackage, TableProduct } from './types'

// The block stores only relationship references. The page route's default
// depth-2 query populates each column's `package` and, within it,
// `products[].product`. Anything still an id string (unpopulated / deleted) is skipped.
const isPackage = (value: unknown): value is Package =>
  typeof value === 'object' && value !== null

const isProduct = (value: unknown): value is Product =>
  typeof value === 'object' && value !== null

const productsOf = (pkg: Package): Product[] =>
  (pkg.products ?? []).flatMap((row) => (isProduct(row.product) ? [row.product] : []))

export const ComparePackageTableBlockComponent: React.FC<ComparePackageTableBlockProps> = ({
  heading,
  content,
  sameDay,
  packages,
  footnote,
  mobileCardHeight,
  sectionLayout,
}) => {
  const columns = (packages ?? []).flatMap((col) => (isPackage(col.package) ? [col.package] : []))

  const resolvedPackages = columns.flatMap((pkg): TablePackage[] => {
    const { name, slug, price } = pkg
    if (!name || !slug || !price) return []
    const buy = (pkg.buyLink as LinkData | undefined) ?? undefined
    const readMore = (pkg.readMoreLink as LinkData | undefined) ?? undefined
    const hasReadMore = Boolean(readMore && (readMore.reference || readMore.url))
    return [
      {
        id: pkg.id,
        name,
        slug,
        price,
        priceNote: pkg.priceNote,
        ribbonText: pkg.ribbonText,
        whosItFor: pkg.whosItFor,
        shortDescription: pkg.shortDescription,
        buyHref: buy ? getLinkHref(buy) : '#',
        buyNewTab: buy?.newTab,
        checkoutPath: pkg.checkoutPath,
        readMoreHref: hasReadMore ? getLinkHref(readMore as LinkData) : null,
        readMoreLabel: readMore?.label,
      },
    ]
  })

  // Feature rows = the union of every column's products, in first-seen order
  // (left-to-right across columns). Each product's `includedIn` is rebuilt from
  // membership — the slugs of the columns whose product list contains it — which
  // is the same contract the downstream tick/dash renderer already consumes.
  const seen = new Set<string>()
  const resolvedProducts: TableProduct[] = []
  for (const pkg of columns) {
    for (const product of productsOf(pkg)) {
      if (seen.has(product.id)) continue
      seen.add(product.id)
      const includedIn = columns
        .filter((col) => productsOf(col).some((p) => p.id === product.id))
        .map((col) => col.slug)
        .filter((slug): slug is string => Boolean(slug))
      resolvedProducts.push({
        id: product.id,
        name: product.name,
        tooltip: product.tooltip,
        includedIn,
      })
    }
  }

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
