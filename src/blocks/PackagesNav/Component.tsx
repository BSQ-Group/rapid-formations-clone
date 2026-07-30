import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { PackagesNavBlock as PackagesNavBlockProps } from '@/payload-types'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { getLinkHref, type LinkData } from '@/utilities/links'
import { PackagesNavClient, type PackagesNavTab } from './PackagesNavClient'

export const PackagesNavBlock: React.FC<PackagesNavBlockProps> = async ({ sectionLayout }) => {
  const payload = await getPayload({ config: configPromise })
  const global = await payload
    .findGlobal({ slug: 'packagesNav', depth: 1, overrideAccess: true })
    .catch(() => null)

  const tabs: PackagesNavTab[] = (global?.tabs ?? [])
    .map((item) => {
      const link = item.link as LinkData | undefined
      if (!link) return null
      const href = getLinkHref(link)
      const label = link.label ?? ''
      if (!label || href === '#') return null
      return { id: item.id ?? href, href, label }
    })
    .filter((tab): tab is PackagesNavTab => tab !== null)

  if (tabs.length === 0) return null
  return (
    <SectionWrapper
      as="div"
      background={sectionLayout?.background ?? 'light'}
      paddingTop={sectionLayout?.paddingTop ?? 'none'}
      paddingBottom={sectionLayout?.paddingBottom ?? 'none'}
    >
      <PackagesNavClient tabs={tabs} />
    </SectionWrapper>
  )
}
