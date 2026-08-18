import React from 'react'

import type { ServiceContentBlock as ServiceContentBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { cn } from '@/utilities/ui'
import { ServiceContentSection } from './ServiceContentSection'
import { serviceContentStyles as s } from './ServiceContent.styles'

export const ServiceContentBlock: React.FC<ServiceContentBlockProps> = ({
  columns,
  sections,
  sectionLayout,
}) => {
  const all = sections ?? []

  if (!all.length) return null

  const split = columns !== 'one'
  const left = split ? all.filter((item) => item.position !== 'right') : all
  const right = split ? all.filter((item) => item.position === 'right') : []

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={cn(s.root, split && s.split)}>
          <div className={s.column}>
            {left.map((item, index) => (
              <ServiceContentSection key={item.id ?? index} section={item} />
            ))}
          </div>
          {split && right.length > 0 && (
            <div className={s.column}>
              {right.map((item, index) => (
                <ServiceContentSection key={item.id ?? index} section={item} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </SectionWrapper>
  )
}
