import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/shared'
import { cn } from '@/utilities/ui'
import { Check } from 'lucide-react'
import { formatPhoneNumber } from '@/components/shared/TelephoneNumber/utils'
import './SelectableCard.css'

export type SelectableCardType =
  | { type: 'service'; image: string; title: string; description: string }
  | { type: 'telephone'; number: string; subtitle: string; badge?: React.ReactNode }
  | { type: 'domain'; domain: string; subtitle: string }

export interface SelectableCardProps {
  card: SelectableCardType
  onToggle: () => void
  status: 'selected' | 'unselected'
}

const SelectableCard: React.FC<SelectableCardProps> = ({ card, onToggle, status }) => {
  const isSelected = status === 'selected'

  return (
    <div className={cn('selectable-card', isSelected && 'selectable-card--selected')}>
      {(() => {
        switch (card.type) {
          case 'service':
            return (
              <>
                <div className="selectable-card__image" aria-hidden="true">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={40}
                    height={40}
                    className="selectable-card__img"
                  />
                </div>
                <div className="selectable-card__content">
                  <div className="selectable-card__title">{card.title}</div>
                  <div className="selectable-card__description">{card.description}</div>
                </div>
              </>
            )
          case 'telephone':
            return (
              <div className="selectable-card__content">
                <div className="selectable-card__number-row">
                  <Text
                    textStyle="body-sm"
                    className="selectable-card__number"
                    text={formatPhoneNumber(card.number)}
                  />
                  {card.badge && card.badge}
                </div>
                <div className="selectable-card__subtitle">{card.subtitle}</div>
              </div>
            )
          case 'domain':
            return (
              <div className="selectable-card__content">
                <Text
                  text={card.domain}
                  textStyle="body-sm"
                  className="selectable-card__number"
                />
                <Text text={card.subtitle} textStyle="body-sm" className="selectable-card__subtitle" />
                <Text
                  text="1 year term"
                  textStyle="body-xs"
                  className="selectable-card__term"
                />
              </div>
            )
          default:
            return null
        }
      })()}
      <Button
        variant={card.type === 'telephone' || card.type === 'domain' ? 'tertiary-light' : 'secondary-light'}
        size="sm"
        className={cn(
          'selectable-card__add-button',
          isSelected && 'selectable-card__add-button--selected',
        )}
        aria-label="Add"
        onClick={onToggle}
      >
        {isSelected ? <Check /> : 'Add'}
      </Button>
    </div>
  )
}

export default SelectableCard
