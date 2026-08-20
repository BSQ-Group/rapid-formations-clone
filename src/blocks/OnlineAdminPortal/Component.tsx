import React from 'react'

import type { OnlineAdminPortalBlock as OnlineAdminPortalBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { OnlineAdminPortalPanel } from './OnlineAdminPortalPanel'
import { onlineAdminPortalStyles as s } from './OnlineAdminPortal.styles'

export const OnlineAdminPortalBlock: React.FC<OnlineAdminPortalBlockProps> = ({
  items,
  sectionLayout,
}) => {
  const panels = items ?? []

  if (!panels.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        <div className={s.grid}>
          {panels.map((panel, index) => (
            <OnlineAdminPortalPanel key={panel.id ?? index} panel={panel} />
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
