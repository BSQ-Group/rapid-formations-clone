import * as React from 'react'
import { cn } from '@/utilities/ui'
import Text from '@/components/shared/Text'
import { Check, X, LoaderCircle } from 'lucide-react'
import './Notification.css'

export type NotificationType = 'success' | 'error' | 'neutral' | 'warning' | 'info' | 'loading'

export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: NotificationType
  message: string
  className?: string
  messageClassName?: string
  buttonLabel?: React.ReactNode | string
  buttonClassName?: string
  onButtonClick?: () => void
  children?: React.ReactNode
  capitaliseMessage?: boolean
}

const capitaliseSentences = (text: string): string => {
  const withFirstLetterCapitalized = text.charAt(0).toUpperCase() + text.slice(1)
  return withFirstLetterCapitalized.replace(/(\.\s+)([a-z])/g, (_, punctuation, letter) => {
    return punctuation + letter.toUpperCase()
  })
}

export const Notification: React.FC<NotificationProps> = ({
  type = 'neutral',
  message,
  className,
  buttonLabel,
  onButtonClick,
  children,
  messageClassName,
  buttonClassName,
  capitaliseMessage = true,
  ...props
}) => {
  const renderIcon = () => {
    switch (type) {
      case 'success':
        return <Check size={16} />
      case 'error':
        return <X size={16} />
      case 'loading':
        return <LoaderCircle size={16} className="animate-spin" />
      case 'warning':
      case 'neutral':
      case 'info':
      default:
        return <span className="text-sm font-semibold">i</span>
    }
  }

  return (
    <div className={cn('notification', `notification--${type}`, className)} {...props}>
      <div className="notification__content">
        <div className="notification__row flex items-start gap-3 w-full">
          <div className={`notification__icon notification__icon--${type} flex-shrink-0`}>
            {renderIcon()}
          </div>
          <div className="notification__message-container flex-1">
            <Text
              text={capitaliseMessage ? capitaliseSentences(message) : message}
              textStyle="body-sm"
              className={cn('notification__message', messageClassName)}
            />
            {children && <div className="notification__children mt-2">{children}</div>}
          </div>
        </div>
      </div>
      {buttonLabel && onButtonClick && (
        <button
          onClick={onButtonClick}
          className={cn('notification__button', buttonClassName)}
          type="button"
        >
          {buttonLabel}
        </button>
      )}
    </div>
  )
}
