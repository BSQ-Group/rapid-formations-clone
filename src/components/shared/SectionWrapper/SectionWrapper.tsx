import React from 'react'

import { cn } from '@/utilities/ui'
import type { SectionLayoutValue } from '@/fields/sectionLayout'
import { sectionWrapperStyles as s } from './SectionWrapper.styles'

export type SectionWrapperProps = SectionLayoutValue & {
  as?: 'section' | 'div' | 'article'
  className?: string
  children: React.ReactNode
}

const DEFAULTS = {
  background: 'light',
  paddingTop: 'm',
  paddingBottom: 'm',
  gap: 'inherit',
} as const

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  background,
  paddingTop,
  paddingBottom,
  gap,
  as: Tag = 'section',
  className,
  children,
}) => {
  const bg = background ?? DEFAULTS.background
  const pt = paddingTop ?? DEFAULTS.paddingTop
  const pb = paddingBottom ?? DEFAULTS.paddingBottom
  const g = gap ?? DEFAULTS.gap

  return (
    <Tag
      className={cn(
        s.base,
        s.background[bg],
        s.paddingTop[pt],
        s.paddingBottom[pb],
        s.gap[g] ?? s.gap.inherit,
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export default SectionWrapper
