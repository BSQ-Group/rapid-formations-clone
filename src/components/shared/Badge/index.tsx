import * as React from 'react'
import clsx from 'clsx'
import './Badge.css'

export type BadgeVariant = 'green' | 'blue' | 'red' | 'amber' | 'purple' | 'grey' | 'dark'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

function Badge({ className, variant = 'green', ...props }: BadgeProps) {
  return <div className={clsx('badge', `badge--${variant}`, className)} {...props} />
}

export { Badge }
