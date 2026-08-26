import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import type { VideoLibraryBlock as VideoLibraryBlockProps } from '@/payload-types'

import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { formatDuration, formatPublishedDate } from './videoFormat'
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
    sort: '-publishedDate',
  })

  if (!docs.length) return null

  const byCategory = new Map<string, { order: number; videos: LibraryCategory['videos'] }>()

  docs.forEach((video, index) => {
    const name = video.category?.trim()
    if (!name || !video.vimeoId || !video.title) return

    const group = byCategory.get(name) ?? { order: video.categoryOrder ?? index, videos: [] }
    group.videos.push({
      id: String(video.id),
      vimeoId: video.vimeoId,
      title: video.title,
      duration: formatDuration(video.duration),
      publishedDate: formatPublishedDate(video.publishedDate),
    })
    byCategory.set(name, group)
  })

  const categories: LibraryCategory[] = [...byCategory.entries()]
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([name, group]) => ({ name, videos: group.videos }))

  if (!categories.length) return null

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <VideoLibraryView categories={categories} />
    </SectionWrapper>
  )
}
