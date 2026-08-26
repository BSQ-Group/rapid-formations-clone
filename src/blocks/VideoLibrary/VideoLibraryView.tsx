'use client'

import React, { useCallback, useRef } from 'react'
import { faClock } from '@fortawesome/pro-regular-svg-icons/faClock'

import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import Text from '@/components/shared/Text'
import { VideoModal } from '@/components/shared/VideoModal'
import { videoLibraryStyles as s } from './VideoLibrary.styles'

export type LibraryVideo = {
  id: string
  vimeoId: string
  title: string
  duration?: string | null
  publishedDate?: string | null
}

export type LibraryCategory = {
  name: string
  videos: LibraryVideo[]
}

const HEADER_OFFSET = 100
const SCROLL_DURATION = 2000

const easeInOutCubic = (progress: number): number =>
  progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2

export const VideoLibraryView: React.FC<{ categories: LibraryCategory[] }> = ({ categories }) => {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const scrollToCategory = useCallback((category: string) => {
    const element = sectionRefs.current[category]
    if (!element) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, element.offsetTop - HEADER_OFFSET)
      return
    }

    const startPosition = window.scrollY
    const distance = element.offsetTop - HEADER_OFFSET - startPosition
    let start: number | null = null

    const step = (currentTime: number) => {
      if (start === null) start = currentTime
      const progress = Math.min((currentTime - start) / SCROLL_DURATION, 1)
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [])

  if (!categories.length) return null

  return (
    <Container>
      <nav className={s.nav} aria-label="Video categories">
        <div className={s.navMobile}>
          <label className="sr-only" htmlFor="video-library-categories">
            Jump to a video category
          </label>
          <select
            id="video-library-categories"
            className={s.dropdown}
            defaultValue=""
            onChange={(event) => {
              if (event.target.value) scrollToCategory(event.target.value)
            }}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className={s.navDesktop}>
          <div className={s.buttonGrid}>
            {categories.map((category) => (
              <button
                key={category.name}
                type="button"
                className={s.categoryButton}
                onClick={() => scrollToCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <div className={s.sections}>
        {categories.map((category) => (
          <section
            key={category.name}
            ref={(element) => {
              sectionRefs.current[category.name] = element
            }}
            className={s.categorySection}
          >
            <Text as="h2" textStyle="span" text={category.name} className={s.categoryTitle} />
            <div className={s.videosGrid}>
              {category.videos.map((video) => (
                <article key={video.id} className={s.card}>
                  <VideoModal
                    videoUrl={`https://player.vimeo.com/video/${video.vimeoId}?autoplay=1`}
                    title={video.title}
                    triggerLabel={`Play ${video.title}`}
                    className={s.thumbnailTrigger}
                    playIconClassName={s.playIconHidden}
                  >
                    <span className={s.thumbnail}>
                      <img
                        src={`https://vumbnail.com/${video.vimeoId}.jpg`}
                        alt=""
                        loading="lazy"
                        className={s.thumbnailImage}
                      />
                    </span>
                  </VideoModal>
                  <Text as="h3" textStyle="span" text={video.title} className={s.videoTitle} />
                  <div className={s.meta}>
                    {video.duration && (
                      <span className={s.duration}>
                        <FaIcon icon={faClock} className={s.clockIcon} />
                        {video.duration}
                      </span>
                    )}
                    {video.publishedDate && (
                      <span className={s.publishedDate}>{video.publishedDate}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  )
}
