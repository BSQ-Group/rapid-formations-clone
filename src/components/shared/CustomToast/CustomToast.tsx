import React from 'react'
import { Check, X } from 'lucide-react'
import './CustomToast.css'

export interface CustomToastProps {
  type: 'success' | 'error' | 'info' | 'warning'
  description: string
  onClose?: () => void
  className?: string
}

const TextIcon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-sm font-semibold text-[var(--feedback-text)]">{children}</span>
)

const iconMap = {
  success: Check,
  error: X,
  info: () => <TextIcon>i</TextIcon>,
  warning: () => <TextIcon>!</TextIcon>,
}

const variantClasses = {
  success: 'custom-toast--success',
  error: 'custom-toast--error',
  info: 'custom-toast--info',
  warning: 'custom-toast--warning',
}

export const CustomToast: React.FC<CustomToastProps> = ({
  type,
  description,
  onClose,
  className = '',
}) => {
  const Icon = iconMap[type]
  const variantClass = variantClasses[type]

  return (
    <div className={`custom-toast ${variantClass} ${className}`}>
      <div className="custom-toast__content">
        <div className={`custom-toast__icon-container custom-toast__icon-container--${type}`}>
          <Icon className="custom-toast__icon" />
        </div>
        <span className="custom-toast__description">{description}</span>
      </div>
      {onClose && (
        <button type="button" onClick={onClose} aria-label="Close toast">
          <X className="custom-toast__close-icon" />
        </button>
      )}
    </div>
  )
}

export default CustomToast
