import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { VideoLibraryBlock as VideoLibraryBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { formatDateLongUTC, formatIsoDuration } from '@/utilities/formatting'
import { VideoLibraryView, type LibraryCategory } from './VideoLibraryView'
import { videoLibraryStyles as s } from './VideoLibrary.styles'

export const VideoLibraryBlockComponent: React.FC<VideoLibraryBlockProps> = async ({
  sectionLayout,
}) => {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'videos',
    limit: 500,
    depth: 0,
    sort: 'id',
  })

  if (!docs.length) return null

  const byCategory = new Map<string, { order: number; docs: typeof docs }>()

  for (const [index, video] of docs.entries()) {
    const name = video.category.trim()
    if (!name) continue

    let group = byCategory.get(name)
    if (!group) {
      group = { order: video.categoryOrder ?? index, docs: [] }
      byCategory.set(name, group)
    } else if (video.categoryOrder != null) {
      group.order = Math.min(group.order, video.categoryOrder)
    }

    group.docs.push(video)
  }

  const categories: LibraryCategory[] = [...byCategory.entries()]
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([name, group]) => ({
      name,
      videos: group.docs
        .sort((a, b) => (b.publishedDate ?? '').localeCompare(a.publishedDate ?? ''))
        .map((video) => ({
          id: video.id,
          vimeoId: video.vimeoId,
          title: video.title,
          duration: formatIsoDuration(video.duration),
          publishedDate: formatDateLongUTC(video.publishedDate),
        })),
    }))

  if (!categories.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <VideoLibraryView categories={categories} />
    </SectionWrapper>
  )
}
