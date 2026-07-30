'use client'

import React from 'react'
import Image from 'next/image'
import { Check, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/shared'
import './ServiceCard.css'

export interface ServiceCardProps {
  title: string
  description: string
  className: string
  features: string[]
  logo: string
  buttonText?: string
  onClickLearnMore?: () => void
  onClickApply?: () => void
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  className,
  features,
  logo,
  buttonText = 'Get started',
  onClickLearnMore,
  onClickApply,
}) => {
  return (
    <div className={`service-card ${className}`}>
      <div className="service-card__content">
        <div className="service-card__header">
          <Image src={logo} alt={title} width={48} height={48} className="service-card__logo" />
          <div className="service-card__action">
            <Button
              variant="tertiary"
              size="sm"
              className="service-card__action-button"
              onClick={onClickLearnMore}
            >
              Learn more
              <ExternalLink size={14} className="service-card__action-icon" />
            </Button>
          </div>
        </div>
        <div className="service-card__info">
          <Text as="h3" text={title} textStyle="body-lg" className="service-card__title" />
          <Text text={description} textStyle="body-sm" className="service-card__description" />
        </div>
        <div className="service-card__footer">
          <div className="service-card__features">
            {features.map((feature, index) => (
              <div key={index} className="service-card__feature">
                <Check size={16} className="service-card__feature-icon" />
                <Text text={feature} textStyle="body-sm" className="service-card__feature-text" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="service-card__apply-footer">
        <Button
          variant="primary"
         
          className="service-card__apply-button"
          onClick={onClickApply}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default ServiceCard
