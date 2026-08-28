import React from 'react'
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons/faAngleRight'
import { faCheck } from '@fortawesome/pro-solid-svg-icons/faCheck'

import type { TextContentBlock as TextContentBlockProps } from '@/payload-types'

import { Container } from '@/components/shared/Container/Container'
import { FaIcon } from '@/components/shared/FaIcon'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { SectionWrapper } from '@/components/shared/SectionWrapper/SectionWrapper'
import { cn } from '@/utilities/ui'
import { richTextShell, textContentStyles as s, variantStyles } from './TextContent.styles'

const DEFAULT_INLINE_IMAGE_WIDTH = 150

type Body = TextContentBlockProps['body']

/**
 * The source places the inline image under the block's opening heading, not above
 * it, so the body is rendered in two passes with the image between them. Splitting
 * on the first heading keeps the heading with the copy it introduces; a body that
 * opens with something else puts the image first, which is the same result as not
 * splitting at all.
 */
const splitOnFirstHeading = (body: Body) => {
  const children = body?.root?.children ?? []
  const at = children.findIndex((child) => child.type === 'heading')
  if (at < 0) return { lead: null, rest: body }
  return {
    lead: { ...body, root: { ...body.root, children: children.slice(0, at + 1) } } as Body,
    rest: { ...body, root: { ...body.root, children: children.slice(at + 1) } } as Body,
  }
}

const icons: Record<string, typeof faCheck> = { check: faCheck, chevron: faAngleRight }

const iconColours: Record<string, string> = {
  inherit: s.iconInherit,
  green: s.iconGreen,
  success: s.iconSuccess,
  subtle: s.iconSubtle,
} as const

type Variant = NonNullable<TextContentBlockProps['variant']>

const variants: Record<Variant, Record<string, string>> = variantStyles

export const TextContentBlock: React.FC<TextContentBlockProps> = ({
  body,
  variant,
  icon,
  iconColour,
  inlineImage,
  inlineImageWidth,
  sectionLayout,
}) => {
  const name = icon && icon !== 'none' ? icon : undefined
  const listIcon = name ? (
    <FaIcon
      icon={icons[name]}
      className={cn(s.icon, iconColours[iconColour ?? 'inherit'] ?? s.iconInherit)}
    />
  ) : undefined

  const { flushLast, ...shell } = richTextShell
  const base = cn(
    Object.values(shell),
    Object.values(variants[variant ?? 'standard'] ?? variants.standard),
    listIcon && s.iconList,
  )
  const classes = cn(base, flushLast)
  const { lead, rest } = inlineImage ? splitOnFirstHeading(body) : { lead: null, rest: body }

  return (
    <SectionWrapper {...sectionLayout} className={s.section}>
      <Container>
        {lead && <RichText data={lead} enableGutter={false} enableProse={false} className={base} />}
        {inlineImage && (
          <div
            className={s.inlineImage}
            style={{ width: `${inlineImageWidth ?? DEFAULT_INLINE_IMAGE_WIDTH}px` }}
          >
            <Media resource={inlineImage} htmlElement={null} imgClassName={s.inlineImageImg} />
          </div>
        )}
        <RichText
          data={rest}
          enableGutter={false}
          enableProse={false}
          listItemIcon={listIcon}
          className={classes}
        />
      </Container>
    </SectionWrapper>
  )
}
