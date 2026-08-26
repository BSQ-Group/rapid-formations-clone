import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'

const inputVariants = cva(
  'flex w-full transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm placeholder:text-[var(--text-placeholder)] md:text-sm',
        onLight:
          'h-[41px] rounded-none border border-solid border-[color:var(--border-on-light-strong)] bg-[var(--surface-canvas)] p-2 text-lg leading-[normal] text-[var(--text-on-light-muted)] placeholder:text-[var(--text-on-light-placeholder)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & VariantProps<typeof inputVariants>
>(({ className, type, variant, ...props }, ref) => {
  return (
    <input type={type} className={cn(inputVariants({ variant }), className)} ref={ref} {...props} />
  )
})
Input.displayName = 'Input'

export { Input, inputVariants }
