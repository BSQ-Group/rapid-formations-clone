import React from 'react'

import type { OurOfficesBlock as OurOfficesBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { ourOfficesStyles as s } from './OurOffices.styles'
import { OurOfficesView, type OurOffice } from './OurOfficesView'

export const OurOfficesBlockComponent: React.FC<OurOfficesBlockProps> = ({
  heading,
  offices,
  sectionLayout,
}) => {
  const items = (offices ?? []).flatMap((office, index): OurOffice[] => {
    if (!office.image || !office.address) return []
    const map = office.mapLink as LinkData | undefined
    return [
      {
        id: office.id ?? `${index}`,
        image: office.image,
        focalX: office.focalX,
        address: office.address,
        name: office.name,
        latitude: office.latitude,
        longitude: office.longitude,
        mapHref: getLinkHref(map),
        mapLabel: map?.label,
        mapNewTab: map?.newTab,
      },
    ]
  })

  if (!heading || !items.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <OurOfficesView heading={heading} offices={items} />
      </Container>
    </SectionWrapper>
  )
}
