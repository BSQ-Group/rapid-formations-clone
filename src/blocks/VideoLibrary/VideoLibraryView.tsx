'use client'

import React, { useCallback, useEffect, useRef } from 'react'
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
  const sectionRefs = useRef(new Map<string, HTMLElement>())
  const frameRef = useRef<number | null>(null)

  const scrollToCategory = useCallback((category: string) => {
    const element = sectionRefs.current.get(category)
    if (!element) return

    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)

    const startPosition = window.scrollY
    const target = element.getBoundingClientRect().top + startPosition - HEADER_OFFSET

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, target)
      return
    }

    const distance = target - startPosition
    let start: number | null = null

    const step = (currentTime: number) => {
      start ??= currentTime
      const progress = Math.min((currentTime - start) / SCROLL_DURATION, 1)
      window.scrollTo(0, startPosition + distance * easeInOutCubic(progress))
      frameRef.current = progress < 1 ? requestAnimationFrame(step) : null
    }

    frameRef.current = requestAnimationFrame(step)
  }, [])

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    },
    [],
  )

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
          <svg className={s.dropdownChevron} viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="m6 8 4 4 4-4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
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
              const refs = sectionRefs.current
              if (element) refs.set(category.name, element)
              else refs.delete(category.name)
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
                    variant="lightbox"
                  >
                    <span className={s.thumbnail}>
                      <img
                        src={`https://vumbnail.com/${video.vimeoId}.jpg`}
                        alt={video.title}
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
