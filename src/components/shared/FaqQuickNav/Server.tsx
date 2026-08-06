import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import { FaqQuickNav } from './index'

export const FaqQuickNavServer: React.FC = async () => {
  const payload = await getPayload({ config: configPromise })
  const { topics } = await payload.findGlobal({ slug: 'faqTopics' })

  if (!topics?.length) return null

  const items = topics
    .filter((topic): topic is typeof topic & { title: string; url: string } =>
      Boolean(topic.title && topic.url),
    )
    .map(({ title, url }) => ({ title, url }))
    .sort((a, b) => a.title.localeCompare(b.title))

  return <FaqQuickNav topics={items} />
}
