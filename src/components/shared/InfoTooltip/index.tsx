'use client'

import { useState, useRef, useEffect, useSyncExternalStore } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { DialogDescription } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { cn } from '@/utilities/ui'
import { LucideIcon } from '@/components/shared/LucideIcon'
import { Tooltip } from '@/components/ui/tooltip'
import RichText from '@/components/RichText'

function useIsDesktop(minWidth: number) {
  const query = `(min-width: ${minWidth}px)`
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
    () => true,
  )
}

interface InfoTooltipProps {
  title?: string | null
  content?: DefaultTypedEditorState | null
  text?: string | null
  dark?: boolean
  iconSize?: number
  icon?: React.ReactNode
  trigger?: React.ReactNode
  triggerLabel?: string
  triggerStyle?: React.CSSProperties
  side?: 'top' | 'right' | 'bottom' | 'left'
  desktopMinWidth?: number
  width?: number
  triggerClassName?: string
}

const TOOLTIP_MIN_WIDTH = 300
const TOOLTIP_MAX_WIDTH = 500
const TOOLTIP_WIDTH_STEP = 40
const TOOLTIP_HEIGHT_THRESHOLD = 0.65

export function InfoTooltip({
  title,
  content,
  text,
  dark,
  iconSize = 16,
  icon,
  trigger,
  triggerLabel = 'More information',
  triggerStyle,
  side = 'right',
  desktopMinWidth = 768,
  width,
  triggerClassName: triggerClassNameProp,
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false)
  const [tooltipWidth, setTooltipWidth] = useState(width ?? TOOLTIP_MIN_WIDTH)
  const contentRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop(desktopMinWidth)

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    const ro = new ResizeObserver(() => {
      if (el.offsetHeight > window.innerHeight * TOOLTIP_HEIGHT_THRESHOLD) {
        setTooltipWidth((prev) =>
          prev < TOOLTIP_MAX_WIDTH ? Math.min(prev + TOOLTIP_WIDTH_STEP, TOOLTIP_MAX_WIDTH) : prev,
        )
      }
    })

    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setTooltipWidth(width ?? TOOLTIP_MIN_WIDTH)
    setOpen(nextOpen)
  }

  if (!title && !content && !text) return null

  const triggerClassName = cn(
    !trigger &&
      'flex-shrink-0 rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',
    !trigger && (dark ? 'text-[var(--text-inverse-muted)]' : 'text-[var(--text-muted)]'),
    trigger &&
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-2',
    triggerClassNameProp,
  )
  const glyph = trigger ?? icon ?? <LucideIcon name="Info" size={iconSize} />
  const body = (className: string) => {
    if (content) {
      return <RichText data={content} enableGutter={false} enableProse={false} className={className} />
    }
    if (!text) return null
    return (
      <div className={className}>
        {text
          .split(/\n{2,}/)
          .map((para) => para.trim())
          .filter(Boolean)
          .map((para, i) => (
            <p
              key={i}
              className={cn('whitespace-pre-line [overflow-wrap:anywhere]', i > 0 && 'mt-3')}
            >
              {para}
            </p>
          ))}
      </div>
    )
  }

  if (!isDesktop) {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <button
            type="button"
            aria-label={triggerLabel}
            style={triggerStyle}
            className={triggerClassName}
          >
            {glyph}
          </button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
          <DialogPrimitive.Content className="fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-sm flex-col rounded-2xl bg-[var(--surface-canvas-inverse)] shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
            <DialogDescription className="sr-only">{title ?? 'More information'}</DialogDescription>
            <div className="flex-shrink-0 px-6 pb-3 pt-6">
              <div className="flex items-start gap-3">
                <DialogPrimitive.Title className="min-w-0 flex-1 text-base font-semibold leading-6 text-[var(--text-inverse)] [overflow-wrap:anywhere]">
                  {title ?? 'Information'}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close
                  aria-label="Close"
                  className="flex-shrink-0 text-[var(--text-inverse-subtle)] hover:text-[var(--text-inverse)]"
                >
                  <X size={20} />
                </DialogPrimitive.Close>
              </div>
            </div>
            {(content || text) && (
              <div className="overflow-y-auto px-6 pb-6">
                {body('text-sm leading-5 text-[var(--text-inverse-subtle)]')}
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType === 'touch') {
      e.preventDefault()
      setOpen((prev) => !prev)
    }
  }

  return (
    <Tooltip open={open} onOpenChange={handleOpenChange}>
      <TooltipPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label={triggerLabel}
          aria-expanded={open}
          onPointerDown={handlePointerDown}
          style={triggerStyle}
          className={triggerClassName}
        >
          {glyph}
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={contentRef}
          side={side}
          align="center"
          sideOffset={8}
          collisionPadding={12}
          style={{ width: tooltipWidth }}
          className="relative z-50 rounded-2xl border border-[var(--border-on-light)] p-6 text-left shadow-xl transition-[width] duration-150 bg-[var(--surface-canvas-inverse)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2"
        >
          <TooltipPrimitive.Arrow
            className="fill-[var(--surface-canvas-inverse)]"
            width={16}
            height={8}
          />
          {title && (
            <p className="mb-3 text-base font-semibold leading-6 text-[var(--text-inverse)] [overflow-wrap:anywhere]">
              {title}
            </p>
          )}
          {body('text-sm leading-5 text-[var(--text-inverse-subtle)]')}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </Tooltip>
  )
}
