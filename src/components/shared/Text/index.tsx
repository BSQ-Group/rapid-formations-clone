'use client'

import { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { camelToHyphen } from '@/utilities/formatting'
import { motion } from 'motion/react'
import { Slot } from '@radix-ui/react-slot'
import { TextProps, TextTag, usePTag } from './Text.types'
import { sanitizeHtml } from './sanitize'
import './Text.css'

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
  ...props
}) => {
  if (!text || text.length === 0) return null

  const isAnimated: boolean = Boolean(initial || animate || variants || spanVariants)
  const isArray = Array.isArray(text)

  const allProps = {
    ...props,
    className: clsx([className, 'text', `text-${textStyle}`], camelToHyphen(variant)),
    ...(isArray ? renderWords(text, isAnimated, spanVariants) : decorateText(text, icons)),
  }
  let motionProps = {}

  if (href) {
    const LinkComponent = isAnimated ? motion(Link) : Link
    return <LinkComponent href={href} {...allProps} />
  }

  const textTag: TextTag = as ?? (textStyle === 'animatedSpan' ? motion.span : 'span')
  let Component = asChild ? Slot : (textTag as any)
  if (isAnimated) {
    Component = motion(Component)
    motionProps = {
      initial,
      animate,
      variants,
    }
  }
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
          {newText}
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
