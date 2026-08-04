'use client'

import { useState, useSyncExternalStore } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { DialogDescription } from '@/components/ui/dialog'
import { X } from 'lucide-react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { cn } from '@/utilities/ui'
import { LucideIcon } from '@/components/shared/LucideIcon'
import { Tooltip } from '@/components/ui/tooltip'
import RichText from '@/components/RichText'
import Text from '@/components/shared/Text'
import { infoTooltipStyles as s } from './InfoTooltip.styles'

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
  triggerClassName?: string
}

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
  triggerClassName: triggerClassNameProp,
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false)
  const isDesktop = useIsDesktop(desktopMinWidth)

  if (!title && !content && !text) return null

  const triggerClassName = cn(
    !trigger && s.triggerDefault,
    !trigger && (dark ? s.triggerDefaultDark : s.triggerDefaultLight),
    trigger && s.triggerCustom,
    triggerClassNameProp,
  )
  const glyph = trigger ?? icon ?? <LucideIcon name="Info" size={iconSize} />
  const body = (className: string) => {
    if (content) {
      return (
        <RichText data={content} enableGutter={false} enableProse={false} className={className} />
      )
    }
    if (!text) return null
    return (
      <div className={className}>
        {text
          .split(/\n{2,}/)
          .map((para) => para.trim())
          .filter(Boolean)
          .map((para, i) => (
            <p key={i} className={s.paragraph}>
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
          <DialogPrimitive.Overlay className={s.overlay} />
          <DialogPrimitive.Content className={s.dialog}>
            <DialogDescription className={s.dialogSrDescription}>
              {title ?? 'More information'}
            </DialogDescription>
            <div className={s.dialogHeader}>
              <div className={s.dialogHeaderRow}>
                <DialogPrimitive.Title className={s.dialogTitle}>
                  {title ?? 'Information'}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close aria-label="Close" className={s.dialogClose}>
                  <X size={20} />
                </DialogPrimitive.Close>
              </div>
            </div>
            {(content || text) && <div className={s.dialogBody}>{body(s.bodyText)}</div>}
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
    <Tooltip open={open} onOpenChange={setOpen}>
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
          side={side}
          align="center"
          sideOffset={8}
          collisionPadding={12}
          className={s.tooltipContent}
        >
          <span aria-hidden className={s.tooltipArrow} />
          {title && <Text as="p" textStyle="span" text={title} className={s.tooltipTitle} />}
          {body(s.bodyText)}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </Tooltip>
  )
}
