import React from 'react'

import { cn } from '@/utilities/ui'
import { containerStyles as s } from './Container.styles'

export type ContainerProps = {
  as?: 'div' | 'section' | 'article' | 'header' | 'footer'
  className?: string
  children: React.ReactNode
}

export const Container: React.FC<ContainerProps> = ({
  as: Tag = 'div',
  className,
  children,
}) => {
  return <Tag className={cn(s.base, className)}>{children}</Tag>
}

export default Container
