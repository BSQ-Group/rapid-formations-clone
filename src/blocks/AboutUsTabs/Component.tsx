import React from 'react'

import type { AboutUsTabsBlock as AboutUsTabsBlockProps, Page } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { RenderBlocks } from '@/blocks/RenderBlocks'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { AboutUsTabsClient } from './AboutUsTabsClient'
import { aboutUsTabsStyles as s } from './AboutUsTabs.styles'

export const AboutUsTabsBlock: React.FC<AboutUsTabsBlockProps> = ({ tabs, sectionLayout }) => {
  const shown = (tabs ?? []).filter((tab) => tab.label && tab.title)

  if (!shown.length) return null

  // Panels are rendered on the server and handed to the client component as
  // nodes, so a tab switch costs no fetch and the copy is in the HTML.
  const prepared = shown.map((tab) => ({
    label: tab.label,
    title: tab.title,
    isPageTitle: Boolean(tab.isPageTitle),
    panel: (
      <RenderBlocks blocks={(tab.content ?? []) as NonNullable<Page['layout']>} />
    ),
  }))

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container className={s.wrapperPad}>
        <AboutUsTabsClient tabs={prepared} />
      </Container>
    </SectionWrapper>
  )
}
