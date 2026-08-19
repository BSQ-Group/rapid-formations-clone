import React from 'react'

import type { ServiceAd, ServiceAdsBlock as ServiceAdsBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { cn } from '@/utilities/ui'
import { ServiceAdCard } from './ServiceAdCard'
import { serviceAdsStyles as s } from './ServiceAds.styles'

export const ServiceAdsBlock: React.FC<ServiceAdsBlockProps> = ({ ads, layout, sectionLayout }) => {
  const resolved = (ads ?? []).filter(
    (ad): ad is ServiceAd => typeof ad === 'object' && ad !== null,
  )

  const wide = layout === 'wide'

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={cn(resolved.length > 0 && s.grid, wide && s.gridWide)}>
          {resolved.map((ad) => (
            <ServiceAdCard key={ad.id} ad={ad} wide={wide} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
