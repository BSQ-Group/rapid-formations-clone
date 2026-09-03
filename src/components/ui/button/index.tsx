import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2, Download, ChevronLeft } from 'lucide-react'

import { cn } from '@/utilities/ui'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm text-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] focus-visible:ring-offset-0 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-[var(--button-primary-idle)] text-[var(--button-primary-text)] hover:bg-[var(--button-primary-hover)] font-bold shadow-sm disabled:opacity-20',
        secondary:
          'bg-[var(--button-secondary-dark-idle)] text-[var(--text-strong)] border-[var(--button-border)] hover:bg-[var(--button-secondary-dark-hover)] disabled:opacity-20',
        'secondary-light':
          'bg-[var(--button-secondary-light-idle)] text-[var(--text-strong)] border-[var(--button-border)] hover:bg-[var(--button-secondary-light-hover)] disabled:opacity-20',
        tertiary:
          'bg-[var(--button-tertiary-dark-idle)] text-[var(--text-strong)] hover:bg-[var(--button-tertiary-dark-hover)] rounded-full text-xs font-bold py-2 px-3.5 h-8 disabled:opacity-20',
        'tertiary-light':
          'bg-[var(--button-tertiary-light-idle)] text-[var(--text-strong)] hover:bg-[var(--button-tertiary-light-hover)] rounded-full text-xs font-bold py-2 px-3.5 h-8 disabled:opacity-20',
        download:
          'bg-[var(--button-secondary-light-idle)] text-[var(--text-strong)] hover:bg-[var(--button-primary-hover)] font-bold shadow-sm disabled:opacity-20',
        promo:
          'bg-[var(--button-promo-idle)] text-[var(--text-strong)] border border-solid border-[var(--button-promo-idle)] hover:bg-[var(--button-promo-hover)] hover:border-[var(--button-promo-hover)] whitespace-normal disabled:opacity-20',
        success:
          'bg-[var(--surface-cta-success)] text-[var(--text-strong)] border border-solid border-[var(--surface-cta-success)] hover:bg-[var(--surface-cta-success-hover)] hover:border-[var(--surface-cta-success-hover)] whitespace-normal disabled:opacity-20',
        back: 'bg-[var(--button-tertiary-dark-idle)] text-[var(--text-strong)] hover:bg-[var(--button-tertiary-dark-hover)] rounded-xs text-xs font-bold py-2 px-3.5 h-8 disabled:opacity-20',
        carousel: 'bg-transparent rounded-none disabled:opacity-50',
      },
      size: {
        sm: 'h-8 px-4 py-2 text-xs font-semibold',
        md: 'h-10 px-4 py-2 text-sm font-bold',
        lg: 'h-[46px] px-4 py-2 text-base font-bold',
        icon: 'h-10 w-10 [&_svg]:size-6',
        promo: 'h-auto px-6 py-2 text-[17px] leading-[25.5px] font-semibold',
        form: 'h-[52px] rounded-sm px-[30px] py-2.5 text-xl leading-[30px] font-semibold',
        carousel: 'h-auto w-auto p-0',
      },
    },
    compoundVariants: [
      {
        variant: 'secondary',
        size: ['sm', 'md', 'icon'],
        class: 'border',
      },
      {
        variant: 'secondary',
        size: 'lg',
        class: 'border-2',
      },
      {
        variant: 'secondary-light',
        size: ['sm', 'md', 'icon'],
        class: 'border',
      },
      {
        variant: 'secondary-light',
        size: 'lg',
        class: 'border-2',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      loadingText,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        data-size={size}
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={asChild ? undefined : isLoading || disabled}
        aria-disabled={isLoading || disabled}
        {...props}
      >
        {asChild ? (
          children
        ) : isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            {loadingText || children}
          </>
        ) : (
          <>
            {variant === 'back' ? <ChevronLeft className="h-4 w-4" /> : null}
            {children}
            {variant === 'download' && (
              <Download className="ml-auto bg-[var(--button-primary-idle)] text-[var(--text-inverse)] rounded-xs p-0.5" />
            )}
          </>
        )}
      </Comp>
    )
  },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
