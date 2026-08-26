import React from 'react'

import type { ServiceInclusionsGridBlock as ServiceInclusionsGridBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { Media } from '@/components/Media'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import Text from '@/components/shared/Text'
import { serviceInclusionsGridStyles as s } from './ServiceInclusionsGrid.styles'

export const ServiceInclusionsGridBlockComponent: React.FC<ServiceInclusionsGridBlockProps> = ({
  heading,
  items,
  sectionLayout,
}) => {
  const inclusions = items ?? []

  if (!inclusions.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.header}>
          <Text as="h2" textStyle="span" text={heading} className={s.heading} />
        </div>
        <div className={s.grid}>
          {inclusions.map((item) => (
            <div key={item.id} className={s.item}>
              {item.icon && (
                <Media
                  resource={item.icon}
                  htmlElement={null}
                  pictureClassName={s.iconPicture}
                  imgClassName={s.icon}
                  width={80}
                  height={80}
                  size="80px"
                />
              )}
              <Text as="h3" textStyle="span" text={item.title} className={s.itemTitle} />
              <Text as="p" textStyle="span" text={item.description} className={s.itemBody} />
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
