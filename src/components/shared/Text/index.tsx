'use client'

import { FC } from 'react'
import clsx from 'clsx'
import Link from 'next/link'
import { camelToHyphen } from '@/utilities/formatting'
import { Slot } from '@radix-ui/react-slot'
import { SemanticTag, TextProps } from './Text.types'
import { decodeEntities, sanitizeHtml } from './sanitize'
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
  children,
  ...props
}) => {
  const hasText = Boolean(text && text.length > 0)
  if (!hasText && !children) return null

  const isArray = Array.isArray(text)
  const content = !hasText
    ? { children }
    : isArray
      ? renderWords(text as string[])
      : decorateText(text as string, icons)

  const allProps = {
    ...props,
    className: clsx([className, 'text', `text-${textStyle}`], camelToHyphen(variant)),
    ...content,
  }
  if (href) {
    return <Link href={href} {...allProps} />
  }

  const tag: SemanticTag = as ?? 'span'
  const Component = asChild ? Slot : tag
  return <Component ref={ref} {...allProps} />
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

const renderWords = (words: string[] = []) => {
  const wordsArray = words.map((word: string, index: number) => (
    <span key={`word-${index}`} {...decorateText(word)} />
  ))

  return {
    children: wordsArray,
  }
}
