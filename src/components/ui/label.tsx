import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/utilities/ui'

const labelVariants = cva('font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70', {
  variants: {
    variant: {
      default: 'text-[var(--text-strong)] text-sm leading-none',
      onLight: 'mb-[5px] block text-lg font-normal leading-[27px] text-[var(--text-on-light-base)]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, variant, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants({ variant }), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
