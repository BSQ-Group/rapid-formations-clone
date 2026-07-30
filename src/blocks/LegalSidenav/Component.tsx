import React from 'react'
import type { LegalSidenavBlock as LegalSidenavBlockProps } from '@/payload-types'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { LegalSidenavClient } from './LegalSidenavClient'
import { fetchLegalNavLinks } from './fetchLegalNavLinks'
import { legalSidenavStyles as s } from './LegalSidenav.styles'

export const LegalSidenavBlock: React.FC<LegalSidenavBlockProps> = async ({ content, sectionLayout }) => {
  const links = await fetchLegalNavLinks()

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.layout}>
          <LegalSidenavClient links={links} />
          <div className={s.contentArea}>
            {content && <RichText data={content} enableGutter={false} />}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
