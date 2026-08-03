import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utilities/ui'
import './TextArea.css'
import { AlertCircle, CornerDownLeft } from 'lucide-react'

const textareaVariants = cva(
  'textarea__field w-full text-[var(--text-subtle)] placeholder:text-[var(--text-placeholder)] rounded-[6px] border transition-colors duration-200 focus:outline-none resize-none',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--control-input-background-dark)] border-[var(--control-input-border-idle)]',
        error: 'bg-[var(--feedback-error-background-muted)] border-[var(--border-error)]',
        disabled:
          'bg-[var(--control-input-background-dark)] cursor-not-allowed opacity-50 border-[var(--control-input-border-idle)]',
      },
      size: {
        large: 'min-h-[130px] px-4 py-3 text-sm',
        small: 'min-h-[100px] px-3 py-2 text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'large',
    },
  },
)

interface TextAreaProps
  extends Omit<React.ComponentProps<'textarea'>, 'size'>, VariantProps<typeof textareaVariants> {
  error?: string
  description?: string
  fullWidth?: boolean
  actionable?: boolean
  errorIcon?: React.ReactNode
  showSubmitButton?: boolean
  onSubmit?: () => void
}

interface LabelProps extends React.ComponentProps<'label'> {
  children: React.ReactNode
  required?: boolean
}

export function Label({ children, className, required, ...props }: LabelProps) {
  return (
    <label className={cn('textarea-label', className)} {...props}>
      {children}
      {required && <span className="textarea-label__required">*</span>}
    </label>
  )
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      error,
      description,
      variant = 'default',
      size = 'large',
      fullWidth = true,
      actionable = false,
      id,
      errorIcon = <AlertCircle size={18} className="text-[var(--feedback-error-surface)]" />,
      showSubmitButton = false,
      onSubmit,
      'aria-describedby': ariaDescribedby,
      disabled,
      ...props
    },
    ref,
  ) => {
    const errorId = error ? `${id}-error` : undefined
    const descriptionId = description ? `${id}-description` : undefined
    const describedBy = ariaDescribedby || errorId || descriptionId

    const resolvedVariant = disabled ? 'disabled' : error ? 'error' : variant

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && e.shiftKey === false && onSubmit && showSubmitButton) {
        e.preventDefault()
        onSubmit()
      }
    }

    return (
      <div
        className={cn(
          'textarea',
          !fullWidth && 'textarea--width-auto',
          size === 'small' && 'textarea--small',
        )}
      >
        <div
          className={cn(
            'textarea__wrapper',
            actionable && 'textarea__wrapper--actionable',
            resolvedVariant === 'error' && 'textarea__wrapper--error',
          )}
        >
          <div className="relative">
            <textarea
              ref={ref}
              id={id}
              className={cn(
                textareaVariants({
                  variant: resolvedVariant,
                  size,
                  className,
                }),
              )}
              aria-invalid={resolvedVariant === 'error'}
              aria-describedby={describedBy}
              disabled={disabled || resolvedVariant === 'disabled'}
              onKeyDown={handleKeyDown}
              {...props}
            />
            {showSubmitButton && (
              <div className="textarea__button-container">
                <button
                  type="button"
                  className="textarea__submit-button"
                  onClick={onSubmit}
                  disabled={disabled || resolvedVariant === 'disabled'}
                  aria-label="Submit message"
                >
                  <CornerDownLeft size={18} className="text-black" />
                </button>
              </div>
            )}
          </div>
        </div>
        {error && resolvedVariant === 'error' && (
          <div id={errorId} className="textarea__error" role="alert">
            {errorIcon}
            <span>{error}</span>
          </div>
        )}
        {description && !error && (
          <div id={descriptionId} className="textarea__description">
            {description}
          </div>
        )}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'
export { TextArea, textareaVariants }
