'use client'

import React, { useCallback, useRef, useState } from 'react'

import { faPlay } from '@fortawesome/pro-solid-svg-icons/faPlay'
import { faXmark } from '@fortawesome/pro-light-svg-icons/faXmark'

import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { FaIcon } from '@/components/shared/FaIcon'
import { cn } from '@/utilities/ui'
import { videoModalStyles as s } from './VideoModal.styles'

const FILE_MIME_TYPES: Record<string, string> = {
  mp4: 'video/mp4',
  webm: 'video/webm',
  ogv: 'video/ogg',
}

const fileMimeType = (url: string): string | undefined => {
  const extension = /\.(mp4|webm|ogv)(?:[?#]|$)/i.exec(url)?.[1]
  return extension ? FILE_MIME_TYPES[extension.toLowerCase()] : undefined
}

export type VideoModalProps = {
  videoUrl: string
  title: string
  triggerLabel: string
  children: React.ReactNode
  className?: string
  playIconClassName?: string
  contentClassName?: string
  variant?: 'inline' | 'lightbox'
}

export const VideoModal: React.FC<VideoModalProps> = ({
  videoUrl,
  title,
  triggerLabel,
  children,
  className,
  playIconClassName,
  contentClassName,
  variant = 'inline',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const mimeType = fileMimeType(videoUrl)
  const isLightbox = variant === 'lightbox'

  const applyInitialVolume = useCallback((node: HTMLVideoElement | null) => {
    if (node) node.volume = 0.5
  }, [])

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={cn(s.trigger, className)}
        aria-label={triggerLabel}
        onClick={() => setIsOpen(true)}
      >
        {children}
        <FaIcon icon={faPlay} className={cn(s.playIcon, playIconClassName)} />
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          ref={contentRef}
          tabIndex={-1}
          overlayClassName={isLightbox ? s.overlayLightbox : s.overlay}
          hideClose={isLightbox}
          className={cn(
            s.dialogContent,
            isLightbox ? s.dialogContentLightbox : s.dialogContentInline,
            contentClassName,
          )}
          aria-describedby={undefined}
          onOpenAutoFocus={(event) => {
            event.preventDefault()
            contentRef.current?.focus()
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault()
            triggerRef.current?.focus()
          }}
        >
          <DialogTitle className={s.dialogTitle}>{title}</DialogTitle>
          <div className={cn(s.videoFrame, isLightbox ? s.videoFrameLightbox : s.videoFrameInline)}>
            {isLightbox && (
              <DialogClose className={s.close} aria-label="Close video">
                <FaIcon icon={faXmark} className={s.closeIcon} />
              </DialogClose>
            )}
            {mimeType ? (
              <video
                ref={applyInitialVolume}
                className={s.videoEmbed}
                controls
                crossOrigin="anonymous"
                autoPlay
              >
                <source src={videoUrl} type={mimeType} />
              </video>
            ) : (
              <iframe
                src={videoUrl}
                title={title}
                className={s.videoEmbed}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
