import React from 'react'

import type { ComparePackagesNavBlock as ComparePackagesNavBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { ComparePackagesNavClient } from './ComparePackagesNavClient'
import type { ComparePackagesNavTab } from './ComparePackagesNavList'
import { comparePackagesNavStyles as s } from './ComparePackagesNav.styles'

export const ComparePackagesNavBlock: React.FC<ComparePackagesNavBlockProps> = ({
  tabs,
  sectionLayout,
}) => {
  const items = (tabs ?? []).flatMap((tab, index): ComparePackagesNavTab[] => {
    const link = tab.link as LinkData | undefined
    const href = getLinkHref(link)
    if (!link?.label || href === '#') return []
    return [{ id: tab.id ?? `${href}-${index}`, href, label: link.label, newTab: link.newTab }]
  })

  if (!items.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <ComparePackagesNavClient tabs={items} />
      </Container>
    </SectionWrapper>
  )
}
