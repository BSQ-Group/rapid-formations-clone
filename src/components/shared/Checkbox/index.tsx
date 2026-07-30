'use client'

import * as React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { cn } from '@/utilities/ui'

export interface CheckboxProps extends React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> {
  error?: boolean
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, error = false, onCheckedChange, ...props }, ref) => {
    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          'group peer inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[2px] border-[1.5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] disabled:cursor-not-allowed disabled:opacity-50',
          'border-[var(--border-subtle)] bg-[var(--surface-primary)]',
          'hover:border-[var(--border-strong)] hover:bg-[var(--surface-hover)]',
          error &&
            'border-[var(--border-error)] hover:border-[var(--border-error)] hover:bg-[var(--surface-primary)]',
          'data-[state=checked]:border-[var(--feedback-success-background)] data-[state=checked]:bg-[var(--feedback-success-background)] data-[state=checked]:hover:border-[var(--feedback-success-background)] data-[state=checked]:hover:bg-[var(--feedback-success-background)]',
          error &&
            'data-[state=checked]:border-[var(--feedback-error-background)] data-[state=checked]:bg-[var(--feedback-error-background)] data-[state=checked]:hover:border-[var(--feedback-error-background)] data-[state=checked]:hover:bg-[var(--feedback-error-background)]',
          className,
        )}
        checked={props.checked}
        onCheckedChange={onCheckedChange}
        {...props}
      >
        <CheckboxPrimitive.Indicator className="flex size-full items-center justify-center text-[var(--feedback-text)]">
          <Check className="size-2.5 shrink-0" strokeWidth={2.5} aria-hidden />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  },
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
