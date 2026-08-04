'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/shared'
import Link from 'next/link'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/utilities/ui'
import './ServiceRestricted.css'

export interface ServiceRestrictedAction {
  label: string
  variant?: 'primary' | 'secondary'
  href?: string
  onClick?: () => void
  external?: boolean
}

export interface ServiceRestrictedProps {
  icon: LucideIcon
  title: string
  description: string
  actions: ServiceRestrictedAction[]
  className?: string
  withHeader?: boolean
}

export const ServiceRestricted: React.FC<ServiceRestrictedProps> = ({
  icon: Icon,
  title,
  description,
  actions,
  className = '',
  withHeader = false,
}) => {
  const renderAction = (action: ServiceRestrictedAction, index: number) => {
    const buttonContent = (
      <Button
        size="lg"
        variant={action.variant || 'primary'}
        onClick={action.onClick}
        className="service-restricted__action-button"
      >
        {action.label}
      </Button>
    )

    if (action.href) {
      if (action.external) {
        return (
          <a
            key={index}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            className="service-restricted__external-link"
          >
            {buttonContent}
          </a>
        )
      } else {
        return (
          <Link key={index} href={action.href}>
            {buttonContent}
          </Link>
        )
      }
    }

    return <div key={index}>{buttonContent}</div>
  }

  return (
    <div className={`service-restricted ${className}`}>
      <div
        className={cn(
          'service-restricted__container',
          withHeader ? 'service-restricted__container--with-header' : '',
        )}
      >
        <div className="service-restricted__content">
          <div className="service-restricted__icon-wrapper">
            <Icon className="service-restricted__icon" />
          </div>
          <Text as="h3" textStyle="headline-xl" text={title} className="service-restricted__title" />
          <div className="service-restricted__description-wrapper">
            <Text textStyle="body-sm" text={description} className="service-restricted__description" />
          </div>
          <div className="service-restricted__actions">{actions.map(renderAction)}</div>
        </div>
      </div>
    </div>
  )
}
