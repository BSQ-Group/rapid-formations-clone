import React from 'react'

import type { LegalContentBlock as LegalContentBlockProps } from '@/payload-types'

import { LegalSidenavClient } from '@/blocks/LegalSidenav/LegalSidenavClient'
import { fetchLegalNavLinks } from '@/blocks/LegalSidenav/fetchLegalNavLinks'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { LegalContentBody } from './LegalContentBody'
import { legalContentStyles as s } from './LegalContent.styles'

export const LegalContentBlock: React.FC<LegalContentBlockProps> = async ({
  pageTitle,
  sections,
  sectionLayout,
}) => {
  const navLinks = await fetchLegalNavLinks()

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <div className={s.inner}>
        <div className={s.layout}>
          <LegalSidenavClient links={navLinks} />
          <LegalContentBody pageTitle={pageTitle} sections={sections} />
        </div>
      </div>
    </SectionWrapper>
  )
}
