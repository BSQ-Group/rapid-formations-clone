import React from 'react'

import type { SiteMapBlock as SiteMapBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { siteMapStyles as s } from './SiteMap.styles'
import { SiteMapView, type SiteMapSection } from './SiteMapView'

export const SiteMapBlockComponent: React.FC<SiteMapBlockProps> = ({ sections, sectionLayout }) => {
  const items = (sections ?? []).flatMap((section, index): SiteMapSection[] => {
    const { heading, links } = section
    if (!heading || !links) return []
    return [{ id: section.id ?? `${heading}-${index}`, heading, links }]
  })

  if (!items.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <SiteMapView sections={items} />
      </Container>
    </SectionWrapper>
  )
}
