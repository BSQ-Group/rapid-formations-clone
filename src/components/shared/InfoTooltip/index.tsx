'use client'

import { useRef, useState, useSyncExternalStore } from 'react'
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
  dialogVariant?: 'default' | 'legacy'
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
  desktopMinWidth = 769,
  triggerClassName: triggerClassNameProp,
  dialogVariant = 'default',
}: InfoTooltipProps) {
  const [open, setOpen] = useState(false)
  const pointerOverTrigger = useRef(false)
  const triggerButtonRef = useRef<HTMLButtonElement>(null)
  const [effectiveSide, setEffectiveSide] = useState<InfoTooltipProps['side']>(side)
  const isDesktop = useIsDesktop(desktopMinWidth)

  const resolveSide = () => {
    const el = triggerButtonRef.current
    if (!el) {
      setEffectiveSide(side)
      return
    }
    const rect = el.getBoundingClientRect()
    const TOOLTIP_MAX_WIDTH = 550
    const GUTTER = 20 // sideOffset + collisionPadding headroom

    if (side === 'left' || side === 'right') {
      const roomLeft = rect.left - GUTTER
      const roomRight = window.innerWidth - rect.right - GUTTER
      const fitsHorizontally = roomLeft >= TOOLTIP_MAX_WIDTH || roomRight >= TOOLTIP_MAX_WIDTH
      setEffectiveSide(fitsHorizontally ? side : 'top')
      return
    }

    const centre = rect.left + rect.width / 2
    const halfWidth = TOOLTIP_MAX_WIDTH / 2
    const overrunsLeft = centre - halfWidth < GUTTER
    const overrunsRight = centre + halfWidth > window.innerWidth - GUTTER
    if (overrunsLeft === overrunsRight) {
      setEffectiveSide(side)
      return
    }
    setEffectiveSide(overrunsLeft ? 'right' : 'left')
  }

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
    const isLegacyDialog = dialogVariant === 'legacy'
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
          <DialogPrimitive.Content className={cn(s.dialog, isLegacyDialog && s.dialogLegacy)}>
            <DialogDescription className={s.dialogSrDescription}>
              {title ?? 'More information'}
            </DialogDescription>
            <div className={cn(s.dialogHeader, isLegacyDialog && s.dialogHeaderLegacy)}>
              <div className={s.dialogHeaderRow}>
                <DialogPrimitive.Title
                  className={cn(s.dialogTitle, isLegacyDialog && s.dialogTitleLegacy)}
                >
                  {title ?? 'Information'}
                </DialogPrimitive.Title>
                <DialogPrimitive.Close aria-label="Close" className={s.dialogClose}>
                  <X size={20} />
                </DialogPrimitive.Close>
              </div>
            </div>
            {(content || text) && (
              <div className={cn(s.dialogBody, isLegacyDialog && s.dialogBodyLegacy)}>
                {body(cn(s.bodyText, isLegacyDialog && s.dialogBodyTextLegacy))}
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    )
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (e.pointerType === 'touch') setOpen((prev) => !prev)
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
  }

  return (
    <Tooltip
      open={open}
      onOpenChange={(next) => {
        if (!next && pointerOverTrigger.current) return
        if (next) resolveSide()
        setOpen(next)
      }}
    >
      <TooltipPrimitive.Trigger asChild>
        <button
          ref={triggerButtonRef}
          type="button"
          aria-label={triggerLabel}
          aria-expanded={open}
          onPointerDown={handlePointerDown}
          onClick={handleClick}
          onPointerEnter={(e) => {
            if (e.pointerType !== 'touch') pointerOverTrigger.current = true
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === 'touch') return
            pointerOverTrigger.current = false
            setOpen(false)
          }}
          style={triggerStyle}
          className={triggerClassName}
        >
          {glyph}
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={effectiveSide}
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
