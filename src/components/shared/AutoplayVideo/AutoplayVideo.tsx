'use client'

import React, { useEffect, useRef, useState } from 'react'

import { cn } from '@/utilities/ui'
import { useInView } from '@/hooks/useInView'
import { autoplayVideoStyles as s } from './AutoplayVideo.styles'

export interface AutoplayVideoProps {
  src: string
  poster?: string
  captionsUrl?: string | null
  title: string
  autoplay?: boolean | null
  className?: string
  videoClassName?: string
}

export function AutoplayVideo({
  src,
  poster,
  captionsUrl,
  title,
  autoplay = true,
  className,
  videoClassName,
}: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { ref, inView } = useInView<HTMLDivElement>({ once: false, threshold: 0.25 })
  const [stoppedByViewer, setStoppedByViewer] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !autoplay || stoppedByViewer) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (inView) {
      void video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [inView, autoplay, stoppedByViewer])

  return (
    <div ref={ref} className={cn(s.wrapper, className)}>
      <video
        ref={videoRef}
        className={cn(s.video, videoClassName)}
        controls
        muted
        loop
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        poster={poster}
        title={title}
        onPause={() => {
          if (inView) setStoppedByViewer(true)
        }}
        onPlay={() => setStoppedByViewer(false)}
      >
        {captionsUrl && (
          <track kind="captions" src={captionsUrl} srcLang="en" label="English" />
        )}
        <source src={src} type="video/mp4" />
      </video>
    </div>
  )
}

export default AutoplayVideo
