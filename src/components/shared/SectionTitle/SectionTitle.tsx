import React from 'react'

import Text from '@/components/shared/Text'
import { cn } from '@/utilities/ui'
import { sectionTitleStyles as s } from './SectionTitle.styles'

export type SectionTitleProps = {
  title?: string | null
  subtitle?: string | null
  /** Heading level. Blocks sit under the page H1, so H2 is the default. */
  as?: 'h2' | 'h3'
  className?: string
  titleClassName?: string
  subtitleClassName?: string
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  as = 'h2',
  className,
  titleClassName,
  subtitleClassName,
}) => {
  if (!title && !subtitle) return null

  return (
    <div className={className}>
      {title && (
        <Text as={as} textStyle="span" text={title} className={cn(s.title, titleClassName)} />
      )}
      {subtitle && (
        <Text
          as="p"
          textStyle="span"
          text={subtitle}
          className={cn(s.subtitle, subtitleClassName)}
        />
      )}
    </div>
  )
}

export default SectionTitle
