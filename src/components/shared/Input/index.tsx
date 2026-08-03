import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utilities/ui'
import './input.css'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'

const inputVariants = cva(
  'input__field h-full w-full rounded-[6px] text-[var(--text-strong)] placeholder:text-[var(--text-placeholder)] transition-colors duration-200 focus:outline-none border border-[var(--control-input-border-idle)]',
  {
    variants: {
      variant: {
        default: '',
        error:
          'bg-[var(--feedback-error-background-muted)] border border-[var(--border-error)] focus:border-[var(--border-error)] focus:outline-none',
        disabled: 'cursor-not-allowed opacity-50',
      },
      background: {
        light: 'bg-[var(--control-input-background-light)] focus:ring-0',
        dark: 'bg-[var(--control-input-background-dark)] focus:ring-0',
      },
      size: {
        large: 'h-[46px] px-4 py-2 text-sm',
        small: 'h-[40px] px-3 py-1 text-xs',
      },
      hasLeftIcon: {
        true: 'pl-10',
      },
      hasRightIcon: {
        true: 'pr-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      background: 'dark',
      size: 'large',
      hasLeftIcon: false,
      hasRightIcon: false,
    },
  },
)

interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size'>, VariantProps<typeof inputVariants> {
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  description?: string
  fullWidth?: boolean
  actionable?: boolean
  errorIcon?: React.ReactNode
  showPasswordToggle?: boolean
}

interface LabelProps extends React.ComponentProps<'label'> {
  children: React.ReactNode
  required?: boolean
}

export function Label({ children, className, required, ...props }: LabelProps) {
  return (
    <label className={cn('input-label', className)} {...props}>
      {children}
      {required && <span className="input-label__required">*</span>}
    </label>
  )
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      icon,
      rightIcon,
      error,
      description,
      variant = 'default',
      background = 'dark',
      size = 'large',
      hasLeftIcon,
      hasRightIcon,
      fullWidth = true,
      actionable = false,
      id,
      errorIcon = <AlertCircle size={18} className="text-[var(--feedback-error-surface)]" />,
      showPasswordToggle = false,
      'aria-describedby': ariaDescribedby,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const errorId = error ? `${id}-error` : undefined
    const descriptionId = description ? `${id}-description` : undefined
    const describedBy = ariaDescribedby || errorId || descriptionId

    const resolvedVariant = disabled ? 'disabled' : variant

    const inputType = type === 'password' && showPassword && showPasswordToggle ? 'text' : type

    const hasLeftIconValue = !!icon || hasLeftIcon
    const hasRightIconValue =
      !!(rightIcon || (showPasswordToggle && type === 'password')) || hasRightIcon

    const passwordToggleIcon =
      showPasswordToggle && type === 'password' ? (
        <span
          className="input__icon input__icon--right"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      ) : rightIcon ? (
        <span className="input__icon input__icon--right">{rightIcon}</span>
      ) : null

    return (
      <div
        className={cn(
          'input',
          !fullWidth && 'input--width-auto',
          size === 'small' && 'input--small',
          type && `input--${type}`,
        )}
      >
        <div
          className={cn(
            'input__wrapper',
            actionable && 'input__wrapper--actionable',
            resolvedVariant === 'error' && 'input__wrapper--error',
          )}
        >
          {icon && <span className="input__icon input__icon--left">{icon}</span>}
          <input
            type={inputType}
            ref={ref}
            id={id}
            className={cn(
              inputVariants({
                variant: resolvedVariant,
                background,
                size,
                hasLeftIcon: hasLeftIconValue,
                hasRightIcon: hasRightIconValue,
                className,
              }),
            )}
            aria-invalid={resolvedVariant === 'error'}
            aria-describedby={describedBy}
            disabled={disabled || resolvedVariant === 'disabled'}
            {...props}
          />
          {passwordToggleIcon}
        </div>
        {error && resolvedVariant === 'error' && (
          <div id={errorId} className="input__error" role="alert">
            {errorIcon}
            <span>{error}</span>
          </div>
        )}
        {description && !error && (
          <div id={descriptionId} className="input__description">
            {description}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
export { Input, inputVariants }
export type { InputProps }
