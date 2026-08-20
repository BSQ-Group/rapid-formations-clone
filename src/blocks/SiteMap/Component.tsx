import React from 'react'

import type { SiteMapBlock as SiteMapBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { siteMapStyles as s } from './SiteMap.styles'
import { SiteMapView, type SiteMapSection } from './SiteMapView'

export const SiteMapBlockComponent: React.FC<SiteMapBlockProps> = ({ sections, sectionLayout }) => {
  const items = (sections ?? [])
    .map((section, index): SiteMapSection | null => {
      if (!section.heading || !section.links) return null
      return {
        id: section.id ?? `${section.heading}-${index}`,
        heading: section.heading,
        links: section.links,
      }
    })
    .filter((section): section is SiteMapSection => section !== null)

  if (!items.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <SiteMapView sections={items} />
      </Container>
    </SectionWrapper>
  )
}
