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

function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia('(min-width: 768px)')
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia('(min-width: 768px)').matches,
    () => true,
  )
}

interface InfoTooltipProps {
  title?: string | null
  content?: DefaultTypedEditorState | null
  dark?: boolean
  /** Icon size in px. Defaults to 16 to match the FormationPackages benefits list. */
  iconSize?: number
}

const TOOLTIP_MIN_WIDTH = 300
const TOOLTIP_MAX_WIDTH = 500
const TOOLTIP_WIDTH_STEP = 40
const TOOLTIP_HEIGHT_THRESHOLD = 0.65

export function InfoTooltip({ title, content, dark, iconSize = 16 }: InfoTooltipProps) {
  const [open, setOpen] = useState(false)
  const [tooltipWidth, setTooltipWidth] = useState(TOOLTIP_MIN_WIDTH)
  const contentRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()

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
    if (!nextOpen) setTooltipWidth(TOOLTIP_MIN_WIDTH)
    setOpen(nextOpen)
  }

  if (!title && !content) return null

  const triggerClassName = cn(
    'flex-shrink-0 rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]',
    dark ? 'text-[var(--text-inverse-muted)]' : 'text-[var(--text-muted)]',
  )

  // Mobile / tablet — centered modal dialog with overlay
  if (!isDesktop) {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Trigger asChild>
          <button type="button" aria-label="More information" className={triggerClassName}>
            <LucideIcon name="Info" size={16} />
          </button>
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
          <DialogPrimitive.Content className="fixed inset-0 z-50 m-auto flex h-fit max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-sm flex-col rounded-2xl bg-[var(--surface-canvas-inverse)] shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95">
            <DialogDescription className="sr-only">{title ?? 'More information'}</DialogDescription>
            <div className="flex-shrink-0 px-6 pb-3 pt-6">
              <div className="flex items-start gap-3">
                <DialogPrimitive.Title className="flex-1 text-base font-semibold leading-6 text-[var(--text-inverse)]">
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

            {content && (
              <div className="overflow-y-auto px-6 pb-6">
                <RichText
                  data={content}
                  enableGutter={false}
                  enableProse={false}
                  className="text-sm leading-5 text-[var(--text-inverse-subtle)]"
                />
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }

  // Desktop — tooltip anchored to the right of the icon (original working code)
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
          aria-label="More information"
          aria-expanded={open}
          onPointerDown={handlePointerDown}
          className={triggerClassName}
        >
          <LucideIcon name="Info" size={iconSize} />
        </button>
      </TooltipPrimitive.Trigger>

      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          ref={contentRef}
          side="right"
          align="center"
          sideOffset={8}
          collisionPadding={12}
          style={{ width: tooltipWidth }}
          className="relative z-50 rounded-2xl p-6 text-left shadow-xl transition-[width] duration-150 bg-[var(--surface-canvas-inverse)] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=right]:slide-in-from-left-2 data-[side=left]:slide-in-from-right-2"
        >
          <TooltipPrimitive.Arrow
            className="fill-[var(--surface-canvas-inverse)]"
            width={16}
            height={8}
          />

          {title && (
            <p className="mb-3 text-base font-semibold leading-6 text-[var(--text-inverse)]">
              {title}
            </p>
          )}

          {content && (
            <RichText
              data={content}
              enableGutter={false}
              enableProse={false}
              className="text-sm leading-5 text-[var(--text-inverse-subtle)]"
            />
          )}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </Tooltip>
  )
}
