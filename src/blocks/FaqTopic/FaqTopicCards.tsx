import React from 'react'
import Link from 'next/link'

import type { FaqTopic } from '@/payload-types'

import { Media } from '@/components/Media'
import Text from '@/components/shared/Text'
import { faqTopicStyles as s } from './FaqTopic.styles'

type Topic = NonNullable<FaqTopic['topics']>[number]

export const FaqTopicCards: React.FC<{ topics: Topic[] }> = ({ topics }) => (
  <div className={s.grid}>
    {topics.map((topic) => (
      <div key={topic.id ?? topic.url} className={s.card}>
        <Link href={topic.url} className={s.link}>
          <div className={s.imageWrap}>
            <Media
              resource={topic.image}
              htmlElement={null}
              imgClassName={s.image}
              size="(min-width: 1590px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className={s.body}>
            <Text as="h3" textStyle="span" text={topic.title} className={s.title} />
          </div>
        </Link>
      </div>
    ))}
  </div>
)
