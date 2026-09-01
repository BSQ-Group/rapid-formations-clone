import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { FaqTopicBlock } from '@/payload-types'

import { FaqQuickNav } from './index'

// Topics are single-sourced from the faqTopic block on the /faqs page, which
// also renders the topic grid; this nav is shown on each individual topic page.
export const FaqQuickNavServer: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'faqs' } },
    draft: false,
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const block = (docs[0]?.layout ?? []).find(
    (b): b is FaqTopicBlock => (b as { blockType?: string }).blockType === 'faqTopic',
  )

  const items = (block?.topics ?? [])
    .filter((topic): topic is typeof topic & { title: string; url: string } =>
      Boolean(topic.title && topic.url),
    )
    .map(({ title, url }) => ({ title, url }))
    .sort((a, b) => a.title.localeCompare(b.title))

  if (!items.length) return null

  return <FaqQuickNav topics={items} />
}
