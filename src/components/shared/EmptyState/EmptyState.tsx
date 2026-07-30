'use client'

import React from 'react'
import { cn } from '@/utilities/ui'
import Text from '@/components/shared/Text'
import './EmptyState.css'

interface EmptyStateProps {
  className?: string
  icon: React.ReactNode
  title?: string
  description?: string
  button?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  className,
  icon,
  title,
  description,
  button,
  ...props
}) => {
  return (
    <div className={cn('empty-state', className)} {...props}>
      <div className="empty-state__icon-wrapper">{icon}</div>
      <div className="empty-state__content">
        {title && <Text textStyle="body-lg" text={title} className="empty-state__title" />}
        {description && (
          <Text textStyle="body-sm" text={description} className="empty-state__description" />
        )}
        {button && <div className="empty-state__button mt-4">{button}</div>}
      </div>
    </div>
  )
}

export default EmptyState
