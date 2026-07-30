import * as React from 'react'
import {
  RadioGroup as ShadcnRadioGroup,
  RadioGroupItem as ShadcnRadioGroupItem,
} from '@/components/ui/radio-group'
import { cn } from '@/utilities/ui'
import './RadioGroup.css'
import { AlertCircle } from 'lucide-react'

export interface RadioOption {
  value: string
  label?: string
  description?: string
  disabled?: boolean
  addressStyle?: 'column' | 'inline'
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  label?: string
  error?: string
  description?: string
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  id?: string
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
  error,
  description,
  disabled = false,
  className,
  style,
  id,
  ...props
}) => {
  return (
    <div
      className={cn(
        'radio-group',
        error && 'radio-group--error',
        disabled && 'radio-group--disabled',
        className,
      )}
      style={style}
      id={id}
      {...props}
    >
      {label && <span className="radio-group__label">{label}</span>}
      <ShadcnRadioGroup
        value={value}
        onValueChange={onChange}
        className="radio-group__options"
        disabled={disabled}
        name={name}
      >
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`${name}-${option.value}`}
            className={cn(
              'radio-group__option',
              value === option.value && 'radio-group__option--selected',
              option.disabled && 'radio-group__option--disabled',
              'cursor-pointer',
            )}
            tabIndex={option.disabled ? -1 : 0}
            aria-disabled={option.disabled || disabled}
          >
            <ShadcnRadioGroupItem
              value={option.value}
              id={`${name}-${option.value}`}
              disabled={option.disabled || disabled}
              className="radio-group__input"
              {...(value === option.value ? { indicatorClassName: 'fill-[var(--feedback-success-surface)]' } : {})}
            />
            <div className="flex flex-col gap-1.5">
              {option.label && <span className="radio-group__option-label">{option.label}</span>}
              {option.description && (
                <span
                  className={cn(
                    'radio-group__option-description',
                    option.addressStyle === 'column' && 'radio-group__option-description--column',
                  )}
                >
                  {option.addressStyle === 'column'
                    ? option.description.split(', ').map((line, index) => (
                        <span key={index} className="block">
                          {line.trim()}
                        </span>
                      ))
                    : option.description}
                </span>
              )}
            </div>
          </label>
        ))}
      </ShadcnRadioGroup>
      {description && !error && <div className="radio-group__description">{description}</div>}
      {error && (
        <div className="radio-group__error">
          <AlertCircle className="radio-group__error-icon" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  )
}

export default RadioGroup
