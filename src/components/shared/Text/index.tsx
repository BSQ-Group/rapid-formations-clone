'use client'

import { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { camelToHyphen } from '@/utilities/formatting'
import { motion } from 'motion/react'
import { Slot } from '@radix-ui/react-slot'
import { SemanticTag, TextProps } from './Text.types'
import { decodeEntities, sanitizeHtml } from './sanitize'
import './Text.css'

const MotionLink = motion(Link)
const MotionSlot = motion(Slot)

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  label: motion.label,
  a: motion.a,
} as const

const Text: FC<TextProps> = ({
  text,
  textStyle = 'p',
  as,
  asChild = false,
  href,
  ref,
  variant = 'primary',
  className,
  icons,
  initial,
  animate,
  variants,
  spanVariants,
  children,
  ...props
}) => {
  const hasText = Boolean(text && text.length > 0)
  if (!hasText && !children) return null

  const isAnimated: boolean = Boolean(initial || animate || variants || spanVariants)
  const isArray = Array.isArray(text)

  const content = !hasText
    ? { children }
    : isArray
      ? renderWords(text as string[], isAnimated, spanVariants)
      : decorateText(text as string, icons)

  const allProps = {
    ...props,
    className: clsx([className, 'text', `text-${textStyle}`], camelToHyphen(variant)),
    ...content,
  }
  if (href) {
    const LinkComponent = isAnimated ? MotionLink : Link
    return <LinkComponent href={href} {...allProps} />
  }

  const tag: SemanticTag = as ?? 'span'
  const useMotionTag = isAnimated || (!as && textStyle === 'animatedSpan')
  const Component = asChild
    ? isAnimated
      ? MotionSlot
      : Slot
    : useMotionTag
      ? MOTION_TAGS[tag]
      : tag
  const motionProps = isAnimated ? { initial, animate, variants } : {}
  return <Component ref={ref} {...allProps} {...motionProps} />
}

const decorateText = (str: string, icons: TextProps['icons'] = {}) => {
  const { iconBefore, iconAfter } = icons

  const newText = sanitizeHtml(str)
    .replace(/^\n/, '')
    .replace('{', '<em>')
    .replace('}', '</em>')

  if (iconBefore || iconAfter) {
    return {
      children: (
        <>
          {iconBefore}
          {decodeEntities(newText)}
          {iconAfter}
        </>
      ),
    }
  }

  return {
    dangerouslySetInnerHTML: { __html: newText },
  }
}

export default Text

const renderWords = (words: string[] = [], isAnimated: boolean, spanVariants = {}) => {
  const wordsArray = words.map((word: string, index: number) => {
    const WordComponent = isAnimated ? motion.span : 'span'
    return (
      <WordComponent
        key={`word-${index}`}
        custom={index}
        {...decorateText(word)}
        {...(isAnimated ? { variants: spanVariants } : {})}
      />
    )
  })

  return {
    children: wordsArray,
  }
}
